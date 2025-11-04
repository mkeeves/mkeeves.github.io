"use strict";
// Ultra-Modern Dark Mode Toggle
(function () {
    'use strict';
    // Theme configuration
    const THEME_KEY = 'theme-preference';
    const THEMES = {
        LIGHT: 'light',
        DARK: 'dark',
        AUTO: 'auto'
    };
    // Get current theme preference
    function getThemePreference() {
        const saved = localStorage.getItem(THEME_KEY);
        return saved || THEMES.AUTO;
    }
    // Set theme preference
    function setThemePreference(theme) {
        localStorage.setItem(THEME_KEY, theme);
    }
    // Apply theme with smooth transition
    function applyTheme(theme) {
        const root = document.documentElement;
        // Add transition class for smooth theme switching
        root.classList.add('theme-transition');
        if (theme === THEMES.AUTO) {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            root.setAttribute('data-theme', prefersDark ? THEMES.DARK : THEMES.LIGHT);
        }
        else {
            root.setAttribute('data-theme', theme);
        }
        // Remove transition class after animation
        setTimeout(() => {
            root.classList.remove('theme-transition');
        }, 300);
    }
    // Global function for manual theme toggle
    window.toggleTheme = function () {
        const currentTheme = getThemePreference();
        let newTheme;
        if (currentTheme === THEMES.LIGHT) {
            newTheme = THEMES.DARK;
        }
        else if (currentTheme === THEMES.DARK) {
            newTheme = THEMES.AUTO;
        }
        else {
            newTheme = THEMES.LIGHT;
        }
        setThemePreference(newTheme);
        applyTheme(newTheme);
        updateToggleButton(newTheme);
    };
    // Update toggle button appearance
    function updateToggleButton(theme) {
        const toggles = document.querySelectorAll('.theme-toggle');
        toggles.forEach(toggle => {
            const icon = toggle.querySelector('.theme-icon');
            const text = toggle.querySelector('.theme-text');
            if (icon && text) {
                switch (theme) {
                    case THEMES.LIGHT:
                        icon.textContent = '☀️';
                        text.textContent = 'Light';
                        break;
                    case THEMES.DARK:
                        icon.textContent = '🌙';
                        text.textContent = 'Dark';
                        break;
                    case THEMES.AUTO:
                        icon.textContent = '🔄';
                        text.textContent = 'Auto';
                        break;
                }
            }
        });
    }
    // Initialize theme
    function initTheme() {
        const currentTheme = getThemePreference();
        applyTheme(currentTheme);
        updateToggleButton(currentTheme);
        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (getThemePreference() === THEMES.AUTO) {
                applyTheme(THEMES.AUTO);
            }
        });
    }
    // Initialize everything when DOM is ready
    document.addEventListener('DOMContentLoaded', function () {
        initTheme();
    });
})();
