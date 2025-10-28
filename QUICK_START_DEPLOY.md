# ⚡ Quick Start - Deploy em 30 Minutos

> **Meta**: Ter a aplicação rodando em produção rapidamente
> **Plataforma**: Vercel
> **Tempo**: 30-45 minutos

---

## 🎯 Passo a Passo Rápido

### 1️⃣ Prepare a API Key (5 min)

**OpenAI API Key** (obrigatório):

1. Acesse: https://platform.openai.com/api-keys
2. Click **Create new secret key**
3. Copie a key (começa com `sk-proj-...`)
4. ⚠️ Guarde em local seguro - só aparece uma vez!

---

### 2️⃣ Teste Local (10 min)

```bash
# 1. Vá para o diretório do projeto
cd "C:\Users\x1o1v\Desktop\Notion\ai-sdk-tools-analysis"

# 2. Copie o arquivo de exemplo
cd apps/example
cp .env.local.example .env.local

# 3. Edite .env.local e adicione sua key
# Abra com editor de texto e cole:
OPENAI_API_KEY=sk-proj-sua-key-aqui

# 4. Volte para raiz e instale
cd ../..
bun install

# 5. Build packages
bun run build

# 6. Rode o app
cd apps/example
bun run dev
```

**Teste**: Abra http://localhost:3000
- Se carregar a interface → ✅ Sucesso!
- Se der erro → Verifique a API key

---

### 3️⃣ Deploy na Vercel (15 min)

#### Opção A: Deploy Rápido via GitHub

**1. Criar Repositório no GitHub**:

```bash
# No diretório do projeto
cd "C:\Users\x1o1v\Desktop\Notion\ai-sdk-tools-analysis"

# Inicializar Git
git init
git add .
git commit -m "Initial commit: AI SDK Tools"

# Criar repo no GitHub:
# - Vá em github.com
# - Click "New repository"
# - Nome: "ai-sdk-tools-app"
# - Public ou Private
# - NÃO adicione README/gitignore
# - Click "Create repository"

# Conectar e push
git remote add origin https://github.com/SEU-USERNAME/ai-sdk-tools-app.git
git branch -M main
git push -u origin main
```

**2. Deploy na Vercel**:

1. Acesse: https://vercel.com
2. **Sign up** com GitHub
3. Click **Add New** → **Project**
4. **Import** seu repositório `ai-sdk-tools-app`

**3. Configurar Projeto**:

- **Root Directory**: `apps/example`
- **Framework Preset**: `Next.js`
- **Build Command**: `bun run build:deps && bun run build`
- **Install Command**: `bun install`

**4. Adicionar Environment Variables**:

Click **Environment Variables** e adicione:

```
OPENAI_API_KEY = sk-proj-sua-key-aqui
```

**5. Deploy**:

- Click **Deploy**
- Aguarde 5-10 minutos
- ✅ Pronto!

#### Opção B: Deploy Direto via CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
cd "C:\Users\x1o1v\Desktop\Notion\ai-sdk-tools-analysis\apps\example"
vercel

# Adicionar env var
vercel env add OPENAI_API_KEY

# Deploy para produção
vercel --prod
```

---

### 4️⃣ Validar (5 min)

Acesse sua URL da Vercel (ex: `https://ai-sdk-tools-app.vercel.app`)

**Checklist**:
- [ ] Interface carrega
- [ ] Consegue enviar mensagem
- [ ] Recebe resposta do AI
- [ ] Theme toggle funciona

---

## 🎨 Próximo: Landing Page

Agora que a aplicação está funcionando, vamos criar a landing page!

### Opção 1: Usar V0 (Recomendado - Mais Rápido)

1. **Acesse**: https://v0.dev

2. **Use este prompt**:

```
Crie uma landing page moderna para aplicativo de AI chat.

ESTRUTURA:
- Hero: Título "Seu AI Assistant Inteligente" + 2 CTAs (Começar Grátis / Ver Demo)
- Features: 6 cards destacando:
  * 🤖 Agentes Especializados
  * ⚡ Respostas Instantâneas
  * 🎨 Visualizações Interativas
  * 💾 Memória Persistente
  * 🔄 Streaming em Tempo Real
  * 🛠️ Integração com Ferramentas
- How it Works: 3 steps simples
- CTA Final: "Comece Agora Gratuitamente"
- Footer: Links e contato

DESIGN:
- Next.js 14+ App Router
- Tailwind CSS
- Dark mode support
- Animações sutis
- 100% Responsivo

CTA deve levar para: /chat (sua aplicação)

Gere código completo e pronto para uso.
```

3. **V0 Gera Código** → Copie e integre no projeto

4. **Deploy**:

```bash
# Criar novo projeto landing
mkdir apps/landing
# Copiar código do V0
# Deploy na Vercel
```

### Opção 2: Modificar Website Existente

```bash
cd apps/website

# Editar:
# - src/app/page.tsx (Homepage)
# - src/components/* (Componentes)

# Customizar conteúdo com sua marca
# Deploy na Vercel
```

---

## 🔗 Integrar Landing + App

### Estratégia Simples: 2 Projetos

**Landing Page**:
- Deploy: `yourapp.com`
- CTA Button → `https://app.yourapp.com`

**App**:
- Deploy: `app.yourapp.com`
- Logo → `https://yourapp.com`

**Na Vercel**:

1. Projeto `landing` → Domain: `yourapp.com`
2. Projeto `app` → Domain: `app.yourapp.com`

---

## ✅ Checklist Final

- [ ] **App em Produção**
  - [ ] URL funcionando
  - [ ] Chat respondendo
  - [ ] Performance OK (Lighthouse > 80)

- [ ] **Landing Page**
  - [ ] Design profissional
  - [ ] CTAs claros
  - [ ] Links para app funcionando

- [ ] **Integração**
  - [ ] Landing → App link funciona
  - [ ] App → Landing logo link funciona
  - [ ] Domínios configurados (se aplicável)

---

## 🚨 Problemas Comuns

**Erro: "API Key Invalid"**
→ Verifique se copiou a key completa na Vercel

**App não carrega**
→ Checar logs: `vercel logs [url]`

**Build falha**
→ Verificar Root Directory: `apps/example`

---

## 📞 Ajuda

- **Guia Completo**: Ver `DEPLOY_GUIDE.md`
- **Documentação**: Ver `INDEX.md`
- **Troubleshooting**: Ver seção de problemas no DEPLOY_GUIDE.md

---

## 🎉 Parabéns!

Você agora tem:
- ✅ Aplicação em produção
- ✅ Landing page (próximo passo)
- ✅ Infraestrutura escalável

**Próximos passos**:
1. Customizar design/branding
2. Adicionar features customizadas
3. Integrar com seu ERP

---

**Need help?** Consulte os guias completos ou abra uma issue!
