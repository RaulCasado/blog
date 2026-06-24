---
title: "My Self-Study Sprint: What Seven Weeks of Kaggle, CS50 and React Taught Me"
description: "A retrospective of an intensive self-study period: machine learning on Kaggle, Python fundamentals with CS50, building a React project from scratch, and the hard lessons about scope, architecture and tooling along the way."
pubDate: "2025-09-15"
heroImage: '../../../assets/blog/weekly/blog-meta.jpg'
heroImageAlt: 'A workspace representing weeks of continuous learning and building'
tags: ["career", "python", "web_development"]
lang: 'en'
---

For a stretch of late summer 2025 I kept a weekly logbook of everything I was learning. Those notes are now folded into this single retrospective: it's more useful to read the whole arc at once than seven separate diary entries. Here is what those weeks actually taught me.

## Machine learning, in depth, on Kaggle

I went through Kaggle's tracks methodically rather than skipping around. The progression mattered:

- **Intermediate ML**: pipelines to keep workflows clean, cross-validation for honest evaluation, XGBoost as the workhorse for structured data, and **data leakage** — the subtle bug that quietly inflates your scores until production humbles you.
- **Data visualization** with Seaborn: barplots, heatmaps, scatter/regplots and distributions, learning to *look* at data before modelling it.
- **Feature engineering**: encoding categoricals, combining columns into features with more context, mutual information to pick informative variables, PCA for dimensionality. The recurring lesson: a good feature usually beats a fancier model.
- **Deep learning** with TensorFlow/Keras: from a single neuron to binary classification.
- **Computer vision**: convolutional networks end to end — convolution and ReLU, max pooling, stride/padding, custom convnets and data augmentation. This is where I learned patience: some exercises needed 50 epochs at ~6 minutes each. Waiting hours for one run teaches you to respect compute.
- **Time series**: ARIMA/LSTM, and a healthy caution around noisy assets like crypto. Plus scaling vs. normalization and the unglamorous craft of data cleaning.

## Python fundamentals with CS50

In parallel I finished Harvard's **CS50's Introduction to Programming with Python**: functions, conditionals, loops and exceptions, unit tests, file I/O, regular expressions and OOP. Regex was the module that fought back the hardest — powerful, but painful to debug, and a good reminder that the cleverest tool isn't always the most readable one.

## The most valuable lesson: scope beats complexity

For my CS50 final project I built Conway's Game of Life with a full MVC architecture and a Tkinter UI. I was proud of it — until the community pointed out it was **over-engineered** for what the course asked. That stung after all the work, but it was the single most useful lesson of the whole period: understanding the *scope* of a problem is as important as knowing how to code it. I kept the project on GitHub and built something more appropriate for the actual assignment.

## Building ProjectOrganizer: from features to foundations

The biggest thread across these weeks was a personal project — an app to centralize projects, tasks, daily logs, ideas and resources. It's where the learning became real:

- **Architecture decisions up front**: React Router for navigation, `localStorage` as the initial data layer, and a "single source of truth" for state.
- **A major refactor**: a `ProjectDetail` component had grown into a monolith with 20+ imports and deep prop drilling. I introduced React's Context API to kill the prop drilling, extracted logic into hooks and services (`useSwal`, a `DateUtils` class), and used barrel exports to tame the imports. The functional-update form for state (`setState(prev => …)`) quietly fixed a class of race conditions.
- **Tooling and discipline**: Husky + Commitlint + Prettier + lint-staged to standardize commits and formatting. Eighteen commits in one week, but the codebase came out far more maintainable.

## And the blog you're reading

Some of those weeks went into this very site: migrating and refactoring it in Astro, and adding the search and tag-filtering that make it browsable as the number of posts grows. Building your own tools is one of the best ways to learn — you feel every rough edge.

## What it all added up to

Looking back, the technical topics matter less than the habits they built: studying with structure, finishing what I start, asking for feedback even when it bruises, and caring about the foundation of a project, not just its features. That mindset is what I carried into professional work — and it's why I keep writing here.
