// =========================================================================
// BUSINESS LEARN STUDIO — CORE APPLICATION & MULTI-FORMAT EXPORT ENGINE
// =========================================================================

const STORAGE_PREFIX = 'BLS_Y12_HSC_V1_';

let state = {
    studentName: localStorage.getItem('BLS_ACTIVE_STUDENT') || 'Fynn Beaumont',
    currentTopic: 'operations',
    masteryFilter: 'all',
    searchQuery: '',
    // Per dot point: { theory: "", caseStudy: "", status: "none" | "review" | "mastered" }
    notes: {},
    // Custom videos added by student/teacher: [{ title, url, topic }]
    customVideos: [],
    // Finance interactive ratio values
    ratios: {
        ca: 4200, cl: 3100,
        tl: 38000, te: 12000,
        gp: 14500, np: 8400, sales: 25500, exp: 3900, ar: 2100
    },
    // Band 6 Exam Studio responses
    examResponses: {
        sec3_exec: '',
        sec3_body1: '',
        sec3_body2: '',
        sec3_rec: '',
        sec4_intro: '',
        sec4_peel1: '',
        sec4_peel2: '',
        sec4_conc: ''
    }
};

let autoSaveTimer = null;
let cloudSyncTimer = null;

// =========================================================================
// INITIALIZATION & PERSISTENCE
// =========================================================================
document.addEventListener('DOMContentLoaded', () => {
    populateRosterDropdown();
    const savedStudent = localStorage.getItem('BLS_ACTIVE_STUDENT');
    const isAuthenticated = sessionStorage.getItem('BLS_AUTH_VERIFIED') === 'true' || localStorage.getItem('BLS_AUTH_VERIFIED') === 'true';

    if (savedStudent && isAuthenticated) {
        loadStudentData(savedStudent);
    } else {
        loadStudentData(savedStudent || 'Fynn Beaumont');
        openStudentModal(true);
    }
    renderCurrentView();
    updateAllProgressIndicators();
});

function getStorageKey(studentName) {
    const clean = (studentName || 'Guest').trim().replace(/\s+/g, '_').toLowerCase();
    return STORAGE_PREFIX + clean;
}

function loadStudentData(studentName) {
    state.studentName = (studentName || 'Student').trim();
    localStorage.setItem('BLS_ACTIVE_STUDENT', state.studentName);
    const nameEl = document.getElementById('activeStudentName');
    if (nameEl) nameEl.textContent = state.studentName;

    const raw = localStorage.getItem(getStorageKey(state.studentName));
    if (raw) {
        try {
            const parsed = JSON.parse(raw);
            state.notes = parsed.notes || {};
            state.customVideos = parsed.customVideos || [];
            if (parsed.ratios) state.ratios = { ...state.ratios, ...parsed.ratios };
            if (parsed.examResponses) state.examResponses = { ...state.examResponses, ...parsed.examResponses };
        } catch (e) {
            console.warn('Could not parse saved state:', e);
        }
    } else {
        state.notes = {};
    }
}

function saveStudentData(silent = true) {
    const payload = {
        studentName: state.studentName,
        updatedAt: new Date().toISOString(),
        notes: state.notes,
        customVideos: state.customVideos,
        ratios: state.ratios,
        examResponses: state.examResponses
    };
    localStorage.setItem(getStorageKey(state.studentName), JSON.stringify(payload));

    const badge = document.getElementById('saveStatusBadge');
    if (badge) {
        const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        badge.textContent = `Saved ${timeStr}`;
    }
    if (!silent) showToast('Progress saved locally!');
}

function scheduleAutoSave() {
    const badge = document.getElementById('saveStatusBadge');
    if (badge) badge.textContent = 'Saving...';
    if (autoSaveTimer) clearTimeout(autoSaveTimer);
    autoSaveTimer = setTimeout(() => {
        saveStudentData(true);
        updateAllProgressIndicators();
    }, 350);

    // Also debounce automatic background sync to Google Sheets every 12 seconds of typing
    if (cloudSyncTimer) clearTimeout(cloudSyncTimer);
    cloudSyncTimer = setTimeout(() => {
        syncToTeacherCloud(true);
    }, 12000);
}

// =========================================================================
// NAVIGATION & FILTERING
// =========================================================================
function switchTopic(topicKey) {
    state.currentTopic = topicKey;
    document.querySelectorAll('.topic-tab').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-topic') === topicKey);
    });
    renderCurrentView();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function handleSearchFilter() {
    const input = document.getElementById('dotPointSearchInput');
    state.searchQuery = (input ? input.value : '').trim().toLowerCase();
    renderCurrentView();
}

function setMasteryFilter(filterVal) {
    state.masteryFilter = filterVal;
    document.querySelectorAll('.filter-pill').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-filter') === filterVal);
    });
    renderCurrentView();
}

