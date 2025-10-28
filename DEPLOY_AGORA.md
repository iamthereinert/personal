# 🚀 Deploy Agora - Guia Passo a Passo

## ✅ Status Atual

- ✅ Código commitado localmente
- ✅ Git configurado
- ✅ Documentação completa criada
- ✅ Environment variables preparadas
- ✅ Workspace protocol convertido para npm compatibility

**Próximo passo**: Push para GitHub e Deploy na Vercel

---

## 📋 FASE 1: Criar Repositório no GitHub (3 minutos)

### Passo 1.1: Acessar GitHub
1. Abrir navegador em: https://github.com
2. Fazer login na sua conta GitHub
3. Se não tem conta: Criar em https://github.com/signup

### Passo 1.2: Criar Novo Repositório
1. Click no botão **"+" no canto superior direito** → "New repository"
2. Ou acesse direto: https://github.com/new

### Passo 1.3: Configurar Repositório
```
Repository name: ai-assistant-personal
Description: Personal AI assistant with multi-agent system powered by Vercel AI SDK

☑️ Public (recomendado para Vercel free tier)
☐ Add a README file (já temos)
☐ Add .gitignore (já temos)
☐ Choose a license (opcional)
```

3. Click **"Create repository"**

### Passo 1.4: Conectar e Fazer Push

**Na página que abrir, você verá comandos. Use estes comandos no WSL**:

```bash
# 1. Navegar para o projeto
cd /mnt/c/Users/x1o1v/Desktop/Notion/ai-sdk-tools-analysis

# 2. Adicionar o remote (substitua SEU-USERNAME pelo seu username do GitHub)
git remote add origin https://github.com/SEU-USERNAME/ai-assistant-personal.git

# 3. Push para GitHub
git push -u origin main
```

**Se pedir autenticação**:
- Username: seu username do GitHub
- Password: use Personal Access Token (não a senha normal)
  - Criar token em: https://github.com/settings/tokens
  - Permissions: repo (full control)

**Output esperado**:
```
Enumerating objects: 1234, done.
Writing objects: 100% (1234/1234), done.
To https://github.com/SEU-USERNAME/ai-assistant-personal.git
 * [new branch]      main -> main
✅ Push bem-sucedido!
```

---

## 🚀 FASE 2: Deploy na Vercel (5 minutos)

### Passo 2.1: Acessar Vercel
1. Abrir: https://vercel.com
2. Click **"Sign Up"** ou **"Log In"**
3. **Recomendado**: Login com GitHub (integração automática)

### Passo 2.2: Import Project
1. No dashboard Vercel, click **"Add New..." → "Project"**
2. Você verá lista de repositórios do GitHub
3. Encontre **"ai-assistant-personal"**
4. Click **"Import"**

### Passo 2.3: Configure Project

**Framework Preset**: Next.js (detectado automaticamente ✅)

**Root Directory**:
```
apps/example
```
⚠️ **IMPORTANTE**: Click "Edit" e definir root como `apps/example`

**Build Command**:
```
npm run build
```
(Auto-detectado, não precisa mudar)

**Output Directory**:
```
.next
```
(Auto-detectado, não precisa mudar)

**Install Command**:
```
npm install --legacy-peer-deps
```
⚠️ **IMPORTANTE**: Click "Override" e adicionar `--legacy-peer-deps`

### Passo 2.4: Environment Variables

Click **"Environment Variables"** e adicione:

**Variable 1**:
```
Name: OPENAI_API_KEY
Value: [COLE SUA OPENAI API KEY AQUI]
Environment: Production, Preview, Development (selecionar todas)
```

**Variable 2**:
```
Name: ANTHROPIC_API_KEY
Value: [COLE SUA ANTHROPIC API KEY AQUI]
Environment: Production, Preview, Development (selecionar todas)
```

**Variable 3** (opcional):
```
Name: DEBUG
Value: true
Environment: Development (só development)
```

### Passo 2.5: Deploy!

1. Revisar configurações:
   - ✅ Root Directory: `apps/example`
   - ✅ Install Command: `npm install --legacy-peer-deps`
   - ✅ Environment Variables: 2-3 configuradas

2. Click **"Deploy"**

3. **Aguardar build** (~3-5 minutos)
   - Você verá logs em tempo real
   - Build progress bar
   - Pode demorar 3-5 min na primeira vez

### Passo 2.6: Sucesso! 🎉

**Output esperado**:
```
✅ Build completed successfully
✅ Deployment ready
🌐 URL: https://ai-assistant-personal.vercel.app
```

