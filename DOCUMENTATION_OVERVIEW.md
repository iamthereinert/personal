# 📚 AI SDK Tools - Complete Documentation Overview

> **Version**: 0.1.0
> **Status**: Active Development
> **License**: MIT
> **Repository**: [github.com/midday-ai/ai-sdk-tools](https://github.com/midday-ai/ai-sdk-tools)

## 🎯 Project Summary

AI SDK Tools is a comprehensive collection of utilities for building production-ready AI applications with the Vercel AI SDK. It provides state management, debugging tools, structured streaming, intelligent agents, caching, and persistent memory in a performant, type-safe monorepo architecture.

### Core Philosophy

- **Zero Configuration**: Works out of the box with sensible defaults
- **Performance First**: 3-5x faster than standard implementations
- **Type Safety**: Full TypeScript support with generics
- **Framework Agnostic**: Works with any AI provider (OpenAI, Anthropic, Google, etc.)
- **Production Ready**: Battle-tested patterns and optimizations

---

## 🏗️ Architecture

### Monorepo Structure

```
ai-sdk-tools/
├── apps/                           # Application demos
│   ├── example/                   # Complete chat interface demo
│   │   ├── src/
│   │   │   ├── ai/               # Agent definitions, tools, artifacts
│   │   │   ├── app/              # Next.js app router
│   │   │   ├── components/       # React components
│   │   │   ├── hooks/            # Custom hooks
│   │   │   └── lib/              # Utilities
│   │   ├── package.json
│   │   └── README.md
│   └── website/                   # Landing page/docs site
│       ├── src/
│       ├── package.json
│       └── README.md
│
├── packages/                       # Core libraries
│   ├── store/                     # State management (3-5x faster useChat)
│   ├── agents/                    # Multi-agent orchestration
│   ├── artifacts/                 # Structured data streaming
│   ├── cache/                     # Universal caching layer
│   ├── memory/                    # Persistent memory system
│   ├── devtools/                  # Development debugging tools
│   ├── debug/                     # Core debug utilities
│   └── ai-sdk-tools/              # Unified export package
│
├── package.json                    # Root workspace config
├── bun.lock                       # Bun lockfile
└── README.md                      # Main documentation
```

### Architecture Diagram

\`\`\`mermaid
graph TD
    A[Landing Page<br/>apps/website] -->|Link| B[Main App<br/>apps/example]

    B --> C[Chat Interface]
    C --> D[User Input]
    C --> E[Message Display]
    C --> F[Artifact Canvas]

    D --> G[@ai-sdk-tools/store<br/>State Management]
    E --> G
    F --> H[@ai-sdk-tools/artifacts<br/>Structured Streaming]

    B --> I[API Routes]
    I --> J[@ai-sdk-tools/agents<br/>Multi-Agent System]

    J --> K[Agent 1:<br/>Triage]
    J --> L[Agent 2:<br/>Research]
    J --> M[Agent 3:<br/>Analytics]

    K --> N[Tools]
    L --> N
    M --> N

    N --> O[@ai-sdk-tools/cache<br/>Caching Layer]
    N --> P[@ai-sdk-tools/memory<br/>Persistence]

    G --> Q[React Components]
    H --> Q
    J --> Q

    R[@ai-sdk-tools/devtools<br/>Debug UI] -.->|Dev Only| Q
\`\`\`

---

## 🎨 Design System

### Color Palette

#### Light Mode

| Token | Value | Usage |
|-------|-------|-------|
| `--background` | `oklch(1 0 0)` | Pure white background |
| `--foreground` | `oklch(0.145 0 0)` | Near black text |
| `--primary` | `oklch(0.205 0 0)` | Primary actions |
| `--secondary` | `oklch(0.97 0 0)` | Secondary surfaces |
| `--muted` | `oklch(0.97 0 0)` | Muted text/backgrounds |
| `--accent` | `oklch(0.97 0 0)` | Hover states |
| `--border` | `oklch(0.922 0 0)` | Borders, dividers |
| `--destructive` | `oklch(0.577 0.245 27.325)` | Error, delete actions |
| `--ring` | `oklch(0.708 0 0)` | Focus rings |

#### Dark Mode

| Token | Value | Usage |
|-------|-------|-------|
| `--background` | `oklch(0.145 0 0)` | Near black background |
| `--foreground` | `oklch(0.985 0 0)` | Near white text |
| `--primary` | `oklch(0.922 0 0)` | Primary actions (lighter) |
| `--secondary` | `oklch(0.269 0 0)` | Secondary surfaces (darker) |
| `--muted` | `oklch(0.269 0 0)` | Muted backgrounds |
| `--accent` | `oklch(0.269 0 0)` | Hover states |
| `--border` | `oklch(1 0 0 / 10%)` | Subtle borders |
| `--destructive` | `oklch(0.704 0.191 22.216)` | Bright error states |
| `--ring` | `oklch(0.556 0 0)` | Focus rings (darker) |

### Typography

#### Font Families

```css
--font-sans: 'Geist Sans', sans-serif;      /* Primary UI font */
--font-mono: 'Departure Mono', monospace;   /* Code blocks */
--font-serif: 'Geist Sans', sans-serif;     /* Fallback */
```

#### Type Scale

| Class | Size | Line Height | Usage |
|-------|------|-------------|-------|
| `text-xs` | 0.75rem (12px) | 1rem | Labels, captions |
| `text-sm` | 0.875rem (14px) | 1.25rem | UI elements, buttons |
| `text-base` | 1rem (16px) | 1.5rem | Body text |
| `text-lg` | 1.125rem (18px) | 1.75rem | Subheadings |
| `text-xl` | 1.25rem (20px) | 1.75rem | Headings |
| `text-2xl` | 1.5rem (24px) | 2rem | Page titles |

#### Font Weights

- `font-normal` (400): Body text
- `font-medium` (500): UI elements, buttons
- `font-semibold` (600): Headings, emphasis
- `font-bold` (700): Strong emphasis (rare)

### Spacing System

Base unit: **4px** (`0.25rem`)

| Token | Value | Pixels | Common Usage |
|-------|-------|--------|--------------|
| `0` | 0 | 0px | Reset spacing |
| `1` | 0.25rem | 4px | Tight spacing |
| `2` | 0.5rem | 8px | Small gaps |
| `3` | 0.75rem | 12px | Component padding |
| `4` | 1rem | 16px | Standard spacing |
| `6` | 1.5rem | 24px | Section spacing |
| `8` | 2rem | 32px | Large sections |
| `12` | 3rem | 48px | Major sections |
| `16` | 4rem | 64px | Hero spacing |

### Border Radius

```css
--radius: 0.625rem;  /* 10px - base radius */

--radius-sm: calc(var(--radius) - 4px);  /* 6px */
--radius-md: calc(var(--radius) - 2px);  /* 8px */
--radius-lg: var(--radius);              /* 10px */
--radius-xl: calc(var(--radius) + 4px);  /* 14px */
```

**Application**:
- `rounded-sm` (6px): Compact elements, tags
- `rounded-md` (8px): Buttons, inputs
- `rounded-lg` (10px): Cards, dialogs
- `rounded-xl` (14px): Large containers

### Shadows

Minimal shadow usage, prefer borders:

```css
shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.05);  /* Subtle elevation */
shadow: 0 1px 3px rgba(0, 0, 0, 0.1);      /* Standard cards */
shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1); /* Popover, dialogs */
```

### Animations

All transitions use: `transition-all duration-300 ease-in-out`

#### Key Animations

| Animation | Duration | Easing | Usage |
|-----------|----------|--------|-------|
| **Canvas Slide** | 300ms | ease-in-out | Artifact canvas open/close |
| **Fade In** | 200ms | ease-in | Message appear |
| **Hover** | 150ms | ease-out | Button/link hover |
| **Theme Switch** | 200ms | ease-in-out | Dark/light mode transition |

#### Transition Classes

```css
/* Layout transitions */
.transition-all { transition: all 300ms ease-in-out; }
.transition-transform { transition: transform 300ms ease-in-out; }
.transition-opacity { transition: opacity 200ms ease-in; }

