# 🚀 Guia Completo de Deploy - AI SDK Tools

> **Objetivo**: Deploy da aplicação example completa + desenvolvimento da landing page
> **Plataforma**: Vercel (recomendado para Next.js)
> **Tempo Estimado**: 2-3 horas

---

## 📋 Pré-requisitos

### Contas Necessárias

- [ ] **GitHub Account** - Para hospedar código
- [ ] **Vercel Account** - Para deploy (gratuito)
- [ ] **OpenAI Account** - API Key necessária
- [ ] **Upstash Account** (opcional) - Para Redis/cache em produção

### Software Local

- [ ] Node.js 18+ ou Bun
- [ ] Git instalado
- [ ] Editor de código (VS Code recomendado)
- [ ] Terminal/CLI

---

## 🎯 Fase 1: Preparação do Ambiente (30 min)

### Passo 1: Verificar Estrutura do Projeto

```bash
cd "C:\Users\x1o1v\Desktop\Notion\ai-sdk-tools-analysis"

# Verificar se tudo está no lugar
ls apps/example
ls packages
```

### Passo 2: Criar Repositório no GitHub

```bash
# Inicializar Git (se ainda não estiver)
cd "C:\Users\x1o1v\Desktop\Notion\ai-sdk-tools-analysis"
git init

# Adicionar arquivos
git add .
git commit -m "Initial commit: AI SDK Tools base"

# Criar repositório no GitHub e conectar
# Via GitHub CLI (se tiver instalado):
gh repo create ai-sdk-tools-app --public --source=. --remote=origin --push

# OU via web:
# 1. Ir em github.com e criar novo repositório
# 2. Seguir instruções para conectar repositório local
```

### Passo 3: Configurar Variáveis de Ambiente

Crie `.env.local` na raiz do projeto:

```bash
# apps/example/.env.local

# ============================================
# OBRIGATÓRIO - OpenAI API
# ============================================
OPENAI_API_KEY=sk-proj-your-key-here

# ============================================
# OPCIONAL - Outros Providers
# ============================================
# ANTHROPIC_API_KEY=sk-ant-your-key-here
# GOOGLE_GENERATIVE_AI_API_KEY=your-key-here

# ============================================
# OPCIONAL - Upstash Redis (Cache e Memory)
# ============================================
# UPSTASH_REDIS_REST_URL=https://your-redis.upstash.io
# UPSTASH_REDIS_REST_TOKEN=your-token-here

# ============================================
# OPCIONAL - EXA Search (Web Search Tool)
# ============================================
# EXA_API_KEY=your-exa-key-here

# ============================================
# OPCIONAL - Rate Limiting
# ============================================
# UPSTASH_RATELIMIT_ENABLED=true

# ============================================
# APP CONFIG
# ============================================
# NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**🔑 Como Obter API Keys:**

1. **OpenAI** (Obrigatório):
   - Acesse: https://platform.openai.com/api-keys
   - Crie uma nova API key
   - Copie e cole em `OPENAI_API_KEY`

2. **Upstash Redis** (Recomendado para produção):
   - Acesse: https://console.upstash.com
   - Crie conta gratuita
   - Create Database → Redis
   - Copie REST URL e Token

3. **Exa Search** (Opcional - para web search):
   - Acesse: https://exa.ai
   - Create account e obtenha API key

### Passo 4: Testar Localmente

```bash
cd "C:\Users\x1o1v\Desktop\Notion\ai-sdk-tools-analysis"

# Instalar dependências (pode levar alguns minutos)
bun install

# Build dos packages
bun run build

# Ir para app example
cd apps/example

# Rodar em desenvolvimento
bun run dev
```

**Verificar**: Abra http://localhost:3000 e teste:
- [ ] Chat interface carrega
- [ ] Consegue enviar mensagem
- [ ] Recebe resposta do AI
- [ ] Theme toggle funciona
- [ ] Artifacts aparecem (se aplicável)

---

## 🚀 Fase 2: Deploy na Vercel (30 min)

### Opção A: Deploy via GitHub (Recomendado)

#### 1. Conectar Vercel ao GitHub

1. Acesse: https://vercel.com
2. Sign up/Login com GitHub
3. Click **Add New** → **Project**
4. **Import Git Repository** → Selecione seu repo `ai-sdk-tools-app`

#### 2. Configurar Projeto na Vercel

**Root Directory**:
```
apps/example
```

**Framework Preset**:
```
Next.js
```

**Build Command**:
```bash
bun run build:deps && bun run build
```

**Output Directory**:
```
.next
```

**Install Command**:
```bash
bun install
```

#### 3. Configurar Environment Variables

Na página de configuração do projeto na Vercel, adicione:

```bash
OPENAI_API_KEY=sk-proj-your-key-here

