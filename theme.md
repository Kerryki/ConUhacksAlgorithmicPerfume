# Theme Documentation - AI Perfume Lab

## Project Vision

**AI Perfume Lab** is an immersive, AI-driven platform that enables users to design fully personalized fragrances through a visually rich, gamified journey. The experience blends **luxury aesthetics, emotional storytelling, and algorithmic design**, positioning perfume creation as both an art and a science.

### Core Philosophy

- **Replace forms with intuitive, playful interactions**
- **Translate human identity and emotion into fragrance using AI**
- **Create a premium, memorable user journey**
- **Generate complete perfume output: name, bottle, and composition**

---

## Design System

### Color Palette

#### Primary Background
- **Deep Black**: `#050505` / `#0a0a0a` - Main background for luxury dark mode
- **Pure Black**: `#000000` - Deepest backgrounds for contrast

#### Accent Colors

**Gold/Amber (Primary Luxury Accent)**
- `#FFD700` (Gold) - Primary gold
- `#FFA500` (Orange Gold) - Secondary gold
- `#fbbf24` (Amber-400) - Tailwind amber
- `#f59e0b` (Amber-600) - Darker amber
- `#fde68a` (Amber-200) - Light amber
- Usage: Clock hands, arcs, buttons, highlights, glows

**White/Transparent (Text & Borders)**
- `#ffffff` (White) - Primary text
- `rgba(255, 255, 255, 0.6)` - Secondary text
- `rgba(255, 255, 255, 0.4)` - Tertiary text
- `rgba(255, 255, 255, 0.2)` - Borders, subtle elements
- `rgba(255, 255, 255, 0.15)` - Background overlays
- `rgba(255, 255, 255, 0.1)` - Very subtle backgrounds

**Projection Aura Colors (Multi-layered Gradients)**
- **Purple/Pink Layer**: `rgba(168, 85, 247, 0.6)` → `rgba(236, 72, 153, 0.4)` → `rgba(139, 92, 246, 0.2)`
- **Cyan/Blue Layer**: `rgba(34, 211, 238, 0.5)` → `rgba(59, 130, 246, 0.4)` → `rgba(96, 165, 250, 0.2)`
- **Orange/Yellow Layer**: `rgba(251, 146, 60, 0.6)` → `rgba(252, 211, 77, 0.5)` → `rgba(251, 191, 36, 0.3)`
- **Magenta/Pink Accent**: `rgba(219, 39, 119, 0.5)` → `rgba(236, 72, 153, 0.4)`

### Typography

**Font Families**
- **Primary**: System fonts (Arial, Helvetica, sans-serif) - Clean, modern
- **Serif Accent**: `font-serif` - For italicized luxury text (e.g., "Aura")
- **Monospace**: Reserved for technical displays (if needed)

**Font Weights**
- `font-light` (300) - Primary body text, headings
- `font-medium` (500) - Buttons, emphasis
- `font-semibold` (600) - Strong emphasis (rarely used)

**Font Sizes**
- `text-xs` - Subtitles, labels, metadata
- `text-sm` - Secondary text, descriptions
- `text-base` - Standard body text
- `text-lg` - Button text
- `text-3xl` - Section headings
- `text-4xl` / `text-5xl` - Page titles

**Letter Spacing**
- `tracking-wide` - Standard spacing for headings
- `tracking-wider` - Extended spacing for luxury feel
- `tracking-widest` - Maximum spacing for uppercase labels

### Spacing & Layout

**Container Widths**
- `max-w-md` - Narrow content (text blocks)
- `max-w-2xl` - Standard content width
- `max-w-4xl` - Wide content areas

**Padding & Margins**
- `px-6` - Standard horizontal padding
- `py-4` / `py-8` / `py-12` - Vertical spacing
- `space-y-3` / `space-y-6` / `space-y-8` - Vertical gaps between elements

**Layout Patterns**
- `min-h-screen` - Full viewport height
- `flex flex-col` - Vertical stacking
- `items-center justify-center` - Centered content
- `relative` / `absolute` - Layered positioning for visual effects