/* Transforms */
.translate-x-0 { transform: translateX(0); }
.translate-x-full { transform: translateX(100%); }
```

---

## 🔄 Data Flow

### Complete Request Flow

\`\`\`
1. USER ACTION
   └─> User types message in ChatInput

2. CLIENT STATE UPDATE
   └─> useChat.sendMessage({ text, files, metadata })
   └─> @ai-sdk-tools/store updates local state
   └─> Optimistic UI update (message appears immediately)

3. API REQUEST
   └─> POST /api/chat
   └─> Body: { message, id, agentChoice, toolChoice, timezone }

4. AGENT ORCHESTRATION
   └─> Triage Agent receives request
   └─> Pattern matching (matchOn) checks for instant routing
   └─> If no match, LLM decides which specialist agent
   └─> Handoff to specialist agent

5. AGENT EXECUTION
   └─> Specialist agent processes with tools
   └─> Tools execute (database queries, API calls, calculations)
   └─> @ai-sdk-tools/cache checks for cached results
   └─> @ai-sdk-tools/memory loads conversation history
   └─> Agent generates response

6. STREAMING RESPONSE
   └─> agent.toUIMessageStream() returns Response
   └─> Stream contains:
       - Text chunks (partial responses)
       - Tool calls (tool invocations and results)
       - Artifacts (structured data like charts, tables)
       - Agent status (thinking, executing, completing)
       - Handoff notifications (agent switches)

7. CLIENT STATE UPDATES
   └─> @ai-sdk-tools/store receives streamed updates
   └─> React components re-render with new data
   └─> Messages update in real-time
   └─> Artifacts stream into canvas

8. UI RENDERING
   └─> ChatMessages component renders messages
   └─> Artifact canvas slides in if artifacts present
   └─> Tool execution shows visual feedback
   └─> Status indicators show agent progress

9. COMPLETION
   └─> Final message added to conversation
   └─> Status changes to "idle"
   └─> @ai-sdk-tools/memory persists conversation
   └─> User can send next message
\`\`\`

---

## 📦 Package Details

### @ai-sdk-tools/store

**Purpose**: High-performance state management for AI chat applications

**Key Features**:
- 3-5x faster than @ai-sdk/react
- O(1) message lookups with hash map indexing
- Batched updates to minimize re-renders
- Memoized selectors with automatic caching
- Message virtualization for large histories

**Exports**:
```typescript
// Provider
<Provider initialMessages={[]}>

