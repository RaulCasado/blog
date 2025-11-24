---
title: 'From Interview to Code: A Chronicle of My First Weeks as a Programmer'
description: "I've been away for three weeks, but for a good reason! I'll tell you all about my interview, how I landed my first job as a programmer, and my incredibly productive first week."
pubDate: '2024-07-25'
heroImage: '/blog-placeholder-4.jpg'
heroImageAlt: 'A desk with a computer showing code'
tags: ['personal', 'career-development', 'php', 'firestore', 'javascript']
lang: 'en'
---

I'm back! I know it's been three weeks of silence around here, but believe me, it's been for a very, very good reason. This isn't a technical post like the ones I usually write, but a more personal update about a big change in my life that I'm incredibly excited to share: **I've landed my first job as a programmer!**

The journey has been intense and the learning curve steep, so I thought it would be interesting to share the whole process with you, from the interview to my first week "in the trenches."

## Weeks 1 & 2: The Calm Before the Storm (or rather, the Study Session)

It all started three weeks ago with a job interview. The usual nerves, technical questions, project discussions... but in the end, the feeling was good. So good that, shortly after, the news arrived: **the job was mine!**

The joy was immense, but it quickly turned into a deep sense of responsibility. I knew I had to come prepared, so those two weeks before starting became a personal training camp.

My goal was twofold: to brush up on technologies I knew I'd be using and to explore others that sparked my curiosity.

1. **Brushing up on PHP and Firebase/Firestore**: Although I already had a foundation, I wanted to go deeper. I reviewed PHP syntax, its quirks, and built small projects to get comfortable again. At the same time, I dove into **Firebase and Firestore**. I set up small applications to fully understand how to structure data, how security rules work, and how to interact with the database in real-time.

2. **Exploring the World of AI (RAG and Faiss)**: As you know, artificial intelligence is a field I'm passionate about. I took the opportunity to work on small projects with **RAG (Retrieval-Augmented Generation)** and **Faiss**, a library from Facebook AI for similarity search. I wanted to understand firsthand how a language model can be combined with a vector database to create more powerful question-answering systems. It was fascinating, and although I wouldn't be using it on my first day, it helped keep my mind sharp and continue learning. And hey, who knows? Maybe I'll use it in the future.

Those were two weeks of intense study, but incredibly rewarding. Every small project I completed was a confidence boost.

## Week 3: My First Week in the Real World

And then the day came. The third week was my first week on the job. The feeling of opening your laptop knowing that the code you're about to write will be used by real people is... indescribable. And it has been, without a doubt, one of the most productive weeks of my life.

Here’s a summary of my first missions:

### The Mystery of the Time-Traveling Date in PHP

My first task was to fix a curious bug. In one part of the application, dates were displaying incorrectly, often showing the day before the one selected. This happened when a user's PC had a different local time zone setting. After a bit of digging, I found the problem was in the date parsing. The solution was to use `getUTCTime()` to normalize the date to UTC before processing it, ensuring the client's time zone didn't affect the result. First bug squashed!

### Feeding the AI with JSON

One of my most interesting tasks was preparing data for the company's AI model. My job was to structure various pieces of information into **JSON** format. It wasn't just "writing JSON," but understanding what data the model needed, how it should be nested, and what format was most efficient for the AI to "understand." It was great to see my theoretical knowledge of APIs and data structures being applied to a real AI project.

### Developing New Features

I spent the last part of the week adding new features to an internal application. This is where I got to touch a bit of everything:

* **Expandable Image with JavaScript**: I implemented a feature allowing users to click on an image to view it enlarged in a modal. A front-end development classic.
* **Modal That Closes on Outside Click**: To improve usability, I added a listener so that if the user clicks outside the image modal, it closes automatically. Small details that make a big difference.
* **Observation and Deadline Fields in Firestore**: I added new fields to the Firestore database. One was an "observations" field for free text. Another, more interesting one, was a `deadline` field. This field is used to prevent a user from registering for an event after the deadline has passed. This involved not only adding the field but also the corresponding validation logic.
* **Irreversible Registrations**: I implemented logic so that once a user registers for an event, they cannot undo the action.

## And to Top It All Off: The NASA International Space Apps Challenge

As if the week hadn't been intense enough, I decided to join the [NASA International Space Apps Challenge](https://www.spaceappschallenge.org/) over the weekend. And what an experience it was!

Our team developed **SpaceCrafter**, a project I was particularly excited about. It's an educational web application designed for kids and space enthusiasts to design and build their own 2D space habitats.

The best part is that it's not just a simple drag-and-drop game. Every module you use is **based on real designs from NASA and the ISS**, with their actual technical specifications, costs, and weights. As you build, an **AI assistant** guides you in real-time, offering tips on where to place life support, how to optimize efficiency, or alerting you to design flaws.

The project included user profiles to save your creations, an achievement system, and even a leaderboard for the community to vote on the best habitats. It was an incredible challenge to develop all of this in one weekend, but a fantastic opportunity to apply everything I've learned and continue exploring new ideas.

## Conclusion

It's been a crazy week, in the best possible way. From fixing bugs in production to developing new features and capping it all off with a NASA hackathon. I've learned more in these past few days than in months of studying on my own. The feeling of applying theory to real-world problems, collaborating with a team, and seeing your work have a direct impact is incredibly motivating.

Now, it's time to keep learning and adding value. And of course, get back to the blog! I promise the wait was worth it.

Here is the link to the NASA project if you want to check it out: [SpaceCrafter](https://nasa.manianetwork.es/).
See you in the next post!
