/**
 * Dark Mode Toggle Manager
 * Similar to staffphotoboard.paneone.net - floating button with popup menu
 */
(function() {
  'use strict';

  class DarkModeManager {
    constructor() {
      this.theme = this.getStoredTheme() || 'auto';
      this.init();
    }

    /**
     * Initialize the dark mode manager
     */
    init() {
      this.applyTheme();
      this.createToggleButton();
      this.bindEvents();
    }

    /**
     * Get system theme preference
     */
    getSystemTheme() {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    /**
     * Get stored theme from localStorage
     */
    getStoredTheme() {
      return localStorage.getItem('theme-preference');
    }

    /**
     * Store theme in localStorage
     */
    setStoredTheme(theme) {
      localStorage.setItem('theme-preference', theme);
    }

    /**
     * Apply theme to document
     */
    applyTheme() {
      const shouldBeDark = this.theme === 'dark' || (this.theme === 'auto' && this.getSystemTheme() === 'dark');

      if (shouldBeDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
      }
      this.setStoredTheme(this.theme);
      this.updateToggleButton();
    }

    /**
     * Set theme programmatically
     */
    setTheme(theme) {
      if (theme === 'light' || theme === 'dark' || theme === 'auto') {
        this.theme = theme;
        this.applyTheme();
      }
    }

    /**
     * Toggle between light, dark, and auto themes
     */
    toggleTheme() {
      if (this.theme === 'light') {
        this.theme = 'dark';
      } else if (this.theme === 'dark') {
        this.theme = 'auto';
      } else {
        this.theme = 'light';
      }
      this.applyTheme();
    }

    /**
     * Get SVG icon for theme
     */
    getIcon(theme) {
      if (theme === 'dark') {
        return '<svg class="theme-icon-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
      } else if (theme === 'light') {
        return '<svg class="theme-icon-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>';
      } else { // auto
        return '<svg class="theme-icon-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"></circle><path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"></path></svg>';
      }
    }

    /**
     * Create floating toggle button with popup
     */
    createToggleButton() {
      // Remove existing toggle if it exists
      const existingToggle = document.getElementById('dark-mode-toggle');
      if (existingToggle) {
        existingToggle.remove();
      }

      // Create toggle container
      const toggleContainer = document.createElement('div');
      toggleContainer.id = 'dark-mode-toggle';
      toggleContainer.className = 'dark-mode-toggle-container';

      // Create toggle button
      const toggleButton = document.createElement('button');
      toggleButton.id = 'theme-toggle-button';
      toggleButton.className = 'dark-mode-toggle-button';
      toggleButton.setAttribute('aria-label', 'Theme settings');
      toggleButton.setAttribute('title', 'Theme settings');

      // Create icon
      const icon = document.createElement('span');
      icon.id = 'theme-icon';
      icon.className = 'dark-mode-icon';
      icon.innerHTML = this.getIcon(this.theme);

      toggleButton.appendChild(icon);
      toggleContainer.appendChild(toggleButton);

      // Create popup menu
      const popup = document.createElement('div');
      popup.id = 'theme-popup';
      popup.className = 'dark-mode-popup';

      // Create theme options
      const themes = [
        { value: 'light', label: 'Light', icon: this.getIcon('light') },
        { value: 'dark', label: 'Dark', icon: this.getIcon('dark') },
        { value: 'auto', label: 'Auto', icon: this.getIcon('auto') }
      ];

      themes.forEach(theme => {
        const option = document.createElement('button');
        option.className = `theme-option ${this.theme === theme.value ? 'theme-option-active' : ''}`;
        option.setAttribute('data-theme', theme.value);
        option.setAttribute('aria-label', `Set theme to ${theme.label}`);

        option.innerHTML = `
          <span class="theme-option-icon">${theme.icon}</span>
          <span class="theme-option-label">${theme.label}</span>
        `;

        popup.appendChild(option);
      });

      toggleContainer.appendChild(popup);

      // Add to body
      document.body.appendChild(toggleContainer);
    }

    /**
     * Update toggle button appearance
     */
    updateToggleButton() {
      const icon = document.getElementById('theme-icon');
      if (icon) {
        icon.innerHTML = this.getIcon(this.theme);
      }

      // Update popup options highlighting
      const options = document.querySelectorAll('.theme-option');
      options.forEach(option => {
        const theme = option.getAttribute('data-theme');
        if (theme === this.theme) {
          option.classList.add('theme-option-active');
        } else {
          option.classList.remove('theme-option-active');
        }
      });
    }

    /**
     * Show popup menu
     */
    showPopup() {
      const popup = document.getElementById('theme-popup');
      if (popup) {
        popup.classList.add('dark-mode-popup-visible');
      }
    }

    /**
     * Hide popup menu
     */
    hidePopup() {
      const popup = document.getElementById('theme-popup');
      if (popup) {
        popup.classList.remove('dark-mode-popup-visible');
      }
    }

    /**
     * Bind event listeners
     */
    bindEvents() {
      // Toggle button click - show/hide popup
      document.addEventListener('click', (e) => {
        if (e.target && e.target instanceof Element) {
          if (e.target.closest('#theme-toggle-button')) {
            e.preventDefault();
            e.stopPropagation();
            const popup = document.getElementById('theme-popup');
            if (popup && !popup.classList.contains('dark-mode-popup-visible')) {
              this.showPopup();
            } else {
              this.hidePopup();
            }
          } else if (e.target.closest('.theme-option')) {
            e.preventDefault();
            e.stopPropagation();
            const themeElement = e.target.closest('.theme-option');
            const theme = themeElement?.getAttribute('data-theme');
            if (theme) {
              this.setTheme(theme);
            }
            this.hidePopup();
          } else {
            // Click outside - hide popup
            this.hidePopup();
          }
        }
      });

      // Listen for system theme changes
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', () => {
        if (this.theme === 'auto') {
          this.applyTheme();
        }
      });

      // Keyboard shortcut (Ctrl/Cmd + Shift + D)
      document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'D') {
          e.preventDefault();
          this.toggleTheme();
        }
      });
    }

    /**
     * Get current theme
     */
    getCurrentTheme() {
      return this.theme;
    }
  }

  // Initialize dark mode when DOM is ready
  function initializeDarkMode() {
    // Prevent multiple initializations
    if (window.darkMode) {
      return;
    }

    setTimeout(() => {
      window.darkMode = new DarkModeManager();
    }, 100);
  }

  // Check if DOM is already loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeDarkMode);
  } else {
    initializeDarkMode();
  }
})();