// Hooks
useChat(options)           // Enhanced useChat
useChatMessages()          // Get all messages
useChatStatus()            // Chat status
useChatError()             // Error state
useMessageById(id)         // O(1) lookup
useMessageCount()          // Optimized count
useArtifacts()             // Artifact state
```

**Usage**:
```typescript
import { Provider, useChat } from 'ai-sdk-tools/client';

function App() {
  return (
    <Provider>
      <ChatComponent />
    </Provider>
  );
}

function ChatComponent() {
  const { messages, sendMessage, status } = useChat({ id: 'chat-1' });
  // ...
}
```

### @ai-sdk-tools/agents

**Purpose**: Multi-agent orchestration with automatic handoffs

**Key Features**:
- Specialized agents for different tasks
- Automatic routing with pattern matching
- LLM-based intelligent routing fallback
- Context preservation across handoffs
- Provider flexibility (mix OpenAI, Claude, Gemini)

**Core Concepts**:
```typescript
// Agent definition
const agent = new Agent({
  name: 'Agent Name',
  model: openai('gpt-4o'),
  instructions: 'System prompt',
  tools: { toolName: toolImplementation },
  handoffs: [otherAgent1, otherAgent2],
  matchOn: ['keyword', /regex/, customFn],
});

// Streaming to UI
return agent.toUIMessageStream({
  message,
  context: { chatId, userId },
  maxRounds: 5,
  maxSteps: 10,
});
```

### @ai-sdk-tools/artifacts

**Purpose**: Stream structured, type-safe data to React components

**Key Features**:
- Type-safe artifact schemas with Zod
- Real-time streaming updates
- Multiple artifact types (charts, tables, images, code)
- Automatic UI rendering

**Usage**:
```typescript
import { artifact } from 'ai-sdk-tools';
import { z } from 'zod';

