# FreelanceKit Project Context

This document is designed to be provided to an LLM to quickly understand the current state, architecture, and features of the "FreelanceKit" repository.

## Overview
FreelanceKit is a Next.js (App Router) SaaS application designed to help independent professionals instantly generate pristine, dual-column, legal-grade PDFs directly in their browser completely for free, with zero data-retention. It supports dynamic Invoices, Service Contracts, and Non-Disclosure Agreements (NDAs).

## Tech Stack
- **Framework:** Next.js 16+ (App Router)
- **Styling:** Tailwind CSS v4 (Full OS-native Dark Mode and Mobile Responsiveness)
- **Iconography:** `lucide-react`
- **PDF Engine:** `html2pdf.js` (Client-side DOM to PDF snapshotting)
- **State Management:** React `useState` (Prop-drilled wizard state)

## Core Architecture
The app is purely client-side oriented (`"use client"`), utilizing zero databases. It consists of two primary routes wrapped by a global Navbar and Footer.

### 1. The Marketing Landing Page (`/src/app/page.tsx`)
A high-converting, modern SaaS landing page.
- Utilizes CSS gradients, glassmorphism, and responsive grid layouts.
- Highlights features (Secure local browser environments, 100% free, premium aesthetics).
- Deeply integrates with Tailwind Dark Mode (`dark:bg-gray-950`).

### 2. The Dashboard Wizard (`/src/app/dashboard/page.tsx`)
The central tool application. Features a 3-step dynamic wizard:
- **Step 1:** Tool Selection (`/src/components/ToolSelection.tsx`). Lets users pick between Invoice, Contract, and NDA.
- **Step 2:** Form Filling (`/src/components/FormSection.tsx`). A 25+ field robust form that conditionally displays fields (like Bank Details, Tax Rates, or Non-Compete months) strictly based on the tool selected in Step 1.
- **Step 3:** Document Generation (`/src/components/ActionButtons.tsx`). High-fidelity 'Download PDF' execution block wrapping the `html2pdf.js` engine.

### 3. The PDF Render Engine (`/src/components/DocumentTemplates.tsx`)
This is the heart of the application. 
- It houses three isolated visual templates (`Invoice`, `Contract`, `NDA`).
- **CRITICAL CONSTRAINT:** The templates are securely locked into Light Mode utilizing exact `#hex` values instead of flexible Tailwind variables. This ensures the PDF engine (`html2canvas`) does not accidentally generate solid black blackout rectangles for users who trigger the PDF generator while their OS is natively in Dark Mode.
- The templates sit entirely off-screen (`absolute top-[200vh] -left-[9999px]`). Only the PDF engine parses them.
- Features deep math logic for Invoices: dynamically calculating tax modifiers, discounts, and total sums inline before mounting them into the PDF string.

## Technical Milestones Solved
1. **The PDF Horizontal Slicing Bug:** `html2canvas` inherently suffers from a DOM-scaling bug where setting margins in `jsPDF` slices the right side of standard typography. We solved this by locking `windowWidth: 800` in the generation config, setting `jsPDF` margins to `[20, 0, 20, 0]`, and applying strict raw CSS grid padding (`px-[40px]`) onto the immediate document templates to artificially bake in the padding natively.
2. **Tailwind v4 `oklch` Crash:** The `html2pdf.js` library uses a legacy parser that crashes brutally on Tailwind v4's default `lab` and `oklch` color formats. We solved this by running search-and-replace scripts mapping all internal PDF text styles directly to standard `#hexadecimal` (e.g. replacing `text-slate-500` with `text-[#64748b]`) bypassing the `oklch` calculation.
3. **Full Scale Mobile Adjustments:** Steppers, flexible grids, Action buttons, and fluid typography all respond down safely to smartphone scaling metrics while maintaining deep dark mode visual cohesion.

## Current State
The project is strictly launch-ready as a static deployable asset on platforms like Vercel or Cloudflare Pages.
It is lightweight, cleanly abstracted, fully responsive, visually elite, and functionally perfect.
