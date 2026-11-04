# 02 — Stack, linguagens e arquitetura

Tudo o que é preciso para criar e desenvolver as ideias de `01_HIERARQUIA_DE_IDEIAS.md`. Organizado em: linguagens, ferramentas e serviços, matriz por ideia, arquitetura de referência, estrutura de repositório e segurança.

> Nomes de bibliotecas e serviços foram conferidos por pesquisa em 4/11/2026 (ver `03_REFERENCIAS_E_MERCADO.md`, seção "Verificação"). Confirme as versões no momento de instalar.

---

## 1. As linguagens e para que serve cada uma

| Linguagem | Onde entra | Obrigatória? |
|---|---|---|
| **TypeScript (Node.js)** | Bots (resgate de taxas, swap, distribuição, posts no X/Telegram), backend/API, frontend | **Sim, em todas as ideias.** É a linguagem principal do ecossistema Solana fora dos programas on-chain. |
| **HTML + CSS (Tailwind) + JavaScript/React (Next.js)** | Site, painel do cofre, página de verificação, documentação | **Sim, em todas.** |
| **SQL (PostgreSQL)** | Livro contábil (cada taxa, swap e pagamento), indexação, histórico do painel | **Sim, em todas.** Sem livro contábil não há transparência confiável. |
| **Rust (framework Anchor)** | Programas próprios na Solana: launchpad, cofre por moeda, Passe NFT com cofre, VRF on-chain | Só para **#3 Heist Launchpad**, **#9** e **#12**. O MVP do $HEIST não precisa. |
| **Python** | Backtests, simulação Monte Carlo do tesouro, regras de seleção (cesta do $INDEX, moedas mortas do $NECRO), SDK da Hyperliquid, análise de dados | Para **#4, #8, #10, #14, #17** e para simular a solvência de qualquer ideia com sorteio. |
| **Solidity (Foundry)** | Contratos EVM (Base, BNB, Robinhood Chain, Polygon/Polymarket) | Só para **#10 $ORACULO** e **#13 Porte EVM**. |
| **Bash / PowerShell** | Scripts de deploy, operação, backup | Apoio. |
| **YAML** | CI/CD (GitHub Actions), docker-compose, configuração | Apoio. |
| **Dockerfile** | Empacotar bots e API para rodar 24/7 | Recomendado. |
| **JSON** | Metadados do token (padrão Metaplex), IDL do Anchor, configs | Apoio. |
| **Markdown** | Documentação pública no estilo do $POP/OTC | Sim. |
| **Prompt engineering (texto)** | Personalidade e regras do agente de IA | Só **#2 $NOKEYS** e **#10 $ORACULO**. |