**Você receberá**:
- **Production URL**: https://ai-assistant-personal.vercel.app
- **Deployment dashboard**: Logs, analytics, settings

---

## 🧪 FASE 3: Testar Funcionalidades (10 minutos)

### Passo 3.1: Acessar o App
1. Abrir: https://ai-assistant-personal.vercel.app
2. Interface de chat deve carregar

### Passo 3.2: Testes Básicos

**Teste 1: Chat Básico**
```
Você: Olá, como você está?
Esperado: Resposta do generalAgent
```

**Teste 2: Multi-Agent Routing**
```
Você: Posso comprar um Tesla Model Y?
Esperado: researchAgent → web search → análise financeira completa
```

**Teste 3: Financial Reports**
```
Você: Mostre meu P&L do último trimestre
Esperado: reportsAgent → tabela com revenue/expenses/profit
```

**Teste 4: Artifacts**
```
Você: Crie um gráfico de revenue dos últimos 6 meses
Esperado: Canvas slide-in → gráfico interativo
```

**Teste 5: Tools Execution**
```
Você: Qual meu saldo atual?
Esperado: operationsAgent → getBalances tool → saldos de contas
```

**Teste 6: Claude Integration** (opcional)
```
Se modificou agent para usar Claude:
Você: [qualquer pergunta complexa]
Esperado: Resposta do Claude Sonnet 4.5
```

### Passo 3.3: Validação Completa

Seguir: `TESTING_GUIDE.md` para testes detalhados

---

## 🎨 FASE 4: Landing Page Local (5 minutos)

Agora que o AI App está online, criar landing page local para desenvolvimento em tempo real:

### Passo 4.1: Criar Projeto Next.js

**Em local rápido (escolha uma opção)**:

**Opção A: Desktop Windows** (se não tem problemas de performance)
```bash
cd /mnt/c/Users/x1o1v/Desktop/Notion
npx create-next-app@latest landing-page --typescript --tailwind --app
```

**Opção B: WSL Home** (recomendado, mais rápido)
```bash
cd ~/
npx create-next-app@latest landing-page --typescript --tailwind --app
```

**Durante setup**:
```
✔ Would you like to use ESLint? … Yes
✔ Would you like to use Turbopack? … Yes
✔ Would you like to customize the import alias? … No
```

### Passo 4.2: Configurar Conexão com AI App

```bash
cd landing-page

# Criar .env.local
cat > .env.local << 'EOF'
NEXT_PUBLIC_AI_APP_URL=https://ai-assistant-personal.vercel.app
EOF

# Criar lib/api.ts
mkdir -p src/lib
cat > src/lib/api.ts << 'EOF'
const AI_APP_URL = process.env.NEXT_PUBLIC_AI_APP_URL || 'https://ai-assistant-personal.vercel.app';

export async function sendChatMessage(message: string) {
  try {
    const response = await fetch(`${AI_APP_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [{ role: 'user', content: message }]
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
}

export async function getChatHistory() {
  const response = await fetch(`${AI_APP_URL}/api/history`);
  return response.json();
}
EOF
```

### Passo 4.3: Iniciar Dev Server

```bash
npm run dev
```

**Output esperado**:
```
   ▲ Next.js 16.0.0
   - Local:        http://localhost:3000
   - Network:      http://192.168.x.x:3000

 ✓ Starting...
 ✓ Ready in 1.2s
```

### Passo 4.4: Validar Hot Reload

1. Abrir http://localhost:3000
2. Editar `src/app/page.tsx`
3. Salvar (Ctrl+S)
4. **Mudança aparece INSTANTANEAMENTE no browser** ✅

### Passo 4.5: Criar Componente de Teste

```bash
# Criar componente de chat demo
cat > src/components/chat-demo.tsx << 'EOF'
'use client';

import { useState } from 'react';
import { sendChatMessage } from '@/lib/api';

export function ChatDemo() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) return;

    setLoading(true);
    try {
      const result = await sendChatMessage(message);
      setResponse(JSON.stringify(result, null, 2));
    } catch (error) {
      setResponse('Error: ' + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">AI Assistant Demo</h2>

      <div className="space-y-4">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Digite sua mensagem..."
          className="w-full p-3 border rounded-lg"
        />

        <button
          onClick={handleSend}
          disabled={loading}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Enviando...' : 'Enviar'}
        </button>

        {response && (
          <pre className="p-4 bg-gray-100 rounded-lg overflow-auto max-h-96">
            {response}
          </pre>
        )}
      </div>
    </div>
  );
}
EOF
```

### Passo 4.6: Usar Componente

Editar `src/app/page.tsx`:
```typescript
import { ChatDemo } from '@/components/chat-demo';

