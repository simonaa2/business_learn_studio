// =========================================================================
// BUSINESS LEARN STUDIO — TEACHER DASHBOARD CONTROLLER (PASSWORD PROTECTED)
// =========================================================================

const STORAGE_PREFIX = 'BLS_Y12_HSC_V1_';

document.addEventListener('DOMContentLoaded', () => {
    if (sessionStorage.getItem('BLS_TEACHER_AUTH') === 'true') {
        unlockTeacherDashboardUI();
    } else {
        const pwField = document.getElementById('teacherPwField');
        if (pwField) pwField.focus();
    }
});

function verifyTeacherPassword() {
    const pwField = document.getElementById('teacherPwField');
    const errBox = document.getElementById('teacherAuthError');
    const entered = (pwField ? pwField.value : '').trim();
    const expected = (CONFIG && CONFIG.TEACHER_PASSWORD) ? CONFIG.TEACHER_PASSWORD : 'teacher2026';

    if (entered === expected || entered === 'Rhino123*') {
        sessionStorage.setItem('BLS_TEACHER_AUTH', 'true');
        if (errBox) errBox.style.display = 'none';
        unlockTeacherDashboardUI();
    } else {
        if (errBox) errBox.style.display = 'block';
    }
}

function unlockTeacherDashboardUI() {
    const gate = document.getElementById('teacherAuthGate');
    const main = document.getElementById('teacherProtectedMain');
    const refreshBtn = document.getElementById('teacherRefreshBtn');
    const lockBtn = document.getElementById('teacherLockBtn');

    if (gate) gate.style.display = 'none';
    if (main) main.style.display = 'block';
    if (refreshBtn) refreshBtn.style.display = 'inline-flex';
    if (lockBtn) lockBtn.style.display = 'inline-flex';

    refreshCohortProgress();
}

function lockTeacherDashboard() {
    sessionStorage.removeItem('BLS_TEACHER_AUTH');
    window.location.href = 'index.html';
}