**Resumo:** com **TypeScript + SQL + HTML/CSS** você constrói o MVP das ideias de nível S (#2 e #3). **Rust** entra na Fase 3 (launchpad). **Python** entra para simulações e quant.

---

## 2. Ferramentas, bibliotecas e serviços

### 2.1 Solana (on-chain)

| Necessidade | Ferramenta | Linguagem |
|---|---|---|
| SDK JavaScript da Solana | `@solana/kit` v8.x (recomendado para projetos novos). `@solana/web3.js` v3 (out/2026) mantém a API antiga reconstruída sobre o Kit; `npm install @solana/web3.js` agora instala a v3, não a v1 | TS |
| Programas on-chain | **Anchor 1.x** (`anchor-lang` 1.2.x no crates.io) + Solana CLI. Cliente TS mudou para `@anchor-lang/core` (o `@coral-xyz/anchor` parou na 0.32.1) | Rust |
| Criar moeda e configurar a divisão de taxa no pump.fun | `@pump-fun/pump-sdk` v4.x (`createV2Instruction`, `createFeeSharingConfig`, `updateFeeSharesV2`, `revokeFeeSharingAuthority`, `collectCoinCreatorFee`). Divisão para até 10 carteiras | TS |
| Curva configurável alternativa | **Meteora DBC** (`@meteora-ag/dynamic-bonding-curve-sdk` v2) | TS |
| Alternativa de launchpad | **Raydium LaunchLab** (`@raydium-io/raydium-sdk-v2`) | TS |
| Swap (SOL → cbBTC / USDC / cesta) | **Jupiter Swap API V2** (`api.jup.ag/swap/v2`, endpoints `/order` e `/build`). **Exige header `x-api-key`.** A Ultra V1 está descontinuada e o `lite-api.jup.ag` vai ser desligado | TS |
| BTC na Solana | **cbBTC** `cbbtcf3aa214zXHbiAZQwf4122FBYbraNdFqgw4iMij` (8 decimais; **a Coinbase pode congelar**, avise os holders) · WBTC `3NZ9JMVBmGAqocybic2c7LQCJScmgsAZ6vQqTDzcqmJh` · zBTC `zBTCug3er3tLyffELcvDNrKkCymbPWysGcWihESYfLg`. **Fixe os mints no código:** existem cópias falsas com os mesmos nomes | — |
| Ações tokenizadas (#12) | xStocks (ex.: AAPLx `XsbEhLAtcf6HdfpFZ5xEMdqW8nfAvcsP5bdudRLJzJp`) são **Token-2022**: o código precisa tratar esse padrão | TS |
| Multisig do cofre | **Squads v4** (`@sqds/multisig` v2.x) | TS |
| NFT com cofre (Passe da Gangue) | **Metaplex Core** + **Umi** (`@metaplex-foundation/umi` v1.6, `@metaplex-foundation/mpl-core` v1.10) | TS / Rust |
| Aleatoriedade verificável | **Switchboard On-Demand** (`@switchboard-xyz/on-demand`) ou **ORAO VRF** (`@orao-network/solana-vrf`) | Rust / TS |
| Preço de referência | **Pyth** ou Switchboard | TS |
| Tokens SPL e contas de token | SPL Token e **Token-2022** (`@solana-program/token`, `@solana-program/token-2022`) | TS |
| Pagar muitos holders | Address Lookup Tables, priority fees, **Jito bundles**; para listas grandes, **Merkle distributor** (Jito merkle-distributor ou Streamflow) com resgate pelo holder em vez de enviar para milhares de carteiras. Criar uma conta de cbBTC para quem não tem custa ~0,002 SOL de rent | TS / Rust |
| Testes de programas | **LiteSVM**, **Surfpool** ou Bankrun | Rust / TS |
| Segurança de programas | **Solana Verify** (build verificável) + `security.txt` | Rust |

### 2.2 Dados e indexação

| Necessidade | Ferramenta |
|---|---|
| RPC + webhooks de transações | **Helius** (`helius-sdk` v3: RPC, webhooks, DAS API) ou **Yellowstone gRPC (Geyser)** para streaming |
| Lista de holders e saldos | Helius DAS `getTokenAccounts` ou `getProgramAccounts` com filtros. **Excluir** bonding curve, pool AMM e contas de queima |
| Analytics públicos | Dune ou Flipside (dashboards que qualquer um confere) |
| Dados de mercado | **DexScreener API**, **Birdeye API**, CoinGecko |
| Exploradores | Solscan, Solana Explorer |
| Banco de dados | **PostgreSQL** (Supabase ou Neon como gerenciado) |
| Fila / agendamento | Cron (node-cron), BullMQ + Redis, ou jobs do Render |

### 2.3 Fora da Solana

| Necessidade | Ferramenta | Linguagem |
|---|---|---|
| Perps de ações / HLP (#14, #17) | **Hyperliquid** API + `hyperliquid-python-sdk` v0.24. Perps de ações HIP-3 (ativos desde 13/10/2025, principalmente via TradeXYZ) liquidam em stablecoin: são sintéticos, não ações | Python / TS |
| Mercados de previsão (#10) | Polymarket CLOB API (Polygon) | Python / TS / Solidity |
| EVM (#13) | **Foundry**, `viem`, OpenZeppelin | Solidity / TS |
| Agente de IA (#2, #10) | **Claude API** (Anthropic SDK) | TS / Python |
| Clima (#11) | Open-Meteo (gratuita, sem chave) | TS / Python |

### 2.4 Social, comunidade e missões

| Necessidade | Ferramenta |
|---|---|
| Posts automáticos | X API (plano pago para postar com volume), Telegram Bot API (`grammY` ou `telegraf`), Discord (`discord.js`) |
| Missões | Zealy, Galxe, ou bot próprio (verificação via X API + saldo on-chain) |
| Login com carteira | Solana Wallet Adapter / Phantom / Sign-In With Solana (SIWS) |

### 2.5 Frontend e infraestrutura

| Necessidade | Ferramenta |
|---|---|
| Site e painel | **Next.js** (React) + **Tailwind CSS** + shadcn/ui |
| Gráficos do painel | Recharts ou lightweight-charts (TradingView) |
| Hospedagem do site | Vercel ou Cloudflare Pages |
| Bots 24/7 | Render, Railway, Fly.io ou VPS com Docker |
| Monitoramento e alertas | Grafana + Prometheus, Sentry, alertas no Telegram |
| Segredos | Vault do provedor (Render/Vercel env), 1Password, AWS/GCP Secret Manager — **nunca** em `.env` compartilhado nem no repositório |
| CI/CD | GitHub Actions |

---

## 3. Matriz: linguagens por ideia

✅ = necessária · ◻️ = opcional/fase posterior · — = não precisa

| # | Ideia | TS | HTML/CSS/React | SQL | Rust | Python | Solidity |
|---|---|---|---|---|---|---|---|
| 1 | $NOKEYS (agente IA) | ✅ | ✅ | ✅ | — | ◻️ | — |
| 2 | $HEIST / $STACK | ✅ | ✅ | ✅ | — | ◻️ | — |
| 3 | Heist Launchpad | ✅ | ✅ | ✅ | ✅ | ◻️ | — |
| 4 | $INDEX | ✅ | ✅ | ✅ | — | ✅ | — |
| 5 | $DOAR | ✅ | ✅ | ✅ | — | — | — |
| 6 | Sorteio GTA + missões | ✅ | ✅ | ✅ | ◻️ | ◻️ | — |
| 7 | $BOUNTY | ✅ | ✅ | ✅ | — | — | — |
| 8 | $NECRO | ✅ | ✅ | ✅ | — | ✅ | — |
| 9 | Missões como serviço | ✅ | ✅ | ✅ | ◻️ | ◻️ | — |
| 10 | $ORACULO | ✅ | ✅ | ✅ | — | ✅ | ◻️ |
| 11 | $CALOR | ✅ | ✅ | ✅ | — | ◻️ | — |
| 12 | Launchpad de ações tokenizadas | ✅ | ✅ | ✅ | ✅ | ◻️ | — |
| 13 | Porte EVM | ✅ | ✅ | ✅ | — | — | ✅ |
| 14 | $POP (short) | ✅ | ✅ | ✅ | — | ✅ | — |
| 15 | Parasita | ✅ | ✅ | ✅ | — | — | — |
| 16 | $YIN / $YANG | ✅ | ✅ | ✅ | — | — | — |
| 17 | Cofre HLP | ✅ | ✅ | ✅ | — | ✅ | — |
| 18 | LuckPad | ✅ | ✅ | ✅ | ✅ | ✅ | — |
| 19 | $BULL / $BEAR | ✅ | ✅ | ✅ | ◻️ | — | — |
| 20 | $ULTIMO | ✅ | ✅ | ✅ | ✅ | — | — |

---

## 4. Arquitetura de referência (serve para quase todas)

```
            ┌──────────────────────── Solana ────────────────────────┐
 Traders →  │ pump.fun / PumpSwap  ──(taxa de criador)──►  Carteira   │
            │                                              de taxas   │
            └──────────────────────────────┬─────────────────────────┘
                                           │ Helius webhook / polling
                                           ▼
 ┌─────────────────────────── Backend (TypeScript) ───────────────────────────┐
 │ 1. Fee Claimer     resgata taxas (idempotente, por assinatura de tx)       │
 │ 2. Splitter        divide % (cofre / equipe / queima / eventos)            │
 │ 3. Swapper         Jupiter: SOL → cbBTC (limiar mínimo, slippage máx.)     │
 │ 4. Vault Ops       propõe transações ao multisig Squads                    │
 │ 5. Milestones      verifica marcos ⭐ e dispara eventos                     │
 │ 6. Distributor     snapshot de holders → pagamento proporcional            │
 │ 7. Raffle/Quests   missões + VRF + anti-Sybil                              │
 │ 8. Social Bot      posta cada ação no X/Telegram com link da tx            │
 │ 9. (Agente IA)     propõe ações dentro de regras; executor confere         │
 │ 10. Guardrails     kill switch, limites por dia, alertas                   │
 └───────────────┬──────────────────────────────────────────┬────────────────┘
                 ▼                                          ▼
        PostgreSQL (livro contábil imutável)        Alertas (Telegram/Sentry)
                 │
                 ▼
 Next.js — painel público: cofre, marcos, transações, holders, sorteios, docs
```

**Regras de engenharia (do plano estratégico + boas práticas):**
- **Idempotência:** cada etapa registra a assinatura da transação; reprocessar não duplica pagamentos.
- **Reconciliação:** a cada hora, comparar o saldo do banco com o saldo on-chain; se divergir, pausar.
- **Limiares:** só fazer swap acima de um valor mínimo (o OTC usa 0,1 SOL) para não perder tudo em taxa e slippage.
- **Kill switch:** uma flag que pausa todos os bots, independente do código principal.
- **Compra e queima em transações separadas** (lição do OTC): se a queima falhar, o token fica na carteira para a próxima rodada.

---

## 5. Estrutura de repositório sugerida (monorepo)

```
heist/
├── apps/
│   ├── web/                 # Next.js + Tailwind (site, painel, docs)
│   └── api/                 # API pública (dados do painel)
├── services/
│   ├── fee-claimer/         # TS
│   ├── swapper/             # TS (Jupiter)
│   ├── distributor/         # TS (snapshot + pagamentos)
│   ├── raffle/              # TS (missões + VRF)
│   ├── social-bot/          # TS (X, Telegram)
│   └── agent/               # TS ou Python (Claude API) — Fase 2
├── programs/                # Rust/Anchor — Fase 3 (launchpad, Passe NFT)
├── packages/
│   ├── ledger/              # SQL: migrações e acesso ao Postgres
│   ├── solana/              # helpers comuns (kit, pump-sdk, squads)
│   └── config/              # parâmetros públicos versionados (JSON)
├── research/                # Python: simulações, backtests, notebooks
├── infra/                   # Dockerfiles, docker-compose, GitHub Actions
└── docs/                    # Markdown público (estilo $POP/OTC)
```

---

## 6. Segurança mínima (não negociável)

1. **Chaves privadas e seed phrases nunca no código, no repositório nem em `.env` compartilhado.** Use um cofre de segredos.
2. **Cofre em multisig (Squads)** com pelo menos 2 de 3 assinaturas; o bot só *propõe*, humanos aprovam valores acima de um limite.
3. **Carteiras separadas:** taxas, operação, cofre, equipe.
4. **Limite diário de saída** codificado e conferido fora do bot.
5. **Auditoria** antes de qualquer programa Rust próprio receber dinheiro real.
6. **Testes obrigatórios** (do plano estratégico): compra abaixo do mínimo, transação revertida, assinatura duplicada, saldo insuficiente, prêmio acima do limite, falha de VRF, várias carteiras do mesmo dono, graduação da moeda, mudança de parâmetro.
7. **Endereços oficiais publicados só no site** e em canais verificados (contra cópias).
