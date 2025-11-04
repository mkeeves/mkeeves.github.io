// Ultra-Modern Dark Mode Toggle
(function() {
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
    } else {
      root.setAttribute('data-theme', theme);
    }
    
    // Remove transition class after animation
    setTimeout(() => {
      root.classList.remove('theme-transition');
    }, 300);
  }

  // Initialize theme
  function initTheme() {
    const currentTheme = getThemePreference();
    applyTheme(currentTheme);
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (getThemePreference() === THEMES.AUTO) {
        applyTheme(THEMES.AUTO);
      }
    });
  }

  // Create theme toggle button
  function createThemeToggle() {
    const toggle = document.createElement('button');
    toggle.className = 'theme-toggle';
    toggle.setAttribute('aria-label', 'Toggle theme');
    toggle.innerHTML = `
      <span class="theme-icon">🌙</span>
      <span class="theme-text">Dark</span>
    `;
    
    toggle.addEventListener('click', () => {
      const currentTheme = getThemePreference();
      let newTheme;
      
      if (currentTheme === THEMES.LIGHT) {
        newTheme = THEMES.DARK;
      } else if (currentTheme === THEMES.DARK) {
        newTheme = THEMES.AUTO;
      } else {
        newTheme = THEMES.LIGHT;
      }
      
      setThemePreference(newTheme);
      applyTheme(newTheme);
      updateToggleButton(newTheme);
    });
    
    return toggle;
  }

  // Update toggle button appearance
  function updateToggleButton(theme) {
    const toggle = document.querySelector('.theme-toggle');
    if (!toggle) return;
    
    const icon = toggle.querySelector('.theme-icon');
    const text = toggle.querySelector('.theme-text');
    
    switch (theme) {
      case THEMES.LIGHT:
        if (icon) icon.textContent = '☀️';
        if (text) text.textContent = 'Light';
        break;
      case THEMES.DARK:
        if (icon) icon.textContent = '🌙';
        if (text) text.textContent = 'Dark';
        break;
      case THEMES.AUTO:
        if (icon) icon.textContent = '🔄';
        if (text) text.textContent = 'Auto';
        break;
    }
  }

  // Add smooth transitions
  function addSmoothTransitions() {
    const style = document.createElement('style');
    style.textContent = `
      * {
        transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
      }
      
      .theme-toggle {
        background: var(--bg-secondary);
        border: 1px solid var(--border-color);
        border-radius: 50px;
        padding: 0.5rem 1rem;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.875rem;
        font-weight: 500;
        color: var(--text-primary);
      }
      
      .theme-toggle:hover {
        background: var(--primary-color);
        color: white;
        transform: scale(1.05);
      }
      
      .theme-icon {
        font-size: 1rem;
      }
      
      .theme-text {
        font-weight: 600;
      }
    `;
    document.head.appendChild(style);
  }

  // Global function for manual theme toggle
  window.toggleTheme = function() {
    const currentTheme = getThemePreference();
    let newTheme;
    
    if (currentTheme === THEMES.LIGHT) {
      newTheme = THEMES.DARK;
    } else if (currentTheme === THEMES.DARK) {
      newTheme = THEMES.AUTO;
    } else {
      newTheme = THEMES.LIGHT;
    }
    
    setThemePreference(newTheme);
    applyTheme(newTheme);
    updateToggleButton(newTheme);
  };

  // Initialize everything when DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    addSmoothTransitions();
    
    // Update any existing toggle buttons
    updateToggleButton(getThemePreference());
  });

})();
