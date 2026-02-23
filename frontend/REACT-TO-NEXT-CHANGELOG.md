# Complete Guide: Differences Between `old-react-frontend/` and `nextjs-frontend/`

**For Beginner Developers**

This document explains ALL the differences in the migration of react to next.js. The `old-react-frontend/` directory (previously called `frontend/`) uses **React with Vite** and **React Router**, while `nextjs-frontend/` uses **Next.js 16** with the **App Router**. 
So when refering to `old-react-frontend/` this means the old React implementation and refering to `nextjs-frontend/` means the new Next.js implementation.

---

## Table of Contents

1. [Framework & Build Tools](#1-framework--build-tools)
2. [Routing System](#2-routing-system)
3. [Tailwind CSS Configuration](#3-tailwind-css-configuration)
4. [Server-Side Rendering & "use client" Directive](#4-server-side-rendering--use-client-directive)
5. [Context Providers & State Management](#5-context-providers--state-management)
6. [CSS Styling Approaches](#6-css-styling-approaches)
7. [Layout System](#7-layout-system)
8. [MUI Theme System](#8-mui-theme-system)
9. [Environment Variables](#9-environment-variables)
10. [Navigation & Links](#10-navigation--links)
11. [Entry Points & App Initialization](#11-entry-points--app-initialization)
12. [Additional Important Differences](#12-additional-important-differences)

---

## 1. Framework & Build Tools

### `old-react-frontend/` - React + Vite

**What it is:**
- Uses **React 18** as the UI library
- Uses **Vite** as the build tool and development server
- Uses **React Router DOM** for client-side routing
- This is a **Single Page Application (SPA)** - everything runs in the browser

**Key Files:**
- `package.json` - Shows `vite` as the build tool
- `src/main.tsx` - Entry point that renders the React app
- `src/App.tsx` - Root component
- `index.html` - HTML file that Vite uses as the template

**How it works:**
1. Vite serves the app during development (`npm run dev`)
2. All JavaScript is bundled and sent to the browser
3. React Router handles navigation without page reloads
4. Everything renders on the **client-side** (in the browser)

### `nextjs-frontend/` - Next.js 16

**What it is:**
- Uses **Next.js 16** (a React framework)
- Uses **React 19** under the hood
- Has built-in routing, server-side rendering, and optimization
- This is a **full-stack framework** - can render on server AND client

**Key Files:**
- `package.json` - Shows `next` as the framework
- `src/app/layout.tsx` - Root layout (replaces App.tsx)
- `src/app/page.tsx` - Home page component
- No `index.html` - Next.js generates HTML automatically

**How it works:**
1. Next.js runs a Node.js server (`npm run dev`)
2. Pages can be rendered on the **server** before sending to browser
3. File-based routing automatically creates routes
4. Can mix server and client components

---

## 2. Routing System

### `old-react-frontend/` - React Router (Manual Configuration)

**How routes work:**
Routes are **manually defined** in a central router file using JavaScript/TypeScript.

**Location:** `src/router.tsx`

**Example:**
```tsx
import { Route, Routes } from "react-router-dom";
import Home from "./routes/Home.tsx";
import Login from "./routes/Login";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/inventory" element={<Inventory />} />
      <Route path="/modify-member/:memberId" element={<ModifyMember />} />
    </Routes>
  );
}
```

**Key Points:**
- All routes are defined in **one file** (`router.tsx`)
- Route components are in `src/routes/` directory
- Dynamic routes use `:memberId` syntax
- Uses `<HashRouter>` in `App.tsx` (URLs look like `/#/login`)

**Navigation:**
```tsx
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// For links
<Link to="/login">Login</Link>

// For programmatic navigation
const navigate = useNavigate();
navigate("/inventory");
```

### `nextjs-frontend/` - Next.js App Router (File-Based)

**How routes work:**
Routes are **automatically created** based on folder structure in the `src/app/` directory.

**File Structure = URL Structure:**
```
src/app/
  ├── page.tsx              → URL: /
  ├── login/
  │   └── page.tsx          → URL: /login
  ├── inventory/
  │   └── page.tsx          → URL: /inventory
  └── modify-member/
      └── [memberId]/
          └── page.tsx      → URL: /modify-member/123
```

**Key Points:**
- **No router file needed** - Next.js reads the folder structure
- Each route needs a `page.tsx` file
- Dynamic routes use `[memberId]` folder names (square brackets)
- URLs are clean: `/login` (no hash)

**Navigation:**
```tsx
import Link from "next/link";
import { useRouter } from "next/navigation";

// For links
<Link href="/login">Login</Link>

// For programmatic navigation
const router = useRouter();
router.push("/inventory");
```

**Differences Summary:**
| Feature | `old-react-frontend/` | `nextjs-frontend/` |
|---------|-------------|-------------------|
| Route Definition | Manual in `router.tsx` | Automatic from folders |
| Route Components | `src/routes/` | `src/app/*/page.tsx` |
| Dynamic Routes | `:memberId` | `[memberId]` folder |
| Navigation Hook | `useNavigate()` | `useRouter()` |
| Link Component | `react-router-dom` | `next/link` |
| URL Format | `/#/login` (hash) | `/login` (clean) |

---

## 3. Tailwind CSS Configuration

### `old-react-frontend/` - Tailwind CSS v3 (Config File)

**How it works:**
Custom colors, fonts, and other design tokens are defined in a **JavaScript configuration file**.

**Location:** `tailwind.config.js`

**Example:**
```javascript
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "factory-blue": "#2c3e50",
        "factory-green": "#57bf94",
        "factory-black": "#2C3139",
      },
      height: {
        customh: 'calc(100vh - 96px)'
      },
    },
  },
}
```

**CSS File:** `src/index.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**Usage:**
```tsx
<div className="bg-factory-green text-white">
  Hello
</div>
```

### `nextjs-frontend/` - Tailwind CSS v4 (CSS-First)

**How it works:**
Custom design tokens are defined **directly in CSS** using the `@theme` directive. This is a major change in Tailwind v4!

**Location:** `src/app/globals.css`

**Example:**
```css
@import "tailwindcss";

@theme {
  --color-factory-blue: #2c3e50;
  --color-factory-green: #57bf94;
  --color-factory-black: #2C3139;
  --color-factory-dark-green: #4ca981;
  --height-customh: calc(100vh - 96px);
  --font-sans: ui-sans-serif, system-ui, sans-serif, ...;
}
```

**Note:** There's still a `tailwind.config.js` file, but it's minimal and mainly for content paths. The actual theme customization happens in CSS.

**Usage:**
```tsx
<div className="bg-factory-green text-white">
  Hello
</div>
```

**Why the Change?**
Tailwind v4 moved from JavaScript-based configuration to CSS-first configuration. This allows:
- Better integration with CSS features
- Easier theming and dark mode
- More performant builds

**Differences Summary:**
| Feature | `old-react-frontend/` (v3) | `nextjs-frontend/` (v4) |
|---------|------------------|------------------------|
| Config Location | `tailwind.config.js` | `globals.css` (using `@theme`) |
| Custom Colors | JavaScript object | CSS custom properties |
| Config File | Full config needed | Minimal (mostly content paths) |
| CSS Import | `@tailwind` directives | `@import "tailwindcss"` |

---

## 4. Server-Side Rendering & "use client" Directive

### `old-react-frontend/` - Client-Side Only

**How it works:**
- **Everything runs in the browser**
- All components are "client components" by default
- No server-side rendering
- No special directives needed

**Example Component:**
```tsx
import { useState } from "react";

function Home() {
  const [count, setCount] = useState(0);
  // This always runs in the browser
  return <div>{count}</div>;
}
```

### `nextjs-frontend/` - Server Components by Default

**How it works:**
- **Components render on the server by default** (Server Components)
- This improves performance and SEO
- To use browser features (state, effects, event handlers), you need `"use client"`

**The `"use client"` Directive:**

This directive tells Next.js: "This component needs to run in the browser."

**When to use `"use client"`:**
- Using React hooks (`useState`, `useEffect`, `useContext`)
- Using browser APIs (`localStorage`, `window`, `document`)
- Handling user interactions (onClick, onChange)
- Using event listeners

**Example:**
```tsx
"use client";  // ← This is REQUIRED for client-side features

import { useState } from "react";

export default function Home() {
  const [count, setCount] = useState(0);
  // Without "use client", this would cause an error!
  return <div>{count}</div>;
}
```

**Files that need `"use client"` in this project:**
- `src/app/page.tsx` - Uses `useState` and `useEffect`
- `src/app/Providers.tsx` - Uses `useState`
- `src/app/layout-client.tsx` - Uses `useState`
- `src/app/login/page.tsx` - Uses hooks and browser APIs
- All context files - Use React hooks
- Most component files - Use hooks or event handlers

**Files that DON'T need `"use client"`:**
- `src/app/layout.tsx` - Server component (no hooks)
- Any component that only displays data without interactivity

**Why Server Components?**
- **Faster initial load** - HTML is ready before JavaScript loads
- **Better SEO** - Search engines can read the HTML
- **Smaller JavaScript bundles** - Less code sent to browser
- **Secure** - Can access databases/APIs without exposing secrets

**Differences Summary:**
| Feature | `old-react-frontend/` | `nextjs-frontend/` |
|---------|-------------|-------------------|
| Default Rendering | Client-side only | Server-side (can be client) |
| `"use client"` Directive | Not needed | Required for hooks/browser APIs |
| Browser APIs | Always available | Only in client components |
| Initial HTML | Empty, filled by JS | Pre-rendered on server |

---

## 5. Context Providers & State Management

### `old-react-frontend/` - Contexts in App.tsx

**How it works:**
Context providers are set up directly in the main `App.tsx` file.

**Location:** `src/App.tsx`

**Structure:**
```tsx
import { LoginContext } from "./Contexts/LoginContext";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  
  return (
    <HashRouter>
      <LoginContext.Provider value={{ isLoggedIn, setLoggedIn }}>
        <NavBar />
        <Router />  {/* Routes are here */}
        <Footer />
      </LoginContext.Provider>
    </HashRouter>
  );
}
```

**Contexts Used:**
1. **LoginContext** - Manages login state
2. **ManagerAndLabProvider** - Wrapped around routes in `router.tsx`
3. **InventoryProvider** - Also in `router.tsx`

**Note:** Some contexts are in `App.tsx`, others are in `router.tsx`. This is a bit scattered.

### `nextjs-frontend/` - Providers.tsx Component

**How it works:**
All context providers are centralized in a dedicated `Providers.tsx` component, which is then used in the root layout.

**Location:** `src/app/Providers.tsx`

**Structure:**
```tsx
"use client";

import { ReactNode, useState } from "react";
import { LoginContext } from "@/Contexts/LoginContext";
import { ManagerAndLabProvider } from "@/Contexts/ManagerAndLabContext";
import { InventoryProvider } from "@/Contexts/InventoryContext";

export default function Providers({ children }: { children: ReactNode }) {
  const [isLoggedIn, setLoggedIn] = useState(false);

  return (
    <LoginContext.Provider value={{ isLoggedIn, setLoggedIn }}>
      <ManagerAndLabProvider>
        <InventoryProvider>
          {children}
          <Toaster />
        </InventoryProvider>
      </ManagerAndLabProvider>
    </LoginContext.Provider>
  );
}
```

**Used in:** `src/app/layout.tsx`
```tsx
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Providers>
          <ClientLayout>{children}</ClientLayout>
        </Providers>
      </body>
    </html>
  );
}
```

**Why `"use client"`?**
Providers use `useState`, so they must be client components.

**What are Contexts?**

**Context** is a React feature that lets you share data across components without passing props manually.

**Example - LoginContext:**
```tsx
// Creating the context
export const LoginContext = createContext<LoginContextType | null>(null);

// Using it in a component
const loginContext = useContext(LoginContext);
if (loginContext) {
  console.log(loginContext.isLoggedIn); // true or false
  loginContext.setLoggedIn(true); // Update login state
}
```

**Contexts in This Project:**
1. **LoginContext** - Tracks if user is logged in
2. **ManagerAndLabContext** - Manages manager and lab data
3. **InventoryContext** - Manages inventory items

**Differences Summary:**
| Feature | `old-react-frontend/` | `nextjs-frontend/` |
|---------|-------------|-------------------|
| Provider Location | Split between `App.tsx` and `router.tsx` | Centralized in `Providers.tsx` |
| Organization | Less organized | More organized |
| Usage | Direct in App component | Separate component imported |

---

## 6. CSS Styling Approaches

Both projects use **three different ways** to apply CSS styles. Here's how each works:

### Method 1: Global CSS File

**`old-react-frontend/`:**
- **File:** `src/index.css` or `src/App.css`
- Contains Tailwind imports and global styles
- Applied to entire app

**`nextjs-frontend/`:**
- **File:** `src/app/globals.css`
- Contains Tailwind `@import` and `@theme` directive
- Also has custom CSS classes like `.nav-link`
- Imported in `layout.tsx`

**Example from `globals.css`:**
```css
.nav-link {
  color: white;
}
.nav-link:hover {
  color: #57bf94;
  text-decoration: underline;
}
```

### Method 2: Inline Styles (MUI sx prop)

**Both projects use Material-UI (MUI) components** which support inline styles via the `sx` prop.

**Example:**
```tsx
<Divider
  sx={{
    opacity: 1,
    borderColor: "white",
    borderWidth: 2,
    width: "10%",
    marginTop: "1rem",
  }}
/>
```

**What is `sx`?**
- MUI's way of applying inline styles
- Supports theme values (like `theme.palette.primary.main`)
- More powerful than regular inline styles

### Method 3: Const Styles Object (Page-Level Styles)

**Both projects use this pattern** for styles specific to a single page/component.

**Example from `Home.tsx` / `page.tsx`:**
```tsx
const styles = {
  bgColor: '#2c3e50"',  // Note: extra quote is a typo, but it works
  rowTitleColor: "white",
  rowContentColor: "white",
  arrowColor: "white",
};

// Used with FAQ component
<Faq data={faqs} styles={styles} />
```

**When to use each:**
- **Global CSS** - Styles used across multiple components (like `.nav-link`)
- **Tailwind classes** - Most styling (like `className="bg-factory-green"`)
- **MUI sx prop** - When using MUI components that need custom styling
- **Const styles object** - When a third-party component needs a style object

**Differences Summary:**
| Method | `old-react-frontend/` | `nextjs-frontend/` |
|--------|-------------|-------------------|
| Global CSS | `index.css` | `globals.css` |
| Tailwind Config | `tailwind.config.js` | `@theme` in `globals.css` |
| Inline Styles | Same (MUI sx) | Same (MUI sx) |
| Const Styles | Same pattern | Same pattern |

---

## 7. Layout System

### `old-react-frontend/` - Single Layout in App.tsx

**How it works:**
The layout (NavBar, Footer, etc.) is defined directly in `App.tsx`.

**Structure:**
```tsx
function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <NavBar />
      <NavDrawer />
      <Router />  {/* Page content goes here */}
      <Footer />
    </HashRouter>
  );
}
```

**Key Points:**
- Everything is in one file (`App.tsx`)
- Layout wraps around routes
- No separate layout component

### `nextjs-frontend/` - Split Layout System

**How it works:**
Next.js uses a **two-part layout system**:
1. **`layout.tsx`** - Server component (handles HTML structure, fonts, metadata)
2. **`layout-client.tsx`** - Client component (handles interactive parts like NavBar)

**Part 1: `src/app/layout.tsx` (Server Component)**
```tsx
import Providers from "./Providers";
import ClientLayout from "./layout-client";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <ClientLayout>{children}</ClientLayout>
        </Providers>
      </body>
    </html>
  );
}
```

**What it does:**
- Sets up HTML structure (`<html>`, `<body>`)
- Loads fonts (Geist Sans, Geist Mono)
- Defines metadata (title, description, favicon)
- Wraps everything in Providers
- **No hooks or browser APIs** - pure server component

**Part 2: `src/app/layout-client.tsx` (Client Component)**
```tsx
"use client";

export default function ClientLayout({ children }) {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  
  return (
    <>
      <ScrollToTop />
      <NavBar toggleDrawer={toggleDrawer} isDrawerOpen={isDrawerOpen} />
      <NavDrawer toggleDrawer={toggleDrawer} isDrawerOpen={isDrawerOpen} />
      {children}  {/* Page content */}
      <Footer />
    </>
  );
}
```

**What it does:**
- Handles interactive UI (NavBar, NavDrawer)
- Manages state (drawer open/closed)
- Wraps page content (`{children}`)
- **Needs `"use client"`** because it uses `useState`

**Why Split?**
- **Performance** - Server parts render faster (no JavaScript needed)
- **SEO** - Search engines get HTML immediately
- **Separation of concerns** - Server vs client logic separated

**Differences Summary:**
| Feature | `old-react-frontend/` | `nextjs-frontend/` |
|---------|-------------|-------------------|
| Layout Location | `App.tsx` | `layout.tsx` + `layout-client.tsx` |
| Structure | Single component | Split (server + client) |
| Server Rendering | No | Yes (layout.tsx) |
| State Management | In App.tsx | In layout-client.tsx |

---

## 8. MUI Theme System

### What is MUI?

**Material-UI (MUI)** is a popular React component library that provides pre-built UI components (buttons, tabs, text fields, etc.) styled with Google's Material Design.

### What is a Theme?

A **theme** is a configuration object that defines colors, typography, spacing, and component styles for MUI components. It ensures consistency across your app.

### Both Projects Use the Same Theme

**Location:** `src/theme.ts` (in both projects)

**Theme Definition:**
```tsx
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4ca981", // Factory green
    },
    text: {
      primary: "#000000",
    },
  },
  components: {
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: "#4ca981",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: "bold",
          "&.Mui-selected": {
            color: "#4ca981",
          },
        },
      },
    },
  },
});