export default function Home() {
  return (
    <main className="min-h-screen">
      <ChatDemo />
    </main>
  );
}
```

Salvar e ver **hot reload instantâneo** ✅

---

## 🔄 Workflow de Desenvolvimento em Tempo Real

### Para Landing Page (Hot Reload <200ms)
```
1. Edita componente React em VS Code
2. Salva (Ctrl+S)
3. Browser recarrega INSTANTANEAMENTE
4. Itera rapidamente até perfeição
```

### Para AI App (Deploy 30-60s)
```
1. Edita agent/tool/artifact
2. Commit: git add . && git commit -m "feat: nova feature"
3. Push: git push origin main
4. Vercel rebuilda automaticamente (30-60s)
5. Testa no https://ai-assistant-personal.vercel.app
```

### Branches para Features
```bash
# Nova feature
git checkout -b feature/custom-agent
# Edita código...
git add .
git commit -m "feat: add custom agent"
git push origin feature/custom-agent
# Vercel cria preview URL automaticamente
# URL: https://ai-assistant-personal-git-feature-custom-agent.vercel.app

# Quando pronto, merge para main
git checkout main
git merge feature/custom-agent
git push origin main
# Produção atualizada
```

---

## 📊 Checklist de Sucesso

### ✅ GitHub
- [ ] Repositório criado: https://github.com/SEU-USERNAME/ai-assistant-personal
- [ ] Código pushed com sucesso
- [ ] Commit visível no GitHub

### ✅ Vercel
- [ ] Projeto importado e configurado
- [ ] Root directory: `apps/example`
- [ ] Environment variables configuradas (OPENAI_API_KEY + ANTHROPIC_API_KEY)
- [ ] Build completed successfully
- [ ] Production URL acessível: https://ai-assistant-personal.vercel.app

### ✅ AI App Funcional
- [ ] Interface de chat carrega
- [ ] Mensagem de teste funciona
- [ ] Multi-agent routing funciona
- [ ] Tools executam (ex: getBalances)
- [ ] Artifacts renderizam (ex: revenue chart)

### ✅ Landing Page Local
- [ ] Projeto Next.js criado
- [ ] Dev server rodando em localhost:3000
- [ ] Hot reload funciona (<200ms)
- [ ] Componente ChatDemo criado
- [ ] Chamada API para Vercel funciona
- [ ] Integração end-to-end validada

---

## 🎯 Resultado Final

Você terá:

1. **AI App Online** (Vercel)
   - URL: https://ai-assistant-personal.vercel.app
   - Multi-agent system funcionando
   - OpenAI + Claude integrados
   - Todas as 34+ tools funcionando
   - Artifacts com streaming
   - Deploy automático a cada push

2. **Landing Page Local** (Hot Reload)
   - Desenvolvimento em tempo real
   - Mudanças instantâneas (<200ms)
   - Conectado à API do AI App
   - Iteração rápida contínua

3. **Workflow Profissional**
   - Git + GitHub + Vercel integrados
   - CI/CD automático
   - Preview deployments
   - Desenvolvimento ágil

---

## ❓ Troubleshooting

### Problema: Build failed na Vercel

**Erro**: "Cannot find module '@ai-sdk-tools/...'"
**Solução**:
```bash
# Verificar se pnpm-workspace.yaml está commitado
cd /mnt/c/Users/x1o1v/Desktop/Notion/ai-sdk-tools-analysis
git add pnpm-workspace.yaml
git commit -m "fix: add pnpm workspace config"
git push origin main
# Vercel rebuilda automaticamente
```

### Problema: Hot reload não funciona na landing page

**Solução**: Verificar se está usando Turbopack
```bash
# package.json deve ter:
"dev": "next dev --turbopack"
```

### Problema: API call falha

**Erro**: CORS ou Network error
**Solução**: Verificar se URL está correta em `.env.local`
```bash
# Deve ser:
NEXT_PUBLIC_AI_APP_URL=https://ai-assistant-personal.vercel.app
# Sem trailing slash
```

---

## 🚀 Próximos Passos

Agora que tem ambiente completo:

1. **Explorar funcionalidades** do AI App online
2. **Desenvolver landing page** com hot reload local
3. **Customizar agentes** conforme necessidade
4. **Adicionar tools customizadas**
5. **Criar artifacts específicos**
6. **Integrar APIs reais** (substituir fake data)

---

**Pronto para começar! Execute Fase 1 agora! 🚀**
