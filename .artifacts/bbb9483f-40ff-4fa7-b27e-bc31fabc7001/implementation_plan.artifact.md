# Implementation Plan: Full Ecosystem Translation (Phase 4)

This plan ensures that every section of the Operix platform is correctly translated into Arabic, eliminating all remaining hardcoded English strings.

## User Review Required

> [!IMPORTANT]
> **Dynamic Content Handling:** For technical metadata like `GATEWAY_INIT` or version numbers, I will maintain the English/Mono aesthetic as it is part of the "Industrial Code" brand identity, but all descriptive labels and headings will be localized.

## Proposed Changes

### 1. Translation Dictionary Expansion
*   **[MODIFY] [en.json](file:///Users/asim/Desktop/opx-site/src/i18n/locales/en.json) & [ar.json](file:///Users/asim/Desktop/opx-site/src/i18n/locales/ar.json)**:
    *   Add keys for all missing labels: `Perspective`, `System Load`, `Operational Layers`, `Tactical Edge`, `Kernel Status`, etc.
    *   Ensure all form-specific labels (Force Strength, Operative Identity, Mission Specifications) are fully localized.

### 2. Component Localization
*   **[MODIFY] [Home.tsx](file:///Users/asim/Desktop/opx-site/src/pages/Home.tsx)**:
    *   Localize the "ENGINEERING" header and "LAYERS" background text.
    *   Localize telemetry labels like "Visitors" and "REQ_SEC".
*   **[MODIFY] [Studio.tsx](file:///Users/asim/Desktop/opx-site/src/pages/Studio.tsx)**:
    *   Localize "Deployment Ready" and system stats labels (Uptime, Security, etc.).
*   **[MODIFY] [Vision.tsx](file:///Users/asim/Desktop/opx-site/src/pages/Vision.tsx)**:
    *   Localize "Strategic Asset", "Regional Connectivity", and "Structural Sovereignty".
*   **[MODIFY] [AuthContext.tsx](file:///Users/asim/Desktop/opx-site/src/context/AuthContext.tsx)**:
    *   Localize the "Initializing Core" boot message.
*   **[MODIFY] [Navbar.tsx](file:///Users/asim/Desktop/opx-site/src/components/Navbar.tsx)**:
    *   Localize "System: Active" and "v2.0.4 // KSA_RYD" status indicators.

### 3. RTL Alignment Audit
*   Check that the new Arabic translations don't cause layout overflow or overlapping in the high-density sections (like the 4-column Operational Layers).

## Verification Plan

### Manual Verification
*   **Language Toggle**: Switch between EN and AR and verify that **zero** English words remain in descriptive areas (excluding branding and version numbers).
*   **Form Validation**: Ensure error messages (e.g., "Field Required") are also localized.
*   **Visual Check**: Verify that Arial font is correctly applied to all new Arabic text and legibility remains high.