const ChartArtifact = artifact('chart', z.object({
  type: z.enum(['line', 'bar', 'pie']),
  data: z.array(z.object({
    label: z.string(),
    value: z.number(),
  })),
}));

// In tool
const chart = ChartArtifact.stream({ type: 'bar', data: [] });
await chart.update({ data: newData });
```

### @ai-sdk-tools/cache

**Purpose**: Universal caching for AI SDK tools

**Key Features**:
- Zero configuration required
- Multiple backends (Redis, In-Memory, Upstash)
- Works with regular tools, streaming, and artifacts
- Automatic cache key generation

**Usage**:
```typescript
import { createCached } from '@ai-sdk-tools/cache';
import { Redis } from '@upstash/redis';

const cached = createCached({ cache: Redis.fromEnv() });

const cachedTool = cached(expensiveTool);
```

### @ai-sdk-tools/memory

**Purpose**: Persistent memory for AI agents

**Key Features**:
- Multiple storage backends (In-Memory, Upstash Redis, Drizzle)
- Automatic conversation history loading
- Working memory (user preferences, facts)
- Scoped memory (user, chat, global)

**Usage**:
```typescript
import { createMemory } from '@ai-sdk-tools/memory';
import { Redis } from '@upstash/redis';

const memory = createMemory({ provider: Redis.fromEnv() });

const agent = new Agent({
  name: 'Agent',
  model: openai('gpt-4o'),
  memory: {
    enabled: true,
    workingMemory: { enabled: true, scope: 'user' },
  },
});
```

### @ai-sdk-tools/devtools

**Purpose**: Development debugging tools

**Key Features**:
- Visual tool call inspection
- Message flow visualization
- Agent execution timeline
- Dev-only (removed in production)

**Usage**:
```typescript
import { AIDevtools } from 'ai-sdk-tools/client';

export default function App() {
  return (
    <>
      <YourApp />
      <AIDevtools />
    </>
  );
}
```

---

## 🚀 Getting Started

### Installation

```bash
# Install all packages
npm install ai-sdk-tools

# Or individual packages
npm install @ai-sdk-tools/store
npm install @ai-sdk-tools/agents ai zod
npm install @ai-sdk-tools/artifacts @ai-sdk-tools/store
```

### Quickstart Example

```typescript
// 1. Wrap app with Provider
import { Provider } from 'ai-sdk-tools/client';

function App() {
  return (
    <Provider>
      <ChatInterface />
    </Provider>
  );
}

// 2. Use chat hook
function ChatInterface() {
  const { messages, sendMessage, status } = useChat({
    id: 'chat-1',
    transport: new DefaultChatTransport({ api: '/api/chat' }),
  });

  return (
    <div>
      {messages.map(msg => (
        <div key={msg.id}>{msg.content}</div>
      ))}
      <input onSubmit={(text) => sendMessage({ text })} />
    </div>
  );
}

// 3. Create agent API route
import { Agent } from '@ai-sdk-tools/agents';
import { openai } from '@ai-sdk/openai';

const agent = new Agent({
  name: 'Assistant',
  model: openai('gpt-4o'),
  instructions: 'You are a helpful assistant.',
});

export async function POST(req: Request) {
  const { message } = await req.json();
  return agent.toUIMessageStream({ message });
}
```

### Build & Run

```bash
# Install dependencies
bun install

# Build all packages
bun run build

# Run example app
cd apps/example
bun run dev

