// =========================================================================
// BUSINESS LEARN STUDIO — TEACHER DASHBOARD CONTROLLER
// =========================================================================

const STORAGE_PREFIX = 'BLS_Y12_HSC_V1_';

document.addEventListener('DOMContentLoaded', () => {
    refreshCohortProgress();
});

async function refreshCohortProgress() {
    const tbody = document.getElementById('cohortTableBody');
    if (!tbody) return;

    const students = (CONFIG && CONFIG.ALLOWED_STUDENTS) ? [...CONFIG.ALLOWED_STUDENTS] : [];

    // Discover any additional local profiles saved in localStorage
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(STORAGE_PREFIX)) {
            try {
                const parsed = JSON.parse(localStorage.getItem(key));
                if (parsed && parsed.studentName && !students.includes(parsed.studentName)) {
                    students.push(parsed.studentName);
                }
            } catch (e) {}
        }
    }

    tbody.innerHTML = students.map(name => {
        const clean = name.trim().replace(/\s+/g, '_').toLowerCase();
        const raw = localStorage.getItem(STORAGE_PREFIX + clean);
        let parsed = null;
        if (raw) {
            try { parsed = JSON.parse(raw); } catch (e) {}
        }

        const notes = (parsed && parsed.notes) ? parsed.notes : {};
        const opsPct = calcTopicPct('operations', notes);
        const mktPct = calcTopicPct('marketing', notes);
        const finPct = calcTopicPct('finance', notes);
        const hrPct = calcTopicPct('hr', notes);
        const totalPct = Math.round((opsPct + mktPct + finPct + hrPct) / 4);
        const updatedStr = parsed && parsed.updatedAt
            ? new Date(parsed.updatedAt).toLocaleString('en-AU', { dateStyle: 'short', timeStyle: 'short' })
            : 'No local activity yet';

        return `
        <tr style="border-bottom:1px solid #e2e8f0;">
            <td style="padding:0.9rem;font-weight:700;color:#0f172a;">👤 ${escapeHtml(name)}</td>
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
                    Open / Export Word ↗
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
