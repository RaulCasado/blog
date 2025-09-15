---
title: "Week 7: Improving the Blog: Search, Filters, and Featured Posts"
description: "This week, I shifted my focus to the blog itself, implementing key features like a dynamic search, content filters, and a featured post system to enhance the reader experience."
pubDate: "2025-09-15"
tags: ["weekly","web_development", "astro"]
heroImage: '/weekly/blog-meta.jpg'
heroImageAlt: 'An image representing blog improvements with search and filter icons'
---

After an intense refactoring phase on ProjectOrganizer, I decided to take a break from the main project this week to focus on the platform you're reading right now: the blog. As the number of posts grew, I realized the browsing experience was becoming cumbersome. It was time to implement some quality-of-life improvements I had been putting off.

## 🚀 Executive Summary

It's been a quieter week in terms of code volume, but highly productive in its impact on the user experience. The improvements focused on:

- **Implementing a search feature** to filter posts by keywords.
- **Creating a filter** to show or hide the weekly summaries.
- **Adding a featured post system** to give visibility to important articles.
- **Improving UX** with a "no results found" message.

## 🛠️ Identifying the Blog's Needs

The blog, like any other software project, needs maintenance and new features to remain useful. I identified three main areas for improvement:

### 1. Difficulty in Finding Content

With each passing week, the list of posts gets longer. Finding a specific article about a technology or a particular week was becoming a manual task of "scroll and pray." The lack of a search function was the main problem.

### 2. Visual Noise from Weekly Posts

Although the weekly summaries are the heart of this blog, they can overshadow other more technical or specific articles. A reader interested in a tutorial might not want to navigate through all the progress updates.

### 3. Flat Content Hierarchy

By default, the blog showed the latest post as the most important one. However, sometimes an older post might be more relevant or a good starting point for new readers. I needed a way to highlight key content regardless of its publication date.

## 🏗️ The Improvement Strategy

With the problems identified, I got to work implementing direct and effective solutions.

### Phase 1: Content Search and Discovery

The most significant improvement was the creation of a **dynamic search bar**. Using a bit of JavaScript and the data that Astro exposes, I implemented a search bar that filters posts in real-time as the user types. To enhance the experience, I added a clear "No posts found" message when a search term yields no results.

### Phase 2: Filtering and Organization

To reduce the "noise," I added a simple checkbox that allows readers to **show or hide posts tagged as "weekly."** This cleans up the main view and allows users to focus on the type of content that interests them most at that moment.

### Phase 3: Prioritization with Featured Posts

To break the tyranny of chronological order, I introduced a new property in the posts' frontmatter: `featured: true`. Now I can mark any post as "featured." The homepage logic was modified so that if a featured post exists, it is displayed in a prominent position, ensuring that the most important content is always visible.

## 📊 Metrics of the Week

- **3 new features** implemented on the blog.
- **Significant UX improvement** for readers.
- **0 external dependencies** added; everything was solved with Astro and vanilla JavaScript.
- **Greater editorial control** over the blog's content.

## 🎯 Lessons Learned

### 1. Your Blog is Also a Product

It's easy to see the blog just as a means to document other projects, but the platform itself deserves to be treated as a product. Investing time in improving it directly benefits your readers and yourself.

### 2. The Reader's Experience is Key

Features like search or filters are not a luxury; they are essential for a blog with a growing amount of content. Making the reader's life easier encourages them to stay longer and explore more.

### 3. Frontmatter is Your Content API

In systems like Astro, the frontmatter of Markdown files is an incredibly powerful tool. Adding a simple boolean like `featured` can completely transform how content is presented without needing complex systems.

## 🚀 Next Steps

With a more robust and easy-to-navigate blog, next week I will return my focus to **ProjectOrganizer**. The goals remain the same:

1. **CSS/Tailwind**: Start giving the project a visual shape.
2. **Backend Integration**: Prepare the connection with a REST API.
3. **Testing**: Add a solid foundation of unit tests.

This break to improve the blog has been refreshing and necessary. Sometimes, to move forward faster, you first have to sharpen your tools and tidy up the house.
