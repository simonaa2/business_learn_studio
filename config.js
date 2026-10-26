// =========================================================================
// BUSINESS LEARN STUDIO — CONFIGURATION & COHORT CREDENTIALS
// =========================================================================

const CONFIG = {
    // Google Apps Script Web App URL for live teacher dashboard & student sync
    SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbyw9A5ebny_YKLG0YC0IibSMV-lc44hyJh8j1aT8AW9T9rLhaolQCItEOPU-XQZ7I0iXA/exec',

    // Class Access Code (fallback / universal class code)
    CLASS_CODE: 'BUSN2026',

    // Teacher Dashboard Password
    TEACHER_PASSWORD: 'teacher2026',

    // Gemini Notebook Reference Link
    NOTEBOOK_URL: 'https://notebook.google.com/notebook/96479e04-bdd6-457b-9cea-a1b3624e895e',

    // Official HSC Business Studies Class Roster (19 Students)
    STUDENTS: [
        { name: 'Fynn Beaumont',     aliases: ['fynn'],                      homeroom: '11HRC1',   password: 'fynn101'     },
        { name: 'Jude Burns',        aliases: ['jude'],                      homeroom: '11HRC2',   password: 'jude202'     },
        { name: 'Dane Cuddihy',      aliases: ['dane'],                      homeroom: '11HRC1',   password: 'dane303'     },
        { name: 'Aidan Dunn',        aliases: ['aidan'],                     homeroom: '11HRC1',   password: 'aidan404'    },
        { name: 'Andersen Evins',    aliases: ['andersen'],                  homeroom: '11HRC2',   password: 'andersen505' },
        { name: 'Liam Grooms',       aliases: ['liam'],                      homeroom: '11HRC2',   password: 'liam606'     },
        { name: 'Ryan Hollyman',     aliases: ['ryan'],                      homeroom: '11HRC2',   password: 'ryan707'     },
        { name: 'Samuel Hughes',     aliases: ['samuel hughes', 'sam hughes'], homeroom: '11HRC1', password: 'samuel808'   },
        { name: 'Jake Ianni',        aliases: ['jake'],                      homeroom: '11HRC2',   password: 'jake909'     },
        { name: 'Agnel Jobin',       aliases: ['agnel'],                     homeroom: '11HRC1',   password: 'agnel110'    },
        { name: 'Maksim Kuzmanovic', aliases: ['maksim', 'maks'],            homeroom: '11HRC1',   password: 'maksim211'   },
        { name: 'Zac McGrath',       aliases: ['zac mcgrath', 'zacariah mcgrath', 'zacariah', 'zac'], homeroom: '11HRC2', password: 'zac312' },
        { name: 'Caleb McKell',      aliases: ['caleb'],                     homeroom: '11HRC1',   password: 'caleb413'    },
        { name: 'James Power',       aliases: ['james'],                     homeroom: '11HRC1',   password: 'james514'    },
        { name: 'Noah Scully',       aliases: ['noah'],                      homeroom: '11HRC2',   password: 'noah615'     },
        { name: 'Zak Smith',         aliases: ['zak smith', 'zak'],          homeroom: '11HRC2',   password: 'zak716'      },
        { name: 'Hamish Stanton',    aliases: ['hamish'],                    homeroom: '11HRC2',   password: 'hamish817'   },
        { name: 'Maddison Vilivili', aliases: ['maddison', 'maddie'],        homeroom: 'XSBOLM11', password: 'maddison918' },
        { name: 'Samuel Zarb',       aliases: ['samuel zarb', 'sam zarb'],   homeroom: '11HRC2',   password: 'sam119'      }
    ],

    // Convenience array of roster names
    ALLOWED_STUDENTS: [
        'Fynn Beaumont',
        'Jude Burns',
        'Dane Cuddihy',
        'Aidan Dunn',
        'Andersen Evins',
        'Liam Grooms',
        'Ryan Hollyman',
        'Samuel Hughes',
        'Jake Ianni',
        'Agnel Jobin',
        'Maksim Kuzmanovic',
        'Zac McGrath',
        'Caleb McKell',
        'James Power',
        'Noah Scully',
        'Zak Smith',
        'Hamish Stanton',
        'Maddison Vilivili',
        'Samuel Zarb'
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
