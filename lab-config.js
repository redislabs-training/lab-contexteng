// Toggle Lab Mode
export const LAB = String(process.env.LAB_MODE ?? '').toLowerCase().trim();

export const LAB_CONFIG = {
    default: {
        title: 'Context Engineering with Redis & LangChain',
        hero: {
            tagline: 'Context Engineering with Redis & LangChain',
            subtitle: 'Engineer every layer of context as you evolve a course advisor agent from baseline RAG to a full agent',
            homeLink: '/intro/welcome/'
        },
        sidebar: [
            {
                label: 'Introduction',
                items: [
                    'intro/welcome',
                    'intro/getting-started',
                ]
            },
            {
                label: 'Wrap up',
                items: [
                    'wrap-up/finish-lab'
                ]
            }
        ]
    },
    workshop: {
        title: 'Redis Workshop: Context Engineering with Redis & LangChain',
        hero: {
            tagline: 'Context Engineering with Redis & LangChain',
            subtitle: 'Engineer every layer of context as you evolve a course advisor agent from baseline RAG to a full agent',
            homeLink: '/intro-vs/welcome/'
        },
        sidebar: [
            {
                label: 'Introduction',
                items: [
                    'intro-ws/welcome',
                    'intro-ws/getting-started',
                ]
            },
            {
                label: 'Wrap up',
                items: [
                    'wrap-up-ws/finish-lab'
                ]
            }
        ]
    }
};

export const config = LAB_CONFIG[LAB] || LAB_CONFIG.default;