export default theme;
```

**What this does:**
- Sets primary color to Factory green (`#4ca981`)
- Customizes Tab components (no uppercase, green when selected)
- Applies to all MUI components in the app

### How Theme is Used

**`old-react-frontend/` - No Global ThemeProvider**

The theme is **only used locally** in specific components that need it.

**Example:** `src/components/PastWorkshops.tsx`
```tsx
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme.ts";

export function PastWorkshops(props) {
  return (
    <ThemeProvider theme={theme}>
      <Tabs>...</Tabs>  {/* MUI components use the theme */}
    </ThemeProvider>
  );
}
```

**`nextjs-frontend/` - Same Pattern**

Also uses ThemeProvider locally in components that need MUI styling.

**Example:** `src/components/PastWorkshops.tsx`
```tsx
"use client";

import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme";

export function PastWorkshops(props) {
  return (
    <ThemeProvider theme={theme}>
      <Tabs>...</Tabs>
    </ThemeProvider>
  );
}
```

**Note:** There's a `public/Providers.tsx` file that includes ThemeProvider, but it's not being used. The active `src/app/Providers.tsx` doesn't include it.

**Where MUI is Used:**
- **Tabs** - For workshop semester navigation
- **Divider** - For visual separators
- **TextField, Button** - In login forms
- **Typography** - For text styling

