---
layout: single
title: "All Posts"
permalink: /posts/
author_profile: true
---

<style>
/* Import the same styles as index.html */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    line-height: 1.6;
    color: #1f2937;
    background: #f9fafb;
    transition: all 0.3s ease;
}

[data-theme="dark"] body {
    background: #111827;
    color: #f9fafb;
}

.container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 20px;
}

/* Header */
.header {
    background: #ffffff;
    border-bottom: 1px solid #e5e7eb;
    padding: 15px 0;
    position: sticky;
    top: 0;
    z-index: 100;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

[data-theme="dark"] .header {
    background: #1f2937;
    border-bottom-color: #374151;
}

.header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    font-size: 1.5rem;
    font-weight: 800;
    color: #1f2937;
    text-decoration: none;
}

[data-theme="dark"] .logo {
    color: #f9fafb;
}

.nav {
    display: flex;
    gap: 25px;
}

.nav a {
    color: #6b7280;
    text-decoration: none;
    font-weight: 500;
    padding: 8px 12px;
    border-radius: 6px;
    transition: all 0.2s ease;
}

.nav a:hover {
    background: #f3f4f6;
    color: #1f2937;
}

[data-theme="dark"] .nav a {
    color: #9ca3af;
}

[data-theme="dark"] .nav a:hover {
    background: #374151;
    color: #f9fafb;
}

/* Main Layout */
.main-layout {
    display: grid;
    grid-template-columns: 1fr 300px;
    gap: 40px;
    padding: 40px 0;
}

@media (max-width: 1024px) {
    .main-layout {
        grid-template-columns: 1fr;
        gap: 30px;
    }
}

/* Content Area */
.content {
    min-height: 600px;
}

/* Hero Section */
.hero {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 60px 0;
    text-align: center;
    border-radius: 16px;
    margin-bottom: 50px;
}

[data-theme="dark"] .hero {
    background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
}

.hero h1 {
    font-size: 2.5rem;
    font-weight: 800;
    margin-bottom: 15px;
}

.hero p {
    font-size: 1.1rem;
    max-width: 600px;
    margin: 0 auto;
    opacity: 0.9;
}

/* Content Sections */
.section {
    margin-bottom: 50px;
}

.section h2 {
    font-size: 2rem;
    margin-bottom: 25px;
    color: #1f2937;
    position: relative;
    padding-bottom: 10px;
}

.section h2:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50px;
    height: 3px;
    background: #667eea;
    border-radius: 2px;
}

[data-theme="dark"] .section h2 {
    color: #f9fafb;
}

/* Post Grid */
.posts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 25px;
}

.post-card {
    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    padding: 25px;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
}

