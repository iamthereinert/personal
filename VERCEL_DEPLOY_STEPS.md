# 🚀 FASE 2: Deploy na Vercel

## ⚡ Acesso Rápido

**URL para começar**: https://vercel.com/new

---

## 📋 Passo a Passo Detalhado

### Passo 1: Login na Vercel (1 min)

1. Acesse: https://vercel.com
2. Click **"Sign Up"** ou **"Log In"**
3. **IMPORTANTE**: Escolha "Continue with GitHub"
   - Isso conecta automaticamente seus repos
   - Facilita o deploy

### Passo 2: Import Project (1 min)

1. Após login, você verá o dashboard
2. Click **"Add New..."** (canto superior direito)
3. Selecione **"Project"**
4. Na lista de repositórios, encontre: **"ai-assistant-personal"**
5. Click **"Import"** ao lado dele

### Passo 3: Configure Project (2 min)

**Framework Preset**:
- ✅ Next.js (detectado automaticamente)

**Root Directory**: ⚠️ **IMPORTANTE - Editar Aqui**
```
apps/example
```
- Click no botão **"Edit"** ao lado de "Root Directory"
- Digite: `apps/example`
- Click "Continue"

**Build and Output Settings**:
- Build Command: `npm run build` ✅ (já está)
- Output Directory: `.next` ✅ (já está)
- Install Command: ⚠️ **PRECISA EDITAR**
  - Click "Override"
  - Mude para: `npm install --legacy-peer-deps`

### Passo 4: Environment Variables (2 min)

Click em **"Environment Variables"** e adicione **3 variáveis**:

#### Variável 1: OPENAI_API_KEY
```
Name: OPENAI_API_KEY
Value: [COLE SUA OPENAI API KEY AQUI]
Environments: ✅ Production ✅ Preview ✅ Development
```

#### Variável 2: ANTHROPIC_API_KEY
```
Name: ANTHROPIC_API_KEY
Value: [COLE SUA ANTHROPIC API KEY AQUI]
Environments: ✅ Production ✅ Preview ✅ Development
```

#### Variável 3: DEBUG (Opcional)
```
Name: DEBUG
Value: true
Environments: ✅ Development
```

### Passo 5: Deploy! (3-5 min)

1. Revise as configurações:
   ```
   ✅ Framework: Next.js
   ✅ Root Directory: apps/example
   ✅ Install Command: npm install --legacy-peer-deps
   ✅ Build Command: npm run build
   ✅ Environment Variables: 2-3 configuradas
   ```

2. Click **"Deploy"**

3. Aguarde o build (~3-5 minutos)
   - Você verá logs em tempo real
   - Progress bar mostrando progresso
   - Pode tomar um café ☕

### Passo 6: Sucesso! 🎉

**Quando terminar**:
```
✅ Build completed
✅ Deployment ready
🌐 Production URL: https://ai-assistant-personal.vercel.app
```

Ou pode ser um domínio diferente gerado pela Vercel, tipo:
```
https://ai-assistant-personal-iamthereinert.vercel.app
```

---

## ✅ Checklist de Verificação

Antes de clicar "Deploy", verifique:

- [ ] Root Directory está como `apps/example`
- [ ] Install Command tem `--legacy-peer-deps`
- [ ] OPENAI_API_KEY adicionada (Production + Preview + Development)
- [ ] ANTHROPIC_API_KEY adicionada (Production + Preview + Development)
- [ ] DEBUG=true adicionada (Development only)

---

## 🧪 Após Deploy - Testes Rápidos

### Teste 1: App Carrega
1. Abrir URL de produção
2. Interface de chat deve aparecer

### Teste 2: Chat Funciona
```
Mensagem: "Olá, como você está?"
Esperado: Resposta do AI
```

### Teste 3: Multi-Agent
```
Mensagem: "Posso comprar um Tesla?"
Esperado: Web search + análise financeira
```

### Teste 4: Artifact
```
Mensagem: "Crie um gráfico de revenue"
Esperado: Canvas slide-in com gráfico
```

---

## 🔧 Troubleshooting

### Erro: "Cannot find module '@ai-sdk-tools/...'"

**Solução**: Verificar se `pnpm-workspace.yaml` foi commitado
```bash
cd /mnt/c/Users/x1o1v/Desktop/Notion/ai-sdk-tools-analysis
git add pnpm-workspace.yaml
git commit -m "fix: add workspace config"
git push origin main
# Vercel rebuilda automaticamente
```

### Build muito lento ou timeout

**Solução**: Isso é normal na primeira vez
- Primeiro build: 5-8 minutos
- Builds seguintes: 1-2 minutos (cache)

### Environment variables não funcionam

**Solução**: Verificar que marcou todos os ambientes
- ✅ Production
- ✅ Preview
- ✅ Development

Depois de mudar, fazer redeploy:
- Settings → Deployments → Latest → "Redeploy"

---

## 🎯 Próximo Passo (Após Deploy)

### FASE 3: Landing Page Local

Quando o deploy terminar com sucesso, vamos criar a landing page local com hot reload!

**Tempo estimado**: 5 minutos
**Resultado**: Hot reload <200ms para desenvolvimento ágil

---

**Pronto para executar! Siga os passos acima! 🚀**
