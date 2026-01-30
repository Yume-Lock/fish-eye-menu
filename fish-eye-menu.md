

## project overview
interactive web application implementing a fisheye menu effect for nielsen's 10 usability heuristics. when users hover over menu items, they "magnify" (become larger) and display the full heuristic name in a tooltip.

---

## architecture & file structure

```
src/
├── main.tsx                    # entry point
├── App.tsx                     # root component
├── index.css                   # global styles
├── data/
│   └── usabilityHeuristics.ts  # data layer
└── components/
    ├── FisheyeMenu.tsx         # parent container component
    ├── FisheyeMenu.css         # container styles
    ├── MenuItem.tsx            # individual menu item component
    └── MenuItem.css            # menu item styles
```

---

## how files work together

### 1. **main.tsx** - application entry point
```tsx
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```
**what it does:**
- finds the `<div id="root">` in `index.html`
- renders the entire react application into that div
- wraps app in `StrictMode` for development warnings

---

### 2. **App.tsx** - root component
```tsx
function App() {
  return <FisheyeMenu />
}
```
**what it does:**
- simple wrapper that renders the main `FisheyeMenu` component
- could be extended to include routing, global state, etc.
- keeps the app structure clean and modular

---

### 3. **data/usabilityHeuristics.ts** - data layer

**interface definition:**
```typescript
export interface UsabilityHeuristic {
    id: number;           // unique identifier (1-10)
    label: string;        // short label shown on item (e.g., "UH#5")
    title: string;        // full name (e.g., "Error Prevention")
    description: string;  // detailed explanation
    icon: string;         // emoji icon
    color: string;        // gradient color for the item
    examples: string[];   // real-world examples
    tips: string[];       // implementation tips
}
```

**why separate data?**
- separation of concerns (data vs presentation)
- easy to update content without touching UI code
- reusable across components
- type safety with typescript

**data structure:**
```typescript
export const usabilityHeuristics: UsabilityHeuristic[] = [
    {
        id: 1,
        label: "UH#1",
        title: "Visibility of System Status",
        icon: "👁️",
        color: "#667eea",
        // ... more properties
    },
    // ... 9 more heuristics
];
```

---

### 4. **FisheyeMenu.tsx** - parent container component

**key responsibilities:**
1. manages hover state for all menu items
2. renders the grid layout of items
3. handles animations for page load
4. passes data and event handlers to children

**state management:**
```tsx
const [hoveredId, setHoveredId] = useState<number | null>(null);
```
- tracks which item is currently hovered
- `null` means no item is hovered
- when user hovers item #5, `hoveredId` becomes `5`

**data flow:**
```tsx
{usabilityHeuristics.map((heuristic, index) => (
    <MenuItem
        heuristic={heuristic}                      // pass data
        isHovered={hoveredId === heuristic.id}     // boolean: is this item hovered?
        onHover={() => setHoveredId(heuristic.id)} // callback to set hover
        onLeave={() => setHoveredId(null)}         // callback to clear hover
    />
))}
```

**why centralized state?**
- only one item can be "magnified" at a time
- parent controls which child is active
- prevents conflicts between multiple hovered items

**animations (framer-motion):**
```tsx
<motion.div
    initial={{ opacity: 0, y: -20 }}  // starts invisible, 20px above
    animate={{ opacity: 1, y: 0 }}     // fades in, moves to position
    transition={{ duration: 0.6 }}     // takes 0.6 seconds
>
```

**staggered entry animation:**
```tsx
delay: 0.5 + index * 0.1
```
- first item: 0.5s delay
- second item: 0.6s delay
- third item: 0.7s delay
- creates a "cascading" effect

---

### 5. **MenuItem.tsx** - individual menu item component

**props (inputs from parent):**
```tsx
interface MenuItemProps {
    heuristic: UsabilityHeuristic;  // data for this item
    isHovered: boolean;             // is this item currently hovered?
    onHover: () => void;            // function to call on mouse enter
    onLeave: () => void;            // function to call on mouse leave
}
```

**three main parts:**

#### a) the menu item itself
```tsx
<motion.div
    className="menu-item"
    onMouseEnter={onHover}     // tells parent "i'm hovered"
    onMouseLeave={onLeave}     // tells parent "i'm not hovered"
    animate={{
        scale: isHovered ? 1.8 : 1,    // magnify to 180% when hovered
        zIndex: isHovered ? 10 : 1,     // bring to front when hovered
    }}
    style={{
        background: `linear-gradient(135deg, ${heuristic.color}dd, ${heuristic.color}99)`
    }}
>
```

