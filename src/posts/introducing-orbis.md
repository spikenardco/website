---
title: 'Introducing Orbis'
date: '2026-04-18'
excerpt: 'Orbis is a patient records platform for Sierra Leone''s healthcare sector. One patient, one record, accessible across every facility they visit.'
tags: ['Product']
authors: ['Team']
draft: true
---

We're building Orbis — a unified patient records system for healthcare facilities in Sierra Leone.

The healthcare system here runs on paper. Patient folders in filing cabinets, handwritten clinical notes, prescriptions scribbled on pads. When a patient visits a new clinic, they start from scratch. Their medical history, allergies, past diagnoses — all trapped in a folder at the last facility they visited, if the folder can even be found.

Orbis is our attempt to change that.

## The problem is bigger than paper

The obvious problem with paper records is that they get lost. Folders are misfiled, damaged by water, or destroyed in moves. But the deeper problem is fragmentation.

A patient in Sierra Leone might visit a private clinic for a consultation, a lab for blood work, a hospital for a follow-up, and a pharmacy for medication — all within a week. Each facility maintains its own records. None of them can see what the others have written. The patient becomes the messenger for their own medical history, and patients are unreliable messengers — not because they're careless, but because medical information is complex.

Misremembered allergies. Forgotten medications. Duplicate tests because the previous results are at another clinic. These aren't edge cases. They're everyday realities that affect patient safety.

## What Orbis does

Orbis gives every patient a single, unified record that follows them across facilities.

**Global patient identity.** Each patient gets a unique ID that works across the entire platform. When a patient walks into any participating facility, staff can pull up their complete medical history in seconds — not minutes of digging through cabinets.

**Clinical records.** Doctors record consultations using structured SOAP notes (Subjective, Objective, Assessment, Plan). Vital signs are tracked with historical trends. Diagnoses are logged with status tracking. Prescriptions are linked to visits.

**Appointment scheduling.** Facilities manage their calendars digitally. Patients can be scheduled, checked in, and tracked through their visit. No more paper appointment books with crossed-out entries and margin notes.

**Multi-facility access.** A clinic in Freetown and a hospital in Bo can both see a patient's records — with proper authorization and audit trails. The patient's data doesn't belong to a facility; it belongs to the patient.

## Privacy is not optional

Building a shared health records system means taking privacy seriously. Medical data is among the most sensitive information that exists. We've designed Orbis with privacy as a core architectural principle, not an afterthought.

**Field-level encryption.** Patient names, phone numbers, and addresses are encrypted at rest. A database breach doesn't expose patient identity.

**Row-level security.** PostgreSQL's row-level security ensures that each facility can only access records they're authorized to see. This isn't application-level filtering — it's enforced at the database layer.

**Role-based access.** A receptionist can look up a patient and check them in. A nurse can record vitals. A doctor can read and write clinical notes. Each role sees exactly what they need and nothing more.

**Complete audit trail.** Every record access and every modification is logged: who accessed it, when, from which facility, and what they changed. The audit trail is immutable and has a seven-year retention policy.

We're building to the standards of ECOWAS data protection principles and drawing from HIPAA's framework, not because Sierra Leone requires it today, but because we believe health data should be protected regardless of what the law says.

## Why Go

Orbis is built with Go and PostgreSQL. We've explained our general thinking on technology choices in [why we chose Zig](/blog/why-we-chose-zig) and [choosing boring technology](/blog/choosing-boring-technology), and the reasoning for Orbis follows similar principles.

Go gives us a fast, reliable backend with excellent concurrency support. PostgreSQL gives us row-level security, strong data integrity, and a proven track record in systems where data loss is unacceptable. sqlc generates type-safe database code from SQL, which means fewer runtime errors in the layer that touches patient data.

We're planning a SvelteKit web application for clinic staff and a desktop app using Wails for facilities with intermittent internet — the desktop app will include offline support with automatic sync when connectivity returns.

## Who it's for

Our primary users are private clinics and small hospitals — facilities with one to ten doctors, a few nurses, and a receptionist. These are the facilities most likely to still be on paper and most able to adopt a new system quickly (fewer stakeholders, faster decisions).

The specific roles we're designing for:

- **Receptionists** register patients, schedule appointments, and handle check-ins
- **Nurses** record vitals and triage patients
- **Doctors** write clinical notes, record diagnoses, and manage prescriptions
- **Administrators** manage staff, configure the facility, and review audit logs

Patients will eventually have their own portal — a mobile app where they can view their records, see appointment history, and control which facilities can access their data. That's a later phase, but it's in the architecture from the start.

## Where we are

Orbis is in early development. The database schema, authentication system, patient management, and appointment scheduling are in place. We're currently building out the clinical records workflow — the consultation flow where doctors create SOAP notes, record diagnoses, and write prescriptions.

Healthcare software is one of the highest-stakes domains you can build for. We're taking our time to get the foundations right — the data model, the privacy controls, the audit system — before rushing to add features.

If you're a healthcare professional in Sierra Leone interested in moving your facility off paper records, or if you work in health technology and want to follow our progress, [reach out](https://github.com/spikenardco). We'd value your perspective as we build.