# Opcional (adicionar conforme necessário)
UPSTASH_REDIS_REST_URL=https://your-redis.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-token-here
EXA_API_KEY=your-exa-key-here
```

**⚠️ IMPORTANTE**:
- Não comitar `.env.local` no Git!
- Adicionar variáveis diretamente na Vercel

#### 4. Deploy!

Click **Deploy** e aguarde (5-10 minutos primeira vez)

**Vercel vai**:
1. ✅ Clone seu repositório
2. ✅ Instalar dependências
3. ✅ Build o projeto
4. ✅ Deploy em edge network global
5. ✅ Gerar URL de produção

### Opção B: Deploy via CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login na Vercel
vercel login

# No diretório do projeto
cd "C:\Users\x1o1v\Desktop\Notion\ai-sdk-tools-analysis\apps\example"

# Deploy
vercel

# Seguir prompts:
# - Setup and deploy: Y
# - Scope: Seu username
# - Link to existing project: N
# - Project name: ai-sdk-tools-app
# - Directory: ./
# - Override settings: N

# Adicionar environment variables
vercel env add OPENAI_API_KEY

# Deploy para produção
vercel --prod
```

---

## ✅ Fase 3: Validação Pós-Deploy (15 min)

### Checklist de Funcionalidades

Acesse sua URL da Vercel (ex: `https://ai-sdk-tools-app.vercel.app`)

- [ ] **Chat Interface**
  - [ ] Interface carrega corretamente
  - [ ] Input de mensagem funcional
  - [ ] Mensagens aparecem no histórico

- [ ] **AI Agents**
  - [ ] Responde a mensagens
  - [ ] Handoffs funcionam (se testável)
  - [ ] Tools executam corretamente

- [ ] **Artifacts**
  - [ ] Canvas desliza do lado direito
  - [ ] Charts/tabelas renderizam
  - [ ] Múltiplos artifacts funcionam

- [ ] **Theme**
  - [ ] Dark/Light mode toggle
  - [ ] Cores corretas em ambos temas
  - [ ] Transições suaves

- [ ] **Performance**
  - [ ] Lighthouse score > 80
  - [ ] First paint < 2s
  - [ ] Streaming funciona

### Debugging Comum

**Erro: "API Key Invalid"**
```bash
# Verificar variáveis de ambiente na Vercel
# Settings → Environment Variables → Verificar OPENAI_API_KEY
```

**Erro: "Module not found"**
```bash
# Rebuild o projeto
cd apps/example
bun run build:deps
bun run build
vercel --prod
```

**Erro: "Timeout during build"**
```bash
# Build settings na Vercel:
# - Increase timeout
# - ou dividir build em etapas
```

---

## 🎨 Fase 4: Desenvolvimento da Landing Page (2-3 horas)

### Estratégia: 2 Opções

#### Opção 1: Modificar /apps/website (Rápido)

**Estrutura Atual**:
```
apps/website/
├── src/
│   ├── app/
│   │   ├── page.tsx         # Homepage
│   │   ├── layout.tsx       # Layout
│   │   └── globals.css      # Estilos
│   └── components/
│       ├── hero.tsx
│       ├── features.tsx
│       └── footer.tsx
```

**Passos**:

1. **Customizar Hero Section**:

```typescript
// apps/website/src/components/hero.tsx
export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-6xl font-bold tracking-tight">
          [SEU TÍTULO AQUI]
        </h1>
        <p className="mt-6 text-xl text-muted-foreground">
          [SEU SUBTÍTULO AQUI]
        </p>
        <div className="mt-10 flex gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/example">Começar Agora</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="#features">Ver Recursos</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
```

2. **Customizar Features**:

