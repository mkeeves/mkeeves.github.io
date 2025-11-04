---
layout: default
title: "All Posts"
permalink: /posts/
---

<link rel="stylesheet" href="/assets/css/main.css">

<style>
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
    margin-bottom: 50px;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
}

.hero h1 {
    font-size: 3rem;
    font-weight: 800;
    margin-bottom: 20px;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.hero p {
    font-size: 1.2rem;
    margin-bottom: 30px;
    opacity: 0.9;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
}

/* Section Styles */
.section {
    margin-bottom: 50px;
}

.section h2 {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 30px;
    color: #1f2937;
    position: relative;
    padding-bottom: 10px;
}

[data-theme="dark"] .section h2 {
    color: #f9fafb;
}

.section h2::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50px;
    height: 3px;
    background: linear-gradient(90deg, #667eea, #764ba2);
    border-radius: 2px;
}

.section h3 {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 40px 0 20px 0;
    color: #1f2937;
    position: relative;
    padding-bottom: 8px;
}

[data-theme="dark"] .section h3 {
    color: #f9fafb;
}

.section h3::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 30px;
    height: 2px;
    background: linear-gradient(90deg, #667eea, #764ba2);
    border-radius: 1px;
}

/* Posts Grid */
.posts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 25px;
    margin-bottom: 40px;
}

.post-card {
    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    padding: 25px;
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

[data-theme="dark"] .post-card {
    background: #1f2937;
    border-color: #374151;
}

.post-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

[data-theme="dark"] .post-card:hover {
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
}

.post-card-link {
    text-decoration: none;
    color: inherit;
    display: block;
}

.post-card h3,
.post-card h4 {
    margin-bottom: 10px;
    color: #1f2937;
    font-size: 1.1rem;
    font-weight: 600;
    transition: color 0.2s ease;
}

[data-theme="dark"] .post-card h3,
[data-theme="dark"] .post-card h4 {
    color: #f9fafb;
}

.post-card:hover h3,
.post-card:hover h4 {
    color: #667eea;
}

[data-theme="dark"] .post-card:hover h3,
[data-theme="dark"] .post-card:hover h4 {
    color: #a5b4fc;
}

.post-meta {
    color: #6b7280;
    font-size: 0.9rem;
    margin-bottom: 12px;
}

[data-theme="dark"] .post-meta {
    color: #9ca3af;
}

.post-excerpt {
    color: #374151;
    line-height: 1.6;
    margin-bottom: 15px;
}

[data-theme="dark"] .post-excerpt {
    color: #d1d5db;
}

.post-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
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

/* Responsive */
@media (max-width: 768px) {
    .hero h1 {
        font-size: 2rem;
    }
    
    .posts-grid {
        grid-template-columns: 1fr;
    }
}
</style>

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
                <h2 id="recent">All Posts ({{ site.posts.size }} total)</h2>
                
                <!-- PowerShell Posts Section -->
                <h3 id="powershell">PowerShell Posts</h3>
                <div class="posts-grid">
                    {% for post in site.posts %}
                        {% if post.categories contains 'PowerShell' or post.tags contains 'PowerShell' %}
                            <article class="post-card">
                                <a href="{{ post.url }}" class="post-card-link">
                                    <h4>{{ post.title }}</h4>
                                    <div class="post-meta">{{ post.date | date: "%B %d, %Y" }} • {{ post.categories | first }}</div>
                                    <p>{{ post.excerpt | truncate: 120 }}</p>
                                </a>
                                <div class="post-tags">
                                    {% for tag in post.tags limit: 3 %}
                                        <span class="tag">{{ tag }}</span>
                                    {% endfor %}
                                </div>
                            </article>
                        {% endif %}
                    {% endfor %}
                </div>
                
                <!-- Intune Posts Section -->
                <h3 id="intune">Intune Posts</h3>
                <div class="posts-grid">
                    {% for post in site.posts %}
                        {% if post.categories contains 'Intune' or post.tags contains 'Intune' %}
                            <article class="post-card">
                                <a href="{{ post.url }}" class="post-card-link">
                                    <h4>{{ post.title }}</h4>
                                    <div class="post-meta">{{ post.date | date: "%B %d, %Y" }} • {{ post.categories | first }}</div>
                                    <p>{{ post.excerpt | truncate: 120 }}</p>
                                </a>
                                <div class="post-tags">
                                    {% for tag in post.tags limit: 3 %}
                                        <span class="tag">{{ tag }}</span>
                                    {% endfor %}
                                </div>
                            </article>
                        {% endif %}
                    {% endfor %}
                </div>
                
                <!-- Microsoft 365 Posts Section -->
                <h3 id="m365">Microsoft 365 Posts</h3>
                <div class="posts-grid">
                    {% for post in site.posts %}
                        {% if post.categories contains 'Microsoft 365' or post.tags contains 'Microsoft 365' or post.tags contains 'M365' %}
                            <article class="post-card">
                                <a href="{{ post.url }}" class="post-card-link">
                                    <h4>{{ post.title }}</h4>
                                    <div class="post-meta">{{ post.date | date: "%B %d, %Y" }} • {{ post.categories | first }}</div>
                                    <p>{{ post.excerpt | truncate: 120 }}</p>
                                </a>
                                <div class="post-tags">
                                    {% for tag in post.tags limit: 3 %}
                                        <span class="tag">{{ tag }}</span>
                                    {% endfor %}
                                </div>
                            </article>
                        {% endif %}
                    {% endfor %}
                </div>
                
                <!-- All Posts Section -->
                <h3>All Posts</h3>
                <div class="posts-grid">
                    {% for post in site.posts %}
                        <article class="post-card">
                            <a href="{{ post.url }}" class="post-card-link">
                                <h3>{{ post.title }}</h3>
                                <div class="post-meta">{{ post.date | date: "%B %d, %Y" }} • {{ post.categories | first }}</div>
                                <p class="post-excerpt">{{ post.excerpt | default: post.content | strip_html | truncate: 120 }}</p>
                            </a>
                            {% if post.tags %}
                                <div class="post-tags">
                                    {% for tag in post.tags limit: 3 %}
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
        {%- include sidebar.html -%}
    </div>
</div>