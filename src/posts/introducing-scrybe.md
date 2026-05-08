---
title: 'Introducing Scrybe'
date: '2026-03-06'
excerpt: 'Scrybe is a school management platform built for Sierra Leone. Grades, attendance, payments, and parent communication — digitized and simplified.'
tags: ['Product']
authors: ['Team']
draft: false
---

We're building Scrybe — a school management platform designed for Sierra Leone's schools.

Most schools here still run on paper. Grades in notebooks, attendance in registers, payments tracked in ledgers, report cards handwritten one by one. It works, until it doesn't — a misplaced folder, a calculation error, a parent who needs records from two terms ago. We wanted to fix that.

## The problem

Walk into a school office in Freetown during exam season and you'll see the same scene everywhere: 
- stacks of paper, 
- a calculator, 
- and a teacher spending hours computing averages and writing report cards by hand. 

Multiply that across hundreds of students, and you have a system held together by effort and memory.

Schools need software, but the options are either too expensive (built for international schools with international pricing) or too generic (designed for a different market with different workflows). What Sierra Leone's schools need is something built for how they actually work.

## What Scrybe does

Scrybe handles the core operations that every school deals with daily:

- **Grades and results.** Teachers enter marks per subject and term. The system computes averages, rankings, and generates report cards. Export to PDF or Excel for printing. No more manual calculations.

- **Attendance.** Mark attendance daily with a few clicks. View patterns over time. Know which students are absent before the parent calls.

- **Payments.** Track fees, record payments, and generate receipts. See who has paid and who hasn't at a glance. Finance staff stop chasing paper trails.

- **Communication.** Send announcements to parents when results are ready, when fees are due, or when school reopens. Target messages by class, staff, or the whole school.

- **Staff management.** Add teachers and staff with role-based access. A teacher sees their classes. An accountant sees finances. The principal sees everything.

## How it works

Scrybe is a web application. Schools sign up, add their classes and subjects, enrol students, and start working. There's nothing to install — it runs in any browser on any device.

We built it with SvelteKit and SQLite, keeping the stack deliberately simple and fast. The frontend is responsive and works on phones, which matters in a market where many administrators use mobile devices as their primary computer.

The multi-tenant architecture means every school operates in complete isolation. One school can never see another school's data. This was a non-negotiable design decision from day one.

## Pricing that makes sense

We spent a lot of time thinking about pricing. Software designed for American or European schools charges per-student-per-month fees that would cost more than a term's tuition in Sierra Leone. That model doesn't work here.

Scrybe uses a freemium model:

- **Free tier** for small schools (unlimited students, staff and free forever).
- **Standard tier** at 299 SLE/month for unlimited students, all features, more storage, SMS quotas, etc.
    - **Term and annual billing** with discounts for schools that pay upfront.
    - you can also get one month free if you referr a school and they pay.

We designed the pricing to align with how schools operate. Schools bill per term, so we offer per-term pricing. The free tier isn't a trial — it's permanent, so the smallest schools get real value without paying anything.

## Built for the local context

Small decisions matter. Scrybe includes Sierra Leonean cities in the registration form. Prices are in New Leones, not dollars. SMS goes through providers that cover local carriers. The interface is simple enough that a school secretary with limited tech experience can use it after a 10-minute walkthrough.

We also integrated with [Monime](https://github.com/spikenardco/monimejs) for payment processing — the same payments API we built our [TypeScript SDK](/blog/building-a-payment-sdk) for. One of the advantages of building a suite of products is that they can reinforce each other.

## What we've learned so far

Building for schools taught us things we didn't expect:

**Simplicity is the feature.** Every time we considered adding a setting or an option, we asked: will this confuse a first-time user? If yes, we cut it. The schools that need our software the most are the ones least likely to read documentation.

**Offline matters.** Internet in Sierra Leone is not always reliable. We've designed Scrybe to be as resilient as possible — pages load fast, forms don't lose data on connection drops, and exports work locally.

**Trust takes time.** Schools are cautious about digitizing their records. They've been burned by software that stopped working, or companies that disappeared. Being locally built and actively maintained is a real differentiator.

## What's next

Scrybe is in active development. Grade entry, attendance, and payment tracking are functional. We're actively working on the student portal(so students can check their own results), PDF report card generation, and expanding the student/parent-facing features.

If you run a school in Sierra Leone and want to try Scrybe, or if you're interested in following the project, [reach out to us](https://github.com/spikenardco). We're actively looking for pilot schools to refine the product with.
