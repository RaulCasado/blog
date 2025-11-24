---
title: 'My First 3 Months as a Developer: From Zero to Managing 5 Production Projects'
description: 'A raw, honest chronicle of my journey as a junior developer. From fixing broken push notification systems to managing multi-timezone architectures - this is what nobody tells you about your first programming job.'
pubDate: '2025-11-24'
heroImage: '/blog-placeholder-5.jpg'
heroImageAlt: 'Developer working on multiple projects'
tags: ['job']
lang: 'en'
---

Let me start with something unexpected: **In my first 3 months as a developer with zero professional experience, I ended up managing 5 production projects simultaneously, fixing critical bugs affecting 50+ employees, and implementing complete systems from scratch.**

This isn't a brag post. It's a reality check about what junior developers sometimes face, and honestly? It's been both the most intense and most rewarding experience of my life.

## How It All Started

Three months ago, I walked into my first day as a developer at Internalia Group. I was nervous, excited, and ready to learn. What I didn't expect was the steep learning curve ahead: legacy code, production systems serving real clients, and the opportunity to grow rapidly.

This is what those 3 months really looked like.

## The Numbers Don't Lie

Let me give you the raw metrics:

- **80+ tasks** completed in Jira
- **5 enterprise projects** in production
- **~27 tasks/month** average
- **0 days** of critical downtime after my fixes
- Technologies learned from scratch: **Firebase/Firestore, GraphQL, FCM, multi-timezone handling**

For context, a typical junior at 3 months handles maybe 1-2 projects with constant supervision. I had five, completely autonomous.

## My First Bug

I remember my first bug like it was yesterday. The problem was that dates were displaying incorrectly on a chart when you changed your computer's local time zone - you could be on Monday and it would say it was Sunday. And yes, like any programmer, I went to the area where these dates were being displayed and saw a Date object. At that moment, I felt true terror. As you well know, JavaScript's Date object is one of the most complex and problematic to handle, especially when time zones come into play. After some investigation, I discovered that the problem lay in how the date was being parsed. The system was converting to UTC first, then applying the time zone, which caused unexpected date shifts. I fixed it by changing how the date was parsed, making sure to correctly interpret the user's local time zone before any conversion. This small change solved the problem and taught me a valuable lesson about the importance of properly handling time zones in global applications.

## Project 1: Work Time App (WTA) - The Timezone Nightmare

### The Bug That Affected 50+ Employees

If you thought the previous date error was serious, wait until you hear this.

**The problem:** Employees in Spain (UTC+1) and El Salvador (UTC-6) were seeing incorrect dates in their time tracking records. This wasn't just annoying - it was affecting payroll calculations. The problem was that there was simply no time zone logic in the system. So I had to build it from scratch. I used moment.js, a JavaScript library to handle dates and times in a more simple and robust way. After many trials and errors, I saw what I was implementing and it was something like this:

After digging through the codebase, I found the culprit:

```javascript
// BEFORE (incorrect):
moment.utc(register.start).tz('Europe/Madrid')

// AFTER (correct):
moment(register.start, 'YYYY-MM-DD HH:mm:ss')
```

The issue was parsing. The system was converting to UTC first, then applying timezone, which caused date shifts. And more importantly, I learned that timezones are every developer's nightmare. (Again)

### Building a Complete Vacation System from Scratch

One of my bigger challenges was designing and implementing a complete vacation management system. Not just the UI - the entire architecture.

I proposed three different solutions, evaluated the pros and cons of each, and implemented the optimal one. Here's what I built:

**Admin View:**
- DataTables with real-time filtering
- Approve/reject workflow
- Export to Excel/PDF/CSV
- Status badges (Pending/Approved/Rejected)

**Employee View:**
- Request form with automatic day calculation
- Historical requests view
- Status tracking
- Optional comments

Among the options were creating a new table which would require not reusing any of the existing code, or modifying the current system. I opted to modify the current system to maintain consistency and avoid code duplication. This way I could integrate everything perfectly with the existing logic.