**Differences Summary:**
| Feature | `old-react-frontend/` | `nextjs-frontend/` |
|---------|-------------|-------------------|
| Theme File | `src/theme.ts` | `src/theme.ts` (same) |
| ThemeProvider | Local (in components) | Local (in components) |
| MUI Usage | Same components | Same components |
| Import Path | `../theme.ts` | `@/theme` (alias) |

---

## 9. Environment Variables

### `old-react-frontend/` - Vite Environment Variables

**How it works:**
Vite uses `import.meta.env` to access environment variables.

**Naming Convention:**
- Must start with `VITE_` to be exposed to client code
- Example: `NEXT_PUBLIC_API_KEY`

**Usage:**
```tsx
const apiKey = import.meta.env.NEXT_PUBLIC_API_KEY;
```

**Example from `Home.tsx`:**
```tsx
useEffect(() => {
  const apiKey = import.meta.env.NEXT_PUBLIC_API_KEY;
  fetch("https://factorystrapi.mcgilleus.ca/api/faqs", {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });
}, []);
```

**Environment File:**
Create a `.env` file in the `old-react-frontend/` directory:
```
NEXT_PUBLIC_API_KEY=your_api_key_here
```

### `nextjs-frontend/` - Next.js Environment Variables

**How it works:**
Next.js uses `process.env` to access environment variables.