function scrollToSection(sectionId) {
    const el = document.getElementById(sectionId);
    if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// =========================================================================
// MAIN VIEW RENDERER
// =========================================================================
function renderCurrentView() {
    const container = document.getElementById('studioMainContent');
    const ripsSidebarCard = document.getElementById('ripsSidebarCard');
    if (!container) return;

    if (state.currentTopic === 'media') {
        if (ripsSidebarCard) ripsSidebarCard.style.display = 'none';
        container.innerHTML = renderMediaVaultView();
        return;
    }

    if (state.currentTopic === 'exam') {
        if (ripsSidebarCard) ripsSidebarCard.style.display = 'none';
        container.innerHTML = renderExamStudioView();
        return;
    }

    if (ripsSidebarCard) ripsSidebarCard.style.display = 'block';
    const topicObj = SYLLABUS_DATA.topics[state.currentTopic];
    if (!topicObj) return;

    renderRipsSidebar(topicObj);

    let html = renderTopicHeroBanner(topicObj);

    let totalRenderedCards = 0;

    topicObj.sections.forEach(sec => {
        const filteredPoints = sec.dotPoints.filter(dp => matchesFilters(dp));
        if (filteredPoints.length === 0 && (state.searchQuery || state.masteryFilter !== 'all')) {
            return;
        }

        html += `
        <div class="rips-section-block" id="sec-${sec.id}">
            <div class="rips-section-header">
                <div class="rips-header-left">
                    <div class="rips-badge-large">${escapeHtml(sec.code)}</div>
                    <div>
                        <h2>${escapeHtml(sec.title)}</h2>
                        <p>${escapeHtml(sec.subtitle)}</p>
                    </div>
                </div>
                <div class="rips-header-media">
                    ${sec.video ? `<button class="btn-action btn-word" onclick="openVideoModal('${escapeAttr(sec.video)}', '${escapeAttr(sec.title)}')">▶ Watch Masterclass</button>` : ''}
                    ${sec.infographic ? `<button class="btn-action btn-pdf" onclick="openInfographicModal('${escapeAttr(sec.infographic)}', '${escapeAttr(sec.title)}')">🖼️ View Infographic</button>` : ''}
                    ${sec.pdf ? `<a href="${escapeAttr(sec.pdf)}" target="_blank" class="btn-action btn-pdf">📑 Study Guide PDF</a>` : ''}
                </div>
            </div>
            ${filteredPoints.map(dp => {
                totalRenderedCards++;
                return renderDotPointCard(dp, topicObj);
            }).join('')}
        </div>`;
    });

    if (totalRenderedCards === 0) {
        html += `
        <div class="sidebar-card" style="text-align:center;padding:2.5rem;">
            <h3>No syllabus dot points match your current filter</h3>
            <p style="color:var(--text-secondary);font-size:0.9rem;margin-top:0.4rem;">Try clearing the search box or switching the Mastery filter back to "All Dot Points".</p>
        </div>`;
    }

    // If Finance Topic is active, append Interactive Financial Ratio Calculator Lab
    if (state.currentTopic === 'finance') {
        html += renderFinanceRatioLab();
    }

    container.innerHTML = html;
}

function renderRipsSidebar(topicObj) {
    const labelEl = document.getElementById('sidebarTopicLabel');
    if (labelEl) {
        labelEl.textContent = topicObj.name.toUpperCase();
        labelEl.style.color = topicObj.accent;
    }

    const navContainer = document.getElementById('ripsNavContainer');
    if (!navContainer) return;

    navContainer.innerHTML = topicObj.sections.map(sec => {
        const doneCount = sec.dotPoints.filter(dp => isDotPointCompleted(dp.id)).length;
        return `
        <button class="rips-nav-btn" onclick="scrollToSection('sec-${sec.id}')">
            <span>
                <span class="rips-letter">${escapeHtml(sec.code)}</span>
                ${escapeHtml(sec.title.replace(/^\d+\.\s*/, ''))}
            </span>
            <span style="font-size:0.74rem;font-family:'JetBrains Mono',monospace;opacity:0.75;">${doneCount}/${sec.dotPoints.length}</span>
        </button>`;
    }).join('');
}

function renderTopicHeroBanner(topicObj) {
    const stats = getTopicStats(topicObj.id);
    const videos = topicObj.resources.videos || [];
    const infographics = topicObj.resources.infographics || [];
    const docs = topicObj.resources.docs || [];

    return `
    <div class="topic-hero-banner" style="--topic-accent: ${topicObj.accent}">
        <div class="topic-hero-top">
            <div>
                <div class="topic-badge-row">
                    <span class="topic-code-tag" style="background:${topicObj.accent}">${escapeHtml(topicObj.code)}</span>
                    <span class="topic-weight-tag">${escapeHtml(topicObj.weight)}</span>
                    <span class="topic-weight-tag"><strong>${stats.completed}/${stats.total}</strong> Dot Points Completed (${stats.pct}%)</span>
                </div>
                <h2 class="topic-hero-title">${topicObj.icon} ${escapeHtml(topicObj.name)} — ${escapeHtml(topicObj.tagline)}</h2>
                <p class="topic-hero-desc">${escapeHtml(topicObj.summary)}</p>
            </div>
            <div style="display:flex;gap:0.5rem;flex-wrap:wrap;">
                <button class="btn-action btn-word" onclick="exportToWord('current')">
                    📘 Download ${escapeHtml(topicObj.name)} Word (.doc)
                </button>
                <button class="btn-action btn-pdf" style="background:#0f172a;color:#fff;" onclick="exportToPDF('current')">
                    🖨️ Print ${escapeHtml(topicObj.name)} PDF
                </button>
            </div>
        </div>

        <div class="topic-media-shelf">
            <div class="media-shelf-title">
                <span>🎬 Linked Multimedia, Gemini Infographics &amp; Study Decks for ${escapeHtml(topicObj.name)}</span>
                <a href="${escapeAttr(SYLLABUS_DATA.notebookUrl)}" target="_blank" rel="noopener" style="color:#4f46e5;text-decoration:none;">Open Gemini NotebookLM ↗</a>
            </div>
            <div class="media-chips-row">
                ${videos.map(v => `
                    <button class="media-chip chip-video" onclick="openVideoModal('${escapeAttr(v.src)}', '${escapeAttr(v.title)}')">
                        ▶ Video: ${escapeHtml(v.title)}
                    </button>
                `).join('')}
                ${infographics.map(inf => `
                    <button class="media-chip chip-infographic" onclick="openInfographicModal('${escapeAttr(inf.src)}', '${escapeAttr(inf.title)}')">
                        🖼️ Infographic: ${escapeHtml(inf.title)}
                    </button>
                `).join('')}
                ${docs.map(d => `
                    <a href="${escapeAttr(d.src)}" target="_blank" class="media-chip chip-pdf">
                        📑 PDF: ${escapeHtml(d.title)}
                    </a>
                `).join('')}
                <a href="${escapeAttr(SYLLABUS_DATA.notebookUrl)}" target="_blank" rel="noopener" class="media-chip chip-notebook">
                    ✨ Launch AI NotebookLM
                </a>
            </div>
        </div>
    </div>`;
}

// =========================================================================
// 2-PART DOT-POINT CARD RENDERER (CORE THEORY + CASE STUDY EVIDENCE)
// =========================================================================
function renderDotPointCard(dp, topicObj) {
    const entry = state.notes[dp.id] || { theory: '', caseStudy: '', status: 'none' };
    const status = entry.status || 'none';
    const theoryWords = countWords(entry.theory);
    const caseWords = countWords(entry.caseStudy);
    const combinedLower = ((entry.theory || '') + ' ' + (entry.caseStudy || '')).toLowerCase();

    return `
    <article class="dotpoint-card mastery-${status}" id="card-${dp.id}">
        <div class="dotpoint-top">
            <div class="dotpoint-title-wrap">
                <span class="dotpoint-code">NESA ${escapeHtml(topicObj.name.toUpperCase())} ${escapeHtml(dp.code)}</span>
                <h3 class="dotpoint-title">${escapeHtml(dp.title)}</h3>
            </div>

            <div class="mastery-selector" role="group" aria-label="Mastery status">
                <button class="mastery-btn ${status === 'none' ? 'active' : ''}" data-status="none" onclick="updateMasteryStatus('${dp.id}', 'none')">
                    ⚪ Not Started
                </button>
                <button class="mastery-btn ${status === 'review' ? 'active' : ''}" data-status="review" onclick="updateMasteryStatus('${dp.id}', 'review')">
                    🟡 Reviewing
                </button>
                <button class="mastery-btn ${status === 'mastered' ? 'active' : ''}" data-status="mastered" onclick="updateMasteryStatus('${dp.id}', 'mastered')">
                    🟢 Mastered
                </button>
            </div>
        </div>

        <!-- Official NESA Sub-Points -->
        <div class="subpoints-box">
            <div class="subpoints-label">📌 Students learn to examine / NESA Syllabus Breakdown:</div>
            <ul class="subpoints-list">
                ${(dp.subPoints || []).map(sp => `<li>${escapeHtml(sp)}</li>`).join('')}
            </ul>
        </div>

        <!-- Key Syllabus Terminology Tracker (Click to insert) -->
        <div class="keyterms-bar" id="keyterms-${dp.id}">
            <span class="keyterms-title">🔑 Key Syllabus Terms (click to insert):</span>
            ${(dp.keyTerms || []).map(term => {
                const isUsed = combinedLower.includes(term.toLowerCase());
                return `<span class="keyterm-pill ${isUsed ? 'used' : ''}" onclick="insertKeyTerm('${dp.id}', '${escapeAttr(term)}')" title="Click to insert into Core Theory notes">${isUsed ? '✓ ' : '+ '}${escapeHtml(term)}</span>`;
            }).join('')}
        </div>

        <!-- 2-Column Structured Note-Taking Grid -->
        <div class="note-columns-grid">
            <!-- Column 1: Core Theory & Definitions -->
            <div class="note-column">
                <div class="note-col-header">
                    <span class="note-col-title">📘 Part 1: Core Theory, Definitions &amp; Mechanics</span>
                    <span class="word-count-badge" id="wc-theory-${dp.id}">${theoryWords} words</span>
                </div>
                <p class="note-prompt-hint">${escapeHtml(dp.theoryPrompt)}</p>
                <textarea
                    id="theory-${dp.id}"
                    class="note-textarea"
                    placeholder="Write your syllabus definitions, how it works, advantages/disadvantages, and cause-and-effect links..."
                    oninput="handleNoteInput('${dp.id}', 'theory', this.value)"
                >${escapeHtml(entry.theory || '')}</textarea>
            </div>

            <!-- Column 2: Case Study Application & Evidence -->
            <div class="note-column case-column">
                <div class="note-col-header">
                    <span class="note-col-title">🍔 Part 2: Case Study Application &amp; Band 6 Evidence</span>
                    <span class="word-count-badge" id="wc-case-${dp.id}">${caseWords} words</span>
                </div>
                <p class="note-prompt-hint">${escapeHtml(dp.casePrompt)}</p>
                <textarea
                    id="case-${dp.id}"
                    class="note-textarea"
                    placeholder="Record real-world business examples (e.g. McDonald's, Apple, Qantas), statistics, dollar figures, and outcomes..."
                    oninput="handleNoteInput('${dp.id}', 'caseStudy', this.value)"
                >${escapeHtml(entry.caseStudy || '')}</textarea>

                ${dp.exemplarChip ? `
                <div class="exemplar-chip-bar">
                    <span>💡 <strong>Exemplar Fact:</strong> ${escapeHtml(dp.exemplarChip)}</span>
                    <button class="btn-insert-exemplar" onclick="insertExemplarFact('${dp.id}', '${escapeAttr(dp.exemplarChip)}')">+ Insert Fact</button>
                </div>` : ''}
            </div>
        </div>
    </article>`;
}

// =========================================================================
// NOTE & MASTERY INTERACTION HANDLERS
// =========================================================================
function handleNoteInput(dpId, field, value) {
    if (!state.notes[dpId]) {
        state.notes[dpId] = { theory: '', caseStudy: '', status: 'none' };
    }
    state.notes[dpId][field] = value;

    // Auto-upgrade status from 'none' to 'review' when student starts writing
    if (state.notes[dpId].status === 'none' && value.trim().length > 15) {
        state.notes[dpId].status = 'review';
        refreshCardMasteryUI(dpId, 'review');
    }

    // Update word count badge
    const wcId = field === 'theory' ? `wc-theory-${dpId}` : `wc-case-${dpId}`;
    const wcEl = document.getElementById(wcId);
    if (wcEl) wcEl.textContent = `${countWords(value)} words`;

    // Refresh key term highlights
    refreshKeyTermsUI(dpId);

    scheduleAutoSave();
}

function updateMasteryStatus(dpId, newStatus) {
    if (!state.notes[dpId]) {
        state.notes[dpId] = { theory: '', caseStudy: '', status: newStatus };
    } else {
        state.notes[dpId].status = newStatus;
    }
    refreshCardMasteryUI(dpId, newStatus);
    saveStudentData(true);
    updateAllProgressIndicators();
}

function refreshCardMasteryUI(dpId, newStatus) {
    const card = document.getElementById(`card-${dpId}`);
    if (!card) return;
    card.classList.remove('mastery-none', 'mastery-review', 'mastery-mastered');
    card.classList.add(`mastery-${newStatus}`);

    card.querySelectorAll('.mastery-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-status') === newStatus);
    });
}