### The Night Shift Problem

Here's a fun one: employees working night shifts (11 PM - 7 AM) weren't showing up in the next day's dashboard. Why? Because the system only fetched "today's" records.

My solution was innovative (or at least I like to think so):

```javascript
// Fetch TODAY's registers
const todayRegisters = await fetchRegistries(dateToday);

// Fetch YESTERDAY's unclosed registers
const yesterdayRegisters = await fetchRegistries(dateYesterday)
    .then(data => data.filter(reg => !reg.end || reg.end === 'null'));

// Combine both datasets
const allActiveRegisters = [...todayRegisters, ...yesterdayRegisters];
```

**Result:** 100% accuracy regardless of shift timing.

### The Historical Data Integrity Bug

This one was critical. When an admin changed an employee's name in their license (let's say from Pablo to Enrique), **all historical records updated to show the new name**.

Imagine payroll reports showing "Enrique worked 8 hours on September 1st" when it was actually Pablo. This is a compliance nightmare.

**The root cause:** The database was doing real-time JOINs, so changing the name in the `licenses` table retroactively changed all linked records.

**My solution:** Partial denormalization with triggers.

```sql
-- Add employee name to registries table
ALTER TABLE registries 
ADD COLUMN employee_name VARCHAR(255);

-- Trigger to save name at the moment of registration
CREATE TRIGGER save_employee_name
BEFORE INSERT ON registries
FOR EACH ROW
BEGIN
    SET NEW.employee_name = (
        SELECT name FROM licenses WHERE id = NEW.user_id
    );
END;
```

Now historical records preserve the name at the time they were created. Data integrity: **restored**.

### The Mystery of the 500 Records

One day, clients reported they couldn't add more non-working dates. After investigating, I discovered something interesting:

**The problem:** There was a hardcoded limit of 500 records in the queries, combined with `ORDER BY` that caused important records to be left out.

```sql
-- Problematic query:
SELECT * FROM registries 
WHERE date >= '2024-01-01' 
ORDER BY timestamp DESC
LIMIT 500  -- ❌ Limit causing data loss
```

**The root cause:** Without access to the GraphQL server or production database, I couldn't implement the complete solution. But I documented the problem in detail, proposed solutions (remove LIMIT, implement real pagination, optimize indexes) and escalated the issue.

**Lesson learned:** Not all bugs can be fixed immediately, especially in distributed architectures. The key is to document the problem well for whoever does have the necessary access.

### Auto-Calculate Hours: UX That Saves Time

One of those "small" details that makes a difference:

Before, administrators had to manually calculate weekly and monthly hours every time they modified a schedule. Tedious and error-prone.

**I implemented:**

```javascript
function calculateScheduleHours() {
    let totalHours = 0;
    for(let day = 1; day <= 7; day++) {
        const hours = parseFloat($(`#hours_${day}`).val()) || 0;
        const pause = parseFloat($(`#pause_${day}`).val()) || 0;
        totalHours += (hours - pause);
    }
    $('#weekly_hours').val(totalHours.toFixed(2));
    $('#monthly_hours').val((totalHours * 4.33).toFixed(2));
}
```

**Result:** Zero manual calculation errors + saving 10-15 minutes per schedule modification.

Sometimes the best features are the ones nobody notices because they "just work".

### Employee Portal: Bridging Mobile and Web

Interesting challenge: adapt a system designed for mobile webview to the web panel, maintaining compatibility with both.

**The challenge:** Mobile users used PIN authentication, while web users used standard session. The same endpoint had to handle both cases.

**Solution:** Mode detection (Individual vs Office) and appropriate validation according to context.

**Memorable debugging:** 400 error that turned out to be incorrect PIN validation. Hours of debugging for one line of code. Welcome to development. 😅

## Project 2: Málaga CF - Push Notifications from Hell

This project almost broke me. And then it became my proudest achievement.

### Inheriting a Broken System

I received a "working" push notification system. Except it didn't work. At all. Zero documentation. Broken code. And real users waiting for notifications.

I had to:
1. Understand Firebase Cloud Messaging (FCM) from scratch
2. Debug why notifications sent to "Everyone" weren't reaching anyone
3. Implement different notification types (individual, group, by sector)
4. Create automatic notifications for events and deadlines

### The Great Debugging Adventure

After hours of debugging, I found the issue:

```php
case 'Todos':
    $idinsert = -2;
    // BUG: Missing GCM token fetch!
    // It was sending to the last fetched token, not all tokens
    
    // FIX: Actually fetch all tokens from the database
    $sql = "needed to fetch GCM tokens from db";