# Run website
cd apps/website
bun run dev
```

---

## 🎨 Design Tokens Reference

### Complete Token Map

```css
/* Colors */
--background: /* Primary background */
--foreground: /* Primary text */
--card: /* Card background */
--card-foreground: /* Card text */
--popover: /* Popover background */
--popover-foreground: /* Popover text */
--primary: /* Primary action */
--primary-foreground: /* Primary action text */
--secondary: /* Secondary action */
--secondary-foreground: /* Secondary action text */
--muted: /* Muted background */
--muted-foreground: /* Muted text */
--accent: /* Accent background */
--accent-foreground: /* Accent text */
--destructive: /* Error/danger */
--border: /* Border color */
--input: /* Input border */
--ring: /* Focus ring */

/* Spacing (rem) */
0, 0.25, 0.5, 0.75, 1, 1.5, 2, 2.5, 3, 3.5, 4, 6, 8, 12, 16

/* Border Radius (px) */
6, 8, 10, 14

/* Font Sizes (rem) */
0.75, 0.875, 1, 1.125, 1.25, 1.5

/* Transitions (ms) */
150, 200, 300
```

---

## 🔧 Customization Guide

### Adding Custom Agents

1. Create agent file: `src/ai/agents/my-agent.ts`
2. Define agent with tools and instructions
3. Export and register with triage agent
4. Add UI elements if needed

### Adding Custom Tools

1. Create tool: `src/ai/tools/domain/my-tool.ts`
2. Implement with AI SDK `tool()` function
3. Add to agent's tools configuration
4. Handle UI rendering in tool component

### Theming

1. **Colors**: Modify `--color-*` variables in `globals.css`
2. **Typography**: Update font imports in `layout.tsx`
3. **Spacing**: Adjust base spacing in Tailwind config
4. **Animations**: Modify transition durations in CSS

### Component Styling

Use Tailwind utility classes following the design system:

```tsx
<button className={cn(
  "px-4 py-2",              // Spacing
  "rounded-md",             // Border radius
  "text-sm font-medium",    // Typography
  "bg-primary text-primary-foreground",  // Colors
  "hover:bg-primary/90",    // Hover state
  "transition-all duration-150",  // Animation
)}>
  Button
</button>
```

---

## 📈 Performance Optimizations

### Built-in Optimizations

1. **Message Virtualization**: Only render visible messages
2. **Memo Selection**: Expensive computations cached
3. **Batched Updates**: Multiple state changes combined
4. **Code Splitting**: Dynamic imports for large components
5. **Streaming**: Progressive rendering during AI generation

### Recommended Optimizations

```typescript
// 1. Cache expensive tool results
const cachedTool = cached(expensiveTool);

// 2. Use message virtualization
const visibleMessages = useVirtualMessages(0, 50);

// 3. Memoize selectors
const userCount = useSelector(
  'userCount',
  (messages) => messages.filter(m => m.role === 'user').length,
  [messages.length]
);

// 4. Lazy load components
const HeavyComponent = dynamic(() => import('./HeavyComponent'));
```

---

## 🔐 Production Checklist

- [ ] **API Keys**: Secure environment variables
- [ ] **Rate Limiting**: Implement per-user limits
- [ ] **Error Handling**: Graceful failure fallbacks
- [ ] **Monitoring**: Add observability (OpenTelemetry)
- [ ] **Caching**: Enable Redis caching for tools
- [ ] **Memory**: Persistent storage for conversations
- [ ] **Security**: Input validation, output sanitization
- [ ] **Performance**: Enable virtualization, caching
- [ ] **Logging**: Structured logging for debugging
- [ ] **Testing**: Unit, integration, E2E tests

---

## 📚 Additional Resources

- **GitHub**: [github.com/midday-ai/ai-sdk-tools](https://github.com/midday-ai/ai-sdk-tools)
- **Documentation**: [ai-sdk-tools.dev](https://ai-sdk-tools.dev)
- **AI SDK Docs**: [sdk.vercel.ai](https://sdk.vercel.ai)
- **Examples**: See `/apps/example` for complete implementation

---

## 📄 License

MIT License - See LICENSE file for details
