# ⚡ Comandos Rápidos - Copy & Paste

Execute estes comandos em ordem para fazer o deploy rapidamente.

---

## 🔍 VERIFICAÇÃO INICIAL

### Verificar status do Git
```bash
cd /mnt/c/Users/x1o1v/Desktop/Notion/ai-sdk-tools-analysis
git status
git log --oneline -5
```

**Output esperado**:
```
On branch main
nothing to commit, working tree clean

52d6499 docs: Add complete deployment guide and personal README
25813c4 feat: Setup personal AI assistant with complete documentation
```

---

## 📤 FASE 1: PUSH PARA GITHUB

### Opção A: Você Cria o Repositório Manualmente

**1. Criar repositório no GitHub**:
- Acesse: https://github.com/new
- Nome: `ai-assistant-personal`
- Public
- Não adicione README, .gitignore ou license
- Click "Create repository"

**2. Conectar e fazer push**:
```bash
cd /mnt/c/Users/x1o1v/Desktop/Notion/ai-sdk-tools-analysis

# Substitua SEU-USERNAME pelo seu username do GitHub
git remote add origin https://github.com/SEU-USERNAME/ai-assistant-personal.git

# Verificar remote
git remote -v

# Push
git push -u origin main
```

**Se pedir autenticação**:
- Username: seu username do GitHub
- Password: Personal Access Token (criar em https://github.com/settings/tokens)

---

### Opção B: Eu Posso Ajudar a Criar Via GitHub CLI (se tiver instalado)

```bash
# Verificar se gh CLI está instalado
which gh

# Se estiver instalado:
gh auth login
gh repo create ai-assistant-personal --public --source=. --remote=origin --push
```

---

## 🚀 FASE 2: DEPLOY VERCEL

### Passo a Passo na Interface Vercel:

**1. Login Vercel**:
- Acesse: https://vercel.com/login
- Login com GitHub (recomendado)

**2. Import Project**:
- Click "Add New..." → "Project"
- Selecione `ai-assistant-personal` da lista
- Click "Import"

**3. Configurar Root Directory**:
```
Root Directory: apps/example
```
⚠️ Click em "Edit" e digitar `apps/example`

**4. Configurar Build Command**:
```
Install Command: npm install --legacy-peer-deps
Build Command: npm run build
Output Directory: .next
```

**5. Environment Variables**:

**Copie e cole estas variáveis** (click "Add" para cada):

```
Name: OPENAI_API_KEY
Value: [COLE SUA OPENAI API KEY AQUI]
Environments: Production, Preview, Development
```

```
Name: ANTHROPIC_API_KEY
Value: [COLE SUA ANTHROPIC API KEY AQUI]
Environments: Production, Preview, Development
```

```
Name: DEBUG
Value: true
Environments: Development
```

**6. Deploy**:
- Click "Deploy"
- Aguardar 3-5 minutos
- ✅ Build completo!

---

## 💻 FASE 3: LANDING PAGE LOCAL

### Escolha um Local Rápido:

**Opção A: WSL Home (Recomendado - Mais Rápido)**
```bash
cd ~/
npx create-next-app@latest landing-page --typescript --tailwind --app --turbopack
```

**Opção B: Desktop Windows (Se preferir)**
```bash
cd /mnt/c/Users/x1o1v/Desktop/Notion
npx create-next-app@latest landing-page --typescript --tailwind --app --turbopack
```

### Durante a Instalação:
```
✔ Would you like to use ESLint? … Yes
✔ Would you like to use Turbopack? … Yes
✔ Would you like to customize the import alias? … No
```

### Configurar Conexão com AI App:

```bash
cd landing-page

# Criar .env.local
cat > .env.local << 'EOF'
NEXT_PUBLIC_AI_APP_URL=https://ai-assistant-personal.vercel.app
EOF

# Criar diretório lib
mkdir -p src/lib

# Criar API client
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
EOF

# Criar componente de demo
mkdir -p src/components
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

### Atualizar página inicial:

```bash
cat > src/app/page.tsx << 'EOF'
import { ChatDemo } from '@/components/chat-demo';

export default function Home() {
  return (
    <main className="min-h-screen">
      <ChatDemo />
    </main>
  );
}
EOF
```

### Iniciar Dev Server:

```bash
npm run dev
```

**Output esperado**:
```
   ▲ Next.js 16.0.0
   - Local:        http://localhost:3000
   - Turbopack:    enabled

 ✓ Starting...
 ✓ Ready in 1.2s
```

**Abrir browser**: http://localhost:3000

---

## ✅ VALIDAÇÃO COMPLETA

### Testar AI App (Vercel)

Abrir: https://ai-assistant-personal.vercel.app

**Teste 1: Chat Básico**
```
Mensagem: "Olá, como você está?"
Esperado: Resposta do generalAgent
```

**Teste 2: Research Agent**
```
Mensagem: "Posso comprar um Tesla Model Y?"
Esperado: Web search → análise financeira → recomendação
```

**Teste 3: Reports**
```
Mensagem: "Mostre meu P&L do último trimestre"
Esperado: Tabela com revenue, expenses, profit
```

### Testar Landing Page Local

**Teste 1: Hot Reload**
1. Abrir src/app/page.tsx no VS Code
2. Mudar algo (ex: título)
3. Salvar (Ctrl+S)
4. Verificar mudança INSTANTÂNEA no browser

**Teste 2: API Integration**
1. No browser (localhost:3000)
2. Digitar: "Olá!"
3. Click "Enviar"
4. Ver resposta do AI App da Vercel

---

## 🔧 TROUBLESHOOTING RÁPIDO

### Problema: Push para GitHub falha

**Erro: Authentication failed**
```bash
# Solução: Usar Personal Access Token
# 1. Criar token em: https://github.com/settings/tokens
# 2. Permissions: repo (full control)
# 3. Copiar token
# 4. Usar como password no git push
```

### Problema: Vercel build falha

**Erro: Cannot find module '@ai-sdk-tools/...'**
```bash
# Solução: Verificar se pnpm-workspace.yaml foi commitado
cd /mnt/c/Users/x1o1v/Desktop/Notion/ai-sdk-tools-analysis
git status
# Se pnpm-workspace.yaml não está commitado:
git add pnpm-workspace.yaml
git commit -m "fix: add pnpm workspace config"
git push origin main
```

**Erro: Install command failed**
```bash
# Solução: Verificar Install Command na Vercel
# Deve ser: npm install --legacy-peer-deps
# Editar em: Settings → General → Install Command
```

### Problema: Landing page não conecta API

**Erro: CORS ou Network error**
```bash
# Solução 1: Verificar URL no .env.local
cat landing-page/.env.local
# Deve ser: NEXT_PUBLIC_AI_APP_URL=https://ai-assistant-personal.vercel.app
# SEM trailing slash

# Solução 2: Verificar se Vercel URL está correto
# Pode ser diferente se escolheu outro nome
```

### Problema: Hot reload não funciona

**Solução: Verificar Turbopack**
```bash
# package.json deve ter:
"dev": "next dev --turbopack"

# Se não tiver, adicionar:
npm run dev -- --turbopack
```

---

## 📊 CHECKLIST FINAL

### ✅ GitHub
- [ ] Repositório criado
- [ ] Código pushed
- [ ] Commits visíveis no GitHub

### ✅ Vercel
- [ ] Projeto importado
- [ ] Root directory: `apps/example`
- [ ] Install command: `npm install --legacy-peer-deps`
- [ ] Environment variables configuradas (2-3)
- [ ] Build completed successfully
- [ ] Production URL acessível

### ✅ AI App Funcionando
- [ ] Interface carrega
- [ ] Chat funciona
- [ ] Multi-agent routing funciona
- [ ] Tools executam
- [ ] Artifacts renderizam

### ✅ Landing Page Local
- [ ] Projeto criado
- [ ] Dev server rodando
- [ ] Hot reload funciona (<200ms)
- [ ] ChatDemo component criado
- [ ] API call para Vercel funciona

---

## 🎯 COMANDOS DE DESENVOLVIMENTO DIÁRIO

### Landing Page (Hot Reload)
```bash
cd landing-page
npm run dev
# Edita → Salva → Hot reload instantâneo
```

### AI App (Deploy)
```bash
cd /mnt/c/Users/x1o1v/Desktop/Notion/ai-sdk-tools-analysis
git add .
git commit -m "feat: descrição da mudança"
git push origin main
# Vercel rebuilda automaticamente em 30-60s
```

### Nova Feature (Branch)
```bash
git checkout -b feature/nome-da-feature
# Desenvolve...
git add .
git commit -m "feat: nova feature"
git push origin feature/nome-da-feature
# Vercel cria preview URL automaticamente
```

---

## 📞 PRÓXIMOS PASSOS

Agora que tem ambiente completo:

1. **Explorar AI App** - Testar todas funcionalidades
2. **Desenvolver Landing Page** - Hero, features, CTA
3. **Customizar Agentes** - Ajustar para seu caso de uso
4. **Adicionar Tools** - Integrar APIs reais
5. **Criar Artifacts** - Visualizações customizadas

---

**Comandos prontos para copy & paste! Execute em ordem! 🚀**