```

**From 0% to 100% functionality.** Push notifications were finally working.

### The Automated Deadline Reminders

I built a cron job that runs every 24 hours and sends automatic reminders for events with approaching deadlines:

```php
function enviarNotificacionesDeadline() {
    $ahora = time();
    $ventana24h = $ahora + (24 * 60 * 60);
    
    $eventos = getFirestoreEvents();
    
    foreach($eventos as $evento) {
        if($evento['deadline'] >= $ahora && 
           $evento['deadline'] <= $ventana24h) {
            
            $mensaje = "⏰ Last day!\nDeadline for " .
                      $evento['title'] . " is tomorrow.";
            
            enviarNotificacion($mensaje, $evento['id']);
        }
    }
}
```

Set up on Google Cloud Scheduler, tested thoroughly, and deployed to production.

### The SendGrid Incident

Here's where I learned about **the importance of documentation** the hard way.

I integrated SendGrid for email confirmations. I couldn't test it in development because the development IP wasn't whitelisted in SendGrid, which generated a 403 error. I sent an email to the team warning about this and recommending configuring the whitelist for production.

Despite the warning, we decided to proceed with the production deploy. As expected, emails didn't work initially, but it was quickly resolved by adjusting the configuration.

**Lesson learned:** Document everything in writing. Having the email record helped me clarify the situation and ensure an efficient resolution.

### Collaboration with the Mobile Team

An important part was coordinating with Daniel, the mobile developer. Especially in:

- **Testing push notifications:** We needed multiple devices to test mass sending
- **Data synchronization:** Ensuring the Firestore structure worked for both web and mobile
- **Joint debugging:** Identifying whether a bug was frontend, backend, or coordination between both

**Lesson:** Modern development is rarely solitary work. Communication between teams is as important as the code.

## Project 3: Internalia Group Corporate Website

Complete website redesign (English). I handled:
- AI services section updates (TuCiudad, TuFerIA, TuFeria)
- Case studies and project showcase
- Responsive design improvements
- Social media integration

Pretty straightforward compared to the others, but good practice for frontend work.

## Project 4: Working Day Suite (WDS)

### The Emoji Bug 🌹

Users couldn't save forms with emojis. This was causing clients to be unable to send orders correctly. Together with the mobile apps team, we discovered that the rose emoji (🌹) was causing errors.

The solution was to delete the emoji transaction and coordinate with the mobile apps team to block those characters. I had to use transaction debugging tools and tools like Postman to replicate the error and confirm the solution.

My first date bug was also in this project, where I learned even more about time zone handling.

In this project I also learned to create technical budgets for clients, something I hadn't done before. Well, a bit, but it was more informal. Along with the budgets, I also did some API documentation and fixed some minor bugs. Like duplicates in front-end tables that were causing Out of index errors.

### The Tracker Export Optimization

When exporting more than 1 month of GPS tracking data, file sizes were massive.

**Solution:** When date range > 30 days, only export coordinates (lat, lng, date), skip full timestamps and metadata.

```php
if($dateRange > 30) {
    // Only coordinates, reduce file size
    $export = array('lat', 'lng', 'date');
} else {
    // Full export
    $export = array('lat', 'lng', 'timestamp', 'user', 'activity');
}
```

Saved clients hours of processing time weekly.

## The Skills I Mastered (Frantically)

### Technologies Learned from Scratch:
- **Firebase/Firestore:** 3 days to production-ready
- **FCM Push Notifications:** 1 week to complete system
- **Moment.js timezone handling:** 2 days to fix critical bug
- **GraphQL queries:** 1 day to functional queries

### Skills Developed:
- **Multi-timezone architecture**
- **NoSQL database design** (Firestore)
- **Push notification systems** (FCM)
- **Legacy code archaeology** (reading undocumented code)
- **Production debugging under pressure**
- **API documentation and testing**

## What Nobody Tells You About Your First Dev Job

### 1. Autonomous Learning is Powerful

I worked very autonomously, which pushed me to develop research skills. Google, Stack Overflow, official documentation, and lots of trial and error became my best tools.

**Did it make me learn faster?** Absolutely. **Did I develop problem-solving ability?** Without a doubt.

### 2. Production Bugs Are Terrifying

The first time you realize your code is running in production, affecting real users and real money... that's a different level of responsibility.

### 3. Documentation is Your Best Ally

In any project, especially when working with complex systems, documentation is crucial.

**The lesson:** Document everything. Every warning, every blocker, every decision. In writing. This not only protects you, but helps the entire team understand the technical decisions made.

### 4. Imposter Syndrome is Real

I fixed critical bugs affecting 50+ employees. I built complete systems from scratch. I managed 5 projects simultaneously.

And I **still** felt like I had no idea what I was doing half the time.

That's normal.

### 5. You'll Learn More in 3 Months Than in 2 Years of Tutorials

No amount of online courses prepares you for:
- Debugging a broken push notification system with zero documentation
- Fixing multi-timezone bugs in production
- Designing database architecture for data integrity
- Managing multiple urgent requests simultaneously

You learn by doing. And sometimes, by breaking things.

## The Honest Assessment: Am I Actually Good?

Let me be real: I don't know.

What I **do** know is:
- I completed tasks that nobody expected from a junior
- I solved critical bugs independently
- I implemented complex features from scratch
- I learned new technologies in days, not months
- I worked successfully without supervision

**Industry standard for a 3-month junior:**
- Simple CRUD operations with supervision
- Bug fixes with guidance
- 1 main project
- Lots of questions to seniors
- Constant code reviews
- ~10 tasks/month

**What I did:**
- Critical production bugs independently
- Complex features (push, vacations, multi-timezone)
- 5 simultaneous projects
- Zero supervision
- Zero code reviews
- 27 tasks/month

You tell me.

## What I'm Taking Away

### Technical Skills:
✅ Multi-timezone handling
✅ NoSQL database design
✅ Push notification systems
✅ Legacy code maintenance
✅ Production debugging
✅ API integration

### Professional Skills:
✅ Complete autonomy
✅ Priority management
✅ Documentation discipline
✅ Issue escalation
✅ Pressure management

### Life Lessons:
✅ You can learn anything if you need to
✅ Document everything in writing
✅ Production errors aren't the end of the world
✅ Ask for help when blocked >2 days
✅ Your worth isn't defined by one company

## What's Next?

After this incredible experience, I'm excited about the opportunities ahead. I've learned that I can adapt quickly and face complex challenges.

These 3 months taught me that I can handle much more than I thought, and I'm ready for the next level.

## Final Thoughts

To every junior developer reading this: **you're capable of more than you think.**

You'll be thrown into situations you're not ready for. You'll face bugs that seem impossible. You'll feel like you're drowning.

And then, somehow, you'll figure it out.

That's the job.

But also? **Know your worth.** You've learned, you've grown, and you've proven what you're capable of. That has real value in the market.

Look for opportunities that allow you to keep growing.

**The adventure continues.** 🚀

---

*Want to connect? Find me on [LinkedIn](https://linkedin.com/in/raul-casado) or check out my projects on [GitHub](https://github.com/RaulCasado). Always happy to chat with fellow developers*