**the fisheye effect:**
- `scale: 1.8` makes item 80% larger
- `type: "spring"` gives bouncy, natural motion
- `stiffness: 300` controls how "springy" the animation is
- `damping: 20` controls how much it bounces

#### b) the content (icon + label)
```tsx
<div className="menu-item-content">
    <div className="menu-item-icon">{heuristic.icon}</div>  // emoji
    <div className="menu-item-label">{heuristic.label}</div> // "UH#5"
</div>
```

#### c) the tooltip
```tsx
<motion.div
    className="menu-item-tooltip"
    animate={{
        opacity: isHovered ? 1 : 0,        // fade in/out
        y: isHovered ? 0 : 10,             // slide up when shown
        pointerEvents: isHovered ? 'auto' : 'none',  // only clickable when visible
    }}
>
    <div className="tooltip-content">
        {heuristic.title}  // "Error Prevention"
    </div>
</motion.div>
```

**tooltip positioning (css):**
```css
position: absolute;
top: -55px;           /* 55px above the item */
left: 50%;            /* centered horizontally */
transform: translateX(-50%);  /* perfect centering */
```

---

## css architecture

### **FisheyeMenu.css** - layout & page design

**key techniques:**

1. **gradient background:**
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

2. **pseudo-element overlay:**
```css
.fisheye-container::before {
    content: '';
    position: absolute;
    background: radial-gradient(...);  /* subtle light effects */
    pointer-events: none;  /* doesn't block mouse events */
}
```

3. **grid layout:**
```css
.fisheye-menu {
    display: grid;
    grid-template-columns: repeat(5, 1fr);  /* 5 equal columns */
    gap: 30px;  /* space between items */
}
```

4. **responsive design:**
```css
@media (max-width: 900px) {
    grid-template-columns: repeat(3, 1fr);  /* 3 columns on tablets */
}
```

---

### **MenuItem.css** - individual item styling

**key techniques:**

1. **circular shape:**
```css
border-radius: 50%;  /* makes square into circle */
width: 120px;
height: 120px;
```

2. **glassmorphism effect:**
```css
backdrop-filter: blur(10px);  /* blurs background */
border: 2px solid rgba(255, 255, 255, 0.2);  /* semi-transparent border */
```

3. **shadow hierarchy:**
```css
/* normal state */
box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);

/* hover state */
.menu-item:hover {
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);  /* deeper, more spread */
}
```

4. **tooltip arrow:**
```css
.tooltip-content::after {
    content: '';
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 8px solid rgba(0, 0, 0, 0.9);  /* creates downward arrow */
}
```

---

## technology stack

### **react 19**
- component-based ui library
- virtual dom for efficient updates
- declarative programming model

**why react?**
- reusable components (MenuItem used 10 times)
- efficient re-rendering (only updates what changed)
- large ecosystem and community

### **typescript**
- adds static typing to javascript
- catches errors at compile time
- better intellisense/autocomplete

**example:**
```typescript
// typescript catches this error before runtime:
const item: UsabilityHeuristic = {
    id: 1,
    label: "UH#1",
    // ERROR: missing required properties!
};
```

### **vite**
- next-generation build tool
- extremely fast hot module replacement (hmr)
- optimized production builds

**what is hmr?**
- when you save a file, only that component updates
- no full page refresh
- state is preserved

### **framer-motion**
- declarative animation library for react
- physics-based animations
- gesture support

**declarative vs imperative:**
```tsx
// declarative (framer-motion) ✓
<motion.div animate={{ scale: 1.8 }} />

// imperative (vanilla js) ✗
element.style.transform = 'scale(1.8)';
// manually handle transitions, cleanup, etc.
```

---

## data flow diagram

```
usabilityHeuristics.ts (data)
         ↓
    FisheyeMenu (state: hoveredId)
         ↓
    [maps over array]
         ↓
    MenuItem #1, #2, ... #10
         ↓
    [user hovers on #5]
         ↓
    onHover() callback → setHoveredId(5)
         ↓
    FisheyeMenu re-renders
         ↓
    MenuItem #5 receives isHovered={true}
         ↓
    MenuItem #5 scales to 1.8x
    MenuItem #5 shows tooltip
```

---

## interaction flow

1. **page loads:**
   - header fades in and slides down (0s - 0.6s)
   - menu container fades in (0.3s - 0.9s)
   - items pop in one by one with spring animation (0.5s - 1.5s)
   - footer fades in (1.5s - 2.1s)

2. **user hovers on item:**
   - `onMouseEnter` fires → `onHover()` → `setHoveredId(id)`
   - react re-renders affected components
   - item scales from 1 to 1.8 with spring physics
   - shadow intensifies (4px blur → 12px blur)
   - border becomes more opaque (0.2 → 0.5 alpha)
   - tooltip fades in (opacity 0 → 1)
   - tooltip slides up (y: 10px → 0px)

