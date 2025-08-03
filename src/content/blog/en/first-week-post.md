---
title: 'Weekly Summary #1: Kaggle, Blog Refactoring and CS50'
description: 'An intensive week of learning: from advanced Machine Learning techniques in Kaggle and SQL with BigQuery, to a deep refactoring of my blog with Astro and major progress in the CS50 Python course.'
pubDate: '2025-08-01'
heroImage: '/weekly/maxresdefault.jpg'
tags: ["weekly", "kaggle", "astro", "python"]
lang: 'en'
---

First week completed! I decided to start documenting my weekly progress as a way to stay focused, keep track of what I learn, and—why not—share it with anyone who might find it useful. This week was a mix of web development, machine learning, and programming fundamentals.

## Monday: Fixing the blog and laying the groundwork in Kaggle

The week started with a fight against my own blog. The project filter wasn't working as expected, and the culprit was server-side rendering (SSR). The solution was to move the logic to the client side with JavaScript. Sometimes, the simplest solution is the best.

On Kaggle, I completed the intermediate Machine Learning introduction, covering crucial topics:
- **Pipelines:** To optimize workflows.
- **Cross-Validation:** For more robust model evaluation.
- **XGBoost:** The go-to tool for structured data.
- **Data Leakage:** How to detect and avoid this subtle but disastrous problem.

## Tuesday: Massive refactoring and data visualization

Tuesday was code-cleaning day. I refactored much of the blog to reuse components (`BlogIndexContent`, `HomePageContent`) and improve the structure. I also implemented a tag filter with JavaScript for a more dynamic experience.

In the afternoon, I dove into data visualization with **Seaborn** on Kaggle:
- **Bar Charts (`barplot`) and Heatmaps (`heatmap`):** Ideal for comparisons and correlations.
- **Scatter Plots (`scatterplot`, `regplot`):** To explore relationships between variables.
- **Distributions (`histplot`, `kdeplot`):** To understand the shape of the data.

## Wednesday: Feature Engineering and polishing details

In the morning, I gave the blog its final aesthetic touches, getting it ready to share.

The afternoon was dedicated to one of the most creative parts of Machine Learning: **Feature Engineering**. I learned to:
- **Encode categorical variables** with `pd.get_dummies()`.
- **Combine and group columns** to create new features with more context.
- **Use `mutual_info_classif`** to select the most informative variables.
- **Apply PCA** to reduce dimensionality and understand the dataset's structure.

## Thursday: CS50 and a deep dive into SQL

Thursday morning was all about fundamentals with **CS50's Introduction to Python from Harvard**. I worked through modules on functions, conditionals, loops, and exceptions, solving lots of small problems that reinforce the basics.

In the afternoon, I tackled **SQL and BigQuery** on Kaggle. I moved from basic queries to more advanced concepts:
- **Aggregations and `JOIN`s**.
- **Readable subqueries with `WITH`**.
- **Analytical functions (`OVER`)** for complex calculations without grouping.
- **Handling nested data with `UNNEST()`**, a gem in BigQuery.

## Friday: Wrapping up the week with CS50

To finish the week, I focused entirely on CS50. I completed the **exceptions** section and finished the module on **external libraries**, practicing with `random` and using third-party APIs. My goal is to finish the course next week.

## Sunday: Reflection and preparation for next week

Sunday was a day for reflection and preparation. I reviewed what I learned, organized my notes, and planned my goals for the upcoming week. I'm motivated to keep progressing in Kaggle and CS50, and I also want to explore more about Astro and how to improve my blog. I wrote this post to document my progress and reflect on what I've learned.

### Final thoughts

It’s been an intense but incredibly productive week. The key, as I reminded myself, is to "try one more time." This blog is part of that attempt. See you next week with more progress.
