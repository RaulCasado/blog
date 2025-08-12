---
title: "My Second Week of Study: CS50, Deep Learning, and a Lesson on Over-engineering"
description: "A diary of my second week of intensive study, finishing the CS50P course, my first steps with Kaggle, and a valuable lesson about complexity in projects."
pubDate: "2025-08-10"
heroImage: "/blog-placeholder-2.jpg"
tags: ["cs50", "python", "weekly", "kaggle"]
---

This week has been a roller coaster of emotions and learning. It started with overwhelming productivity, finishing almost all the content of the famous **CS50’s Introduction to Programming with Python** course, and continued with a project that taught me one of the most important lessons for a developer: more isn't always better.

Here is my logbook.

## Monday: Full Steam Ahead with CS50 and Kaggle

Monday was an incredibly productive day. In the morning, I focused on the CS50 material and completed two entire units:

*   **Unit Tests**: `Testing my twttr`, `Back to the Bank`, `Re-requesting a Vanity Plate`, `Refueling`.
*   **File I/O**: `Lines of Code`, `Pizza Py`, `Scourgify` (leaving `CS50 P-Shirt` for the evening).

In the afternoon, I took my first steps into the world of Deep Learning with a **Kaggle** course:
*   **Intro to Deep Learning**: I completed all 6 modules, from the basic neuron to binary classification, using TensorFlow and Keras.

I ended the day feeling like I had made the most of every minute.

## Tuesday: The Final Stretch of CS50 and My "Fight" with Regex

On Tuesday, I decided to set Kaggle aside to give CS50 the final push. I tackled the last two theoretical modules:

*   **Regular Expressions**: A module that I found particularly tough. I completed all the exercises (`NUMB3RS`, `Watch on YouTube`, `Working 9 to 5`, etc.), but it left me with an important thought: regular expressions are powerful, but incredibly difficult to debug. For a problem like validating an IP, I felt that simpler solutions with `split()` would have been faster and more readable. Is it really necessary to master them by hand in the age of AI?
*   **Object-Oriented Programming**: A much more rewarding module, where I completed `Seasons of Love`, `Cookie Jar`, and `CS50 Shirtificate`.

With that, only the final project remained!

## Wednesday: Planning the "Game of Life"

With the theory out of the way, I dedicated Wednesday to planning. After considering several ideas, I decided on a classic: **Conway's Game of Life**.

My plan was to do it "right," applying an **MVC (Model-View-Controller)** architecture. I spent the day designing the classes, functions, file structure, and setting up the project skeleton. The idea was to use `tkinter` for the graphical interface.

## Thursday: Time to Code

Thursday was implementation day. It was a day of pure coding where I managed to implement almost all the functionality I had planned:

*   Main game logic.
*   Rendering in the `tkinter` window.
*   Functions to import and export game states from files.
*   Controls to pause, resume, and change the speed.

By the end of the day, the project was practically ready. All that was left was to refactor, write tests, and record the video for submission.

## Friday: The Hard Lesson of "Over-engineering"

On Friday, with my morale high, I went to the CS50 Discord community to share my progress. The response was a bucket of cold water: the project was **"over-engineered."** It was well-made, yes, but it was much more complex than what the course required.

It was a tough blow. After all the work, I realized I had failed to understand the actual scope of the project. I decided to upload the **Game of Life to my GitHub** as a personal project, but I wouldn't submit it for CS50. I had to start from scratch.

## Final Reflection of the Week

This weekend has been one of self-criticism. Why wasn't this week as productive as the last one?

1.  **Lack of focus**: I invested time in things that were not priorities. The "Game of Life" project is a clear example. Although I learned a lot, it was a failure in the context of the course.
2.  **The importance of environment**: Last week, I changed my study location in the afternoons, and that helped me stay focused. I didn't do that this week, and I noticed the difference.
3.  **The most valuable lesson**: "More complex" doesn't always mean "better." Understanding the requirements and scope of a project is as important as knowing how to program it.

Although the week ends on a bittersweet note, I'm holding on to what I've learned. Now it's time to go back to the drawing board, choose a more suitable project for CS50, and apply the lessons learned about focus and time management. On to the next week!
