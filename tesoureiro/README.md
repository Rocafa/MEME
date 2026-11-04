# Tesoureiro — site e dashboard

Site do $TESOUREIRO: um agente de IA que cuida de um cofre público de Bitcoin na Solana. O agente propõe, regras fixas conferem e um multisig assina.

**Todos os números são simulados** até o lançamento (`lib/data.ts`, `SIMULATED = true`).

## Páginas

- `/` — apresentação: destaque com números do cofre, como funciona, divisão das taxas, diário do Tesoureiro, riscos e FAQ.
- `/dashboard` — para compradores: preço, market cap, volume, holders, cofre de BTC com gráfico, marcos, passo a passo para comprar (pump.fun e Jupiter), contrato oficial com botão de copiar, calculadora de quanto cada compra leva ao cofre, movimentos do cofre e carteiras para verificar.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · shadcn/ui (Base UI) · lucide-react. O footer é o componente `components/ui/halftone-wordmark-footer.tsx` (canvas 2D, sem dependências).

## Rodar

```bash
npm install
npm run dev
```

Abre em http://localhost:3000.

## Antes do lançamento

1. Colocar o endereço do contrato em `TOKEN.contract` (`lib/data.ts`).
2. Trocar os dados simulados por leituras reais (Helius para transações e holders, Jupiter para preço) e mudar `SIMULATED` para `false`.
3. Publicar as carteiras do cofre, das taxas e da queima na seção "Verificar".
4. Ligar os links das transações ao Solscan.