function refreshKeyTermsUI(dpId) {
    const dp = findDotPointById(dpId);
    if (!dp) return;
    const entry = state.notes[dpId] || { theory: '', caseStudy: '' };
    const combinedLower = ((entry.theory || '') + ' ' + (entry.caseStudy || '')).toLowerCase();
    const bar = document.getElementById(`keyterms-${dpId}`);
    if (!bar) return;

    bar.innerHTML = `
        <span class="keyterms-title">🔑 Key Syllabus Terms (click to insert):</span>
        ${(dp.keyTerms || []).map(term => {
            const isUsed = combinedLower.includes(term.toLowerCase());
            return `<span class="keyterm-pill ${isUsed ? 'used' : ''}" onclick="insertKeyTerm('${dp.id}', '${escapeAttr(term)}')">${isUsed ? '✓ ' : '+ '}${escapeHtml(term)}</span>`;
        }).join('')}
    `;
}

function insertKeyTerm(dpId, term) {
    const textarea = document.getElementById(`theory-${dpId}`);
    if (!textarea) return;
    const current = textarea.value;
    const prefix = current && !current.endsWith(' ') && !current.endsWith('\n') ? ' ' : '';
    textarea.value = current + prefix + term;
    textarea.focus();
    handleNoteInput(dpId, 'theory', textarea.value);
}

function insertExemplarFact(dpId, factText) {
    const textarea = document.getElementById(`case-${dpId}`);
    if (!textarea) return;
    const current = textarea.value.trim();
    const updated = current ? `${current}\n• ${factText}` : `• ${factText}`;
    textarea.value = updated;
    textarea.focus();
    handleNoteInput(dpId, 'caseStudy', updated);
    showToast('Case study evidence inserted!');
}

// =========================================================================
// FINANCE INTERACTIVE RATIO CALCULATOR LAB
// =========================================================================
function renderFinanceRatioLab() {
    const r = state.ratios;
    const currentRatio = r.cl > 0 ? (r.ca / r.cl).toFixed(2) : '0.00';
    const gearingRatio = r.te > 0 ? ((r.tl / r.te) * 100).toFixed(1) : '0.0';
    const gpRatio = r.sales > 0 ? ((r.gp / r.sales) * 100).toFixed(1) : '0.0';
    const npRatio = r.sales > 0 ? ((r.np / r.sales) * 100).toFixed(1) : '0.0';
    const roeRatio = r.te > 0 ? ((r.np / r.te) * 100).toFixed(1) : '0.0';
    const expRatio = r.sales > 0 ? ((r.exp / r.sales) * 100).toFixed(1) : '0.0';
    const arTurnover = r.ar > 0 ? (r.sales / r.ar).toFixed(1) : '0.0';
    const arDays = r.ar > 0 && r.sales > 0 ? (365 / (r.sales / r.ar)).toFixed(1) : '0.0';

    return `
    <div class="ratio-lab-card" id="financeRatioLab">
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:1rem;">
            <div>
                <span class="topic-code-tag" style="background:#059669;">INTERACTIVE LAB</span>
                <h2 style="font-size:1.3rem;margin-top:0.35rem;">🧮 HSC Financial Ratios Calculator &amp; Interpretation Simulator</h2>
                <p style="font-size:0.86rem;color:var(--text-secondary);">Test real or stimulus figures ($M) to automatically compute all 7 NESA syllabus ratios and include them in your exported Word/PDF study guide.</p>
            </div>
            <button class="btn-action btn-sync" onclick="resetMcDonaldsRatioPreset()">🍔 Load McDonald's Exemplar Figures</button>
        </div>

        <div class="ratio-grid">
            <!-- 1. Liquidity -->
            <div class="ratio-calc-box">
                <h4>1. Liquidity — Current Ratio</h4>
                <span class="ratio-formula-tag">Current Assets ÷ Current Liabilities</span>
                <div class="ratio-inputs-row">
                    <div>
                        <label>Current Assets ($M)</label>
                        <input type="number" value="${r.ca}" oninput="updateRatioInput('ca', this.value)">
                    </div>
                    <div>
                        <label>Current Liabilities ($M)</label>
                        <input type="number" value="${r.cl}" oninput="updateRatioInput('cl', this.value)">
                    </div>
                </div>
                <div class="ratio-output-banner" id="out-current-ratio">
                    Result: <strong>${currentRatio}:1</strong> (Textbook benchmark ~2:1)
                </div>
            </div>

            <!-- 2. Gearing (Solvency) -->
            <div class="ratio-calc-box">
                <h4>2. Solvency — Debt to Equity (Gearing)</h4>
                <span class="ratio-formula-tag">Total Liabilities ÷ Total Equity</span>
                <div class="ratio-inputs-row">
                    <div>
                        <label>Total Liabilities ($M)</label>
                        <input type="number" value="${r.tl}" oninput="updateRatioInput('tl', this.value)">
                    </div>
                    <div>
                        <label>Total Owner's Equity ($M)</label>
                        <input type="number" value="${r.te}" oninput="updateRatioInput('te', this.value)">
                    </div>
                </div>
                <div class="ratio-output-banner" id="out-gearing-ratio">
                    Result: <strong>${gearingRatio}%</strong> (${ (r.tl / (r.te || 1)).toFixed(2) }:1)
                </div>
            </div>

            <!-- 3. Profitability -->
            <div class="ratio-calc-box">
                <h4>3. Profitability — GPR, NPR &amp; ROE</h4>
                <span class="ratio-formula-tag">GP ÷ Sales | NP ÷ Sales | NP ÷ Equity</span>
                <div class="ratio-inputs-row">
                    <div>
                        <label>Gross Profit ($M)</label>
                        <input type="number" value="${r.gp}" oninput="updateRatioInput('gp', this.value)">
                    </div>
                    <div>
                        <label>Net Profit ($M)</label>
                        <input type="number" value="${r.np}" oninput="updateRatioInput('np', this.value)">
                    </div>
                </div>
                <div class="ratio-inputs-row">
                    <div>
                        <label>Total Sales Revenue ($M)</label>
                        <input type="number" value="${r.sales}" oninput="updateRatioInput('sales', this.value)">
                    </div>
                    <div>
                        <label>Total Expenses ($M)</label>
                        <input type="number" value="${r.exp}" oninput="updateRatioInput('exp', this.value)">
                    </div>
                </div>
                <div class="ratio-output-banner" id="out-profit-ratio">
                    GPR: <strong>${gpRatio}%</strong> | NPR: <strong>${npRatio}%</strong> | ROE: <strong>${roeRatio}%</strong>
                </div>
            </div>

            <!-- 4. Efficiency -->
            <div class="ratio-calc-box">
                <h4>4. Efficiency — Expense &amp; AR Turnover</h4>
                <span class="ratio-formula-tag">Expenses ÷ Sales | Sales ÷ Accounts Receivable</span>
                <div class="ratio-inputs-row">
                    <div>
                        <label>Accounts Receivable ($M)</label>
                        <input type="number" value="${r.ar}" oninput="updateRatioInput('ar', this.value)">
                    </div>
                    <div>
                        <label>Expense Ratio</label>
                        <input type="text" value="${expRatio}%" disabled style="background:#e2e8f0;">
                    </div>
                </div>
                <div class="ratio-output-banner" id="out-efficiency-ratio">
                    AR Turnover: <strong>${arTurnover}x/yr</strong> (Collected every <strong>${arDays} days</strong>)
                </div>
            </div>
        </div>
    </div>`;
}

