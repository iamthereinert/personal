# 🤖 Claude (Anthropic) Integration Guide

> Como usar Claude Sonnet 4.5 ou outros modelos Anthropic no AI SDK Tools

---

## ✅ Configuração Atual

Você já tem:
- ✅ OpenAI API Key configurada
- ✅ Anthropic API Key configurada
- ✅ Ambas as keys em `.env.local`

---

## 🎯 Opção 1: Usar Claude em Agentes Específicos (Recomendado)

Você pode misturar modelos: usar Claude para alguns agentes e OpenAI para outros.

### Exemplo: Usar Claude Sonnet 4.5 no Research Agent

```typescript
// apps/example/src/ai/agents/research.ts

import { anthropic } from "@ai-sdk/anthropic";  // ← Adicionar este import
import { openai } from "@ai-sdk/openai";

export const researchAgent = createAgent({
  name: "research",
  // model: openai("gpt-4o"),  ← Comentar ou remover
  model: anthropic("claude-sonnet-4-5"),  // ← Usar Claude 4.5
  temperature: 0.7,
  instructions: `You are a research specialist...`,
  tools: {
    // ... tools
  },
});
```

### Modelos Claude Disponíveis

```typescript
// Claude 4 (Latest - Melhores)
anthropic("claude-sonnet-4-5")        // ← RECOMENDADO: Melhor custo-benefício
anthropic("claude-opus-4-0")          // Mais poderoso
anthropic("claude-haiku-4-5")         // Mais rápido e barato

// Claude 3.7
anthropic("claude-3-7-sonnet-latest")

// Claude 3.5
anthropic("claude-3-5-sonnet-latest")
anthropic("claude-3-5-haiku-latest")
```

---

## 🎯 Opção 2: Usar Claude em TODOS os Agentes

Se quiser usar Claude em todos os agentes:

### 1. Instalar SDK Anthropic

```bash
cd apps/example
bun add @ai-sdk/anthropic
```

### 2. Modificar Agentes

Em cada arquivo de agente, trocar de OpenAI para Claude:

**Antes**:
```typescript
import { openai } from "@ai-sdk/openai";

export const myAgent = createAgent({
  model: openai("gpt-4o"),
  // ...
});
```

**Depois**:
```typescript
import { anthropic } from "@ai-sdk/anthropic";

export const myAgent = createAgent({
  model: anthropic("claude-sonnet-4-5"),
  // ...
});
```

---

## 🎯 Opção 3: Estratégia Híbrida (Melhor Custo-Benefício)

Use o melhor modelo para cada tarefa:

```typescript
// Triage (roteamento simples) → Modelo rápido e barato
model: openai("gpt-4o-mini")  // OU anthropic("claude-haiku-4-5")

// Research (análise profunda) → Modelo poderoso
model: anthropic("claude-sonnet-4-5")  // OU anthropic("claude-opus-4-0")

// General (chat geral) → Balanceado
model: anthropic("claude-sonnet-4-5")  // OU openai("gpt-4o")

// Analytics (dados) → Poderoso
model: openai("gpt-4o")  // OU anthropic("claude-opus-4-0")

// Reports (relatórios) → Balanceado
model: anthropic("claude-sonnet-4-5")
```

---

## 📝 Guia Rápido de Modificação

### Passo 1: Instalar SDK

```bash
cd "/mnt/c/Users/x1o1v/Desktop/Notion/ai-sdk-tools-analysis/apps/example"
bun add @ai-sdk/anthropic
```

### Passo 2: Modificar Research Agent (Exemplo)

```bash
# Editar arquivo
code src/ai/agents/research.ts
```

Mudar de:
```typescript
import { openai } from "@ai-sdk/openai";

export const researchAgent = createAgent({
  model: openai("gpt-4o"),
  // ...
});
```

Para:
```typescript
import { anthropic } from "@ai-sdk/anthropic";

export const researchAgent = createAgent({
  model: anthropic("claude-sonnet-4-5"),  // 🎯 Claude 4.5
  // ...
});
```

### Passo 3: Testar

```bash
bun run dev
```

Acesse http://localhost:3000 e teste uma pergunta de pesquisa.

---

## 🧪 Teste de Validação

### Testar OpenAI

```
Prompt: "Olá, como você está?" (vai para general agent)
Esperado: Resposta do GPT-4o
```

### Testar Claude

```
Prompt: "Posso comprar um Tesla Model Y?"
Esperado:
1. Triage → Research Agent (agora com Claude)
2. Claude Sonnet 4.5 responde com análise detalhada
```

