---
layout: single
title: "All Posts"
permalink: /posts/
author_profile: true
---

<div class="hero-section" style="padding: 4rem 0;">
  <div class="hero-content">
    <h1 class="hero-title">All Posts</h1>
    <p class="hero-subtitle">Browse through all my blog posts covering PowerShell, Microsoft technologies, system administration, and more.</p>
  </div>
  
  <!-- Theme Toggle Button -->
  <div style="position: absolute; top: 2rem; right: 2rem; z-index: 10;">
    <button class="theme-toggle" onclick="toggleTheme()">
      <span class="theme-icon">🌙</span>
      <span class="theme-text">Dark</span>
    </button>
  </div>
</div>

<script src="/assets/js/dark-mode.js"></script>
</div>

<div class="container">
  <div class="grid-modern">
    {% for post in site.posts %}
      <article class="post-card">
        <div class="post-card-image" style="background: var(--primary-gradient); display: flex; align-items: center; justify-content: center; color: white; font-size: 2rem;">
          {% if post.tags contains 'PowerShell' %}⚡
          {% elsif post.tags contains 'Microsoft 365' %}☁️
          {% elsif post.tags contains 'Intune' %}🔧
          {% elsif post.tags contains 'Network' %}🌐
          {% else %}📝{% endif %}
        </div>
        <div class="post-card-content">
          <h3 class="post-card-title">
            <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
          </h3>
          <div class="post-card-meta">
            <time datetime="{{ post.date | date_to_xmlschema }}">
              {{ post.date | date: "%B %d, %Y" }}
            </time>
            <span>{{ post.tags | first }}</span>
          </div>
          <p class="post-card-excerpt">
            {{ post.excerpt | markdownify | strip_html | truncate: 150 }}
          </p>
          {% if post.tags %}
            <div class="post-card-tags">
              {% for tag in post.tags limit:4 %}
                <span class="tag-modern">{{ tag }}</span>
              {% endfor %}
            </div>
          {% endif %}
        </div>
      </article>
    {% endfor %}
  </div>

  <section style="margin: 4rem 0;">
    <h2 style="text-align: center; margin-bottom: 3rem; color: var(--text-primary);">Content Categories</h2>
    <div class="grid-modern">
      <div class="feature-card">
        <div class="feature-icon">⚡</div>
        <h3 class="feature-title">PowerShell</h3>
        <p class="feature-description">Scripts, automation, and administrative solutions for enterprise environments</p>
      </div>
      
      <div class="feature-card">
        <div class="feature-icon">☁️</div>
        <h3 class="feature-title">Microsoft 365</h3>
        <p class="feature-description">Configuration, security, and optimization guides for M365 environments</p>
      </div>
      
      <div class="feature-card">
        <div class="feature-icon">🔧</div>
        <h3 class="feature-title">Intune</h3>
        <p class="feature-description">Proactive remediations and endpoint management solutions</p>
      </div>
      
      <div class="feature-card">
        <div class="feature-icon">🛠️</div>
        <h3 class="feature-title">System Administration</h3>
        <p class="feature-description">Windows Server, networking, and infrastructure management</p>
      </div>
    </div>
  </section>
</div>
