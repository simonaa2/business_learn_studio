// =========================================================================
// BUSINESS LEARN STUDIO — CONFIGURATION & COHORT SETTINGS
// =========================================================================

const CONFIG = {
    // Google Apps Script Web App URL for live teacher dashboard & student sync
    SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbyw9A5ebny_YKLG0YC0IibSMV-lc44hyJh8j1aT8AW9T9rLhaolQCItEOPU-XQZ7I0iXA/exec',

    // Class Access Code (optional quick-access mode)
    CLASS_CODE: 'BUSN2026',

    // Teacher Dashboard Password
    TEACHER_PASSWORD: 'teacher2026',

    // Gemini Notebook Reference Link
    NOTEBOOK_URL: 'https://notebook.google.com/notebook/96479e04-bdd6-457b-9cea-a1b3624e895e',

    // Official Year 12 HSC Business Studies Roster (students can also type a custom name)
    ALLOWED_STUDENTS: [
        'Simon Anderson',
        'Austin Crump',
        'Aidan Tresister',
        'Adam Avdalis',
        'Zach Hull',
        'Lucas Helacas',
        'Seb Sacilotto',
        'William Rebel'
    ],

    // Pre-Built Case Study Exemplars for Quick-Insert Chips
    CASE_STUDY_PRESETS: {
        mcdonalds: {
            name: "McDonald's Corporation",
            tag: "Global Fast Food / QSR",
            color: "#d97706"
        },
        apple: {
            name: "Apple Inc.",
            tag: "Consumer Technology",
            color: "#2563eb"
        },
        qantas: {
            name: "Qantas Airways",
            tag: "Aviation & Services",
            color: "#dc2626"
        }
    }
};