---

## Visual Aesthetics

### Dark Luxury Mode

**Core Principle**: Deep black backgrounds with subtle glowing accents create a premium, sophisticated atmosphere reminiscent of high-end perfume boutiques.

**Key Characteristics**:
- **Minimalist**: Clean, uncluttered interfaces
- **Glowing Elements**: Gold accents with soft glows and shadows
- **Depth**: Layered z-index for visual hierarchy
- **Refined**: Subtle borders, soft transitions, elegant animations

### Animation Philosophy

**Spring Physics**
- Use Framer Motion `useSpring` for natural, organic motion
- Standard config: `stiffness: 80-100, damping: 20-25, mass: 1`
- Smooth, responsive animations that feel premium

**Transition Timing**
- `duration: 300ms` - Standard UI transitions
- `duration: 500ms` - Page transitions, reveals
- `cubic-bezier(0.4, 0, 0.2, 1)` - Smooth easing curves

**Hover States**
- `hover:scale-105` - Subtle scale increase
- `hover:bg-white/20` - Background lightening
- `hover:border-white/30` - Border enhancement
- `hover:shadow-lg` - Depth increase
- `active:scale-95` - Press feedback

### Glow Effects

**Gold Glows**
- `box-shadow: 0 0 20px rgba(251, 191, 36, 0.5)` - Text glow
- `filter: drop-shadow(0 0 6px rgba(255, 215, 0, 0.8))` - Element glow
- `textShadow: '0 0 20px rgba(251, 191, 36, 0.5), 0 0 40px rgba(251, 191, 36, 0.3)'` - Multi-layer text glow

**Aura Effects**
- Multi-layered radial gradients with blur
- Rotating, morphing shapes for dynamic backgrounds
- Opacity and scale animations synchronized with user input

---

## UI Component Patterns

### Buttons

**Primary Button (Continue/Start)**
```jsx
className="w-full py-4 bg-gradient-to-r from-amber-500/20 to-amber-600/20 
           backdrop-blur-sm border border-amber-500/30 rounded-full 
           text-white font-light text-lg tracking-wide 
           hover:from-amber-500/30 hover:to-amber-600/30 
           transition-all duration-300 hover:border-amber-400/50 
           hover:shadow-lg hover:shadow-amber-500/20"
```

**Secondary Button**
```jsx
className="w-full py-4 bg-white/10 backdrop-blur-sm border border-white/20 
           rounded-full text-white font-medium 
           hover:bg-white/20 transition-all duration-300 
           hover:border-white/30 hover:scale-105 active:scale-95"
```

**Key Features**:
- Full width (`w-full`)
- Rounded full (`rounded-full`)
- Backdrop blur for glassmorphism
- Gradient backgrounds for primary actions
- Smooth hover transitions

### Sliders

**Luxury Slider Styling**
- Custom styled range input with golden track
- Gradient track: Gold (filled) → White/transparent (unfilled)
- Large thumb (32px) with radial gradient thumb
- Gold gradient thumb with glow effects
- Smooth spring animations on value change

**Slider Track Colors**:
- Filled: `rgba(251, 191, 36, 0.4)` → `rgba(251, 191, 36, 0.7)`
- Unfilled: `rgba(255, 255, 255, 0.15)`

### Headers & Text

**Page Title**
```jsx
<h1 className="text-4xl md:text-5xl font-light text-white">
  Define Your <span className="text-amber-400 italic font-serif">Aura</span>
</h1>
```

**Subtitle**
```jsx
<p className="text-white/60 text-sm font-light tracking-wide max-w-md">
  Balance the enduring nature of your fragrance with its radiant projection.
</p>
```

**Label Pattern**
```jsx
<div className="text-white text-base font-light tracking-wide mb-1">
  Long Lasting
</div>
<div className="text-white/40 text-xs uppercase tracking-widest">
  Intimate & Enduring
</div>
```

### Visual Components

