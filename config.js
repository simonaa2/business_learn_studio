// =========================================================================
// BUSINESS LEARN STUDIO — CONFIGURATION & COHORT CREDENTIALS
// =========================================================================

const CONFIG = {
    // Google Apps Script Web App URL (same live Google Sheet as Year 12 Business Studies)
    SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbyw9A5ebny_YKLG0YC0IibSMV-lc44hyJh8j1aT8AW9T9rLhaolQCItEOPU-XQZ7I0iXA/exec',

    // Class Access Code (fallback / universal class code)
    CLASS_CODE: 'BUSN2026',

    // Teacher Dashboard Password
    TEACHER_PASSWORD: 'teacher2026',

    // Gemini Notebook Reference Link
    NOTEBOOK_URL: 'https://notebook.google.com/notebook/96479e04-bdd6-457b-9cea-a1b3624e895e',

    // Official Year 12 HSC Business Studies Student Logins (same passwords as before)
    STUDENTS: [
        { name: 'Simon Anderson',  password: 'simon835'   },
        { name: 'Austin Crump',    password: 'austin274'  },
        { name: 'Aidan Tresister', password: 'aidan619'   },
        { name: 'Adam Avdalis',    password: 'adam482'    },
        { name: 'Zach Hull',       password: 'zach903'    },
        { name: 'Lucas Helacas',   password: 'lucas516'   },
        { name: 'Seb Sacilotto',   password: 'seb738'     },
        { name: 'William Rebel',   password: 'william349' }
    ],

    // Convenience array of roster names
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