```typescript
// apps/website/src/components/features.tsx
const features = [
  {
    title: 'Recurso 1',
    description: 'Descrição do recurso',
    icon: '🎯',
  },
  {
    title: 'Recurso 2',
    description: 'Descrição do recurso',
    icon: '🚀',
  },
  // Adicionar mais...
];

export function Features() {
  return (
    <section id="features" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16">
          Nossos Recursos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Card key={feature.title}>
              <CardHeader>
                <div className="text-4xl mb-4">{feature.icon}</div>
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
```

3. **Deploy Website**:

```bash
cd "C:\Users\x1o1v\Desktop\Notion\ai-sdk-tools-analysis\apps\website"

# Testar localmente
bun run dev

# Deploy na Vercel
vercel --prod
```

#### Opção 2: Criar Landing Page com V0 (Recomendado)

**Vantagens**:
- Design moderno e profissional
- Responsivo automaticamente
- Componentes reutilizáveis
- Mais rápido

**Processo**:

1. **Acesse V0**: https://v0.dev

2. **Use este prompt**:

```
Crie uma landing page moderna e profissional para um aplicativo de AI chat.

DESIGN:
- Hero section com título, subtítulo e 2 CTAs (Começar / Ver Demo)
- Features section com 6 cards mostrando recursos principais
- How it Works section com 3 steps
- Testimonials section (opcional)
- Footer com links e redes sociais
- Design system: Use Tailwind CSS com dark mode support
- Cores: Manter tema neutro (branco/cinza/preto)
- Fontes: Geist Sans ou sistema
- Animações sutis ao scroll

FEATURES A DESTACAR:
1. 🤖 Multi-Agent System - Agentes especializados
2. ⚡ Performance - 3-5x mais rápido
3. 🎨 Artifacts - Visualizações estruturadas
4. 💾 Memory - Conversas persistentes
5. 🔄 Real-time - Streaming em tempo real
6. 🛠️ Tools - Integração com ferramentas

ESTRUTURA:
- Hero (full viewport height)
- Features (grid 3x2)
- How it Works (3 steps horizontais)
- CTA final (call to action)
- Footer

CTA BUTTON: Deve levar para "/chat" (será a aplicação example)

Gere o código completo em Next.js 14+ com App Router, TypeScript e Tailwind CSS.
```

3. **V0 vai gerar**:
- Código completo da landing page
- Componentes reutilizáveis
- Styling com Tailwind
- Responsivo

4. **Integrar no Projeto**:

```bash
# Criar nova pasta para landing
mkdir -p "C:\Users\x1o1v\Desktop\Notion\ai-sdk-tools-analysis\apps\landing"

# Copiar código do V0 para:
# apps/landing/src/app/page.tsx
# apps/landing/src/components/*

# Adicionar no package.json:
```

```json
{
  "name": "@ai-sdk-tools/landing",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --port 3001",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "16.0.0",
    "react": "19.2.0",
    "react-dom": "19.2.0"
  }
}
```

---

## 🔗 Fase 5: Integração Landing + App (30 min)

### Estratégia 1: Multi-Project (Recomendado)

**Landing Page** → Domínio principal (`yourapp.com`)
**Example App** → Subdomínio (`app.yourapp.com`)

**Na Vercel**:

1. **Deploy Landing**:
   - Projeto: `landing`
   - Domain: `yourapp.com`

2. **Deploy App**:
   - Projeto: `example-app`
   - Domain: `app.yourapp.com`

3. **Links**:
   - Landing page button → `https://app.yourapp.com`
   - App header logo → `https://yourapp.com`

### Estratégia 2: Mono-Project

**Estrutura**:
```
project/
├── app/
│   ├── (landing)/
│   │   └── page.tsx        # Landing page
│   ├── chat/
│   │   └── page.tsx        # Chat interface
│   └── layout.tsx          # Shared layout
```

**Roteamento**:
- `/` → Landing page
- `/chat` → Chat interface
- `/chat/[id]` → Specific chat

**Layout Condicional**:

```typescript
// app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isChat = pathname.startsWith('/chat');

  return (
    <html>
      <body>
        {!isChat && <Header />}
        {children}
        {!isChat && <Footer />}
      </body>
    </html>
  );
}
```