---

## 📊 Comparação de Modelos

| Tarefa | OpenAI | Anthropic Claude | Recomendação |
|--------|--------|------------------|--------------|
| **Roteamento** | gpt-4o-mini | claude-haiku-4-5 | GPT-4o-mini (mais barato) |
| **Chat Geral** | gpt-4o | claude-sonnet-4-5 | **Claude Sonnet 4.5** (melhor) |
| **Pesquisa** | gpt-4o | claude-sonnet-4-5 | **Claude Sonnet 4.5** (melhor raciocínio) |
| **Análise** | gpt-4o | claude-opus-4-0 | Claude Opus 4 (mais poderoso) |
| **Código** | gpt-4o | claude-sonnet-4-5 | Empate |
| **Rapidez** | gpt-4o-mini | claude-haiku-4-5 | Haiku (mais rápido) |
| **Custo** | gpt-4o-mini | claude-haiku-4-5 | Haiku (mais barato) |

---

## 💰 Preços (Referência)

**OpenAI**:
- GPT-4o: ~$5/1M tokens input
- GPT-4o-mini: ~$0.15/1M tokens input

**Anthropic Claude**:
- Claude Opus 4: ~$15/1M tokens input
- Claude Sonnet 4.5: ~$3/1M tokens input
- Claude Haiku 4.5: ~$0.25/1M tokens input

**Recomendação Custo-Benefício**:
```typescript
// Triage (muito uso, simples)
model: openai("gpt-4o-mini")  // $0.15/1M

// Research, General (uso médio, qualidade)
model: anthropic("claude-sonnet-4-5")  // $3/1M

// Analytics (pouco uso, complexo)
model: anthropic("claude-opus-4-0")  // $15/1M
```

---

## 🚀 Configuração Rápida (5 min)

### Script Rápido

Crie este arquivo: `apps/example/switch-to-claude.sh`

```bash
#!/bin/bash

# Instalar Anthropic SDK
bun add @ai-sdk/anthropic

# Backup dos arquivos originais
cp src/ai/agents/research.ts src/ai/agents/research.ts.bak
cp src/ai/agents/general.ts src/ai/agents/general.ts.bak

# Substituir imports (exemplo simplificado - ajustar conforme necessário)
# Use seu editor preferido para fazer as mudanças

echo "✅ SDK instalado!"
echo "📝 Agora edite manualmente os arquivos de agentes"
echo "   - research.ts"
echo "   - general.ts"
echo "   etc."
```

---

## 🔍 Verificar Qual Modelo Está Sendo Usado

Durante o desenvolvimento, você pode adicionar logs:

```typescript
export const researchAgent = createAgent({
  name: "research",
  model: anthropic("claude-sonnet-4-5"),
  instructions: `...`,
  onEvent: (event) => {
    if (event.type === "agent-start") {
      console.log(`🤖 Agent: ${event.agent} | Model: claude-sonnet-4-5`);
    }
  },
});
```

---

## ⚠️ Notas Importantes

1. **Cache de Build**: Após mudar modelos, pode precisar rebuild:
   ```bash
   bun run build:deps
   bun run build
   ```

2. **Tipos TypeScript**: Os tipos são compatíveis entre OpenAI e Anthropic via AI SDK

3. **Streaming**: Claude suporta streaming normalmente

4. **Tools**: Ambos suportam function calling/tools

5. **Contexto**: Claude 4.5 tem 200k tokens de contexto (vs 128k do GPT-4o)

---

## 🎯 Recomendação Final

**Para desenvolvimento/testes**:
```typescript
// Triage
model: openai("gpt-4o-mini")

// Todos os outros
model: anthropic("claude-sonnet-4-5")
```

**Para produção**:
- Monitore custos
- Ajuste modelos por necessidade
- Use rate limiting
- Configure cache (Upstash Redis)

---

## 🆘 Troubleshooting

**Erro: "Module @ai-sdk/anthropic not found"**
```bash
cd apps/example
bun add @ai-sdk/anthropic
```

**Erro: "Invalid API key"**
```bash
# Verificar .env.local
cat .env.local | grep ANTHROPIC
# Deve mostrar sua key começando com sk-ant-
```

**Claude não responde**
```bash
# Verificar se a key está ativa em:
# https://console.anthropic.com/settings/keys
```

---

Pronto para testar? Escolha uma opção e vamos configurar! 🚀