3. **user moves mouse away:**
   - `onMouseLeave` fires → `onLeave()` → `setHoveredId(null)`
   - item scales back to 1
   - tooltip fades out
   - all animations reversed

---

## key concepts to explain

### 1. **component composition**
- small, reusable pieces
- MenuItem doesn't know about other items
- FisheyeMenu orchestrates the whole system

### 2. **state management**
- useState hook for local state
- state lives in parent, flows down as props
- callbacks flow up to modify state

### 3. **controlled components**
- MenuItem is "controlled" by FisheyeMenu
- MenuItem doesn't manage its own hover state
- this prevents conflicts and bugs

### 4. **separation of concerns**
- data layer (usabilityHeuristics.ts)
- logic layer (components/*.tsx)
- presentation layer (components/*.css)

### 5. **responsive design**
- 5 columns on desktop
- 4 columns on large tablets
- 3 columns on tablets
- 2 columns on mobile

---

## live demo script

### **opening (30 seconds)**
"today i'll present our fisheye menu for nielsen's 10 usability heuristics. the fisheye effect magnifies items on hover, inspired by the mac os dock."

### **demo the interaction (1 minute)**
1. hover over different items
2. show the magnification effect
3. point out the tooltip appearing above
4. demonstrate smooth animations

### **architecture overview (2 minutes)**
1. show file structure in vscode
2. explain component hierarchy: main → app → fisheyemenu → menuitem
3. explain data flow: data file → parent → children

### **code walkthrough (3 minutes)**

**show usabilityHeuristics.ts:**
"here's our data layer - 10 heuristics with id, label, title, icon, and color"

**show FisheyeMenu.tsx:**
"this manages state - which item is hovered. it maps over the data creating 10 MenuItems"

**show MenuItem.tsx:**
"each item receives props and responds to hover. the fisheye effect uses framer-motion's scale property - 1.8x when hovered"

**show MenuItem.css:**
"circular items with border-radius 50%, tooltip positioned absolutely above with css"

### **technical highlights (2 minutes)**
- react for component architecture
- typescript for type safety
- framer-motion for smooth animations
- vite for fast development

### **challenges & solutions (1 minute)**
- challenge: keeping tooltip centered above item
  - solution: absolute positioning with transform translateX(-50%)
- challenge: preventing text truncation
  - solution: reduced font size and whitespace nowrap
- challenge: managing which item is active
  - solution: centralized state in parent component

### **closing (30 seconds)**
"this demonstrates how modern web technologies create engaging, interactive user interfaces while maintaining clean, maintainable code architecture"

---

## questions you might get

**q: why use react instead of vanilla javascript?**
a: react provides component reusability, efficient re-rendering through virtual dom, and declarative programming that's easier to reason about.

**q: why framer-motion instead of css animations?**
a: framer-motion offers physics-based spring animations, gesture support, and programmatic control that's harder to achieve with pure css.

**q: how does the hover state management work?**
a: the parent component (FisheyeMenu) maintains a single hoveredId state. each MenuItem calls onHover/onLeave callbacks to update this state, ensuring only one item is magnified at a time.

**q: what's the performance impact of 10 animated components?**
a: framer-motion uses gpu-accelerated transforms and only re-renders affected components. the actual performance is excellent.

**q: how would you add more menu items?**
a: just add objects to the usabilityHeuristics array. the layout is responsive and will adjust automatically.

**q: why typescript over javascript?**
a: typescript catches errors at compile time, provides better tooling with autocomplete, and makes refactoring safer with type checking.

---

## presentation tips

1. **practice the demo** - make sure the app is running smoothly
2. **have vscode open** - show real code, not just slides
3. **use browser devtools** - show the component tree in react devtools
4. **highlight key lines** - use cursor/highlighting to guide attention
5. **speak confidently** - you built this, you know it inside out
6. **be ready to improvise** - if something doesn't work, explain what should happen

---

## live demo:

```bash
# terminal 1: start dev server
npm run dev

# terminal 2: have these commands ready
npm run build  # show production build
npm run preview  # show production preview
```

**browser devtools checklist:**
- react devtools installed
- show component hierarchy
- show state in FisheyeMenu component
- show props being passed to MenuItem

---

## assignment requirements check

✅ all menu items displayed at once
✅ pointed/hovered item becomes "larger"
✅ displays label (UH#1 - UH#10) normally
✅ displays more details (full title) when enlarged
✅ web technologies: react, typescript, css
✅ 10 menu items (one for each heuristic)
✅ interactive and smooth animations

