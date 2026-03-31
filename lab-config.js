// Toggle Lab Mode
export const LAB = String(process.env.LAB_MODE ?? '').toLowerCase().trim();

export const LAB_CONFIG = {
    default: {
        title: 'LLM Connection Test',
        hero: {
            tagline: 'LLM Connection Test',
            subtitle: 'Click the button below to test LiteLLM proxy connectivity',
            homeLink: '/'
        },
        sidebar: []
    },
    ws: {
        title: 'LLM Connection Test',
        hero: {
            tagline: 'LLM Connection Test',
            subtitle: 'Click the button below to test LiteLLM proxy connectivity',
            homeLink: '/'
        },
        sidebar: []
    }
};

export const config = LAB_CONFIG[LAB] || LAB_CONFIG.default;