**Naming Convention:**
- Must start with `NEXT_PUBLIC_` to be exposed to client code
- Example: `NEXT_PUBLIC_API_KEY`

**Usage:**
```tsx
const apiKey = process.env.NEXT_PUBLIC_API_KEY;
```

**Example from `page.tsx`:**
```tsx
useEffect(() => {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  fetch("https://factorystrapi.mcgilleus.ca/api/faqs", {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });
}, []);
```

**Environment File:**
Create a `.env.local` file in the `nextjs-frontend/` directory:
```
NEXT_PUBLIC_API_KEY=your_api_key_here
```

**Important Notes:**
- **Never commit `.env` files** to git (they contain secrets)
- Both frameworks only expose variables with the correct prefix to the browser
- Variables without the prefix are server-only (Next.js only)

**Differences Summary:**
| Feature | `old-react-frontend/` | `nextjs-frontend/` |
|---------|-------------|-------------------|
| Access Method | `import.meta.env` | `process.env` |
| Prefix | `VITE_` | `NEXT_PUBLIC_` |
| Example | `NEXT_PUBLIC_API_KEY` | `NEXT_PUBLIC_API_KEY` |
| File Name | `.env` | `.env.local` |

---

## 10. Navigation & Links

### `old-react-frontend/` - React Router Links