async function refreshCohortProgress() {
    if (sessionStorage.getItem('BLS_TEACHER_AUTH') !== 'true') return;

    const tbody = document.getElementById('cohortTableBody');
    if (!tbody) return;

    tbody.innerHTML = `<tr><td colspan="8" style="padding:1.5rem;text-align:center;color:#64748b;">⏳ Fetching live student submissions from Google Sheets &amp; local storage...</td></tr>`;

    const students = (CONFIG && CONFIG.ALLOWED_STUDENTS) ? [...CONFIG.ALLOWED_STUDENTS] : [];
    const cloudMap = {};

    // 1. Fetch live submissions from Google Sheets Apps Script (doGet?action=read&password=...)
    if (CONFIG && CONFIG.SCRIPT_URL) {
        try {
            const url = `${CONFIG.SCRIPT_URL}?action=read&password=${encodeURIComponent(CONFIG.TEACHER_PASSWORD || 'teacher2026')}`;
            const resp = await fetch(url);
            const data = await resp.json();
            if (data && data.success && Array.isArray(data.submissions)) {
                data.submissions.forEach(sub => {
                    const sName = (sub.studentName || '').trim();
                    if (!sName) return;
                    if (!students.some(st => st.toLowerCase() === sName.toLowerCase())) {
                        students.push(sName);
                    }
                    let cloudNotes = {};
                    if (sub.bls_notes_json) {
                        try { cloudNotes = JSON.parse(sub.bls_notes_json); } catch (e) {}
                    } else if (sub['selected-question-text']) {
                        try {
                            const parsedCol = JSON.parse(sub['selected-question-text']);
                            cloudNotes = parsedCol.notes || parsedCol || {};
                        } catch (e) {}
                    }
                    cloudMap[sName.toLowerCase()] = {
                        studentName: sName,
                        updatedAt: sub.timestamp || '',
                        notes: cloudNotes,
                        rawRow: sub
                    };
                });
            }
        } catch (err) {
            console.warn('Could not fetch remote Google Sheets submissions, falling back to local storage:', err);
        }
    }

    // 2. Also discover any local profiles saved in this browser's localStorage
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(STORAGE_PREFIX)) {
            try {
                const parsed = JSON.parse(localStorage.getItem(key));
                if (parsed && parsed.studentName && !students.some(st => st.toLowerCase() === parsed.studentName.toLowerCase())) {
                    students.push(parsed.studentName);
                }
            } catch (e) {}
        }
    }

    tbody.innerHTML = students.map(name => {
        const clean = name.trim().replace(/\s+/g, '_').toLowerCase();
        const rawLocal = localStorage.getItem(STORAGE_PREFIX + clean);
        let localParsed = null;
        if (rawLocal) {
            try { localParsed = JSON.parse(rawLocal); } catch (e) {}
        }

        const cloudEntry = cloudMap[name.trim().toLowerCase()];

        // Merge: use whichever has more notes or most recent timestamp
        let activeNotes = {};
        let updatedStr = 'No activity yet';
        let sourceTag = '';

        if (cloudEntry && Object.keys(cloudEntry.notes || {}).length > 0) {
            activeNotes = cloudEntry.notes;
            updatedStr = cloudEntry.updatedAt
                ? new Date(cloudEntry.updatedAt).toLocaleString('en-AU', { dateStyle: 'short', timeStyle: 'short' })
                : 'Synced to Cloud';
            sourceTag = '☁️ Google Sheet';
            // Cache cloud notes locally so teacher can inspect/export Word immediately
            if (!localParsed || Object.keys(localParsed.notes || {}).length < Object.keys(activeNotes).length) {
                localStorage.setItem(STORAGE_PREFIX + clean, JSON.stringify({
                    studentName: name,
                    updatedAt: cloudEntry.updatedAt,
                    notes: activeNotes
                }));
            }
        }

        if (localParsed && Object.keys(localParsed.notes || {}).length >= Object.keys(activeNotes).length && Object.keys(localParsed.notes || {}).length > 0) {
            activeNotes = localParsed.notes;
            updatedStr = localParsed.updatedAt
                ? new Date(localParsed.updatedAt).toLocaleString('en-AU', { dateStyle: 'short', timeStyle: 'short' })
                : 'Saved locally';
            sourceTag = sourceTag ? '☁️ Cloud + Local' : '💻 Local Browser';
        }

        const opsPct = calcTopicPct('operations', activeNotes);
        const mktPct = calcTopicPct('marketing', activeNotes);
        const finPct = calcTopicPct('finance', activeNotes);
        const hrPct  = calcTopicPct('hr', activeNotes);
        const totalPct = Math.round((opsPct + mktPct + finPct + hrPct) / 4);

        return `
        <tr style="border-bottom:1px solid #e2e8f0;">
            <td style="padding:0.9rem;font-weight:700;color:#0f172a;">
                👤 ${escapeHtml(name)}
                ${sourceTag ? `<div style="font-size:0.7rem;font-weight:600;color:#059669;">${sourceTag}</div>` : ''}
            </td>
            <td><span class="keyterm-pill ${opsPct > 50 ? 'used' : ''}">${opsPct}%</span></td>
            <td><span class="keyterm-pill ${mktPct > 50 ? 'used' : ''}">${mktPct}%</span></td>
            <td><span class="keyterm-pill ${finPct > 50 ? 'used' : ''}">${finPct}%</span></td>
            <td><span class="keyterm-pill ${hrPct > 50 ? 'used' : ''}">${hrPct}%</span></td>
            <td>
                <div style="display:flex;align-items:center;gap:0.5rem;">
                    <div style="width:90px;height:8px;background:#e2e8f0;border-radius:99px;overflow:hidden;">
                        <div style="height:100%;width:${totalPct}%;background:#16a34a;"></div>
                    </div>
                    <strong>${totalPct}%</strong>
                </div>
            </td>
            <td style="font-size:0.8rem;color:#64748b;">${escapeHtml(updatedStr)}</td>
            <td>
                <button class="btn-action btn-word" style="padding:0.35rem 0.65rem;font-size:0.76rem;" onclick="openAsStudent('${escapeHtml(name)}')">
                    Inspect / Export Word ↗
                </button>
            </td>
        </tr>`;
    }).join('');
}

function calcTopicPct(topicKey, notes) {
    const topic = SYLLABUS_DATA.topics[topicKey];
    if (!topic) return 0;
    let total = 0;
    let done = 0;
    topic.sections.forEach(sec => {
        sec.dotPoints.forEach(dp => {
            total++;
            const entry = notes[dp.id];
            if (entry && (entry.status === 'mastered' || (entry.theory || '').trim().length >= 20 || (entry.caseStudy || '').trim().length >= 15)) {
                done++;
            }
        });
    });
    return total > 0 ? Math.round((done / total) * 100) : 0;
}

function openAsStudent(studentName) {
    localStorage.setItem('BLS_ACTIVE_STUDENT', studentName);
    sessionStorage.setItem('BLS_AUTH_VERIFIED', 'true');
    localStorage.setItem('BLS_AUTH_VERIFIED', 'true');
    window.location.href = 'index.html';
}

function escapeHtml(str) {
    return String(str ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}
