# Page Migration and Design Update Plan

Migrate the remaining pages (Legal, Vision, Subscription, CmsLogin, AdminDashboard) from the old `operix-website` to the new `opx-site` with the updated minimalist, brutalist design.

## Proposed Changes

### i18n Integration
- [MODIFY] [en.json](file:///Users/asim/Desktop/opx-site/src/i18n/locales/en.json)
- [MODIFY] [ar.json](file:///Users/asim/Desktop/opx-site/src/i18n/locales/ar.json)
    - Add all text content from the old pages into the structured i18n files.

### Pages Migration (New Design)
- [NEW] [Legal.tsx](file:///Users/asim/Desktop/opx-site/src/pages/Legal.tsx)
    - Implement with brutalist grid, hard borders, and clear typography.
- [NEW] [Vision.tsx](file:///Users/asim/Desktop/opx-site/src/pages/Vision.tsx)
    - Implement with bold philosophies and global nodes.
- [NEW] [Subscription.tsx](file:///Users/asim/Desktop/opx-site/src/pages/Subscription.tsx)
    - Implement the module configurator and ZATCA ledger.
- [NEW] [CmsLogin.tsx](file:///Users/asim/Desktop/opx-site/src/pages/CmsLogin.tsx)
    - Implement a clean, secure login interface.
- [NEW] [AdminDashboard.tsx](file:///Users/asim/Desktop/opx-site/src/pages/AdminDashboard.tsx)
    - Implement the CMS and analytics dashboard with the new design tokens.

### Routing
- [MODIFY] [App.tsx](file:///Users/asim/Desktop/opx-site/src/App.tsx)
    - Replace placeholders with actual components and add missing routes.

### Task Tracking
- [MODIFY] [tasks.md](file:///Users/asim/Desktop/opx-site/tasks.md)
    - Update with the completion of these migration tasks.

## Verification Plan

### Manual Verification
- Verify that all routes work and pages render correctly.
- Ensure i18n switching (EN/AR) works for all new content.
- Check responsiveness on mobile and desktop.
- Verify that the designs align with the existing `Home.tsx` and `Manifesto.tsx`.