.post-card:hover {
    border-color: #667eea;
    transform: translateY(-4px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

[data-theme="dark"] .post-card {
    background: #1f2937;
    border-color: #374151;
}

[data-theme="dark"] .post-card:hover {
    border-color: #4f46e5;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
}

.post-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #667eea, #764ba2);
}

.post-card h3 {
    font-size: 1.2rem;
    margin-bottom: 10px;
    margin-top: 10px;
}

.post-card h3 a {
    color: #1f2937;
    text-decoration: none;
}

.post-card h3 a:hover {
    color: #667eea;
}

[data-theme="dark"] .post-card h3 a {
    color: #f9fafb;
}

[data-theme="dark"] .post-card h3 a:hover {
    color: #4f46e5;
}

.post-meta {
    color: #6b7280;
    font-size: 0.9rem;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    gap: 15px;
}

[data-theme="dark"] .post-meta {
    color: #9ca3af;
}

.post-excerpt {
    color: #6b7280;
    font-size: 0.95rem;
    line-height: 1.6;
    margin-bottom: 15px;
}

[data-theme="dark"] .post-excerpt {
    color: #9ca3af;
}

.post-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.tag {
    display: inline-block;
    background: #e0e7ff;
    color: #3730a3;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 500;
}

[data-theme="dark"] .tag {
    background: #312e81;
    color: #a5b4fc;
}

/* Sidebar */
.sidebar {
    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    padding: 25px;
    height: fit-content;
    position: sticky;
    top: 100px;
}

[data-theme="dark"] .sidebar {
    background: #1f2937;
    border-color: #374151;
}

.sidebar h3 {
    font-size: 1.1rem;
    margin-bottom: 20px;
    color: #1f2937;
    font-weight: 700;
}

[data-theme="dark"] .sidebar h3 {
    color: #f9fafb;
}

.sidebar ul {
    list-style: none;
    margin-bottom: 30px;
}

.sidebar li {
    margin-bottom: 8px;
}

.sidebar a {
    color: #6b7280;
    text-decoration: none;
    font-size: 0.9rem;
    padding: 8px 12px;
    border-radius: 6px;
    display: block;
    transition: all 0.2s ease;
}

.sidebar a:hover {
    background: #f3f4f6;
    color: #667eea;
}

[data-theme="dark"] .sidebar a {
    color: #9ca3af;
}

[data-theme="dark"] .sidebar a:hover {
    background: #374151;
    color: #4f46e5;
}

/* Search Bar */
.search-container {
    margin-bottom: 30px;
}

.search-input {
    width: 100%;
    padding: 12px 16px;
    border: 1px solid #d1d5da;
    border-radius: 8px;
    font-size: 0.95rem;
    background: #ffffff;
    transition: all 0.2s ease;
}

.search-input:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

[data-theme="dark"] .search-input {
    background: #374151;
    border-color: #4b5563;
    color: #f9fafb;
}

[data-theme="dark"] .search-input:focus {
    border-color: #4f46e5;
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

/* Theme Toggle */
.theme-toggle {
    position: fixed;
    top: 20px;
    right: 20px;
    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    padding: 10px 16px;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: 600;
    color: #6b7280;
    transition: all 0.2s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.theme-toggle:hover {
    background: #f8fafc;
    border-color: #667eea;
    color: #667eea;
}

[data-theme="dark"] .theme-toggle {
    background: #1f2937;
    border-color: #374151;
    color: #9ca3af;
}

[data-theme="dark"] .theme-toggle:hover {
    background: #374151;
    border-color: #4f46e5;
    color: #4f46e5;
}

/* Footer */
.footer {
    text-align: center;
    padding: 50px 0;
    border-top: 1px solid #e5e7eb;
    color: #6b7280;
    background: #f9fafb;
}

[data-theme="dark"] .footer {
    border-top-color: #374151;
    color: #9ca3af;
    background: #111827;
}

/* Responsive */
@media (max-width: 768px) {
    .hero h1 {
        font-size: 2rem;
    }
    
    .nav {
        flex-direction: column;
        gap: 10px;
    }
    
    .posts-grid {
        grid-template-columns: 1fr;
    }
}
</style>

<!-- Theme Toggle -->
<button class="theme-toggle" onclick="toggleTheme()">
    <span class="theme-icon">🌙</span>
    <span class="theme-text">Dark</span>
</button>

<!-- Header -->
<header class="header">
    <div class="container">
        <div class="header-content">
            <a href="/" class="logo">mkeeves.com</a>
            <nav class="nav">
                <a href="/">Home</a>
                <a href="/posts/">All Posts</a>
                <a href="/categories/">Categories</a>
                <a href="https://qr.mkeeves.com" target="_blank">QR Generator</a>
            </nav>
        </div>
    </div>
</header>

<!-- Main Layout -->
<div class="container">
    <div class="main-layout">
        <!-- Content -->
        <main class="content">
            <!-- Hero Section -->
            <section class="hero">
                <h1>All Posts</h1>
                <p>Browse through all my blog posts covering PowerShell, Microsoft technologies, system administration, and more.</p>
            </section>

            <!-- Posts -->
            <section class="section">
                <h2>All Posts ({{ site.posts.size }} total)</h2>
                <div class="posts-grid">
                    {% for post in site.posts %}
                        <article class="post-card">
                            <h3><a href="{{ post.url }}">{{ post.title }}</a></h3>
                            <div class="post-meta">{{ post.date | date: "%B %d, %Y" }} • {{ post.categories | first }}</div>
                            <p class="post-excerpt">{{ post.excerpt | default: post.content | strip_html | truncate: 120 }}</p>
                            {% if post.tags %}
                                <div class="post-tags">
                                    {% for tag in post.tags limit:3 %}
                                        <span class="tag">{{ tag }}</span>
                                    {% endfor %}
                                </div>
                            {% endif %}
                        </article>
                    {% endfor %}
                </div>
            </section>
        </main>

        <!-- Sidebar -->
        <aside class="sidebar">
            <div class="search-container">
                <input type="text" class="search-input" placeholder="Search posts...">
            </div>

            <h3>Quick Navigation</h3>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="#powershell">PowerShell</a></li>
                <li><a href="#intune">Intune</a></li>
                <li><a href="#m365">Microsoft 365</a></li>
                <li><a href="#admin">System Admin</a></li>
                <li><a href="#remediation">Proactive Remediation</a></li>
                <li><a href="#security">Security</a></li>
                <li><a href="#automation">Automation</a></li>
            </ul>

            <h3>Popular Tags</h3>
            <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-top: 10px;">
                <span class="tag">PowerShell</span>
                <span class="tag">Intune</span>
                <span class="tag">M365</span>
                <span class="tag">Windows</span>
                <span class="tag">Automation</span>
                <span class="tag">Security</span>
                <span class="tag">Teams</span>
                <span class="tag">Network</span>
            </div>

            <h3>Archive</h3>
            <ul>
                <li><a href="/2024/">2024 (25 posts)</a></li>
                <li><a href="/2022/">2022 (8 posts)</a></li>
            </ul>
        </aside>
    </div>
</div>

<!-- Footer -->
<footer class="footer">
    <div class="container">
        <p>&copy; 2025 mkeeves.com. Powered by Jekyll & Minimal Mistakes.</p>
    </div>
</footer>

<script>
// Dark Mode Toggle
function toggleTheme() {
    const root = document.documentElement;
    const currentTheme = root.getAttribute('data-theme') || 'light';
    
    if (currentTheme === 'dark') {
        root.setAttribute('data-theme', 'light');
        localStorage.setItem('theme-preference', 'light');
        updateToggleButton('light');
    } else {
        root.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme-preference', 'dark');
        updateToggleButton('dark');
    }
}

function updateToggleButton(theme) {
    const icon = document.querySelector('.theme-icon');
    const text = document.querySelector('.theme-text');
    
    if (icon && text) {
        if (theme === 'light') {
            icon.textContent = '🌙';
            text.textContent = 'Dark';
        } else {
            icon.textContent = '☀️';
            text.textContent = 'Light';
        }
    }
}

// Initialize theme
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme-preference') || 'light';
    const root = document.documentElement;
    root.setAttribute('data-theme', savedTheme);
    updateToggleButton(savedTheme);
});

// Simple search functionality
document.querySelector('.search-input').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const postCards = document.querySelectorAll('.post-card');
    
    postCards.forEach(card => {
        const title = card.querySelector('h3 a').textContent.toLowerCase();
        const excerpt = card.querySelector('.post-excerpt').textContent.toLowerCase();
        const tags = Array.from(card.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase()).join(' ');
        
        if (title.includes(searchTerm) || excerpt.includes(searchTerm) || tags.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});
</script>