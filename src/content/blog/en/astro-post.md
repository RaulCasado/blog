---
title: 'Astro and Why I Chose It'
description: 'Exploring why I chose Astro for my blog, its advantages, when it shines, and considerations compared to other frameworks.'
pubDate: '2025-06-04'
heroImage: '/blog-placeholder-1.jpg'
heroImageAlt: 'Astro placeholder'
tags: ['astro','web development']
hola: 'hola'
lang: 'en'
---

# Astro and Why I Chose It

## Introduction

Hello everyone! As you may have noticed, I've decided to launch my blog using Astro. You might be wondering if this is the right choice for you, or if you should consider another framework. Choosing a tool for a personal web project, such as a blog, can be complex, with so many options available. It is crucial to make an informed decision, without being influenced by trends alone. That's why, in this article, I'll explain why I chose Astro, its advantages and disadvantages, and when it really shines. I hope this guide will help you decide if Astro is the right tool for your next project.

Let's dive in!

## What is Astro?

To understand why I chose Astro, we first need to know what Astro is. Yeah sure another JS framework anyone surprised? But this one is unique with features that make it special for certain types of projects. Its philosophy of 'islands' is fundamental, imagine that each interactive component of your page is a small island of JavaScript, isolated from the rest of the content. This means only the JavaScript necessary for each component to load, which translates into impressive performance. You'll enjoy a fast and fluid user experience without sacrificing interactivity. In addition, Astro is incredibly fast and lightweight, making it perfect for blogs and static websites. In short, Astro focuses on speed and efficiency, prioritising the delivery of pure HTML to the browser, making it an excellent choice where performance matter most.

### Component Syntax Differences

One of the things that most attracted me to Astro is its clean syntax and focus on structure. Let's look at a simple example to compare an Astro component with a React one:

**Astro Component:**
```astro
---
// Your JavaScript/TypeScript goes here (script section)
const greetings = "Hello World";
const items = ["Item 1", "Item 2", "Item 3"];
---

<div>
  <h1>{greetings}</h1>
  <ul>
    {items.map(item => <li>{item}</li>)}
  </ul>
</div>

<style>
  /* Your CSS goes here - it's automatically encapsulated */
  h1 {
    color: blue;
  }
</style>
```

**Same Component in React:**
```jsx
import React from 'react';
import './some.css'; // CSS imported separately

function MiComponent() {
  const greetings = "Hello World";
  const items = ["Item 1", "Item 2", "Item 3"];

  return (
    <div>
      <h1>{greetings}</h1>
      <ul>
        {items.map((item, index) => <li key={index}>{item}</li>)}
      </ul>
    </div>
  );
}

export default MiComponente;
```

Astro provides a clear separation between JavaScript, HTML and CSS, making it easy to read and maintain. In addition, CSS within an Astro component is automatically encapsulated, eliminating the need for additional configuration or CSS-in-JS libraries.

### Markdown (MD) vs. MDX: Content Beyond Just Text

For a blog, how you handle content is fundamental. Astro supports both Markdown (MD) and MDX, and understanding the difference is key:

**Markdown (.md):** This is a lightweight markup language that lets you format plain text in a simple, readable way. It's ideal for text-based content, like most blog articles. It's easy to learn and write, and it generates simple HTML.

```markdown
# My Article Title

This is a paragraph in **bold** and *italics*.

- List item
- Another item
```

**MDX (.mdx):** MDX is an extension of Markdown that allows you to write JSX (JavaScript XML) directly within your Markdown files. This is incredibly powerful because it lets you import and use interactive components (from React, Vue, Svelte, etc.) directly in your content, just as if they were custom HTML tags.

```jsx
import MyInteractiveComponent from '../components/MyInteractiveComponent.astro';
import AnotherReactComponent from '../components/AnotherReactComponent.jsx';

# My Title with Components

This is a paragraph. Here I can include my Astro component:
<MyInteractiveComponent client:load />

And here I can use a React component within my MDX:
<AnotherReactComponent greeting="Hello from React" />

I continue with my blog content.
```

The flexibility of MDX is a game-changer for a blog like mine. It allows me to write most of my content in plain Markdown, but if I need an interactive calculator, a dynamic chart, or a custom image carousel within an article, I can integrate a React component (or Vue, Svelte, etc.) right where I need it, without having to build the entire page with that framework. This keeps most of the page light and static, while only the interactive "island" loads its JavaScript.

## Server-Side Rendering (SSR) with Astro: A Unique Perspective

