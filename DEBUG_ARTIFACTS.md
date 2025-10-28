# 🐛 DEBUG - Por que os Artifacts não aparecem?

## 🎯 PROBLEMA

Você faz a pergunta "Show me my balance sheet", o AI responde "Generating your financial reports...", mas a sidebar com o canvas **NÃO ABRE**.

---

## 🔍 PASSO 1: Debug no Console do Navegador

### Teste 1: Verificar se Artifacts estão chegando

1. **Abra seu app** na Vercel
2. **Abra o Console** (F12 → Console tab)
3. **Cole este código** e pressione Enter:

```javascript
// Debug artifacts
const store = window.__NEXT_DATA__?.props?.pageProps?.initialState?.messages || [];
console.log("📦 Messages:", store.length);

// Verificar se há artifacts nas mensagens
store.forEach((msg, i) => {
  if (msg.parts) {
    msg.parts.forEach((part) => {
      if (part.type.startsWith('data-artifact-')) {
        console.log(`✅ Found artifact in message ${i}:`, part.type, part.data);
      }
    });
  }
});
```

4. **Faça a pergunta**: "Show me balance sheet"

5. **Aguarde a resposta** e então **cole novamente** o código acima

**O que você deve ver**:
- ✅ **SE FUNCIONAR**: `Found artifact in message X: data-artifact-balance-sheet`
- ❌ **SE FALHAR**: Nenhum artifact encontrado

---

### Teste 2: Verificar Messages no React State

1. **Cole este código** no console:

```javascript
// Get React DevTools
const reactRoot = document.querySelector('#__next');
const key = Object.keys(reactRoot).find(k => k.startsWith('__react'));
const fiber = reactRoot[key];

// Find chat store
function findChatProvider(fiber) {
  let node = fiber;
  while (node) {
    if (node.type?.name === 'Provider' || node.stateNode?.messages) {
      return node.stateNode;
    }
    node = node.return || node.child || node.sibling;
  }
  return null;
}

const chatStore = findChatProvider(fiber);
if (chatStore?.messages) {
  console.log("📨 Chat Messages:", chatStore.messages.length);
  chatStore.messages.forEach((msg, i) => {
    console.log(`Message ${i}:`, {
      role: msg.role,
      parts: msg.parts?.length || 0,
      artifacts: msg.parts?.filter(p => p.type.startsWith('data-artifact-'))
    });
  });
} else {
  console.log("❌ Chat store not found");
}
```

**O que você deve ver**:
- ✅ Mensagens com `parts` array
- ✅ Artifacts com tipo `data-artifact-balance-sheet`

---

## 🔧 PASSO 2: Verificar Network Requests

### Teste 3: Inspecionar Resposta do Backend

1. **Abra Network tab** (F12 → Network)
2. **Filtre por "chat"**
3. **Faça a pergunta**: "Show me balance sheet"
4. **Click na request** `/api/chat`
5. **Vá em "Response" tab**

**O que procurar**:

```
data: {"type":"text","text":"Generating your financial reports..."}

data: {"type":"data-artifact-balance-sheet","data":{"id":"...", "type":"balance-sheet", ...}}
```

**Esperado**:
- ✅ Deve ter linhas com `data-artifact-balance-sheet`
- ✅ Deve ter dados do balance sheet

**Se não aparecer**:
- ❌ O backend NÃO está enviando artifacts
- ❌ Problema está no agent/tool execution

---

## 🧪 PASSO 3: Testes Diretos

### Teste 4: Verificar useArtifacts Hook

1. **Instale React DevTools** (extensão Chrome/Firefox)
2. **Abra React DevTools** (F12 → Components tab)
3. **Procure por** `ChatInterface` component
4. **Expanda** e procure `useArtifacts` hook
5. **Verifique** o valor de `artifacts`

**O que você deve ver**:
- ✅ `artifacts: Array(1)` → Artifact encontrado!
- ❌ `artifacts: []` → Nenhum artifact

---

## 🎯 PASSO 4: Teste Simples

### Teste 5: Forçar Artifact no Console

1. **Cole este código** para simular um artifact:

```javascript
// Simulate artifact
const artifactData = {
  id: "test-123",
  type: "balance-sheet",
  version: 1,
  status: "complete",
  createdAt: Date.now(),
  payload: {
    stage: "complete",
    title: "Test Balance Sheet",
    asOfDate: "2024-12-31",
    currency: "USD",
    progress: 1,
    assets: {
      currentAssets: { cash: 100000, accountsReceivable: 50000, inventory: 30000, prepaidExpenses: 10000, total: 190000 },
      nonCurrentAssets: { propertyPlantEquipment: 200000, intangibleAssets: 50000, investments: 100000, total: 350000 },
      totalAssets: 540000
    },
    liabilities: {
      currentLiabilities: { accountsPayable: 40000, shortTermDebt: 20000, accruedExpenses: 10000, total: 70000 },
      nonCurrentLiabilities: { longTermDebt: 150000, deferredRevenue: 20000, otherLiabilities: 10000, total: 180000 },
      totalLiabilities: 250000
    },
    equity: {
      commonStock: 100000,
      retainedEarnings: 150000,
      additionalPaidInCapital: 40000,
      totalEquity: 290000
    },
    ratios: {
      currentRatio: 2.71,
      quickRatio: 2.14,
      debtToEquity: 0.86,
      workingCapital: 120000
    }
  }
};

console.log("📦 Test artifact:", artifactData);

// Try to inject into messages (this is a hack for testing)
const testMessage = {
  id: "test-msg",
  role: "assistant",
  content: "Test message",
  parts: [
    { type: "text", text: "Test" },
    { type: "data-artifact-balance-sheet", data: artifactData }
  ]
};

console.log("💉 Inject this message:", testMessage);
console.log("⚠️ Note: This is just for testing - real artifacts come from backend");
```

**Isso NÃO vai fazer o artifact aparecer** (porque precisa vir do backend), mas **mostra o formato esperado**.

---

## 📊 RESULTADOS ESPERADOS

### ✅ Se está funcionando:

```
Console:
✅ Found artifact in message 2: data-artifact-balance-sheet
✅ Artifact data: {id: "...", type: "balance-sheet", payload: {...}}

Network:
✅ Response contains: data-artifact-balance-sheet

React DevTools:
✅ useArtifacts → artifacts: Array(1)
```

**Sidebar deve abrir automaticamente!**

---

### ❌ Se NÃO está funcionando:

```
Console:
❌ No artifacts found in messages
❌ Chat messages: 0 parts with artifacts

Network:
❌ Response only has: {"type":"text","text":"..."}
❌ No data-artifact-* lines

React DevTools:
❌ useArtifacts → artifacts: []
```

**Sidebar NÃO abre porque não há artifacts!**

---

## 🔍 POSSÍVEIS CAUSAS

### Causa 1: Backend não está enviando artifacts
**Sintomas**:
- ❌ Network tab não mostra `data-artifact-*`
- ❌ Messages não têm parts com artifacts

**Solução**: Verificar se o tool está usando `useArtifact: true`

---

### Causa 2: Agent não está chamando o tool correto
**Sintomas**:
- ✅ Network tab mostra texto, mas sem tool calls
- ❌ Não há `tool-call` parts nas messages

**Solução**: Melhorar prompt do agent ou description do tool

---

### Causa 3: Writer não está funcionando
**Sintomas**:
- ✅ Tool é chamado (tool-call visible)
- ❌ Mas artifact não é enviado

**Solução**: Verificar logs no Vercel (Functions → Latest → Logs)

---

## 🚀 PRÓXIMO PASSO

**Faça os Testes 1-3 acima** e **me envie os resultados**:

1. ✅ ou ❌ Artifacts encontrados no console?
2. ✅ ou ❌ data-artifact-* na Network tab?
3. ✅ ou ❌ useArtifacts mostra artifacts?

**Com essas informações, posso identificar exatamente onde está o problema!** 🎯

---

## 💡 DICA RÁPIDA

Se você ver "Generating your financial reports..." mas nada acontece:

1. **Verifique Logs do Vercel**:
   - https://vercel.com/iamthereinert/personal/logs
   - Procure por erros relacionados a "balance-sheet" ou "artifact"

2. **Teste com Revenue ao invés de Balance Sheet**:
   - "Show me revenue dashboard"
   - Revenue também tem artifact configurado

3. **Verifique se o deploy foi bem sucedido**:
   - https://vercel.com/iamthereinert/personal/deployments
   - Deve estar ✅ verde, não ❌ vermelho

---

**Me envie os resultados dos testes e podemos corrigir juntos!** 🔧
