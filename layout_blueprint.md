> Historical layout proposal: the CSS Grid refactor below is not the current implementation. See [current architecture](docs/architecture.md) and [feature guide](docs/features.md).

# ForgeAI — Layout Blueprint

> A step-by-step guide to build a **rock-solid, responsive, dynamic layout** that eliminates manual padding/margin guesswork and makes every future page/component slot in perfectly.

---

## 🔍 Current Problems Diagnosed

After reviewing your codebase, here are the specific issues in your current layout:

| Problem | Where | Why it hurts |
|---|---|---|
| **Magic numbers everywhere** | `pl-70`, `pt-20`, `p-6`, `mx-5 my-5` in MainLayout & DashboardLayout | If Navbar height or Sidebar width changes, you have to hunt and fix every file |
| **Sidebar width is implicit** | `w-60` / `w-0` lives inside Sidebar.jsx, but MainLayout applies `pl-70` (not even matching!) | Content area doesn't truly *know* the sidebar width — it guesses |
| **Navbar height is implicit** | Navbar is `fixed` with `top-4`, DashboardLayout compensates with `pt-20` | 20 (5rem) is a guess; add a banner or resize font and it breaks |
| **No design tokens** | Colors, spacing, border-radius all inline | Changing the "feel" of the app requires editing dozens of files |
| **No responsive breakpoints** | Sidebar is always 240px or 0px, no tablet/mobile adaptation | On screens < 768px the sidebar eats half the viewport |
| **Content area scroll is fragile** | `overflow-hidden` on root + `overflow-y-auto` on main | Nested scroll contexts will fight each other as pages get complex |

---

## 🏗️ The Architecture You Should Build

```
┌─────────────────────────────────────────────────────┐
│                   VIEWPORT (100vh × 100vw)          │
│  ┌───────────────────────────────────────────────┐  │
│  │              NAVBAR (fixed height)             │  │
│  │           var(--navbar-height): 64px            │  │
│  ├──────────┬────────────────────────────────────┤  │
│  │          │                                    │  │
│  │ SIDEBAR  │          MAIN CONTENT              │  │
│  │          │                                    │  │
│  │  width:  │   ← This area fills remaining      │  │
│  │  var(    │      height & width automatically  │  │
│  │  --side  │                                    │  │
│  │  bar-w)  │   ← scrolls independently          │  │
│  │          │                                    │  │
│  │          │   ← padding uses tokens, not magic │  │
│  │          │                                    │  │
│  └──────────┴────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
```

---

## 📋 Step-by-Step Build Order

### Step 1: Define CSS Custom Properties (Design Tokens)

**File**: [index.css](frontend/src/index.css)