function updateRatioInput(key, val) {
    state.ratios[key] = parseFloat(val) || 0;
    scheduleAutoSave();
    const lab = document.getElementById('financeRatioLab');
    if (lab) {
        lab.outerHTML = renderFinanceRatioLab();
    }
}

function resetMcDonaldsRatioPreset() {
    state.ratios = {
        ca: 4200, cl: 3100,
        tl: 38000, te: 12000,
        gp: 14500, np: 8400, sales: 25500, exp: 3900, ar: 2100
    };
    saveStudentData(false);
    renderCurrentView();
}

// =========================================================================
// MULTIMEDIA & GEMINI NOTEBOOK VAULT VIEW
// =========================================================================
function renderMediaVaultView() {
    const allInfographics = [
        ...SYLLABUS_DATA.topics.operations.resources.infographics.map(i => ({ ...i, topicName: 'Operations' })),
        ...SYLLABUS_DATA.topics.marketing.resources.infographics.map(i => ({ ...i, topicName: 'Marketing' }))
    ];

    const allDocs = [
        { title: "Operating Under Pressure: 7 Influences & McDonald's Deck (PDF)", src: "assets/docs/Operations_Influences_McDonalds_Deck.pdf", topic: "Operations" },
        { title: "HSC Business Studies Operations Study Guide (PDF)", src: "assets/docs/HSC_Business_Studies_Operations_Guide.pdf", topic: "Operations" },
        { title: "The Golden Arches of Finance: McDonald's HSC Case Study Guide (PDF)", src: "assets/docs/Golden_Arches_of_Finance_McDonalds_Guide.pdf", topic: "Finance" },
        { title: "Finance Foundations & Objectives Study Guide (PDF)", src: "assets/docs/Finance_Foundations_Guide.pdf", topic: "Finance" },
        { title: "Chapter 12: Financial Management Strategies (PDF)", src: "assets/docs/Finance_Strategies_Guide.pdf", topic: "Finance" },
        { title: "Section III Business Report Assessment Scaffold (PDF)", src: "assets/docs/Business_Report_Assessment_Scaffold.pdf", topic: "Exam Writing" },
        { title: "Complete HSC Business Studies Revision Workbook (PDF)", src: "assets/docs/HSC_Business_Studies_Revision_Workbook.pdf", topic: "All 4 Topics" }
    ];

    return `
    <div class="topic-hero-banner" style="--topic-accent: #4f46e5">
        <div class="topic-hero-top">
            <div>
                <div class="topic-badge-row">
                    <span class="topic-code-tag" style="background:#4f46e5;">MULTIMEDIA HUB</span>
                    <span class="topic-weight-tag">9 Video Masterclasses • 8 Visual Infographics • 7 PDF Decks</span>
                </div>
                <h2 class="topic-hero-title">🎬 Video Masterclasses, Gemini Infographics &amp; Study Decks</h2>
                <p class="topic-hero-desc">Watch every syllabus-calibrated video masterclass, inspect high-resolution visual blueprints, download PDF study guides, or add custom YouTube / Atomi / Drive video links.</p>
            </div>
            <a href="${escapeAttr(SYLLABUS_DATA.notebookUrl)}" target="_blank" rel="noopener" class="btn-action btn-notebook">
                ✨ Open Companion Gemini NotebookLM ↗
            </a>
        </div>
    </div>

    <!-- Section 1: Built-in Video Masterclasses -->
    <div class="sidebar-card" style="margin-bottom:1.5rem;">
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:1rem;">
            <h2 style="font-size:1.15rem;">🎥 HSC Video Masterclasses</h2>
            <div style="display:flex;gap:0.5rem;flex-wrap:wrap;">
                <input type="text" id="newVideoTitle" placeholder="Custom Video Title (e.g. Finance Ratios)" style="padding:0.45rem 0.7rem;border:1px solid var(--border-light);border-radius:6px;font-size:0.82rem;">
                <input type="text" id="newVideoUrl" placeholder="YouTube / Drive / MP4 URL..." style="padding:0.45rem 0.7rem;border:1px solid var(--border-light);border-radius:6px;font-size:0.82rem;min-width:230px;">
                <button class="btn-action btn-word" onclick="addCustomVideoLink()">+ Add Video Link</button>
            </div>
        </div>

        <div class="media-gallery-grid">
            ${SYLLABUS_DATA.mediaLibrary.map(v => `
                <div class="media-card">
                    <div class="media-card-body">
                        <span class="media-card-badge">${escapeHtml(v.badge)} • ${escapeHtml(v.section)}</span>
                        <h4>${escapeHtml(v.title)}</h4>
                        <p>${escapeHtml(v.desc)}</p>
                    </div>
                    <div class="media-card-footer">
                        <button class="btn-action btn-word" onclick="openVideoModal('${escapeAttr(v.src)}', '${escapeAttr(v.title)}')">▶ Play Video</button>
                        <a href="${escapeAttr(v.src)}" download class="btn-action btn-ghost" style="color:#334155;border-color:#cbd5e1;">⬇ MP4</a>
                    </div>
                </div>
            `).join('')}

            ${(state.customVideos || []).map((cv, idx) => `
                <div class="media-card">
                    <div class="media-card-body">
                        <span class="media-card-badge" style="background:#fef3c7;color:#b45309;">Custom Link</span>
                        <h4>${escapeHtml(cv.title)}</h4>
                        <p style="word-break:break-all;">${escapeHtml(cv.url)}</p>
                    </div>
                    <div class="media-card-footer">
                        <button class="btn-action btn-word" onclick="openVideoModal('${escapeAttr(cv.url)}', '${escapeAttr(cv.title)}')">▶ Open / Play</button>
                        <button class="btn-action btn-ghost" style="color:#dc2626;" onclick="removeCustomVideo(${idx})">Delete</button>
                    </div>
                </div>
            `).join('')}
        </div>
    </div>

    <!-- Section 2: High-Resolution Syllabus Infographics -->
    <div class="sidebar-card" style="margin-bottom:1.5rem;">
        <h2 style="font-size:1.15rem;margin-bottom:0.5rem;">🖼️ High-Resolution Syllabus Infographics (Click to Zoom / Download)</h2>
        <div class="media-gallery-grid">
            ${allInfographics.map(inf => `
                <div class="media-card">
                    <img src="${escapeAttr(inf.src)}" alt="${escapeAttr(inf.title)}" class="infographic-thumb" onclick="openInfographicModal('${escapeAttr(inf.src)}', '${escapeAttr(inf.title)}')">
                    <div class="media-card-body">
                        <span class="media-card-badge">${escapeHtml(inf.topicName)} • ${escapeHtml(inf.section)}</span>
                        <h4>${escapeHtml(inf.title)}</h4>
                    </div>
                    <div class="media-card-footer">
                        <button class="btn-action btn-word" onclick="openInfographicModal('${escapeAttr(inf.src)}', '${escapeAttr(inf.title)}')">🔍 Full Screen</button>
                        <a href="${escapeAttr(inf.src)}" download class="btn-action btn-ghost" style="color:#334155;border-color:#cbd5e1;">⬇ Download PNG</a>
                    </div>
                </div>
            `).join('')}
        </div>
    </div>

    <!-- Section 3: PDF Study Decks & Case Guides -->
    <div class="sidebar-card">
        <h2 style="font-size:1.15rem;margin-bottom:0.5rem;">📑 Official PDF Slide Decks, McDonald's Case Guides &amp; Workbooks</h2>
        <div class="media-gallery-grid">
            ${allDocs.map(doc => `
                <div class="media-card">
                    <div class="media-card-body">
                        <span class="media-card-badge" style="background:#ecfdf5;color:#047857;">${escapeHtml(doc.topic)} PDF</span>
                        <h4>${escapeHtml(doc.title)}</h4>
                    </div>
                    <div class="media-card-footer">
                        <a href="${escapeAttr(doc.src)}" target="_blank" class="btn-action btn-sync">📖 Open PDF</a>
                        <a href="${escapeAttr(doc.src)}" download class="btn-action btn-ghost" style="color:#334155;border-color:#cbd5e1;">⬇ Download</a>
                    </div>
                </div>
            `).join('')}
        </div>
    </div>`;
}