**Import:**
```tsx
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
```

**For Navigation Links:**
```tsx
<Link to="/login">Go to Login</Link>
<Link to="/inventory">Inventory</Link>
```

**For Programmatic Navigation:**
```tsx
function MyComponent() {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate("/inventory");  // Navigate programmatically
  };
  
  return <button onClick={handleClick}>Go to Inventory</button>;
}
```

**URL Format:**
- Uses HashRouter, so URLs look like: `http://localhost:5173/#/login`
- The `#` is part of the URL (hash routing)

### `nextjs-frontend/` - Next.js Links

**Import:**
```tsx
import Link from "next/link";
import { useRouter } from "next/navigation";
```

**For Navigation Links:**
```tsx
<Link href="/login">Go to Login</Link>
<Link href="/inventory">Inventory</Link>
```

**For Programmatic Navigation:**
```tsx
"use client";

function MyComponent() {
  const router = useRouter();
  
  const handleClick = () => {
    router.push("/inventory");  // Navigate programmatically
  };
  
  return <button onClick={handleClick}>Go to Inventory</button>;
}
```

**URL Format:**
- Clean URLs: `http://localhost:3000/login`
- No hash needed

**Key Differences:**
| Feature | `old-react-frontend/` | `nextjs-frontend/` |
|---------|-------------|-------------------|
| Link Import | `react-router-dom` | `next/link` |
| Link Prop | `to="/path"` | `href="/path"` |
| Navigation Hook | `useNavigate()` | `useRouter()` |
| Navigation Method | `navigate("/path")` | `router.push("/path")` |
| URL Format | `/#/path` (hash) | `/path` (clean) |

