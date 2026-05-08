---
title: 'Introducing InnKeeper'
date: '2026-04-10'
excerpt: 'InnKeeper is a booking and property management platform for Sierra Leone''s hospitality sector. Guests find rooms, operators manage everything.'
tags: ['Product']
authors: ['Team']
draft: true
---

We're building InnKeeper — a lodging platform for Sierra Leone.

The idea started with a simple observation: booking a hotel room in Freetown shouldn't require a phone call, a WhatsApp message, and a leap of faith. But for most properties in Sierra Leone, that's exactly what it takes.

## The gap

Sierra Leone's hospitality sector is growing. New guesthouses and hotels are opening, tourism is increasing, and there's real demand for places to stay. But most properties have no online presence beyond a Facebook page. There's no central platform where a traveller can browse, compare, and book.

International booking platforms exist, but they cater to high-end properties and charge commissions that don't make sense for a guesthouse charging 200,000 SLE per night. What the market needs is something local — built for the properties and the guests that actually exist here.

## What InnKeeper does

InnKeeper serves two sides of the market:

**For guests**, it's a discovery and booking platform. Search by location, price, amenities, and availability. Browse verified property listings with photos and reviews. Book a room and get a confirmation — no phone tag required.

**For hotel operators**, it's a management dashboard. List your property, manage rooms and pricing, handle bookings, track revenue, and coordinate staff. Everything a small hotel needs to run its operation, in one place.

The system also supports operational workflows that matter for day-to-day management:

- **Check-in and check-out processing** for front desk staff
- **Housekeeping tracking** so rooms get cleaned on schedule
- **Maintenance requests** so issues get logged and resolved
- **Staff management** with role-based permissions
- **Analytics** showing occupancy rates, revenue trends, and booking patterns

## Built for Sierra Leone

Like all our products, InnKeeper is built for the local context. That means:

**Mobile-first design.** Most users — both guests and operators — access the internet primarily through their phones. Every screen is designed to work well on small devices.

**Local payment options.** We support Orange Money and other mobile money methods alongside card payments. Cash on arrival is also an option, because that's how many bookings work in practice.

**Simple onboarding.** A hotel owner should be able to list their property in under 30 minutes. No training sessions, no onboarding calls. Fill in your details, upload some photos, set your prices, and you're live.

**Location-aware.** Properties are organized by Sierra Leone's districts, not by arbitrary geographic boundaries. When someone searches for lodging in Bo or Kenema, they get results that make sense.

## The technical approach

InnKeeper is a SvelteKit application with a multi-tenant architecture. Each hotel operates as an isolated business with its own data, staff, and configuration.

We use Drizzle ORM for type-safe database operations and Cloudinary for image management. The authentication system supports three distinct user types — guests, hotel staff, and hotel managers — each with different permissions and dashboards.

The stack is deliberately boring (we've [written about why](/blog/choosing-boring-technology)). SvelteKit gives us server-side rendering for fast page loads, which matters in a market with variable connection speeds. SQLite for development, PostgreSQL for production. No over-engineering.

## What makes this different

There are hotel management systems and there are booking platforms. InnKeeper is both, in one product. A hotel doesn't need to use one tool for managing rooms and another for receiving bookings. Everything lives in one system.

For guests, the differentiator is coverage. We're focused exclusively on Sierra Leone, which means we'll have properties that international platforms don't list. The guesthouse in a small town that's never been on Booking.com? We want it on InnKeeper.

For operators, the differentiator is simplicity and cost. We're not charging 15-20% commissions per booking. The pricing model is designed so that even a small guesthouse with five rooms can afford to participate.

## Where we are

InnKeeper is in active development. The core architecture is in place — multi-tenant data model, authentication for all user types, property and room management, the booking data model. We're currently building out the guest-facing search and booking flow, which is the critical path to launch.

If you operate a hotel, guesthouse, or inn in Sierra Leone and want to be part of the first wave of listed properties, [get in touch](https://github.com/spikenardco). We're looking for operators who want to help shape the product.
