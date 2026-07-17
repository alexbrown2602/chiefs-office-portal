# Takla Nation — Chief's Office Portal

Enterprise project & file management dashboard for Takla Nation, built with **Next.js**, **TypeScript**, and **Tailwind CSS**.

## Features

- Executive dashboard matching the Chief's Office Portal mockup
- Department selector that filters approvals, KPIs, and meetings
- Needs Approval / Signature workflow (Sign, Decide, Review, Done)
- Team activity accordion with priority flags
- Upcoming meetings & calendar view
- Document repository with version history
- Tasks & action items register
- Finance dashboard with department budgets
- Reports & analytics
- Login and signup with role selection (demo auth via localStorage)
- Role-aware sidebar navigation across departments and operations

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

**Demo login:** `demo@takla.ca` / `demo1234`

## Tech stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS 4
- lucide-react icons

## Project structure

```
src/
  app/
    login/              # Sign in
    signup/             # Register
    (portal)/
      dashboard/        # Chief's Office overview
      approvals/        # Signature queue
      files/            # Document repository
      tasks/            # Task register
      calendar/         # Meetings
      finance/          # Finance dashboard
      reports/          # Analytics
      settings/         # Profile & security
      departments/[slug]/
  components/           # UI building blocks
  lib/                  # Mock data & auth helpers
```

## Based on

UI mockup for Chief's Office Portal and the Enterprise Project & File Management System Proposal (Phase 1–2 feature surface with mock data).
