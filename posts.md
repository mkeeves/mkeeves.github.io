---
layout: posts
title: "All Posts"
permalink: /posts/
author_profile: true
---

# All Posts

Browse through all my blog posts covering PowerShell, Microsoft technologies, system administration, and more.

<div class="posts-list">
  {% for post in site.posts %}
    <article class="post-preview">
      <h2 class="post-title">
        <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
      </h2>
      <div class="post-meta">
        <time datetime="{{ post.date | date_to_xmlschema }}">
          {{ post.date | date: "%B %d, %Y" }}
        </time>
        {% if post.tags %}
          <span class="post-tags">
            {% for tag in post.tags %}
              <span class="tag">{{ tag }}</span>
            {% endfor %}
          </span>
        {% endif %}
      </div>
      <div class="post-excerpt">
        {{ post.excerpt | markdownify | strip_html | truncate: 200 }}
      </div>
      <a href="{{ post.url | relative_url }}" class="read-more">Read More</a>
    </article>
  {% endfor %}
</div>

## Categories

<div class="category-grid">
  <div class="category-item">
    <h3>PowerShell</h3>
    <p>Scripts, automation, and administrative solutions</p>
  </div>
  <div class="category-item">
    <h3>Microsoft 365</h3>
    <p>Configuration, security, and optimization guides</p>
  </div>
  <div class="category-item">
    <h3>Intune</h3>
    <p>Proactive remediations and endpoint management</p>
  </div>
  <div class="category-item">
    <h3>System Administration</h3>
    <p>Windows Server, networking, and infrastructure</p>
  </div>
</div>