Inside your `@theme { }` block (since you're using Tailwind v4), add layout tokens:

**What to add:**
- `--spacing-navbar-height` → the fixed navbar height (e.g., `4rem`)
- `--spacing-navbar-top` → the gap between viewport top and navbar (e.g., `1rem`, your current `top-4`)
- `--spacing-sidebar-width` → expanded sidebar width (e.g., `15rem` = 240px)
- `--spacing-sidebar-collapsed` → collapsed sidebar width (e.g., `0rem`)
- `--spacing-page-x` → horizontal page padding (e.g., `1.5rem`)
- `--spacing-page-y` → vertical page padding (e.g., `1.5rem`)
- `--spacing-content-gap` → gap between content sections (e.g., `1.5rem`)
- `--radius-card` → standard card border radius
- `--radius-sidebar` → sidebar border radius

**Why this matters:** Every layout component references these tokens. Change `--spacing-sidebar-width` in ONE place, and DashboardLayout, MainLayout, Sidebar, and Navbar all adapt automatically. Tailwind v4 with `@theme` makes these available as utility classes (e.g., `w-(--spacing-sidebar-width)`).

---

### Step 2: Set Up the Root Reset Properly

**File**: [index.css](frontend/src/index.css)

**What to do:**
- Apply `box-sizing: border-box` on `*`, `*::before`, `*::after` (not just `body`)
- Set `html, body, #root` to `height: 100%` (not `h-screen` via Tailwind — CSS handles this)
- Set `margin: 0; padding: 0` on `body`
- Set `overflow: hidden` on `#root` only (the root container manages the viewport lock)

**Why:** This ensures nothing is fighting for scroll control. The only element that scrolls will be your main content area — explicitly.

---

### Step 3: Rebuild DashboardLayout as a CSS Grid

**File**: [DashboardLayout.jsx](frontend/src/layouts/DashboardLayout.jsx)

**Current approach (flexbox with manual offsets):**
```
div (h-screen, overflow-hidden)
  └─ Navbar (fixed, top-4)
  └─ div (flex, pt-20)     ← magic number for navbar height
       ├─ Sidebar (w-60)
       └─ MainLayout (flex-1, pl-70)  ← doesn't even match sidebar!
```

**New approach (CSS Grid, token-driven):**

Use a CSS Grid with named areas:

```
grid-template-rows:    var(--navbar-height)  1fr
grid-template-columns: var(--sidebar-width)  1fr
grid-template-areas:
  "navbar  navbar"
  "sidebar content"
```

**What to change:**
1. Root div: Replace `h-screen w-screen overflow-hidden` with a **grid container** using `display: grid` and the template above
2. Navbar: occupies the `navbar` grid area — **no more `position: fixed`**, no `top-4`. The grid gives it its slot. (If you want the floating glassmorphism look, you can still visually style it, but it *sits* in the grid flow)
3. Sidebar: occupies the `sidebar` grid area — its width is controlled by the grid column, not by the component itself
4. Main content: occupies the `content` grid area — it automatically fills the remaining space

**How sidebar collapse works with grid:**
- When sidebar is **open**: `grid-template-columns: var(--sidebar-width) 1fr`
- When sidebar is **collapsed**: `grid-template-columns: 0 1fr`
- Add `transition: grid-template-columns 0.3s ease` for smooth animation
- The sidebar component just needs `overflow: hidden` and `width: 100%` (it fills its grid cell)

**Why grid over flexbox:** Grid gives you **explicit named regions**. The content area doesn't need to *know* the sidebar width — it simply fills whatever the grid gives it. No `pl-70` ever again.

---

### Step 4: Refactor Navbar to Be Grid-Aware

**File**: [Navbar.jsx](frontend/src/components/Navbar/Navbar.jsx)

**What to change:**
1. Remove `fixed`, `top-4`, `left-0`, `z-50` — the grid positions it now
2. Add `grid-area: navbar` (or use a Tailwind class via arbitrary value)
3. Keep the glassmorphism/LiquidGlass inner styling — that's visual, not structural
4. If you want the "floating" look with gap at top, use `padding` on the grid area or a small `margin` on the navbar itself

**The result:** Navbar always takes exactly `var(--navbar-height)` of space, no matter what. Content below never needs to guess.

---

### Step 5: Refactor Sidebar to Be Grid-Aware

**File**: [Sidebar.jsx](frontend/src/components/Sidebar/Sidebar.jsx)

**What to change:**
1. Remove all width management (`w-60`, `w-0`) — the grid column controls this
2. Set `grid-area: sidebar`
3. Set `width: 100%; height: 100%; overflow: hidden` — it fills its grid cell
4. The internal content (`<nav>`) keeps its visual styling (border, background, padding)
5. For peeking behavior when collapsed: use `position: absolute` only on the sidebar **content**, not the grid cell. The grid cell stays `0px` wide, but an inner overlay slides out on hover

**Why:** The toggle button in MainLayout (`PanelLeft` icon at line 18-25) can be eliminated from MainLayout entirely. Sidebar owns its own toggle logic. MainLayout should have ZERO knowledge of sidebar state.

---

### Step 6: Simplify MainLayout to Pure Content Container

**File**: [MainLayout.jsx](frontend/src/layouts/MainLayout.jsx)

**What to change:**
1. Remove ALL sidebar-related props (`collapsed`, `toggleCollapsed`, `startPeeking`, `isPeeking`)
2. Remove the conditional `pl-70` class
3. Remove the sidebar toggle button entirely (sidebar handles its own toggle)
4. What remains: `<main>` with `grid-area: content`, `overflow-y: auto`, and token-based padding: `padding: var(--page-y) var(--page-x)`
5. Just render `<Outlet />`

**The result:** MainLayout is now 5 lines of code. It's a dumb container. Every page you build inside it gets consistent padding automatically.

---

### Step 7: Create a Page Content Wrapper Component

**File**: `src/components/PageContent.jsx` (NEW)

**Purpose:** A reusable wrapper that every page uses as its root element to get consistent spacing.

**What it should do:**
- Apply `max-width` (e.g., `--content-max-width: 1400px`) so content doesn't stretch infinitely on ultrawide monitors
- Center itself with `margin-inline: auto`
- Apply standard vertical spacing between sections using `display: flex; flex-direction: column; gap: var(--content-gap)`
- Accept a `wide` prop that removes `max-width` for pages like dashboards that need full width

**Usage in pages:**
```jsx
// Every page wraps its content like this:
<PageContent>
  <h1>Overview</h1>
  <StatCards />
  <RecentProjects />
</PageContent>
```

**Why:** No more ad-hoc `p-5`, `py-10`, `gap-5 gap-y-5` in every page. The wrapper enforces consistency.

---

### Step 8: Add Responsive Breakpoints

**File**: [index.css](frontend/src/index.css) or wherever you put your grid styles

**What to add — 3 breakpoints:**

| Breakpoint | Sidebar | Navbar | Content |
|---|---|---|---|
| **Desktop** (≥1024px) | Visible, `var(--sidebar-width)` | Full | Standard padding |
| **Tablet** (768–1023px) | Collapsed by default, overlay on toggle | Full | Reduced padding |
| **Mobile** (< 768px) | Hidden, slide-over drawer on hamburger tap | Compact (logo + hamburger) | Minimal padding |

**How to implement:**
- Change the grid template at each breakpoint using `@media` queries
- Mobile: `grid-template-columns: 0 1fr` (sidebar hidden, drawer overlay)
- Tablet: `grid-template-columns: 0 1fr` (sidebar collapses, peek on hover)
- Desktop: `grid-template-columns: var(--sidebar-width) 1fr`

**Tailwind v4 approach:** Define custom breakpoints in `@theme` if needed, or use standard `sm:`, `md:`, `lg:` utilities.

---

### Step 9: Handle the Floating Navbar Correctly

Your current Navbar has a beautiful floating glassmorphism bar. To keep this visual while using grid:

**Approach:**
1. The grid row for navbar has height `var(--navbar-height)` (e.g., `5rem` to include the visual gap)
2. Inside the grid cell, the Navbar component has `padding: var(--navbar-top) var(--page-x) 0` so the glass bar "floats" visually
3. The glass bar inside uses `max-width` and `margin-inline: auto` (you already have `max-w-4xl` + `flex justify-center`)
4. No `position: fixed` needed — the grid row is already at the top, and since the content area scrolls independently, the navbar never moves

**Bonus:** If you later want the navbar to span full width instead of centered, you change ONE prop. No layout surgery.

---

### Step 10: Verify & Cleanup

Once the grid layout is working:

1. **Delete** `pl-70` — search your entire codebase, it should appear zero times
2. **Delete** `pt-20` from DashboardLayout — grid handles this
3. **Search for** any hardcoded pixel values (`h-screen`, `w-screen`, `top-4`, `top-0`) — replace with tokens or grid areas
4. **Test** at 3 widths: 375px (mobile), 768px (tablet), 1440px (desktop)
5. **Test** sidebar toggle — content area should smoothly expand/contract without any padding jump

---

## 📁 File Change Summary

| File | Action | What Changes |
|---|---|---|
| [index.css](frontend/src/index.css) | **Modify** | Add design tokens, root reset, grid layout classes, responsive breakpoints |
| [DashboardLayout.jsx](frontend/src/layouts/DashboardLayout.jsx) | **Modify** | Rewrite as CSS Grid container with named areas |
| [MainLayout.jsx](frontend/src/layouts/MainLayout.jsx) | **Modify** | Strip to bare content container (remove all sidebar awareness) |
| [Navbar.jsx](frontend/src/components/Navbar/Navbar.jsx) | **Modify** | Remove `fixed` positioning, use grid area |
| [Sidebar.jsx](frontend/src/components/Sidebar/Sidebar.jsx) | **Modify** | Remove width management, use grid area, own its toggle |
| `src/components/PageContent.jsx` | **Create** | Reusable page wrapper with max-width, centering, gap |
| [useSidebar.jsx](frontend/src/hooks/useSidebar.jsx) | **Modify** | Simplify (sidebar manages itself, less prop drilling) |

---

## 🎯 End Result

After following these steps, you'll have a layout where:

- ✅ **Any page** you create just wraps content in `<PageContent>` — spacing is automatic
- ✅ **Sidebar width** change = edit ONE CSS variable
- ✅ **Navbar height** change = edit ONE CSS variable
- ✅ **Responsive** down to mobile with zero per-page work
- ✅ **Sidebar collapse** animates smoothly via CSS grid transition
- ✅ **No magic numbers** — every spacing value traces back to a named token
- ✅ **Content never overlaps** navbar or sidebar — grid makes it physically impossible

> [!TIP]
> Start with Steps 1-3 first. Get the grid working with hardcoded values, then replace with tokens. Don't try to do everything at once.
