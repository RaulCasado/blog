---
title: "Week 4: Deepening Kaggle Skills and Project Progress"
description: "A productive week covering key Kaggle concepts and significant progress on a personal project organizer."
pubDate: "2025-08-25"
tags: ["python", "weekly","kaggle","web_development"]
heroImage: '/weekly/arena.jpg'
heroImageAlt: 'A sand clock symbolizing progress over time'
---

A productive week focused on advancing data skills with Kaggle and pushing a personal project organizer forward.

### Kaggle highlights
- Time series: working with time-dependent data (ARIMA, LSTM); be cautious with highly noisy assets like cryptocurrencies.  
- Scaling vs. normalization: scaling brings features to a common range; normalization reshapes distributions for model assumptions.  
- Feature engineering: creating derived features (e.g., day, month, weekend) often improves performance more than model choice.  
- Data cleaning: handle missing values, duplicates, outliers and inconsistent labels.  
- Fuzzy matching: useful to unify misspelled text but requires threshold tuning, dictionaries or more advanced AI to avoid false matches.  

Typical workflow: collect → clean → transform (scale/normalize, engineer features) → model → evaluate → iterate.

### Project organizer progress
- Architecture decisions: using BrowserRouter + localStorage for now and a single source of truth (state lifted to an ancestor). May switch to createBrowserRouter and a backend later.  
- Implemented features: full CRUD for projects and tasks (with SweetAlert confirmations), clickable tag filtering (multi-select planned), resource and ideas sections, and a blog export feature (templating pending).  
- Technical debt / refactor plans: split large components (ProjectDetail, ProjectMainView, App), convert tags from strings to Tag objects, centralize date parsing/formatting (dateUtils, consider date-fns), and introduce services for localStorage and notifications.  
- Dev tooling: set up Husky, Prettier, ESLint, Commitlint, lint-staged and Commitizen to enforce formatting and Conventional Commits.  
- Small discovery: JavaScript Symbol for unique values (useful for unique keys or private-like properties).

Summary: steady progress building both practical data knowledge and a more maintainable, production-ready codebase.
