// Search functionality for blog posts
(function() {
    'use strict';

    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', function() {
        const searchInput = document.querySelector('.search-input');
        
        if (!searchInput) {
            return; // No search input found
        }

        // Get all post cards on the page
        const postCards = document.querySelectorAll('.post-card');
        const postsGrid = document.querySelectorAll('.posts-grid');

        // Function to normalize text for searching
        function normalizeText(text) {
            return text.toLowerCase().trim();
        }

        // Function to check if a post matches the search query
        function postMatchesQuery(postCard, query) {
            const normalizedQuery = normalizeText(query);
            
            // Get post title
            const titleElement = postCard.querySelector('h3 a, h4 a');
            const title = titleElement ? titleElement.textContent || '' : '';
            
            // Get post excerpt/content
            const excerptElement = postCard.querySelector('.post-excerpt, p');
            const excerpt = excerptElement ? excerptElement.textContent || '' : '';
            
            // Get post meta (date, category)
            const metaElement = postCard.querySelector('.post-meta');
            const meta = metaElement ? metaElement.textContent || '' : '';
            
            // Get tags
            const tagElements = postCard.querySelectorAll('.tag');
            const tags = Array.from(tagElements).map(tag => tag.textContent || '').join(' ');
            
            // Combine all searchable text
            const searchableText = `${title} ${excerpt} ${meta} ${tags}`;
            
            // Check if query matches
            return normalizeText(searchableText).includes(normalizedQuery);
        }

        // Function to perform search
        function performSearch(query) {
            const trimmedQuery = query ? query.trim() : '';
            
            // If no query, show all posts
            if (!trimmedQuery) {
                // Show all posts
                postCards.forEach(card => {
                    card.style.display = '';
                });
                
                // Show all section headers
                const sectionHeaders = document.querySelectorAll('.section h2, .section h3');
                sectionHeaders.forEach(header => {
                    header.style.display = '';
                });
                
                // Show all post grids
                postsGrid.forEach(grid => {
                    grid.style.display = '';
                });
                
                // Remove search results container if it exists
                const existingResults = document.getElementById('search-results-container');
                if (existingResults) {
                    existingResults.remove();
                }
                
                return;
            }

            // If we're on a page without posts (like individual post pages), 
            // navigate to posts page with search
            if (postCards.length === 0) {
                // Store search query in sessionStorage and navigate
                sessionStorage.setItem('searchQuery', trimmedQuery);
                window.location.href = '/posts/';
                return;
            }

            // Hide section headers (except the main one)
            const sectionHeaders = document.querySelectorAll('.section h2, .section h3');
            sectionHeaders.forEach(header => {
                if (!header.id || (header.id !== 'recent' && header.id !== 'search-results')) {
                    header.style.display = 'none';
                }
            });

            // Track matches
            let matchCount = 0;

            // Filter posts
            postCards.forEach(card => {
                if (postMatchesQuery(card, trimmedQuery)) {
                    matchCount++;
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });

            // Hide all original post grids
            postsGrid.forEach(grid => {
                if (grid.id !== 'search-results-grid') {
                    grid.style.display = 'none';
                }
            });

            // Create or update search results container
            const mainContent = document.querySelector('.content');
            if (!mainContent) return;

            // Remove existing search results
            const existingResults = document.getElementById('search-results-container');
            if (existingResults) {
                existingResults.remove();
            }

            // Create search results section
            const heroSection = mainContent.querySelector('.hero');
            if (heroSection) {
                const searchResultsContainer = document.createElement('section');
                searchResultsContainer.className = 'section';
                searchResultsContainer.id = 'search-results-container';
                searchResultsContainer.style.marginTop = '20px';
                
                const resultsTitle = document.createElement('h2');
                resultsTitle.id = 'search-results';
                
                const resultsGrid = document.createElement('div');
                resultsGrid.className = 'posts-grid';
                resultsGrid.id = 'search-results-grid';
                
                // Add matching posts to results grid
                postCards.forEach(card => {
                    if (postMatchesQuery(card, trimmedQuery)) {
                        resultsGrid.appendChild(card.cloneNode(true));
                    }
                });
                
                if (matchCount > 0) {
                    resultsTitle.textContent = `Search Results for "${trimmedQuery}" (${matchCount} found)`;
                } else {
                    resultsTitle.textContent = `No results found for "${trimmedQuery}"`;
                    const noResultsMsg = document.createElement('p');
                    noResultsMsg.style.cssText = 'color: #6b7280; padding: 20px;';
                    noResultsMsg.textContent = 'Try different keywords or check your spelling.';
                    resultsGrid.appendChild(noResultsMsg);
                }
                
                searchResultsContainer.appendChild(resultsTitle);
                searchResultsContainer.appendChild(resultsGrid);
                
                // Insert after hero section
                if (heroSection.parentNode) {
                    heroSection.parentNode.insertBefore(searchResultsContainer, heroSection.nextSibling);
                }
            }
        }

        // Initialize search functionality
        function initializeSearch() {
            const currentSearchInput = document.querySelector('.search-input');
            if (!currentSearchInput) return;

            // Check if already initialized
            if (currentSearchInput.hasAttribute('data-search-initialized')) {
                return;
            }

            currentSearchInput.setAttribute('data-search-initialized', 'true');

            // Restore search query from sessionStorage if available
            const savedQuery = sessionStorage.getItem('searchQuery');
            if (savedQuery) {
                currentSearchInput.value = savedQuery;
                performSearch(savedQuery);
                sessionStorage.removeItem('searchQuery');
            }

            // Add event listener for input (debounced)
            let searchTimeout;
            currentSearchInput.addEventListener('input', function(e) {
                const query = e.target.value;
                
                // Clear previous timeout
                clearTimeout(searchTimeout);
                
                // Debounce search for better performance
                searchTimeout = setTimeout(function() {
                    performSearch(query);
                }, 300);
            });

            // Add event listener for Enter key
            currentSearchInput.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    clearTimeout(searchTimeout);
                    performSearch(e.target.value);
                }
            });
        }

        // Initialize tag click handlers
        function initializeTagClicks() {
            const allTags = document.querySelectorAll('.tag');
            
            allTags.forEach(tag => {
                // Make tags look clickable
                tag.style.cursor = 'pointer';
                tag.setAttribute('role', 'button');
                tag.setAttribute('tabindex', '0');
                tag.setAttribute('aria-label', 'Search for ' + tag.textContent);
                
                // Add click handler
                tag.addEventListener('click', function() {
                    const tagText = tag.textContent.trim();
                    handleTagClick(tagText);
                });
                
                // Add keyboard handler for accessibility
                tag.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        const tagText = tag.textContent.trim();
                        handleTagClick(tagText);
                    }
                });
            });
        }
        
        // Handle tag click - search for that tag
        function handleTagClick(tagText) {
            // Get or create search input
            let searchInput = document.querySelector('.search-input');
            
            // If we're on a page without a search input, navigate to posts page
            if (!searchInput) {
                sessionStorage.setItem('searchQuery', tagText);
                window.location.href = '/posts/';
                return;
            }
            
            // Set search input value and trigger search
            searchInput.value = tagText;
            
            // Trigger search immediately
            performSearch(tagText);
            
            // Scroll to search input if it's not visible
            searchInput.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            searchInput.focus();
        }

        // Initialize on page load
        initializeSearch();
        initializeTagClicks();
    });
})();
