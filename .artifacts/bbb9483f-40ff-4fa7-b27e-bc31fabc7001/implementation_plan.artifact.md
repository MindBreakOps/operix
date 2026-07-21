# Implementation Plan: Local Asset Migration

This plan involves downloading all external cinematic images used across the platform and hosting them locally within the project structure to ensure production stability, safety, and offline resilience.

## User Review Required

> [!IMPORTANT]
> **Storage Strategy:** All images will be stored in `/public/assets/images/`. This ensures they are accessible via absolute paths (e.g., `/assets/images/hero.jpg`) and correctly bundled by Vite.

## Proposed Changes

### 1. Asset Provisioning
*   Create the directory `public/assets/images/`.
*   Download and rename the following 13 industrial assets:
    *   `hero-industrial.jpg`
    *   `tech-infra.jpg`
    *   `ai-logic.jpg`
    *   `logistics-core.jpg`
    *   `human-capital.jpg`
    *   `fiscal-layer.jpg`
    *   `clinical-hub.jpg`
    *   `academic-os.jpg`
    *   `community-hub.jpg`
    *   `mena-vision.jpg`
    *   `sovereignty.jpg`
    *   `riyadh-hq.jpg`
    *   `khartoum-rd.jpg`

### 2. Code Refactoring
Update all Unsplash URLs to local relative paths in the following files:
*   **[MODIFY] [Home.tsx](file:///Users/asim/Desktop/opx-site/src/pages/Home.tsx)**
*   **[MODIFY] [Studio.tsx](file:///Users/asim/Desktop/opx-site/src/pages/Studio.tsx)**
*   **[MODIFY] [Vision.tsx](file:///Users/asim/Desktop/opx-site/src/pages/Vision.tsx)**
*   **[MODIFY] [Manifesto.tsx](file:///Users/asim/Desktop/opx-site/src/pages/Manifesto.tsx)**

### 3. Optimization
*   Ensure all images are referenced correctly with `alt` tags and `loading="lazy"` where applicable to maintain high performance.

## Verification Plan

### Automated Tests
*   Run `npm run build` to ensure all local assets are correctly detected by the Vite build engine.

### Manual Verification
*   Inspect each page to confirm images load correctly from the `/assets/images/` path.
*   Check the Network tab in DevTools to verify zero external requests to `images.unsplash.com`.