**Clock Component**
- Minimalist design: single hour hand, no minute hand
- Gold gradient arc with glow effect
- Spring-animated rotation synchronized with arc fill
- Center dot anchor point
- Subtle hour markers (12 positions)

**Aura Component**
- Multi-layered radial gradients
- Rotating, morphing shapes
- Scale and opacity animations
- Color layers: Purple/Pink, Cyan/Blue, Orange/Yellow, Magenta
- Blur effects for atmospheric depth

---

## User Experience Principles

### Interaction Design

1. **No Forms**: Replace traditional questionnaires with interactive visual experiences
2. **Gamification**: Make selection feel like play, not work
3. **Visual Feedback**: Every interaction has immediate, beautiful visual response
4. **Progressive Disclosure**: Reveal information gradually, not all at once
5. **Emotional Connection**: Use language and visuals that evoke feeling

### Page Flow Pattern

**Standard Page Structure**:
1. **Start Screen** (optional): Title, description, "Start" button
2. **Main Interaction**: Central visual element with controls
3. **Navigation**: "Continue" button at bottom
4. **Header**: Page title with optional subtitle

**Layout Hierarchy**:
```
┌─────────────────────────┐
│   Header (Title/Desc)   │
│                         │
│                         │
│   Central Visual        │
│   (Interactive)         │
│                         │
│                         │
│   Controls/Slider       │
│   Continue Button       │
└─────────────────────────┘
```

### Language & Tone

**Brand Voice**:
- **Luxury**: Refined, sophisticated language
- **Poetic**: Evocative descriptions (e.g., "Define Your Aura")
- **Scientific**: Subtle algorithmic references ("Algorithmic Fragrance Design")
- **Personal**: Direct address ("your fragrance", "your signature")

**Example Phrases**:
- "Design your signature fragrance through our AI-powered scent synthesis protocol"
- "Balance the enduring nature of your fragrance with its radiant projection"
- "Intimate & Enduring" / "Bold & Radiant"

---

## Technical Patterns

### State Management

**React Hooks Pattern**:
```javascript
const [hasStarted, setHasStarted] = useState(false);
const [sliderValue, setSliderValue] = useState(50);
```

**Normalization Pattern**:
- Slider values: 0-100 (integer)
- Normalized values: 0.0-1.0 (float, 2 decimal places)
- Formula: `normalizedValue = sliderValue / 100`

### Animation Libraries

**Framer Motion**:
- Primary animation library
- `useSpring` for smooth physics-based animations
- `useTransform` for value mapping
- `motion.div` for animated elements
- `useMotionValueEvent` for value subscriptions

### Data Flow

**Component Props**:
- Pass raw slider values (0-100) to child components
- Components calculate their own derived values
- Inverse relationships: `longevity = 100 - sliderValue`

**Backend Integration Pattern**:
```javascript
const payload = {
  projection_score: parseFloat(projectionScore.toFixed(2)),
  longevity_score: parseFloat(longevityScore.toFixed(2)),
  raw_slider_value: sliderValue,
  timestamp: new Date().toISOString()
};
```

### Z-Index Layering

**Standard Hierarchy**:
- Background elements: `z-0` (default)
- Aura/atmospheric effects: `z-10`
- Main interactive elements: `z-20`
- Overlays/modals: `z-30`+

---

## Brand Identity

### Visual Identity

**Mood**: Dark, luxurious, mysterious, sophisticated, premium

**Inspiration**:
- High-end perfume boutiques
- Laboratory aesthetics (AI/algorithmic theme)
- Luxury watch design (clock components)
- Perfume chemistry (hexagonal grids, molecular structures)

### Naming Conventions

**Project Name**: AI Perfume Lab
**Tagline**: "Scent by Algorithm"
**Page Titles**: Poetic, evocative (e.g., "Define Your Aura")

### Iconography

**Clock Icon**: Represents longevity, time, endurance
**Aura/Wi-Fi Icon**: Represents projection, reach, sillage
**Hexagonal Grids**: Chemical/molecular aesthetic
**Gradient Orbs**: Fragrance diffusion, atmospheric