function addCustomVideoLink() {
    const titleEl = document.getElementById('newVideoTitle');
    const urlEl = document.getElementById('newVideoUrl');
    const title = (titleEl ? titleEl.value : '').trim();
    const url = (urlEl ? urlEl.value : '').trim();
    if (!title || !url) {
        showToast('Please enter both a video title and URL.');
        return;
    }
    state.customVideos.push({ title, url });
    saveStudentData(false);
    renderCurrentView();
}

function removeCustomVideo(idx) {
    state.customVideos.splice(idx, 1);
    saveStudentData(false);
    renderCurrentView();
}

// =========================================================================
// BAND 6 EXAM WRITING STUDIO (SECTION III BUSINESS REPORT & SECTION IV)
// =========================================================================
function renderExamStudioView() {
    const ex = state.examResponses;
    const examVideos = SYLLABUS_DATA.mediaLibrary.filter(v => v.topic === 'exam');

    return `
    <div class="topic-hero-banner" style="--topic-accent: #d97706">
        <div class="topic-hero-top">
            <div>
                <div class="topic-badge-row">
                    <span class="topic-code-tag" style="background:#d97706;">SECTION III &amp; IV</span>
                    <span class="topic-weight-tag">20 Marks Each (40% of HSC Exam)</span>
                </div>
                <h2 class="topic-hero-title">✍️ Band 6 Exam Writing Studio — Business Reports &amp; Extended Responses</h2>
                <p class="topic-hero-desc">Master the structure of Section III (Stimulus Business Report) and Section IV (Case Study Extended Response) with integrated video masterclasses and structured PEEL response builders.</p>
            </div>
            <button class="btn-action btn-word" onclick="exportToWord('all')">
                📘 Export Notes + Exam Responses (.doc)
            </button>
        </div>

        <div class="topic-media-shelf">
            <div class="media-shelf-title">
                <span>🎬 Section III &amp; IV Video Masterclasses &amp; Scaffolds</span>
            </div>
            <div class="media-chips-row">
                ${examVideos.map(v => `
                    <button class="media-chip chip-video" onclick="openVideoModal('${escapeAttr(v.src)}', '${escapeAttr(v.title)}')">
                        ▶ ${escapeHtml(v.title)}
                    </button>
                `).join('')}
                <a href="assets/docs/Business_Report_Assessment_Scaffold.pdf" target="_blank" class="media-chip chip-pdf">
                    📑 Business Report Assessment Scaffold (PDF)
                </a>
            </div>
        </div>
    </div>

    <!-- Section III Business Report Builder -->
    <div class="dotpoint-card mastery-review">
        <span class="dotpoint-code">SECTION III • 20 MARKS</span>
        <h3 class="dotpoint-title" style="margin-bottom:0.65rem;">1. Section III Stimulus Business Report Builder</h3>
        <div class="subpoints-box">
            <div class="subpoints-label">Band 6 Business Report Checklist:</div>
            <ul class="subpoints-list">
                <li><strong>TO / FROM / DATE / SUBJECT</strong> header block followed by an <strong>1.0 Executive Summary</strong> (overview of problems in the stimulus + recommended strategies + expected outcomes).</li>
                <li>Use <strong>numbered/underlined subheadings</strong> matching every part of the question, integrating stimulus facts/figures in every section.</li>
                <li>Conclude with a <strong>Recommendations &amp; Summary</strong> section evaluating short-term vs long-term impacts.</li>
            </ul>
        </div>
        <div class="note-columns-grid">
            <div class="note-column">
                <div class="note-col-header"><span class="note-col-title">1.0 Executive Summary &amp; Stimulus Breakdown</span></div>
                <textarea class="note-textarea" placeholder="TO: Board of Directors | FROM: Senior Business Consultant... Outline core stimulus challenges and strategic recommendations..." oninput="updateExamResponse('sec3_exec', this.value)">${escapeHtml(ex.sec3_exec || '')}</textarea>
            </div>
            <div class="note-column">
                <div class="note-col-header"><span class="note-col-title">2.0 Body Heading 1 (Addressing Stimulus Part A)</span></div>
                <textarea class="note-textarea" placeholder="Subheading 1: Define syllabus concepts, apply directly to stimulus case data, and evaluate..." oninput="updateExamResponse('sec3_body1', this.value)">${escapeHtml(ex.sec3_body1 || '')}</textarea>
            </div>
            <div class="note-column">
                <div class="note-col-header"><span class="note-col-title">3.0 Body Heading 2 (Addressing Stimulus Part B)</span></div>
                <textarea class="note-textarea" placeholder="Subheading 2: Analyse strategies, pros/cons, and cross-functional interdependence..." oninput="updateExamResponse('sec3_body2', this.value)">${escapeHtml(ex.sec3_body2 || '')}</textarea>
            </div>
            <div class="note-column case-column">
                <div class="note-col-header"><span class="note-col-title">4.0 Strategic Recommendations &amp; Evaluation</span></div>
                <textarea class="note-textarea" placeholder="Summarise why the recommended strategies resolve the stimulus business's problems..." oninput="updateExamResponse('sec3_rec', this.value)">${escapeHtml(ex.sec3_rec || '')}</textarea>
            </div>
        </div>
    </div>

    <!-- Section IV Case Study Extended Response Builder -->
    <div class="dotpoint-card mastery-mastered">
        <span class="dotpoint-code">SECTION IV • 20 MARKS</span>
        <h3 class="dotpoint-title" style="margin-bottom:0.65rem;">2. Section IV Case Study Extended Response Builder (McDonald's / Apple / Qantas)</h3>
        <div class="subpoints-box">
            <div class="subpoints-label">Band 6 Section IV Checklist:</div>
            <ul class="subpoints-list">
                <li><strong>Thesis-Driven Introduction:</strong> Address the NESA directive verb (<em>Evaluate, Assess, To what extent, Analyse</em>), define syllabus concepts, and introduce your case study (e.g. McDonald's).</li>
                <li><strong>PEEL Body Paragraphs + Case Study Statistics:</strong> Point → Explain theory → Evidence (specific McDonald's stats, e.g. 93% franchised, $300M Dynamic Yield AI, 2022 Russia exit) → Link to judgment/profitability.</li>
            </ul>
        </div>
        <div class="note-columns-grid">
            <div class="note-column">
                <div class="note-col-header"><span class="note-col-title">Introduction &amp; Thesis Judgment</span></div>
                <textarea class="note-textarea" placeholder="State your clear thesis judgment (e.g. 'To a significant extent, operations strategies enable businesses to sustain competitive advantage...')..." oninput="updateExamResponse('sec4_intro', this.value)">${escapeHtml(ex.sec4_intro || '')}</textarea>
            </div>
            <div class="note-column case-column">
                <div class="note-col-header"><span class="note-col-title">PEEL Paragraph 1 (Strategy/Influence 1 + Case Evidence)</span></div>
                <textarea class="note-textarea" placeholder="Integrate syllabus theory + McDonald's / Apple / Qantas statistics and evaluate impact..." oninput="updateExamResponse('sec4_peel1', this.value)">${escapeHtml(ex.sec4_peel1 || '')}</textarea>
            </div>
            <div class="note-column case-column">
                <div class="note-col-header"><span class="note-col-title">PEEL Paragraph 2 (Strategy/Influence 2 + Case Evidence)</span></div>
                <textarea class="note-textarea" placeholder="Integrate second syllabus strategy + cross-topic interdependence + real-world statistics..." oninput="updateExamResponse('sec4_peel2', this.value)">${escapeHtml(ex.sec4_peel2 || '')}</textarea>
            </div>
            <div class="note-column">
                <div class="note-col-header"><span class="note-col-title">Evaluative Conclusion</span></div>
                <textarea class="note-textarea" placeholder="Reaffirm thesis judgment and synthesise how the strategies achieve long-term profit maximisation..." oninput="updateExamResponse('sec4_conc', this.value)">${escapeHtml(ex.sec4_conc || '')}</textarea>
            </div>
        </div>
    </div>`;
}

function updateExamResponse(key, val) {
    state.examResponses[key] = val;
    scheduleAutoSave();
}

