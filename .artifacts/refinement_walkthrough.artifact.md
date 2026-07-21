# Operix Site Refinement Walkthrough

This walkthrough summarizes the structural and aesthetic refinements implemented on the Operix platform, focusing on high-performance UX, cinematic motion, and functional business integration.

## 🎬 UX & Cinematic Touches

We've introduced a layer of "Digital Texture" to make the site feel alive and responsive:

- **Background Pulse**: A fixed radial gradient (`#1e2d40`) that subtly pulses (scale/opacity) behind the content. It provides a rhythmic depth to the workspace.
- **Cursor-Linked Lighting**: Product cards in the Matrix now feature a "Flashlight" effect. A radial highlight follows the mouse cursor, revealing details and creating a tactile interactive experience.
- **Parallax Depth**:
    - **Home**: The hero typography and decorative nodes move at staggered rates on scroll.
    - **Manifesto**: Large background indices (01, 02, etc.) move independently of the text, creating a layered cinematic feel.
- **Scroll-Linked Reveal**: In the Manifesto, words are illuminated individually as the user scrolls, pacing the reading experience and emphasizing the "Architecture of Efficiency."

## 🎨 Design Tokens: Navy & Gold

The visual identity is now anchored in a refined color palette:
- **Navy Blue (#1e2d40)**: Used as the primary accent for background pulses, logo elements, and interactive states.
- **Deep Space (#030612)**: The primary background for the cinematic Manifesto page.
- **Gold (#c5a059)**: Applied strategically to the Logo and key calls-to-action to represent premium quality and precision.

## 📊 Real Data Integration

All placeholder data has been replaced with verified corporate details:
- **Emails**:
  - General: `info@operix-solutions.com`
  - Billing: `subscription@operix-solutions.com`
- **Phone**: `+966 500 823 643`
- **Offices**:
  - **Riyadh (HQ)**: Digital City, HQ-01, KSA.
  - **Khartoum**: Regional Office, Sudan.

## ⚙️ Functional Forms & GAS API

We have established a robust backend pipeline using **Google Apps Script (GAS)**:
- **Unified API**: All forms (Contact, Booking, Subscription) communicate with a single GAS endpoint for secure dispatch.
- **Modular Configurator**: The Subscription page allows users to toggle specific ecosystem modules (HRIS, OPS, FMIS, etc.) before requesting setup.
- **Multi-Step Booking**: A guided experience for requesting system demos, ensuring high-quality lead data.
- **Secure Submission**: All forms include SSL-encrypted secure initialization and provide real-time status feedback (Dispatching/Success).

## 🏛️ New Manifesto Page

The Manifesto has been redesigned as an immersive narrative experience:
- **Vision**: To be the foundational digital infrastructure for the next generation of industrial giants.
- **Philosophy**: Emphasizing that "complexity is the enemy of growth."
- **Visuals**: High-contrast typography, cinematic transitions, and a morphing geometric outro.

## 🏷️ Logo & Favicon Update

- **Logo**: A new geometric SVG mark representing structural chevrons and a core operational diamond.
- **Favicon**: Synchronized across all formats (`/favicon.svg` and `/logo.png`) to ensure brand consistency in browser tabs and bookmarks.

---
*Walkthrough generated for Operix Fixed - July 2026*