---

## 11. Entry Points & App Initialization

### `old-react-frontend/` - Vite Entry Point

**How the app starts:**

1. **`index.html`** - HTML file that loads the app
   ```html
   <div id="root"></div>
   <script type="module" src="/src/main.tsx"></script>
   ```

2. **`src/main.tsx`** - Entry point that renders React
   ```tsx
   import { createRoot } from 'react-dom/client'
   import App from './App.tsx'
   
   createRoot(document.getElementById('root')!).render(
     <StrictMode>
       <App />
     </StrictMode>
   )
   ```

3. **`src/App.tsx`** - Root component with routing and layout
   ```tsx
   function App() {
     return (
       <HashRouter>
         <NavBar />
         <Router />
         <Footer />
       </HashRouter>
     );
   }
   ```

**Flow:**
```
index.html → main.tsx → App.tsx → Router → Pages
```

### `nextjs-frontend/` - Next.js Entry Point

**How the app starts:**

1. **No `index.html`** - Next.js generates HTML automatically

2. **`src/app/layout.tsx`** - Root layout (replaces App.tsx)
   ```tsx
   export default function RootLayout({ children }) {
     return (
       <html>
         <body>
           <Providers>
             <ClientLayout>{children}</ClientLayout>
           </Providers>
         </body>
       </html>
     );
   }
   ```

3. **`src/app/page.tsx`** - Home page (automatically routed to `/`)

**Flow:**
```
Next.js Server → layout.tsx → Providers → ClientLayout → page.tsx (or other pages)
```

**Key Differences:**
| Feature | `old-react-frontend/` | `nextjs-frontend/` |
|---------|-------------|-------------------|
| HTML File | `index.html` (manual) | Generated automatically |
| Entry Point | `main.tsx` | `layout.tsx` |
| Root Component | `App.tsx` | `layout.tsx` |
| Page Component | `routes/Home.tsx` | `app/page.tsx` |

---

## 12. Additional Important Differences

### Path Aliases

**`old-react-frontend/`:**
- Uses relative imports: `../Contexts/LoginContext`
- No path aliases configured

