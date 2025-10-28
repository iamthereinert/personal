# 🧪 Guia de Teste - Desenvolvimento Local

> Como testar todas as funcionalidades do AI SDK Tools em modo dev

---

## ✅ O Que Já Foi Configurado

1. ✅ **API Keys Configuradas**
   - OpenAI API Key (GPT-4o, GPT-4o-mini)
   - Anthropic API Key (Claude Sonnet 4.5, Claude Opus 4)
   - Arquivo: `apps/example/.env.local`

2. ✅ **SDK Anthropic**
   - Instalação em andamento
   - Permite usar modelos Claude

3. ✅ **Documentação Completa**
   - DEPLOY_GUIDE.md
   - CLAUDE_INTEGRATION_GUIDE.md
   - V0_PROMPTS.md
   - Todos os guias técnicos

---

## 🚀 Como Iniciar o Teste

### Passo 1: Finalizar Instalação

```bash
cd "C:\Users\x1o1v\Desktop\Notion\ai-sdk-tools-analysis"

# Instalar todas as dependências
bun install

# Build dos packages
bun run build
```

### Passo 2: Iniciar Aplicação em Dev Mode

```bash
cd apps/example
bun run dev
```

**Aguarde aparecer**:
```
✓ Ready in 3.2s
○ Local:   http://localhost:3000
```

### Passo 3: Acessar

Abra seu navegador em: **http://localhost:3000**

---

## 🧪 Checklist de Funcionalidades para Testar

### 1. Interface Básica

- [ ] **Chat carrega corretamente**
  - Interface aparece
  - Input está visível
  - Theme toggle funciona

- [ ] **Dark/Light Mode**
  - Click no botão de theme
  - Cores mudam suavemente
  - Preferência persiste

- [ ] **Responsividade**
  - Redimensione janela
  - Teste em diferentes larguras
  - Mobile view (F12 → Device toolbar)

---

### 2. Funcionalidades de Chat

#### Chat Básico com OpenAI (GPT-4o-mini)

**Teste 1: Saudação Simples**
```
Prompt: "Olá, como você está?"
Esperado:
- Resposta rápida (< 3 segundos)
- Mensagem aparece em tempo real (streaming)
- Avatar do assistant aparece
```

**Teste 2: Pergunta Geral**
```
Prompt: "O que você pode fazer por mim?"
Esperado:
- Lista de capacidades
- Menção aos diferentes agentes
```

**Teste 3: Múltiplas Mensagens**
```
Prompt 1: "Olá"
Prompt 2: "Como está o tempo hoje?"
Prompt 3: "E amanhã?"
Esperado:
- Histórico mantido
- Contexto preservado
- Scroll automático
```

---

### 3. Sistema Multi-Agent (Handoffs)

#### Research Agent (Análise de Affordability)

**Teste 4: Análise de Compra**
```
Prompt: "Posso comprar um Tesla Model Y?"
Esperado:
- Triage detecta "affordability analysis"
- Handoff para Research Agent
- Agent usa web search tool (se configurado)
- Resposta detalhada sobre:
  * Preço do Model Y
  * Análise de affordability
  * Recomendações
```

**Teste 5: Decisão de Compra**
```
Prompt: "Devo comprar um iPhone 15 Pro?"
Esperado:
- Research Agent analisa
- Compara opções
- Dá recomendação baseada em dados
```

#### General Agent

**Teste 6: Web Search**
```
Prompt: "Qual é o preço do Bitcoin hoje?"
Esperado:
- General Agent com web search
- Informação atualizada
- Fonte citada (se disponível)
```

#### Operations Agent

**Teste 7: Operações**
```
Prompt: "Qual é o saldo da minha conta?"
Esperado:
- Operations Agent
- Executa tool para buscar saldo
- Retorna informação formatada
```

---

### 4. Tools e Execução

#### Tool Calling

**Teste 8: Tool Execution Display**
```
Prompt: "Busque meus últimos 5 transactions"
Esperado:
- Tool call visível na UI
- Status: "Executing..."
- Spinner/loading indicator
- Resultado formatado em tabela
```

**Teste 9: Múltiplas Tools em Paralelo**
```
Prompt: "Mostre meu saldo e últimas transações"
Esperado:
- 2 tools executadas em paralelo
- Ambas aparecem na UI
- Resultados combinados na resposta
```

---

### 5. Artifacts (Visualizações Estruturadas)

#### Charts e Gráficos

**Teste 10: Gerar Gráfico**
```
Prompt: "Crie um gráfico de receita dos últimos 6 meses"
Esperado:
- Canvas desliza do lado direito (600px)
- Gráfico renderiza (Recharts)
- Smooth transition (300ms)
- Pode alternar entre artifacts
```

**Teste 11: Múltiplos Artifacts**
```
Prompt: "Crie 3 gráficos: receita, despesas e lucro"
Esperado:
- 3 artifacts criados
- Tabs para navegar entre eles
- Canvas permanece aberto
- Fechar canvas volta ao normal
```

#### Tabelas

**Teste 12: Tabela de Dados**
```
Prompt: "Liste meus clientes em uma tabela"
Esperado:
- Tabela renderiza no artifact canvas
- Sortable columns (se implementado)
- Formatação limpa
```

---

### 6. Performance e Streaming

#### Streaming de Respostas

**Teste 13: Resposta Longa**
```
Prompt: "Escreva um artigo de 500 palavras sobre IA"
Esperado:
- Texto aparece palavra por palavra
- Smooth streaming
- Não trava a UI
- Can stop generation (botão stop)
```