---

## User Journey Structure

### Foundational Pages (Identity Capture)

1. **Intro Page**: Brand introduction, "Start Design" CTA
2. **Personality Page**: 7 core personalities, card-based selection
3. **Age Page**: Life stage selection (influences intensity)
4. **Color Picker**: Emotional tone via color wheel

### Refinement Pages (Preference Tuning)

5. **Presence Page**: Masculine/Feminine gradient slider
6. **Time & Mood Page**: When scent is worn (Dawn/Noon/Dusk/Midnight)
7. **Main Accords Page**: Scent family selection (Woody/Floral/Fresh/Oriental)
8. **Season & Weather Page**: Climate preference
9. **Longevity & Projection Page**: Balance slider (inverse relationship)

### Finalization Pages

10. **Name Your Perfume**: User input or AI suggestion
11. **Final Output**: Complete perfume reveal with bottle design

---

## Code Style Guidelines

### Component Structure

```javascript
'use client';

import { useState } from 'react';
import ComponentName from './components/ComponentName';

export default function PageName() {
  // State declarations
  const [state, setState] = useState(initial);
  
  // Handlers
  const handleAction = () => {
    // Logic
  };
  
  // Conditional rendering (start screen)
  if (!hasStarted) {
    return <StartScreen />;
  }
  
  // Main render
  return (
    <div className="min-h-screen bg-[#050505] flex flex-col...">
      {/* Content */}
    </div>
  );
}
```

### Styling Approach

- **Tailwind CSS**: Primary styling method
- **Inline Styles**: For dynamic values (colors, transforms)
- **Style JSX**: For complex pseudo-element styling (slider thumbs)
- **CSS Variables**: Minimal use, prefer Tailwind

### Naming Conventions

- **Components**: PascalCase (`LongevityClock.js`)
- **Functions**: camelCase (`handleSliderChange`)
- **CSS Classes**: Tailwind utility classes
- **Custom Classes**: kebab-case (`.slider-luxury`)

---

## Accessibility Considerations

### Color Contrast
- White text on black background: High contrast
- Gold on black: Sufficient contrast for emphasis
- Ensure all interactive elements have clear visual feedback

### Keyboard Navigation
- All interactive elements should be keyboard accessible
- Focus states should be visible (gold outline)

### Screen Readers
- Semantic HTML elements
- ARIA labels for complex interactions
- Descriptive alt text for visual elements

---

## Future Development Guidelines

### Adding New Pages

1. Follow the established page structure pattern
2. Use the color palette and typography system
3. Implement smooth animations with Framer Motion
4. Maintain dark luxury aesthetic
5. Include start screen if interaction is complex
6. Use consistent button styling
7. Follow normalization patterns for data

### Adding New Components

1. Create in `components/` directory
2. Use 'use client' directive for interactivity
3. Accept props for dynamic values
4. Use Framer Motion for animations
5. Follow z-index layering guidelines
6. Maintain consistent styling with theme

### Backend Integration

1. Normalize values to 0.0-1.0 floats
2. Include timestamp in payloads
3. Use consistent endpoint naming: `/api/perfumes/{feature}`
4. Handle errors gracefully with user feedback
5. Maintain payload structure consistency

---

## Key Takeaways for AI Agents

When working on this project:

1. **Always use dark backgrounds** (`#050505` or `#0a0a0a`)
2. **Gold/amber is the primary accent color** - use for highlights, glows, buttons
3. **White text with opacity** for hierarchy (100%, 60%, 40%, 20%)
4. **Spring animations** for smooth, premium feel
5. **Rounded full buttons** with backdrop blur
6. **Poetic, luxury language** in UI text
7. **No forms** - use interactive visual experiences
8. **Normalize data** to 0.0-1.0 floats for backend
9. **Maintain z-index hierarchy** for layered visuals
10. **Follow the page structure pattern** for consistency

---

*This theme documentation should be referenced for all future development to maintain visual and experiential coherence across the AI Perfume Lab platform.*