Server-Side Rendering (SSR) is a technique where the content of a web page is generated on the server and sent as full HTML to the browser. This has significant advantages for SEO and initial load speed, as the browser does not have to wait for JavaScript to download and run before viewing the content.

Many modern frameworks (such as Next.js, Nuxt.js, SvelteKit) offer SSR, but Astro handles it with a distinctive perspective:

### Traditional SSR in Other Frameworks

In frameworks like Next.js, when you use SSR, the entire page is 'hydrated' (i.e., the client's JavaScript is 'activated' and takes control of the interactive elements) once the HTML has loaded. This means that even if only a small part of your page needs interactivity, all the JavaScript on the page is sent to and executed on the client, which can slow down startup and interactivity.

### SSR and Astro's 'Island' Architecture

Astro can also generate pages entirely on the server (SSR), but its real magic lies in how it handles post-SSR interactivity. After the server has generated and sent the HTML, Astro uses its 'island' architecture to 'hydrate' only the specific interactive components you've marked for the client (client:load, client:visible, etc.).

This is what makes Astro so efficient:

- **Instant Content**: Most of your blog (text, static images) is rendered on the server and sent as pure HTML, which guarantees instant loading and excellent SEO.
- **Minimal and Targeted JavaScript**: Only the JavaScript required for specific interactive components (your 'islands') is sent to the browser. If a component is not interactive, no JavaScript associated with it is sent to the client.
- **No 'Global Hydration'**: Unlike other frameworks where the entire application may need "hydration', Astro avoids this massive 'hydration cost'. This results in a faster and smoother user experience, as the page is interactive almost immediately, without the JavaScript overhead.

In short, Astro takes the best of SSR (initial load speed, SEO) and combines it with an innovative approach to interactivity (the 'islands'), drastically minimising the amount of JavaScript sent to the client, resulting in superior performance for your blog.

## How does Astro achieve that speed?

One of the keys that makes Astro so fast is its 'Zero JavaScript by Default' philosophy. This results in only the JavaScript required for interactive components being sent, which reduces the initial load and improves overall performance. Other factors include:

- **Static HTML Generation:** When requested by the server, components are compiled into pure HTML, and the browser receives only the HTML needed to render the page, without waiting for unnecessary JavaScript to load and execute.
- **Island architecture:** Allows only the interactive components to be 'hydrated', isolating this component from the rest of the page. This makes the rest of the page load quickly.
- **Efficient three-shaking:** Astro uses a dead code removal system that removes unused JavaScript, sending only the necessary code to the browser

### Performance comparison

To better understand the performance difference between Astro and other popular frameworks, let's take a look at some rough numbers based on tests of simple blog-like websites:

| Framework | Initial load time | Sent JS size | Compilation time | Lighthouse score |
|-----------|-------------------|--------------|------------------|------------------|
| Astro     | ~0.5s             | ~30KB        | ~1.5s            | 95-100           |
| Next.js   | ~1.2s             | ~90KB        | ~3s              | 85-95            |
| Gatsby    | ~1.0s             | ~120KB       | ~5s              | 80-95            |
| Hugo      | ~0.3s             | ~0-10KB     | ~0.8s            | 95-100           |
| Plain HTML| ~0.4s             | 0KB          | N/A              | 95-100           |

*Note: These numbers are approximate and may vary depending on project complexity, optimisation and hosting. Based on testing of simple blog-like sites with static content and minimal interactivity*.

As you can see, Astro comes very close to pure HTML performance while offering much more functionality and ease of development. This combination of close to pure HTML performance with the power of a modern framework is what makes it so attractive.

## Advantages of using Astro

So, why Astro? Here are some of the key reasons I picked it for my blog:

1. **Superior Performance**: Astro focuses on performance. It generates static sites that are incredibly fast and light, which is ideal for a blog where loading speed is crucial to the user experience. Nobody likes to wait for a page to load.

2. **Frameworks flexibility**: Astro allows you to use different JavaScript frameworks (React, Vue, Svelte, etc.) in the same project. This means that you can choose the best tool for each task without being tied to a single framework. However, be careful with this! If you end up creating a project using too many frameworks, it could become more complicated than expected. If you end up using Astro but find yourself creating most of your components in React, maybe it would have been better to use React directly.

3. **Simplicity**: Astro's setup is pretty straightforward and doesn't require a lot of effort to get started. This is especially useful if you just want to focus on writing content without worrying about the complexity of the framework. Blogging is super simple, giving you more time to write and research your posts.

4. **Robust SEO**: By generating static HTML, Astro is great for SEO. Search engines can easily index your blog content, which can help improve your online visibility. This is a must if you want people to see your blog.

5. **Growing Community and Ecosystem**: Although Astro is relatively new, its community is growing rapidly and there are many resources available. This means that if you have questions or need help, you're likely to find answers quickly.

## When should you consider using Astro?

Astro shines in scenarios where content and speed are the priority. Here are some examples:

- **Blogs and Content Sites:** Like this very blog.
- **Corporate Websites and Landing Pages:** Where first impressions and loading speed are crucial.
- **Static E-commerce:** With cart or checkout functionalities handled by external services.
- **Portfolios and Personal Pages:** To showcase your work quickly and professionally, like mine.
- **Documentation and Reference Sites:** For their emphasis on content.

As you can see, my blog fits two of these categories (blog and portfolio). If your project fits into either of these, Astro could be an excellent choice for you.

## When should you avoid Astro?

Astro is powerful, but it is not the solution for everything. There are scenarios where other frameworks might better:

- **Highly Interactive Applications (complex SPAs):** If your project is a Single Page Application (SPA) with lots of client-side interactivity, complex state management and constant updates, Astro might not be the most efficient choice.
- **Dashboards and Administrative Tools:** For interfaces with lots of interactive graphs, pivot tables and constant data entry, a more client-centric framework might be more suitable.
- **Projects with Real-Time Requirements:** If your application needs real-time updates, such as chats or instant notifications, Astro would not be the best choice.

Basically, for more complex projects or projects that require a lot of interactivity, you may want to consider other options such as React, Vue or Svelte. While Astro can handle some interactivity, its main focus is on generating static sites and not necessarily creating highly dynamic web applications and that's fine! Not all technologies are suitable for all types of projects.

## My experience with Astro

Building this blog and portfolio with Astro has been a fairly straightforward and positive experience. The documentation is excellent and there are plenty of examples available, which makes the learning curve much easier. Also, the community is active and there is always someone willing to help if you run into a problem.

What has surprised me the most is the ease of integrating content into Markdown, which allows me to focus on writing without worrying about complicated technical aspects. The file-based routing system was also very intuitive - I simply created files in the pages directory and Astro automatically generated the corresponding paths.

Astro's built-in image optimisation capability has also been instrumental in improving performance, dramatically reducing image size without compromising visual quality.

Although I haven't included any plugins or complex integrations so far, Astro's flexibility gives me the confidence that I can scale the project in the future if necessary. For now, I'm very happy with my decision to use Astro.

## Additional considerations: pnpm and dependency management

While not unique to Astro, my experience using it has benefited greatly from pnpm for dependency management. What is pnpm and why is it relevant?

pnpm is a Node.js package manager that stands out for its disk space efficiency and speed. Unlike npm or yarn which install full copies of dependencies in each node_modules and yeah you might need to use something like a node_modules cleaner because this could take up several gigabytes on your hard drive, meanwhile pnpm uses a global addressable content store. This means that:

- **Saves Space:** If you have multiple projects that use the same version of a dependency, pnpm only downloads and installs it once into that global store and then creates symlinks to it in each project's node_modules. This can save gigabytes of space on your disk!
- **Faster Installations:** By not having to download the same dependency over and over again, installations are significantly faster, especially in projects with many dependencies or when working with multiple projects.

While Astro doesn't force you to use pnpm, the combination of pnpm's efficiency with Astro's performance creates a very streamlined and optimised development workflow. For me, it has been the perfect complement to keep my development environment light and fast, in line with Astro's philosophy.

## Conclusion

In summary, I chose Astro for my blog because of its impressive performance, its incredible flexibility to integrate different JavaScript frameworks, and its simplicity that allows me to focus on content. Its unique focus on SSR and 'island' architecture, joined with the power of MDX, make it an obvious choice for content-oriented projects where speed and user experience are paramount.

If you are considering using Astro for your own project, I hope this article has provided you with useful information and helped you better understand its strengths and weaknesses. Remember that every project is unique, and what works for one may not be the best option for another. So, my final advice is: do your research, try out different tools and choose the one that best suits your specific needs and project goals.

I hope you found this article very useful! What do you think of Astro, have you used it or do you plan to try it out? I'd love to read your comments and experiences!

## Additional resources

- [Official Astro Documentation](https://astro.build/docs)
- [Astro Example Projects Built with Astro](https://astro.build/examples)
- [pnpm Official Website](https://pnpm.io/)
- [MDX Documentation](https://mdxjs.com/)
- [i18n Astro](https://docs.astro.build/en/recipes/i18n/)