// =========================================================================
// MICROSOFT WORD (.DOC) & PRINT/PDF EXPORT ENGINE
// =========================================================================
function buildExportHTML(mode = 'all') {
    const isBlank = mode === 'blank';
    const topicKeys = (mode === 'current' && SYLLABUS_DATA.topics[state.currentTopic])
        ? [state.currentTopic]
        : ['operations', 'marketing', 'finance', 'hr'];

    const dateStr = new Date().toLocaleDateString('en-AU', {
        day: 'numeric', month: 'long', year: 'numeric'
    });

    const titleLabel = isBlank
        ? 'HSC Business Studies — Blank Syllabus Revision Worksheet'
        : (mode === 'current' && SYLLABUS_DATA.topics[state.currentTopic]
            ? `HSC Business Studies — ${SYLLABUS_DATA.topics[state.currentTopic].name} Syllabus Notes & Case Portfolio`
            : 'HSC Business Studies — Complete Year 12 Syllabus Notes & Case Study Portfolio');

    let sectionsHtml = '';

    topicKeys.forEach(tKey => {
        const topic = SYLLABUS_DATA.topics[tKey];
        if (!topic) return;

        sectionsHtml += `
        <div class="topic-break">
            <h1 style="color:${topic.accent};border-bottom:3px solid ${topic.accent};padding-bottom:6px;margin-top:24px;">
                ${escapeHtml(topic.code)}: ${escapeHtml(topic.name.toUpperCase())} (${escapeHtml(topic.weight)})
            </h1>
            <p style="font-size:10.5pt;color:#475569;margin-bottom:14px;">${escapeHtml(topic.summary)}</p>
        `;

        topic.sections.forEach(sec => {
            sectionsHtml += `
            <h2 style="background:#0f172a;color:#ffffff;padding:8px 12px;font-size:12.5pt;margin-top:18px;margin-bottom:8px;">
                [${escapeHtml(sec.code)}] ${escapeHtml(sec.title)} — ${escapeHtml(sec.subtitle)}
            </h2>
            <table class="syllabus-table" width="100%" cellspacing="0" cellpadding="8" border="1" style="border-collapse:collapse;width:100%;margin-bottom:16px;font-size:10pt;">
                <thead>
                    <tr style="background:#f1f5f9;color:#0f172a;font-weight:bold;">
                        <th width="26%" align="left">NESA Syllabus Dot Point &amp; Scope</th>
                        <th width="37%" align="left">Part 1: Core Theory &amp; Definitions</th>
                        <th width="37%" align="left">Part 2: Case Study Evidence &amp; Stats</th>
                    </tr>
                </thead>
                <tbody>
            `;

            sec.dotPoints.forEach(dp => {
                const entry = isBlank ? { theory: '', caseStudy: '', status: 'none' } : (state.notes[dp.id] || { theory: '', caseStudy: '', status: 'none' });
                const statusLabel = entry.status === 'mastered' ? 'MASTERED' : (entry.status === 'review' ? 'REVIEWING' : 'NOT STARTED');
                const theoryText = (entry.theory || '').trim()
                    ? formatMultilineForExport(entry.theory)
                    : `<div style="color:#94a3b8;font-style:italic;">Prompt: ${escapeHtml(dp.theoryPrompt)}<br><br><br><br></div>`;
                const caseText = (entry.caseStudy || '').trim()
                    ? formatMultilineForExport(entry.caseStudy)
                    : `<div style="color:#94a3b8;font-style:italic;">Prompt: ${escapeHtml(dp.casePrompt)}<br><br><span style="color:#854d0e;">Exemplar Hint: ${escapeHtml(dp.exemplarChip || '')}</span><br><br></div>`;

                sectionsHtml += `
                <tr>
                    <td valign="top" style="background:#f8fafc;">
                        <div style="font-weight:bold;color:#0f172a;margin-bottom:4px;">${escapeHtml(dp.code)} ${escapeHtml(dp.title)}</div>
                        <div style="font-size:8.5pt;color:#475569;margin-bottom:6px;">
                            ${(dp.subPoints || []).map(sp => `• ${escapeHtml(sp)}`).join('<br>')}
                        </div>
                        <div style="font-size:8pt;color:#1e293b;"><strong>Key Terms:</strong> ${(dp.keyTerms || []).map(escapeHtml).join(', ')}</div>
                        ${!isBlank ? `<div style="margin-top:6px;font-size:8pt;font-weight:bold;color:#059669;">Status: ${statusLabel}</div>` : ''}
                    </td>
                    <td valign="top">${theoryText}</td>
                    <td valign="top" style="background:#fffdf9;">${caseText}</td>
                </tr>`;
            });

            sectionsHtml += `</tbody></table>`;
        });

        sectionsHtml += `</div>`;
    });

    // Include Finance Ratio Table if Finance is included
    if (topicKeys.includes('finance')) {
        const r = state.ratios;
        const currentRatio = r.cl > 0 ? (r.ca / r.cl).toFixed(2) : '0.00';
        const gearingRatio = r.te > 0 ? ((r.tl / r.te) * 100).toFixed(1) : '0.0';
        const gpRatio = r.sales > 0 ? ((r.gp / r.sales) * 100).toFixed(1) : '0.0';
        const npRatio = r.sales > 0 ? ((r.np / r.sales) * 100).toFixed(1) : '0.0';
        const roeRatio = r.te > 0 ? ((r.np / r.te) * 100).toFixed(1) : '0.0';
        const expRatio = r.sales > 0 ? ((r.exp / r.sales) * 100).toFixed(1) : '0.0';

        sectionsHtml += `
        <h2 style="background:#059669;color:#ffffff;padding:8px 12px;font-size:12.5pt;margin-top:18px;margin-bottom:8px;">
            HSC Financial Ratios Summary Sheet &amp; Calculations
        </h2>
        <table width="100%" cellspacing="0" cellpadding="7" border="1" style="border-collapse:collapse;font-size:9.5pt;margin-bottom:18px;">
            <tr style="background:#ecfdf5;font-weight:bold;">
                <th align="left">PLEGS Objective</th>
                <th align="left">Ratio Name</th>
                <th align="left">Official NESA Formula</th>
                <th align="left">Calculated Value / Benchmark</th>
            </tr>
            <tr><td>Liquidity</td><td>Current Ratio</td><td>Current Assets ÷ Current Liabilities</td><td><strong>${currentRatio}:1</strong> (Benchmark ~2:1)</td></tr>
            <tr><td>Solvency (Gearing)</td><td>Debt to Equity Ratio</td><td>Total Liabilities ÷ Total Owner's Equity</td><td><strong>${gearingRatio}%</strong></td></tr>
            <tr><td>Profitability</td><td>Gross Profit Ratio</td><td>Gross Profit ÷ Sales</td><td><strong>${gpRatio}%</strong></td></tr>
            <tr><td>Profitability</td><td>Net Profit Ratio</td><td>Net Profit ÷ Sales</td><td><strong>${npRatio}%</strong></td></tr>
            <tr><td>Profitability</td><td>Return on Owner's Equity (ROE)</td><td>Net Profit ÷ Total Equity</td><td><strong>${roeRatio}%</strong></td></tr>
            <tr><td>Efficiency</td><td>Expense Ratio</td><td>Total Expenses ÷ Sales</td><td><strong>${expRatio}%</strong></td></tr>
            <tr><td>Efficiency</td><td>Accounts Receivable Turnover</td><td>Sales ÷ Accounts Receivable (365 ÷ result)</td><td><strong>${r.ar > 0 ? (r.sales / r.ar).toFixed(1) : '0'}x/yr</strong></td></tr>
        </table>`;
    }

    return `
    <div style="font-family:'Calibri','Segoe UI',Arial,sans-serif;color:#0f172a;line-height:1.45;">
        <div style="border-bottom:4px solid #0f172a;padding-bottom:12px;margin-bottom:16px;">
            <div style="font-size:9pt;font-weight:bold;color:#2563eb;text-transform:uppercase;">NESA Stage 6 HSC Business Studies • Business Learn Studio</div>
            <h1 style="font-size:20pt;margin:4px 0 6px 0;color:#0f172a;">${escapeHtml(titleLabel)}</h1>
            <div style="font-size:10pt;color:#334155;">
                <strong>Student:</strong> ${escapeHtml(isBlank ? '_________________________' : state.studentName)} &nbsp;|&nbsp;
                <strong>Date Exported:</strong> ${escapeHtml(dateStr)} &nbsp;|&nbsp;
                <strong>Gemini Notebook:</strong> <a href="${escapeAttr(SYLLABUS_DATA.notebookUrl)}">${escapeHtml(SYLLABUS_DATA.notebookUrl)}</a>
            </div>
        </div>
        ${sectionsHtml}
    </div>`;
}