---

## 📊 Fase 6: Otimização e Monitoramento (30 min)

### Performance

1. **Lighthouse Audit**:
```bash
# Instalar lighthouse
npm install -g lighthouse

# Rodar audit
lighthouse https://your-app.vercel.app --view
```

**Metas**:
- Performance: > 90
- Accessibility: > 90
- Best Practices: > 90
- SEO: > 90

2. **Otimizações**:

```typescript
// next.config.js
module.exports = {
  // Image optimization
  images: {
    domains: ['your-cdn.com'],
    formats: ['image/avif', 'image/webp'],
  },

  // Compression
  compress: true,

  // Analytics
  analytics: {
    id: process.env.VERCEL_ANALYTICS_ID,
  },
};
```

### Monitoring

1. **Vercel Analytics** (Incluso):
   - Pageviews
   - Conversions
   - Web Vitals

2. **Error Tracking** (Sentry):

```bash
npm install @sentry/nextjs

# sentry.client.config.js
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
});
```

3. **Custom Events**:

```typescript
// Track chat usage
analytics.track('chat_message_sent', {
  messageLength: message.length,
  hasAttachments: files.length > 0,
});
```

---

## ✅ Checklist Final

### Pre-Launch

- [ ] **Código**
  - [ ] Build passa sem erros
  - [ ] Testes passando
  - [ ] Linting OK
  - [ ] TypeScript strict mode

- [ ] **Configuração**
  - [ ] Environment variables setadas
  - [ ] API keys válidas
  - [ ] Rate limiting configurado
  - [ ] Caching habilitado

- [ ] **UI/UX**
  - [ ] Responsivo em mobile/tablet/desktop
  - [ ] Dark/light mode funcionando
  - [ ] Loading states adequados
  - [ ] Error handling gracioso

- [ ] **Performance**
  - [ ] Lighthouse score > 90
  - [ ] First paint < 2s
  - [ ] Images otimizadas
  - [ ] Bundle size aceitável

- [ ] **Segurança**
  - [ ] API keys seguras (não no código)
  - [ ] Input validation
  - [ ] Rate limiting
  - [ ] HTTPS habilitado

- [ ] **Documentação**
  - [ ] README atualizado
  - [ ] Environment variables documentadas
  - [ ] Deploy guide
  - [ ] Troubleshooting guide

### Post-Launch

- [ ] **Monitoring**
  - [ ] Analytics configurado
  - [ ] Error tracking ativo
  - [ ] Uptime monitoring
  - [ ] Performance tracking

- [ ] **Marketing**
  - [ ] Landing page live
  - [ ] SEO otimizado
  - [ ] Social media cards
  - [ ] Analytics tags

- [ ] **Manutenção**
  - [ ] Backup strategy
  - [ ] Update plan
  - [ ] Bug tracking
  - [ ] Feature roadmap

---

## 🚨 Troubleshooting

### Problemas Comuns

**1. Build falha na Vercel**

```bash
# Verificar logs na Vercel
# Settings → Build & Development Settings
# Checar:
- Node version (18+)
- Build command correto
- Root directory correto
```

**2. API Key não funciona em produção**

```bash
# Vercel → Settings → Environment Variables
# Garantir que variável está em "Production"
# Redeploy após adicionar: vercel --prod
```

**3. App lento em produção**

```bash
# Habilitar caching
# Configurar Redis
# Otimizar images
# Habilitar edge functions
```

**4. Erro 500 aleatório**

```bash
# Checar logs:
vercel logs [deployment-url]

# Adicionar mais logging
# Configurar Sentry
```

---

## 📞 Suporte

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **AI SDK Docs**: https://sdk.vercel.ai
- **GitHub Issues**: Para bugs específicos do projeto

---

## 🎉 Próximos Passos

Após deploy bem-sucedido:

1. **Customização**:
   - Branding
   - Cores e fontes
   - Conteúdo

2. **Features**:
   - ERP integration
   - Custom agents
   - New tools

3. **Growth**:
   - SEO optimization
   - Marketing
   - User feedback

---

**Boa sorte com o deploy!** 🚀

Se precisar de ajuda em qualquer passo, consulte a documentação ou abra uma issue no GitHub.