**`nextjs-frontend/`:**
- Uses `@/` alias for `src/` directory
- Example: `@/Contexts/LoginContext` instead of `../Contexts/LoginContext`
- Configured in `tsconfig.json` or `next.config.js`

**Example:**
```tsx
// old-react-frontend/
import { LoginContext } from "../Contexts/LoginContext";

// nextjs-frontend/
import { LoginContext } from "@/Contexts/LoginContext";
```

### Dynamic Route Parameters

**`old-react-frontend/`:**
```tsx
// Route definition
<Route path="/modify-member/:memberId" element={<ModifyMember />} />

// Component
import { useParams } from "react-router-dom";
const { memberId } = useParams<{ memberId: string }>();
```

**`nextjs-frontend/`:**
```tsx
// File structure: app/modify-member/[memberId]/page.tsx
// Component
"use client";
import { useParams } from "next/navigation";
const params = useParams();
const memberId = params.memberId as string;
```

### Browser API Access

**`old-react-frontend/`:**
- `localStorage`, `window`, `document` always available
- No checks needed

**`nextjs-frontend/`:**
- Must check if running in browser (server vs client)
- Example:
  ```tsx
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
    }
  }, []);
  ```

### Build Output

**`old-react-frontend/`:**
- `npm run build` creates `dist/` folder
- Static files (HTML, JS, CSS)
- Needs a static file server to run

**`nextjs-frontend/`:**
- `npm run build` creates `.next/` folder
- Includes server code
- Can run with `npm start` (Node.js server)

### Development Server

**`old-react-frontend/`:**
- `npm run dev` → Vite dev server (usually `http://localhost:5173`)
- Fast Hot Module Replacement (HMR)

**`nextjs-frontend/`:**
- `npm run dev` → Next.js dev server (usually `http://localhost:3000`)
- Also has HMR, plus server-side rendering

### TypeScript Configuration

**`frontend/`:**
- `tsconfig.json` configured for Vite
- Path aliases not commonly used

**`nextjs-frontend/`:**
- `tsconfig.json` configured for Next.js
- `@/` alias configured
- Stricter type checking for server/client components

---

## Quick Reference Cheat Sheet

### When Working with `old-react-frontend/`:
- ✅ Routes defined in `src/router.tsx`
- ✅ Use `react-router-dom` for navigation
- ✅ Tailwind config in `tailwind.config.js`
- ✅ Environment variables: `import.meta.env.VITE_*`
- ✅ No `"use client"` needed
- ✅ Everything runs in browser

### When Working with `nextjs-frontend/`:
- ✅ Routes created from folder structure
- ✅ Use `next/link` and `next/navigation` for navigation
- ✅ Tailwind theme in `globals.css` using `@theme`
- ✅ Environment variables: `process.env.NEXT_PUBLIC_*`
- ✅ Add `"use client"` for hooks/browser APIs
- ✅ Can use server components (default)

---

## Common Mistakes to Avoid

1. **Forgetting `"use client"` in Next.js**
   - Error: "useState is not defined" or "localStorage is not defined"
   - Fix: Add `"use client"` at the top of the file

2. **Wrong import paths**
   - `old-react-frontend/`: Use relative paths (`../`)
   - `nextjs-frontend/`: Use `@/` alias

3. **Wrong environment variable prefix**
   - `old-react-frontend/`: `NEXT_PUBLIC_API_KEY`
   - `nextjs-frontend/`: `NEXT_PUBLIC_API_KEY`

4. **Wrong navigation method**
   - `old-react-frontend/`: `navigate("/path")` from `useNavigate()`
   - `nextjs-frontend/`: `router.push("/path")` from `useRouter()`

5. **Wrong Link component**
   - `old-react-frontend/`: `<Link to="/path">` from `react-router-dom`
   - `nextjs-frontend/`: `<Link href="/path">` from `next/link`

---

## Conclusion

Both `old-react-frontend/` and `nextjs-frontend/` achieve the same goal (building a React web app), but they use different tools and patterns:

- **`old-react-frontend/`** = Traditional SPA with React Router (simpler, client-only)
- **`nextjs-frontend/`** = Modern full-stack framework with Next.js (more features, server + client)

Understanding these differences will help you:
- Navigate either codebase confidently
- Know which patterns to use where
- Avoid common mistakes
- Make informed decisions when adding features

**Remember:** When in doubt, look at existing code in the same directory for examples of the correct pattern!