**Teste 14: Interromper Geração**
```
Prompt: "Escreva um artigo muito longo..."
Ação: Click no botão "Stop"
Esperado:
- Geração para imediatamente
- Texto parcial é mantido
- Pode enviar nova mensagem
```

---

### 7. Memória e Contexto

#### Working Memory

**Teste 15: Persistência de Contexto**
```
Prompt 1: "Meu nome é João"
Prompt 2: "Qual é o meu nome?"
Esperado:
- "Seu nome é João"
- Contexto mantido
```

**Teste 16: Cross-Session Memory**
```
Ação 1: Recarregar página (F5)
Prompt: "Lembra do meu nome?"
Esperado:
- Se Upstash configurado: "João"
- Se não: Contexto perdido (esperado)
```

#### Chat History

**Teste 17: Histórico de Conversas**
```
Ação: Criar nova conversa
Ação: Ver histórico no sidebar (se disponível)
Esperado:
- Lista de conversas
- Títulos gerados automaticamente
- Pode alternar entre conversas
```

---

### 8. Error Handling

#### Erros Graceful

**Teste 18: API Key Inválida**
```
Ação: Mudar .env.local com key inválida
Prompt: "Olá"
Esperado:
- Erro claro: "API Key inválida"
- UI não quebra
- Pode tentar novamente
```

**Teste 19: Rate Limit**
```
Ação: Enviar muitas mensagens rápido
Esperado:
- Rate limit indicator (se configurado)
- Mensagem clara
- Retry automático (se configurado)
```

**Teste 20: Network Error**
```
Ação: Desconectar internet
Prompt: "Olá"
Esperado:
- Erro de conexão
- Retry button
- Offline indicator
```

---

### 9. Claude Integration (Anthropic)

#### Usando Claude Sonnet 4.5

**Teste 21: Modificar Research Agent para Claude**
```bash
# Editar: apps/example/src/ai/agents/research.ts
# Trocar model para: anthropic("claude-sonnet-4-5")

Prompt: "Posso comprar uma casa de $500k?"
Esperado:
- Research Agent usa Claude 4.5
- Resposta de alta qualidade
- Raciocínio detalhado
```

**Teste 22: Comparar OpenAI vs Claude**
```
Teste A: GPT-4o
Prompt: "Explique quantum computing"

Teste B: Claude Sonnet 4.5
Prompt: "Explique quantum computing"

Comparar:
- Qualidade da resposta
- Velocidade
- Estilo de escrita
```

---

### 10. Advanced Features

#### Devtools (Debug UI)

**Teste 23: Devtools Panel**
```
Ação: Checar se devtools aparece (bottom-right)
Esperado:
- Painel de debug visível (dev only)
- Mostra tool calls
- Mostra agent handoffs
- Timeline de execução
```

#### Suggestions

**Teste 24: Suggested Prompts**
```
Ação: Iniciar conversa
Esperado:
- Suggestions aparecem após primeira resposta
- 3-5 sugestões relevantes
- Click executa sugestão
```

---

## 📊 Métricas de Performance

### Benchmarks Esperados

| Métrica | Valor Esperado |
|---------|----------------|
| **First Paint** | < 1s |
| **Time to Interactive** | < 2s |
| **First Token (Streaming)** | < 1.5s |
| **Chat Response (GPT-4o-mini)** | < 3s |
| **Chat Response (Claude 4.5)** | < 4s |
| **Artifact Render** | < 500ms |
| **Canvas Transition** | 300ms |
| **Theme Toggle** | 200ms |

### Como Medir

```bash
# Lighthouse
npx lighthouse http://localhost:3000 --view

# Ou no Chrome DevTools:
# F12 → Lighthouse → Analyze page load
```

---

## 🐛 Problemas Comuns e Soluções

### App não inicia

```bash
# Limpar e reinstalar
rm -rf node_modules bun.lock
bun install
bun run build
```

### "API Key Invalid"

```bash
# Verificar .env.local
cat apps/example/.env.local

# Deve ter:
OPENAI_API_KEY=sk-proj-...
ANTHROPIC_API_KEY=sk-ant-...
```

### Build falha

```bash
# Build incremental
cd apps/example
bun run build:deps
bun run build
```

### Port 3000 já em uso

```bash
# Mudar porta
bun run dev -- --port 3001

# Ou matar processo:
# Windows: netstat -ano | findstr :3000
# Linux/Mac: lsof -ti:3000 | xargs kill
```

---

## ✅ Checklist Final

Após testar tudo:

- [ ] Interface funciona perfeitamente
- [ ] Chat com OpenAI OK
- [ ] Chat com Claude OK (se configurado)
- [ ] Multi-agent handoffs funcionam
- [ ] Tools executam corretamente
- [ ] Artifacts renderizam
- [ ] Canvas desliza suavemente
- [ ] Performance aceitável (< 3s responses)
- [ ] Dark/light mode OK
- [ ] Responsivo OK
- [ ] Sem erros no console (F12)

---

## 🎉 Próximos Passos

Após validar tudo localmente:

1. **Deploy na Vercel** (ver DEPLOY_GUIDE.md)
2. **Customizar branding** (ver V0_PROMPTS.md)
3. **Criar landing page** (ver DEPLOY_GUIDE.md)
4. **Integrar com ERP** (ver SUMMARY.md)

---

**Sucesso nos testes!** 🚀

Se encontrar problemas, consulte os guias completos ou me avise!
