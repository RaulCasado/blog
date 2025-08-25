---
title: "Third Week: Neural Networks, Reinstallations, and New Projects"
description: "A summary of my third week: a Kaggle course on convolutional neural networks, technical challenges, a fresh Ubuntu installation, and the start of an exciting personal project."
pubDate: "2025-08-17"
tags: ["python", "weekly","kaggle"]
heroImage: '/weekly/rusa.jpg'
heroImageAlt: 'A roller coaster symbolizing the ups and downs of learning'
---

Hello everyone! This week has been a rollercoaster of learning and development. From diving into the world of computer vision with a Kaggle course to starting a new personal project, including a necessary tune-up of my operating system.

### Deep Learning with Kaggle

I started the week by completing a Kaggle course on computer vision, which covered the fundamentals of convolutional neural networks (ConvNets). The modules I've completed are:

1.  **The Convolutional Classifier**: Creating the first computer vision model with Keras.
2.  **Convolution and ReLU**: Discovering how ConvNets create features.
3.  **Maximum Pooling**: Extracting features with *maximum pooling*.
4.  **The Sliding Window**: Exploring *stride* and *padding* parameters.
5.  **Custom Convnets**: Designing my own convolutional network.
6.  **Data Augmentation**: Improving performance by creating additional training data.

A significant challenge was the model training time. Some exercises required up to 50 epochs, with each taking about 6 minutes. Imagine waiting 8 hours for a single exercise! This slowed my pace, but it was a valuable lesson in the patience and resources that *machine learning* demands.

### Setting Up the Development Environment

I also spent a full day reinstalling my operating system. I decided to start fresh with Ubuntu 24.04, the latest version. I've been setting it up with the Dracula theme and optimizing it for programming. I installed GNOME extensions to monitor RAM usage, as my laptop with 8 GB sometimes falls short, especially with VSCode and many tabs open.

### Exploring Tools: Obsidian

I've been trying out Obsidian for note-taking. It's a super powerful tool, but the learning curve is considerable. I spent a lot of time setting it up and feel like I've barely scratched the surface of what it can do. I've seen people use it as a "second brain," and I find the idea fascinating. I haven't decided if it will be my definitive tool yet; I also want to give Notion a try.

### New Project: A Centralized Organizer

The most exciting part of the week is that I've started a new project! The idea is to create a project and resource organizer to have everything centralized.

The concept is to have an application where you can define a project's name, its requirements, dependencies, the tech stack, and even the architecture (like MVC). Within each project, there would be several sections:

*   **A To-Do list** for pending tasks.
*   **A daily log** of what you've done and the time spent.
*   **Email notifications** (Duolingo-style) if you haven't worked on a project for more than a week.
*   **A sketch area** to draw ideas.
*   **A brainstorming space** to connect ideas freely.
*   **A resources section** to save useful links (tutorials, documentation, etc.).

For now, I'm focused on the frontend. I've already made some technical decisions:

*   **Routing**: I'll use React Router DOM's declarative mode (`<BrowserRouter>`). It's perfect for the application's current complexity, where data lives in `localStorage`. In the future, if I migrate to a backend like Flask, I might consider `createBrowserRouter`.
*   **State Management**: I will adopt the "Single Source of Truth" principle. I'll centralize the state in a common ancestor to avoid inconsistencies and facilitate synchronization between components.

Currently, the application's foundation already allows adding the project name, stack, dependencies, and requirements. I hope to keep making progress and share more details soon!