function exportToWord(mode = 'all') {
    saveStudentData(true);
    const bodyContent = buildExportHTML(mode);

    const wordDoc = `<html xmlns:o='urn:schemas-microsoft-com:office:office'
        xmlns:w='urn:schemas-microsoft-com:office:word'
        xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
        <meta charset="utf-8">
        <title>HSC Business Studies Notes</title>
        <!--[if gte mso 9]>
        <xml>
            <w:WordDocument>
                <w:View>Print</w:View>
                <w:Zoom>100</w:Zoom>
                <w:DoNotOptimizeForBrowser/>
            </w:WordDocument>
        </xml>
        <![endif]-->
        <style>
            @page {
                size: 29.7cm 21cm;
                margin: 1.5cm 1.5cm 1.5cm 1.5cm;
                mso-page-orientation: landscape;
            }
            body { font-family: 'Calibri', 'Arial', sans-serif; font-size: 10pt; color: #0f172a; }
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid #94a3b8; padding: 7px; vertical-align: top; }
            h1 { page-break-after: avoid; }
            h2 { page-break-after: avoid; }
        </style>
    </head>
    <body>${bodyContent}</body>
    </html>`;

    const blob = new Blob(['\ufeff', wordDoc], { type: 'application/msword;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');

    const safeStudent = state.studentName.replace(/[^a-z0-9]/gi, '_');
    const suffix = mode === 'blank' ? 'Blank_Worksheet' : (mode === 'current' ? state.currentTopic.toUpperCase() : 'Full_HSC_Syllabus');
    a.href = url;
    a.download = `HSC_Business_Studies_${safeStudent}_${suffix}.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showToast('Microsoft Word (.doc) file downloaded!');
}

function exportToPDF(mode = 'all') {
    saveStudentData(true);
    const bodyContent = buildExportHTML(mode);

    const printWin = window.open('', '_blank', 'width=1100,height=850');
    if (!printWin) {
        alert('Please allow pop-ups in your browser to open the Print / Save as PDF window.');
        return;
    }

    printWin.document.write(`<!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>HSC Business Studies Study Guide — ${escapeHtml(state.studentName)}</title>
        <style>
            @media print {
                @page { size: A4 landscape; margin: 12mm; }
                .no-print { display: none !important; }
                .topic-break { page-break-before: always; }
                .topic-break:first-of-type { page-break-before: avoid; }
            }
            body { font-family: 'Segoe UI', Arial, sans-serif; padding: 20px; color: #0f172a; }
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid #cbd5e1; padding: 8px; vertical-align: top; }
        </style>
    </head>
    <body>
        <div class="no-print" style="background:#0f172a;color:#fff;padding:12px 18px;border-radius:8px;margin-bottom:20px;display:flex;justify-content:space-between;align-items:center;">
            <span><strong>🖨️ Print / Save as PDF Ready:</strong> Choose <em>"Save as PDF"</em> in your print destination dialog.</span>
            <button onclick="window.print()" style="background:#2563eb;color:#fff;border:none;padding:8px 16px;border-radius:6px;font-weight:bold;cursor:pointer;">Print / Save PDF Now</button>
        </div>
        ${bodyContent}
    </body>
    </html>`);
    printWin.document.close();
}

// =========================================================================
// JSON BACKUP EXPORT & IMPORT
// =========================================================================
function exportJSONBackup() {
    saveStudentData(true);
    const data = localStorage.getItem(getStorageKey(state.studentName)) || JSON.stringify(state);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Business_Learn_Studio_Backup_${state.studentName.replace(/\s+/g, '_')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('JSON Backup downloaded!');
}

function importJSONBackup(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const parsed = JSON.parse(e.target.result);
            if (parsed.notes) state.notes = parsed.notes;
            if (parsed.ratios) state.ratios = parsed.ratios;
            if (parsed.examResponses) state.examResponses = parsed.examResponses;
            if (parsed.customVideos) state.customVideos = parsed.customVideos;
            if (parsed.studentName) state.studentName = parsed.studentName;
            saveStudentData(false);
            renderCurrentView();
            updateAllProgressIndicators();
            showToast('Backup restored successfully!');
        } catch (err) {
            alert('Invalid JSON backup file.');
        }
    };
    reader.readAsText(file);
}

// =========================================================================
// TEACHER CLOUD SYNC (GOOGLE APPS SCRIPT — GOOGLE SHEETS)
// =========================================================================
async function syncToTeacherCloud(silent = false) {
    saveStudentData(true);
    const btn = document.getElementById('syncCloudBtn');
    if (btn && !silent) btn.textContent = '⏳ Syncing...';

    const overall = getOverallStats();
    const opsStats = getTopicStats('operations');
    const mktStats = getTopicStats('marketing');
    const finStats = getTopicStats('finance');
    const hrStats  = getTopicStats('hr');

    // Build flat key-value payload compatible with Google Apps Script dynamic columns
    const payload = {
        studentName: state.studentName,
        classCode: (CONFIG && CONFIG.CLASS_CODE) ? CONFIG.CLASS_CODE : 'BUSN2026',
        timestamp: new Date().toISOString(),
        bls_overall_pct: `${overall.pct}% (${overall.completed}/${overall.total})`,
        bls_ops_pct: `${opsStats.pct}%`,
        bls_mkt_pct: `${mktStats.pct}%`,
        bls_fin_pct: `${finStats.pct}%`,
        bls_hr_pct: `${hrStats.pct}%`,
        bls_notes_json: JSON.stringify(state.notes),
        bls_exam_json: JSON.stringify(state.examResponses)
    };

    // Also include individual readable columns for every populated dot point
    Object.keys(state.notes).forEach(dpId => {
        const entry = state.notes[dpId];
        if (!entry) return;
        const t = (entry.theory || '').trim();
        const c = (entry.caseStudy || '').trim();
        if (t || c || entry.status !== 'none') {
            payload[`bls_${dpId}`] = `[${(entry.status || 'none').toUpperCase()}] Theory: ${t} | Case: ${c}`;
        }
    });

    try {
        if (CONFIG && CONFIG.SCRIPT_URL) {
            await fetch(CONFIG.SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                body: JSON.stringify(payload)
            });
        }
        const badge = document.getElementById('saveStatusBadge');
        if (badge) {
            const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            badge.textContent = `☁️ Synced ${timeStr}`;
        }
        if (!silent) {
            showToast(`Synced ${state.studentName}'s progress (${overall.pct}%) to Google Sheets!`);
        }
    } catch (e) {
        console.warn('Cloud sync warning:', e);
        if (!silent) showToast('Saved locally (offline mode).');
    } finally {
        if (btn && !silent) btn.textContent = '☁️ Sync to Teacher';
    }
}

// =========================================================================
// PROGRESS & STATS CALCULATIONS
// =========================================================================
function isDotPointCompleted(dpId) {
    const entry = state.notes[dpId];
    if (!entry) return false;
    if (entry.status === 'mastered') return true;
    const hasTheory = (entry.theory || '').trim().length >= 20;
    const hasCase = (entry.caseStudy || '').trim().length >= 15;
    return hasTheory || hasCase;
}

function getTopicStats(topicKey) {
    const topic = SYLLABUS_DATA.topics[topicKey];
    if (!topic) return { completed: 0, total: 0, pct: 0 };
    let total = 0;
    let completed = 0;
    topic.sections.forEach(sec => {
        sec.dotPoints.forEach(dp => {
            total++;
            if (isDotPointCompleted(dp.id)) completed++;
        });
    });
    const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { completed, total, pct };
}

function getOverallStats() {
    let total = 0;
    let completed = 0;
    ['operations', 'marketing', 'finance', 'hr'].forEach(tKey => {
        const s = getTopicStats(tKey);
        total += s.total;
        completed += s.completed;
    });
    const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { completed, total, pct };
}

function updateAllProgressIndicators() {
    ['operations', 'marketing', 'finance', 'hr'].forEach(tKey => {
        const s = getTopicStats(tKey);
        const pill = document.getElementById(`tab-prog-${tKey}`);
        if (pill) pill.textContent = `${s.pct}%`;
    });

    const overall = getOverallStats();
    const pctText = document.getElementById('overallPctText');
    const barFill = document.getElementById('overallBarFill');
    if (pctText) pctText.textContent = `${overall.pct}% (${overall.completed}/${overall.total})`;
    if (barFill) barFill.style.width = `${overall.pct}%`;
}

