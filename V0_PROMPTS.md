# 🪄 V0 Prompts - Complete Component Blueprints

> **Purpose**: Complete, production-ready prompts for reconstructing AI SDK Tools components in V0 (Vercel)
> **Format**: Each prompt includes full code, props interface, styling, and usage examples
> **Goal**: Achieve 100% design fidelity with AI SDK Tools

---

## Table of Contents

1. [Core Chat Components](#core-chat-components)
2. [UI Library Components](#ui-library-components)
3. [AI-Specific Elements](#ai-specific-elements)
4. [Layout Components](#layout-components)
5. [Landing Page Components](#landing-page-components)

---

## Core Chat Components

### 1. 🧩 AI Chat Core Interface

**Component**: Complete chat interface with artifact canvas

#### V0 Prompt:

```
Create a complete AI chat interface component in React + TypeScript + Tailwind CSS, exactly matching the AI SDK Tools design.

DESIGN SYSTEM:
- Font: Geist Sans (fallback: sans-serif)
- Colors: Use CSS variables for light/dark theme support
  - Background: bg-background
  - Foreground: text-foreground
  - Primary: bg-primary text-primary-foreground
  - Muted: bg-muted text-muted-foreground
  - Border: border-border
- Border radius: rounded-lg (10px default)
- Spacing: Follow 4px base unit (p-2=8px, p-4=16px)
- Transitions: transition-all duration-300 ease-in-out

LAYOUT STRUCTURE:
- Main container: Full viewport height, flex layout
- Left side: Chat messages area (flexible width)
- Right side: Artifact canvas (600px, slides in from right)
- When artifacts present: Main area gets margin-right: 600px
- Smooth 300ms transitions for all layout changes

COMPONENTS TO CREATE:

1. ChatInterface (Main Container)
   - Manages layout state
   - Handles artifact canvas visibility
   - Coordinates header, messages, input

2. ChatMessages
   - Scrollable message list
   - Fixed header at top
   - Fixed input at bottom
   - Message rendering with role-based styling

3. ChatInput
   - Auto-expanding textarea (max 200px height)
   - File upload support
   - Submit button (or stop when streaming)
   - Web search toggle
   - Keyboard shortcuts (Enter to send, Shift+Enter for newline)

4. ArtifactCanvas
   - Fixed 600px width
   - Slides from right: translate-x-0 when open, translate-x-full when closed
   - Fixed positioning: top-0 bottom-0 right-0
   - z-index: 20
   - Smooth transition-transform duration-300

TYPESCRIPT INTERFACES:

interface ChatInterfaceProps {
  chatId?: string;
  onSendMessage: (message: ChatMessage) => void;
  theme?: 'light' | 'dark' | 'system';
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  createdAt: Date;
  artifacts?: Artifact[];
}

interface Artifact {
  id: string;
  type: 'chart' | 'table' | 'image' | 'code';
  data: unknown;
  title?: string;
}

COMPLETE CODE:

Generate the complete, production-ready React component with:
- Full TypeScript types
- Tailwind CSS styling matching the design system
- Smooth animations and transitions
- Responsive behavior
- Accessibility (ARIA labels, keyboard navigation)
- All sub-components (ChatMessages, ChatInput, ArtifactCanvas)

The component must be copy-paste ready and match the AI SDK Tools design pixel-perfectly.
```

#### Expected Output Structure:

\`\`\`typescript
'use client';

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface ChatInterfaceProps {
  chatId?: string;
  initialMessages?: ChatMessage[];
  onSendMessage: (message: ChatMessage) => void;
  theme?: 'light' | 'dark' | 'system';
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  createdAt: Date;
  artifacts?: Artifact[];
}

interface Artifact {
  id: string;
  type: 'chart' | 'table' | 'image' | 'code';
  data: unknown;
  title?: string;
}

export function ChatInterface({
  chatId,
  initialMessages = [],
  onSendMessage,
  theme = 'system',
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [inputText, setInputText] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);

  const hasArtifacts = messages.some(m => m.artifacts && m.artifacts.length > 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isStreaming) return;

    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: inputText,
      createdAt: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);
    onSendMessage(newMessage);
    setInputText('');
  };

  return (
    <div className="relative flex size-full overflow-hidden min-h-screen">
      {/* Artifact Canvas - Slides in from right */}
      <div
        className={cn(
          'fixed right-0 top-0 bottom-0 z-20 w-[600px] bg-background border-l',
          hasArtifacts ? 'translate-x-0' : 'translate-x-full',
          'transition-transform duration-300 ease-in-out'
        )}
      >
        <ArtifactCanvas artifacts={messages.flatMap(m => m.artifacts || [])} />
      </div>

      {/* Main Chat Area - Slides left when canvas opens */}
      <div
        className={cn(
          'relative flex-1 flex flex-col',
          'transition-all duration-300 ease-in-out',
          hasArtifacts && 'mr-[600px]'
        )}
      >
        {/* Chat Header */}
        <div className="fixed top-0 left-0 right-0 z-10 bg-background/80 backdrop-blur-sm border-b">
          <ChatHeader chatId={chatId} />
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto pt-16 pb-32">
          <ChatMessages messages={messages} />
        </div>

        {/* Input Area */}
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t">
          <ChatInput
            value={inputText}
            onChange={setInputText}
            onSubmit={handleSubmit}
            isStreaming={isStreaming}
          />
        </div>
      </div>
    </div>
  );
}

// Sub-components follow same pattern...
\`\`\`

---

### 2. 🧩 Button Component (Design System Base)

#### V0 Prompt:

```
Create a complete Button component matching the AI SDK Tools design system.

REQUIREMENTS:
- Use class-variance-authority (cva) for variants
- Full TypeScript with proper types
- Tailwind CSS classes
- Support for Radix UI Slot (asChild pattern)

VARIANTS:
1. default: bg-primary text-primary-foreground hover:bg-primary/90
2. destructive: bg-destructive text-white hover:bg-destructive/90
3. outline: border bg-background hover:bg-accent
4. secondary: bg-secondary text-secondary-foreground hover:bg-secondary/80
5. ghost: hover:bg-accent hover:text-accent-foreground
6. link: text-primary underline-offset-4 hover:underline

SIZES:
1. sm: h-8 px-3 rounded-md text-sm
2. default: h-9 px-4 rounded-md text-sm
3. lg: h-10 px-6 rounded-md text-base
4. icon: size-9 (square button)
5. icon-sm: size-8
6. icon-lg: size-10

STATES:
- Hover: Subtle background change
- Focus: Ring with focus-visible:ring-2 focus-visible:ring-ring
- Disabled: opacity-50 pointer-events-none
- Loading: Show spinner icon

ACCESSIBILITY:
- Proper button semantics
- Keyboard navigation support
- ARIA labels when needed
- Focus visible indicators

Generate the COMPLETE, production-ready component code.
```

#### Expected Output:

\`\`\`typescript
import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-white hover:bg-destructive/90',
        outline: 'border bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3',
        lg: 'h-10 rounded-md px-6',
        icon: 'size-9',
        'icon-sm': 'size-8',
        'icon-lg': 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
\`\`\`

---

### 3. 🧩 Input Component

#### V0 Prompt:

```
Create a complete Input component matching AI SDK Tools design.

DESIGN:
- Base: border rounded-md px-3 py-2 text-sm
- Background: bg-background
- Border: border-input
- Focus: focus:ring-2 focus:ring-ring focus:border-ring
- Disabled: disabled:opacity-50 disabled:cursor-not-allowed
- Invalid: aria-invalid:ring-destructive

FEATURES:
- Auto-expanding textarea variant
- File input support
- Icon support (left/right)
- Clear button option
- Character counter
- Error state display

TYPE SAFETY:
- Proper TypeScript types
- Generic for value types
- Ref forwarding

Generate complete component with all variants.
```

#### Expected Output:

\`\`\`typescript
import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm',
          'placeholder:text-muted-foreground',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'aria-invalid:ring-destructive aria-invalid:border-destructive',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
\`\`\`

---

### 4. 🧩 Card Component

#### V0 Prompt:

```
Create a complete Card component system matching AI SDK Tools.

STRUCTURE:
- Card (container)
- CardHeader
- CardTitle
- CardDescription
- CardContent
- CardFooter

STYLING:
- Container: rounded-lg border bg-card text-card-foreground shadow-sm
- Header: flex flex-col space-y-1.5 p-6
- Title: text-lg font-semibold leading-none tracking-tight
- Description: text-sm text-muted-foreground
- Content: p-6 pt-0
- Footer: flex items-center p-6 pt-0

Generate complete component set with proper composition.
```

#### Expected Output:

\`\`\`typescript
import * as React from 'react';
import { cn } from '@/lib/utils';

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'rounded-lg border bg-card text-card-foreground shadow-sm',
        className
      )}
      {...props}
    />
  )
);
Card.displayName = 'Card';

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
  )
);
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('text-lg font-semibold leading-none tracking-tight', className)}
      {...props}
    />
  )
);
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
  )
);
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
  )
);
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center p-6 pt-0', className)} {...props} />
  )
);
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
\`\`\`

---

## AI-Specific Elements

### 5. 🧩 Message Component

#### V0 Prompt:

```
Create a ChatMessage component for displaying AI chat messages.

FEATURES:
- Role-based styling (user vs assistant)
- Markdown rendering support
- Code block syntax highlighting
- Tool execution display
- Artifact embedding
- Message actions (copy, regenerate, branch)
- Streaming animation for partial content

USER MESSAGE:
- Align right
- Background: bg-primary/10
- Padding: p-4
- Rounded: rounded-lg
- Max width: max-w-2xl
- Margin: ml-auto

ASSISTANT MESSAGE:
- Align left
- Background: transparent
- Padding: p-4
- Rounded: rounded-lg
- Max width: max-w-2xl
- Include avatar on left

MARKDOWN:
- Headings: Bold, larger font
- Lists: Proper indentation
- Code inline: bg-muted rounded px-1
- Code blocks: Full syntax highlighting with language label
- Links: text-primary underline

Generate complete component with all features.
```

#### Expected Output:

\`\`\`typescript
'use client';

import { cn } from '@/lib/utils';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Copy, RefreshCw, GitBranch } from 'lucide-react';

interface ChatMessageProps {
  message: {
    id: string;
    role: 'user' | 'assistant' | 'system';
    content: string;
    createdAt: Date;
  };
  onCopy?: () => void;
  onRegenerate?: () => void;
  onBranch?: () => void;
}

export function ChatMessage({ message, onCopy, onRegenerate, onBranch }: ChatMessageProps) {
  const isUser = message.role === 'user';
  const isAssistant = message.role === 'assistant';

  return (
    <div
      className={cn(
        'flex gap-3 w-full',
        isUser && 'flex-row-reverse'
      )}
    >
      {/* Avatar */}
      {isAssistant && (
        <Avatar className="size-8">
          <AvatarImage src="/ai-avatar.png" alt="AI" />
          <AvatarFallback>AI</AvatarFallback>
        </Avatar>
      )}

      {/* Message Content */}
      <div
        className={cn(
          'flex flex-col gap-2 rounded-lg p-4 max-w-2xl',
          isUser && 'bg-primary/10 ml-auto',
          isAssistant && 'bg-transparent'
        )}
      >
        {/* Message Text */}
        <div className="prose prose-sm dark:prose-invert">
          {message.content}
        </div>

        {/* Message Actions */}
        {isAssistant && (
          <div className="flex gap-1 mt-2">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={onCopy}
              aria-label="Copy message"
            >
              <Copy className="size-3" />
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={onRegenerate}
              aria-label="Regenerate response"
            >
              <RefreshCw className="size-3" />
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={onBranch}
              aria-label="Branch conversation"
            >
              <GitBranch className="size-3" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
\`\`\`

---

### 6. 🧩 Tool Execution Display

#### V0 Prompt:

```
Create a ToolExecution component showing AI tool usage.

DESIGN:
- Collapsible card showing tool name and status
- Status indicators: executing (spinner), success (check), error (x)
- Tool input parameters display
- Tool output display (formatted JSON or text)
- Execution time display
- Expand/collapse animation

STATES:
- executing: Show spinner + "Executing..."
- success: Show check + "Completed in Xms"
- error: Show X + error message

STYLING:
- Container: border rounded-md p-3 bg-muted/50
- Header: flex items-center justify-between
- Content: mt-2 text-sm text-muted-foreground
- Collapsible: smooth height transition

Generate complete component.
```

---

## Landing Page Components

### 7. 🌐 Hero Section

#### V0 Prompt:

```
Create a Hero section for the AI SDK Tools landing page.

LAYOUT:
- Full viewport height
- Centered content
- Gradient background (subtle)
- CTA buttons
- Feature highlights

CONTENT:
- Main heading: "AI SDK Tools"
- Subheading: "Essential utilities for building production-ready AI applications"
- Primary CTA: "Get Started" (link to example app)
- Secondary CTA: "View on GitHub"
- Feature cards: Store, Agents, Artifacts, Cache, Memory

STYLING:
- Heading: text-5xl font-bold tracking-tight
- Subheading: text-xl text-muted-foreground
- Buttons: Large size, prominent
- Feature cards: Grid layout, 3 columns
- Responsive: Stack on mobile

Generate complete component.
```

#### Expected Output:

\`\`\`typescript
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { GitHubLogoIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

export function Hero() {
  const features = [
    {
      title: 'Store',
      description: '3-5x faster state management with zero prop drilling',
      icon: '📦',
    },
    {
      title: 'Agents',
      description: 'Multi-agent orchestration with automatic handoffs',
      icon: '🤖',
    },
    {
      title: 'Artifacts',
      description: 'Stream structured, type-safe data to React components',
      icon: '🎨',
    },
    {
      title: 'Cache',
      description: 'Universal caching for expensive operations',
      icon: '⚡',
    },
    {
      title: 'Memory',
      description: 'Persistent memory for AI agents',
      icon: '🧠',
    },
    {
      title: 'Devtools',
      description: 'Debug AI applications with visual tools',
      icon: '🔧',
    },
  ];

  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-4 py-16">
      <div className="mx-auto max-w-6xl text-center">
        {/* Main Heading */}
        <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
          AI SDK Tools
        </h1>

        {/* Subheading */}
        <p className="mt-6 text-xl text-muted-foreground">
          Essential utilities for building production-ready AI applications
          <br />
          with Vercel AI SDK
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/example">Get Started</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="https://github.com/midday-ai/ai-sdk-tools" target="_blank">
              <GitHubLogoIcon className="mr-2" />
              View on GitHub
            </Link>
          </Button>
        </div>

        {/* Feature Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Card key={feature.title}>
              <CardHeader>
                <div className="text-4xl mb-2">{feature.icon}</div>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
\`\`\`

---

## Utility Components

### 8. 🧩 Theme Toggle

#### V0 Prompt:

```
Create a ThemeToggle component with smooth transitions.

FEATURES:
- Toggle between light/dark/system
- Smooth color transitions (200ms)
- Persistent preference (localStorage)
- System preference detection
- Icon changes (sun/moon)

IMPLEMENTATION:
- Use next-themes library
- Button with dropdown for 3 options
- Active state indication
- Keyboard accessible

Generate complete component.
```

---

## Complete Application Templates

### 9. 🚀 Full Chat Application

#### V0 Prompt:

```
Create a COMPLETE chat application combining all components:

STRUCTURE:
1. Root Layout with Provider
2. Chat Interface with sliding canvas
3. Message list with user/assistant messages
4. Input with file upload and web search toggle
5. Artifact canvas with chart/table rendering
6. Header with navigation and theme toggle
7. Sidebar with chat history

FEATURES:
- Real-time message streaming
- Artifact visualization
- Multi-file upload
- Web search integration
- Dark/light theme
- Mobile responsive
- Keyboard shortcuts
- Optimistic UI updates

TECH STACK:
- Next.js 14 App Router
- React 18+ with hooks
- TypeScript strict mode
- Tailwind CSS
- Radix UI components
- Framer Motion (optional animations)

Generate the COMPLETE application structure with all files:
- app/layout.tsx
- app/page.tsx
- app/api/chat/route.ts
- components/* (all UI components)
- lib/utils.ts
- types/index.ts

Make it production-ready, fully typed, and pixel-perfect matching AI SDK Tools.
```

---

## Design System Reference

### CSS Variables (globals.css)

\`\`\`css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --radius: 0.625rem;

    /* Light Mode */
    --background: oklch(1 0 0);
    --foreground: oklch(0.145 0 0);
    --primary: oklch(0.205 0 0);
    --primary-foreground: oklch(0.985 0 0);
    --secondary: oklch(0.97 0 0);
    --secondary-foreground: oklch(0.205 0 0);
    --muted: oklch(0.97 0 0);
    --muted-foreground: oklch(0.556 0 0);
    --accent: oklch(0.97 0 0);
    --accent-foreground: oklch(0.205 0 0);
    --destructive: oklch(0.577 0.245 27.325);
    --border: oklch(0.922 0 0);
    --input: oklch(0.922 0 0);
    --ring: oklch(0.708 0 0);
  }

  .dark {
    --background: oklch(0.145 0 0);
    --foreground: oklch(0.985 0 0);
    --primary: oklch(0.922 0 0);
    --primary-foreground: oklch(0.205 0 0);
    --secondary: oklch(0.269 0 0);
    --secondary-foreground: oklch(0.985 0 0);
    --muted: oklch(0.269 0 0);
    --muted-foreground: oklch(0.708 0 0);
    --accent: oklch(0.269 0 0);
    --accent-foreground: oklch(0.985 0 0);
    --destructive: oklch(0.704 0.191 22.216);
    --border: oklch(1 0 0 / 10%);
    --input: oklch(1 0 0 / 15%);
    --ring: oklch(0.556 0 0);
  }

  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground;
  }
}
\`\`\`

---

## Usage Instructions

### How to Use These Prompts in V0

1. **Copy the entire prompt** for the component you want
2. **Paste into V0 chat** at v0.dev
3. **V0 will generate** the complete component code
4. **Copy the generated code** into your project
5. **Adjust imports** and dependencies as needed
6. **Test and iterate** if needed

### Customization

Each prompt is designed to be modified:
- Change colors by updating CSS variables
- Adjust spacing by changing Tailwind classes
- Add/remove features by editing the prompt
- Combine prompts for complex components

### Dependencies

Ensure these are installed:

\`\`\`bash
npm install tailwindcss class-variance-authority clsx tailwind-merge
npm install @radix-ui/react-slot
npm install lucide-react  # For icons
npm install framer-motion  # Optional, for animations
\`\`\`

---

## Component Checklist

- [x] ChatInterface (Core)
- [x] Button (Base UI)
- [x] Input (Base UI)
- [x] Card (Base UI)
- [x] ChatMessage (AI Element)
- [x] ToolExecution (AI Element)
- [x] Hero (Landing Page)
- [x] ThemeToggle (Utility)
- [x] Full Application Template

### Additional Components Available

Request these prompts as needed:
- Dialog/Modal
- Dropdown Menu
- Tooltip
- Tabs
- Accordion
- Select
- Avatar
- Badge
- Progress
- Scroll Area
- Popover
- Command Menu
- Data Table
- Chart Components (Line, Bar, Pie)

---

## Support & Resources

- **Live Examples**: See /apps/example for working implementations
- **Design System**: Reference DOCUMENTATION_OVERVIEW.md
- **Original Repo**: [github.com/midday-ai/ai-sdk-tools](https://github.com/midday-ai/ai-sdk-tools)
- **Questions**: Open an issue on GitHub

---

**Last Updated**: 2025-10-27
**Version**: 1.0
**Compatibility**: V0 by Vercel (Next.js 14+, React 18+)