// =========================================================================
// MODALS (VIDEO, INFOGRAPHIC, STUDENT PROFILE)
// =========================================================================
function openVideoModal(src, title) {
    const backdrop = document.getElementById('videoModalBackdrop');
    const titleEl = document.getElementById('videoModalTitle');
    const container = document.getElementById('videoModalContainer');
    if (!backdrop || !container) return;

    if (titleEl) titleEl.textContent = title || 'Masterclass Video';

    if (src.includes('youtube.com') || src.includes('youtu.be')) {
        let embedUrl = src;
        const ytMatch = src.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
        if (ytMatch) embedUrl = `https://www.youtube.com/embed/${ytMatch[1]}`;
        container.innerHTML = `<iframe src="${escapeAttr(embedUrl)}" class="modal-video-player" style="height:480px;border:none;" allowfullscreen></iframe>`;
    } else if (src.endsWith('.mp4')) {
        container.innerHTML = `
            <video controls autoplay class="modal-video-player">
                <source src="${escapeAttr(src)}" type="video/mp4">
                Your browser does not support HTML5 video.
            </video>`;
    } else {
        container.innerHTML = `
            <div style="padding:2rem;text-align:center;">
                <p style="margin-bottom:1rem;">External multimedia resource:</p>
                <a href="${escapeAttr(src)}" target="_blank" rel="noopener" class="btn-action btn-word">Open Resource in New Tab ↗</a>
            </div>`;
    }

    backdrop.classList.add('open');
}

function closeVideoModal() {
    const backdrop = document.getElementById('videoModalBackdrop');
    const container = document.getElementById('videoModalContainer');
    if (container) container.innerHTML = '';
    if (backdrop) backdrop.classList.remove('open');
}

function openInfographicModal(src, title) {
    const backdrop = document.getElementById('infographicModalBackdrop');
    const titleEl = document.getElementById('infographicModalTitle');
    const imgEl = document.getElementById('infographicModalImg');
    const dlEl = document.getElementById('infographicDownloadLink');
    if (!backdrop || !imgEl) return;

    if (titleEl) titleEl.textContent = title || 'Syllabus Infographic';
    imgEl.src = src;
    if (dlEl) dlEl.href = src;
    backdrop.classList.add('open');
}

function closeInfographicModal() {
    const backdrop = document.getElementById('infographicModalBackdrop');
    if (backdrop) backdrop.classList.remove('open');
}

function populateRosterDropdown() {
    const sel = document.getElementById('rosterSelectInput');
    if (!sel || !CONFIG) return;
    const students = CONFIG.STUDENTS || [];
    sel.innerHTML = `<option value="">-- Choose from Class Roster (19 Students) --</option>` +
        students.map(s => `<option value="${escapeAttr(s.name)}">${escapeHtml(s.name)}${s.homeroom ? ' (' + escapeHtml(s.homeroom) + ')' : ''}</option>`).join('');
}

function openStudentModal(forceGate = false) {
    const backdrop = document.getElementById('studentModalBackdrop');
    const input = document.getElementById('customStudentInput');
    const pwInput = document.getElementById('studentPasswordInput');
    const errBox = document.getElementById('loginErrorBox');
    const closeBtn = document.getElementById('loginCloseBtn');

    if (errBox) errBox.style.display = 'none';
    if (input) input.value = forceGate ? '' : state.studentName;
    if (pwInput) pwInput.value = '';
    if (closeBtn) closeBtn.style.display = forceGate ? 'none' : 'inline-block';
    if (backdrop) backdrop.classList.add('open');
}

function closeStudentModal() {
    const isAuthenticated = sessionStorage.getItem('BLS_AUTH_VERIFIED') === 'true' || localStorage.getItem('BLS_AUTH_VERIFIED') === 'true';
    if (!isAuthenticated) {
        showLoginError('Please log in with your name and password to continue.');
        return;
    }
    const backdrop = document.getElementById('studentModalBackdrop');
    if (backdrop) backdrop.classList.remove('open');
}

function showLoginError(msg) {
    const errBox = document.getElementById('loginErrorBox');
    if (!errBox) {
        alert(msg);
        return;
    }
    errBox.textContent = msg;
    errBox.style.display = 'block';
}

function saveStudentProfile() {
    const input = document.getElementById('customStudentInput');
    const pwInput = document.getElementById('studentPasswordInput');
    const rawName = (input ? input.value : '').trim();
    const rawPw = (pwInput ? pwInput.value : '').trim();

    if (!rawName) {
        showLoginError('Please select or enter your name.');
        return;
    }
    if (!rawPw) {
        showLoginError('Please enter your password (or class code).');
        return;
    }

    let resolvedName = rawName;
    const roster = (CONFIG && CONFIG.STUDENTS) ? CONFIG.STUDENTS : [];
    const inputLower = rawName.toLowerCase();

    // Check if student matches the class roster (prioritizing exact full name, alias, or password match when 2 students share a first name like Samuel)
    const candidates = roster.filter(s => {
        const full = s.name.toLowerCase();
        const first = s.name.split(' ')[0].toLowerCase();
        const aliasHit = Array.isArray(s.aliases) && s.aliases.some(a => a.toLowerCase() === inputLower);
        return full === inputLower || aliasHit || first === inputLower || full.startsWith(inputLower);
    });

    const isClassCode = CONFIG && CONFIG.CLASS_CODE && rawPw.toUpperCase() === CONFIG.CLASS_CODE.toUpperCase();
    const isTeacherPw = CONFIG && CONFIG.TEACHER_PASSWORD && rawPw === CONFIG.TEACHER_PASSWORD;

    const rosterMatch = candidates.find(s => s.password.toLowerCase() === rawPw.toLowerCase()) || candidates[0];

    if (rosterMatch) {
        if (rosterMatch.password.toLowerCase() !== rawPw.toLowerCase() && !isClassCode && !isTeacherPw) {
            showLoginError(`Incorrect password for ${rosterMatch.name}. Please enter your personal password or check with your teacher.`);
            return;
        }
        resolvedName = rosterMatch.name;
    } else if (!isClassCode && !isTeacherPw) {
        showLoginError('Name or password not recognised. Select your name from the dropdown and enter your password (or class code).');
        return;
    }

    sessionStorage.setItem('BLS_AUTH_VERIFIED', 'true');
    localStorage.setItem('BLS_AUTH_VERIFIED', 'true');
    loadStudentData(resolvedName);
    saveStudentData(true);

    const backdrop = document.getElementById('studentModalBackdrop');
    if (backdrop) backdrop.classList.remove('open');

    renderCurrentView();
    updateAllProgressIndicators();
    showToast(`Welcome, ${resolvedName}!`);
}

function logoutStudent() {
    saveStudentData(true);
    sessionStorage.removeItem('BLS_AUTH_VERIFIED');
    localStorage.removeItem('BLS_AUTH_VERIFIED');
    openStudentModal(true);
}

// =========================================================================
// HELPERS
// =========================================================================
function matchesFilters(dp) {
    const entry = state.notes[dp.id] || { theory: '', caseStudy: '', status: 'none' };
    const status = entry.status || 'none';

    if (state.masteryFilter !== 'all' && status !== state.masteryFilter) {
        return false;
    }

    if (state.searchQuery) {
        const haystack = [
            dp.code,
            dp.title,
            ...(dp.subPoints || []),
            ...(dp.keyTerms || []),
            dp.theoryPrompt,
            dp.casePrompt,
            dp.exemplarChip || '',
            entry.theory || '',
            entry.caseStudy || ''
        ].join(' ').toLowerCase();

        if (!haystack.includes(state.searchQuery)) {
            return false;
        }
    }
    return true;
}

function findDotPointById(dpId) {
    for (const tKey of Object.keys(SYLLABUS_DATA.topics)) {
        const topic = SYLLABUS_DATA.topics[tKey];
        for (const sec of topic.sections) {
            for (const dp of sec.dotPoints) {
                if (dp.id === dpId) return dp;
            }
        }
    }
    return null;
}

function countWords(str) {
    const s = (str || '').trim();
    if (!s) return 0;
    return s.split(/\s+/).length;
}

function formatMultilineForExport(str) {
    return escapeHtml(str || '').replace(/\r?\n/g, '<br>');
}

function escapeHtml(str) {
    return String(str ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function escapeAttr(str) {
    return escapeHtml(str);
}

function showToast(msg) {
    const toast = document.getElementById('studioToast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2600);
}
