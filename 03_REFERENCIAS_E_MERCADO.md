# 03 — Referências, mercado e verificação

Resumo dos projetos estudados, do plano estratégico original e das checagens de fatos feitas por agentes de pesquisa em **4/11/2026**.

---

## 1. Projetos de referência

### $POP — popthemarket.fun
- **Tese:** "Até a IA acha que é uma bolha." Memecoin que usa a taxa de criador para shortear ações de IA na Hyperliquid.
- **Divisão:** 30% holders · 50% fundo · 20% equipe.
- **Mecânica:** rodadas de US$ 50, short 2x, stop de 20%, realização de metade em queda de 20%, trailing stop de 20% no resto. Ações escolhidas por enquete no X entre 4 de 28.
- **Backtest próprio (81.467 testes):** o stop evitou todas as liquidações, mas **a rodada média termina em −US$ 0,20 antes de funding**. O stop protege, não gera lucro.
- **Lição:** narrativa contrária forte + documentação honesta ("como o POP perde"). O ponto fraco é a economia da estratégia.

### LuckPad — luckpad.dev
- **Tese:** "Cada compra é uma rodada." Launchpad em que compras ≥ 0,1 SOL podem ganhar uma compra extra paga pelo tesouro da moeda.
- **Divisão:** taxa de criador 0,3% → 70% tesouro da moeda · 30% LuckPad.
- **Raridades:** Common +2–8% (1/25), Rare +15–40% (1/250), Epic +50–100% (1/2.500), Legendary +100–200% (1/25.000). Até 4,75× de chance após graduação.
- **Fairness:** seed secreta com hash publicado, resultado calculado depois da compra, seed revelada na rotação.
- **Lição:** gamificação visual (trevo que acende) e provably fair. O ponto fraco é o risco jurídico de prêmio aleatório.

### OTC — otcdesks.cash (o caso que funcionou)
- **Tese:** "The everything protocol." Uma máquina que transforma taxas em recompensas; os produtos mudam conforme o mercado.
- **Lançador:** moedas no pump.fun/Meteora com a taxa de criador atribuída ao protocolo. 67,5% holders (em ações tokenizadas) · 10% pote das desks · 10% recompra e queima de $OTC · 12,5% protocolo.
- **Desks:** NFT com cofre. Criar queima $OTC + 0,5 SOL. Recebe parte da receita de todos os produtos.
- **Detalhes de qualidade:** mínimo de US$ 20 para receber; curva e pool excluídos; compra e queima em transações separadas; admite erros na documentação; carteiras públicas; API aberta.
- **Lição:** pensar em **máquina**, não em moeda; ter um mecanismo de queima pago pelo usuário; regras irreversíveis desde o primeiro dia.

---

## 2. O plano estratégico original (`fonte/plano_estrategico_memecoins_POP_LuckPad.md`)

Pontos que guiaram a hierarquia:

| Tema | O que o plano diz |
|---|---|
| Mercado | Categoria de memecoins ~US$ 27,7 bi de market cap e ~US$ 1,49 bi de volume em 24h (CoinGecko, 4/11/2026) |
| Sobrevivência | 3,9 mi de tokens lançados no pump.fun de 22/07 a 31/10/2026, só **2,78%** graduaram; **79%** não negociam depois do 1º dia; ~**4%** ainda negociam após 7 dias |
| Custo de criação | pump.fun ~0,0072 SOL; Raydium LaunchLab e LetsBonk ~0,0206 SOL; StonkFun ~0,0091 SOL (só rent, sem marketing nem liquidez) |
| Casos recentes | FTR, Dacity, DOPE, Claudia, Veil, GATO etc.: volume alto, mas 7 de 10 estavam 61%–93% abaixo da máxima semanal |
| Critério de sucesso | Separar pico de atenção, qualidade de mercado, retenção e resultado econômico verificável |
| $POP | Lançar marca + painel primeiro; shorts só depois de backtest líquido positivo, parecer jurídico e auditoria |
| LuckPad | MVP mais direto, mas sorteio com prêmio é o maior risco; começar por testnet e simulador |
| Estratégia geral | **Não lançar dois projetos ao mesmo tempo.** Vantagem competitiva = transparência verificável e execução disciplinada |
| Comunicação | Nunca "lucro garantido", "renda passiva", "sem risco"; diferenciar ativo, beta e planejado |

---

## 3. Snapshot do mercado (DexScreener, 4/11/2026)

Dados da API pública. A busca retorna até ~30 pares por termo, então é amostra, não o mercado inteiro.

| Tema | Exemplos (volume 24h · market cap · variação 24h) | Leitura |
|---|---|---|
| **GTA / Vice City** | GATO US$ 2,98 mi · US$ 10,2 mi · −16,7% · GTA6 US$ 1,48 mi · US$ 11,4 mi · −13,6% · Dacity US$ 1,98 mi · US$ 6,7 mi · −8,4% · WASTED US$ 0,88 mi · US$ 0,85 mi | Tema mais forte agora. As estabelecidas seguem negociando; **as cópias criadas de 2 a 4/11 caíram 95%+** |
| **Ações tokenizadas (xStocks)** | SPYx US$ 2,78 mi · NVDAx US$ 1,89 mi · TSLAx US$ 1,56 mi · AAPLx US$ 0,89 mi | Liquidez real; base do modelo OTC |
| **BTC rewards** | Uma moeda "BTC rewards for holding": US$ 1,2 mi · US$ 11,9 mi · +34% | O formato existe e tem tração |
| **Agentes de IA** | Three (marketplace de agentes, x402/USDC): US$ 46 mil · US$ 0,67 mi · +35% | Ativo, mas pequeno na Solana agora; Oak Agent Kit está na Robinhood Chain |
| **Política / meme** | Midturds, Pooliticians (post do Toly), Groypers | Ligado às eleições de meio de mandato nos EUA; sem números confiáveis na busca |
| **Animais virais** | TOPAN (filhote de tigre), TITO (zoológico de Omaha) | Ciclo de sempre: viraliza → moeda em minutos |

---

## 4. Verificação de fatos (agentes de pesquisa, 4/11/2026)

### 4.1 Técnico

| Afirmação | Resultado | Correção / detalhe |
|---|---|---|
| `@pump-fun/pump-sdk` com fee sharing | ✅ Confirmado (v4.3.1) | Funções `createFeeSharingConfig`, `updateFeeSharesV2`, `revokeFeeSharingAuthority`. Fee sharing desde 9/1/2026, até 10 carteiras |
| Divisão "irreversível" | ⚠️ Incerto | Relato de que admins de CTO ainda mudam divisões após revogar. Conferir no programa |
| Taxa de criador "0,30% a 0,95% por faixa" | ❌ Desatualizado | Desde jan/2026: ~1,25% total na curva, **0,30% para o criador** e 0,95% para o protocolo. As faixas eram do Dynamic Fees V1 |
| cbBTC na Solana via Jupiter | ✅ Confirmado | Mint `cbbtcf3aa214zXHbiAZQwf4122FBYbraNdFqgw4iMij`, 8 decimais, **tem freeze authority (Coinbase)**, ~76 mil holders |
| WBTC e zBTC na Solana | ✅ Confirmado | Há cópias falsas com os mesmos nomes; fixar mints |
| Squads multisig | ✅ `@sqds/multisig` v2.1.4 (programa v4) | — |
| Switchboard / ORAO VRF | ✅ `@switchboard-xyz/on-demand` v3.10.6 · `@orao-network/solana-vrf` v0.9.1 | — |
| Metaplex Core + Umi | ✅ umi v1.6.0 · mpl-core v1.10.0 | — |
| Meteora DBC / Raydium LaunchLab | ✅ SDKs disponíveis | — |
| Jupiter Swap / Ultra API | ❌ Parcialmente errado | **Swap API V2** (`api.jup.ag/swap/v2`), exige `x-api-key`. Ultra V1 descontinuada; `lite-api` será desligado |
| `@solana/kit` recomendado | ✅ v8.6.0 | `@solana/web3.js` v3 (out/2026) é ponte de migração; `npm latest` instala a v3 |
| Anchor | ⚠️ Atualizado | **Anchor 1.x** (`anchor-lang` 1.2.2); cliente TS `@anchor-lang/core` |
| Helius | ✅ `helius-sdk` v3.4.0 | — |
| Hyperliquid SDK e HIP-3 | ✅ `hyperliquid-python-sdk` v0.24.0; HIP-3 desde 13/10/2025 | Perps de ações liquidam em stablecoin |
| xStocks | ✅ Existem | AAPLx é Token-2022; existe AAPLx falso no pump.fun |

### 4.2 Jurídico e evento

| Afirmação | Resultado | Detalhe |
|---|---|---|
| GTA VI em 19/11/2026, só PS5 e Xbox | ✅ Confirmado | Sem PC anunciado. US$ 79,99 (Standard) e US$ 99,99 (Ultimate). Sem preço oficial em reais |
| Rockstar/Take-Two contra memecoins | ⚠️ Parcial | Sem processo de marca conhecido contra memecoin, mas a Take-Two é muito agressiva com marcas e usou intimação DMCA contra o vazador ligado à memecoin CYBERLEEK |
| Sorteio exige autorização | ✅ Com correção | Órgão: **SPA/MF**. Base: Lei 5.768/71, Decreto 70.951/72, **Portaria SEAE/ME 7.638/2022**. **Só pessoa jurídica.** Sanções: Portaria SPA/MF 1.818/2026. Participação precisa ser gratuita |
| Sorteio que exige comprar o token | ⚠️ Risco alto | Sai da Lei 5.768 e tende a cair na **LCP art. 51** (loteria não autorizada) e **art. 50** (jogo de azar). A Lei 14.790/2023 (bets) não legaliza rifas. O STF julga o art. 50, mas ele segue em vigor |
| Recompensas a holders e CVM | ✅ Confirmado | **Parecer CVM 40/2022:** distribuir BTC a holders a partir de receita tende a caracterizar contrato de investimento coletivo, mesmo que o BTC em si não seja valor mobiliário |
| Marco legal | ✅ | Lei 14.478/2022 (crime de fraude com ativos virtuais, art. 171-A do Código Penal); Resoluções BCB 519/520/521 (PSAVs) em vigor desde 2/2/2026 |
| SEC e memecoins | ✅ | Declaração da SEC (27/02/2025): memecoins "típicas" não são valores mobiliários, mas **não vale** para tokens que pagam recompensas a holders |
| Fiscalização no Brasil | ✅ | Casos com tokens: $EIKE (2025, multa diária de R$ 100 mil), 11 tokens do Mercado Bitcoin (2025, revogado), OnilX (2026), Bluebenx |

### 4.3 Os 5 cuidados práticos (resumo jurídico)

1. **Recompensa em BTC a holders é o maior risco** (Parecer CVM 40). Antes de ativar: parecer de advogado de mercado de capitais, ou reestruturar (cofre que só acumula e queima).
2. **Não fazer sorteio que exija comprar ou segurar o token.** Sorteio promocional só gratuito, por pessoa jurídica e com autorização prévia da SPA/MF.
3. **Não usar "GTA", "Grand Theft Auto", "Vice City", logos nem trechos de vídeo.** Nome e arte próprios + aviso de "sem afiliação".
4. **Nada de promessa de retorno ou marketing de investimento.** Pode configurar fraude (art. 171-A do CP).
5. **Formalizar:** pessoa jurídica, declarar cripto à Receita (IN RFB 1.888/2019), converter por exchange autorizada pelo BC (PSAV), guardar registros de KYC e da origem dos recursos.

> Isto é pesquisa, não parecer jurídico. Antes de lançar, consulte um advogado.

---

## 5. Fontes

**Projetos:** [popthemarket.fun/docs](https://popthemarket.fun/docs) · [luckpad.dev](https://luckpad.dev/) · [otcdesks.cash/docs](https://otcdesks.cash/docs)

**Mercado:** [DexScreener API](https://api.dexscreener.com/token-boosts/top/v1) · [CoinGecko Meme](https://www.coingecko.com/en/categories/meme-token) · [PumpData](https://pumpdata.fun/research/pump-fun-launch-to-graduation) · [Bitquery](https://bitquery.io/investigations/solana-launchpad-year) · [Jumpbit](https://jumpbit.io/en/resources/research/pump-fun-statistics-launches-graduation-rate-survival) · [DexTrading](https://dextrading.com/academy/hottest-solana-meme-coins-on-dex-this-week) · [Perpys HIP-3](https://perpys.com/markets/) · [Koinpark](https://www.koinpark.com/blog/basics/solana-memecoin-tickers)

**Técnico:** [The Block — pump.fun fees](https://www.theblock.co/news/markets/2026-01-09-pump-fun-overhauls-creator-fees-token-launches-highest-daily-september-384975) · [Cointelegraph — fee sharing e CTO](https://cointelegraph.com/news/pumpfun-revamps-creator-fees-fee-sharing-cto-controls) · [Jupiter changelog](https://dev.jup.ag/changelog) · [Jupiter docs](https://developers.jup.ag/docs/ultra/get-order) · [Solana Compass — web3.js v3](https://solanacompass.com/news/solana-foundation-announces-at-solanaweb3js-v3-a-kit-based-rebuild-of-the-classic-javascript-api-with-a-new-wallet-adapter) · [crates.io anchor-lang](https://crates.io/crates/anchor-lang) · [Nansen — HIP-3](https://nansen.ai/post/what-is-hip-3-hyperliquid)

**Jurídico e evento:** [Push Square — preço GTA 6](https://www.pushsquare.com/news/2026/06/gta-6-confirmed-to-be-an-usd80-game) · [Tech Insider — GTA 6 19/11](https://tech-insider.org/gta-6-launch-nov-19-79-99-whats-confirmed-2026/) · [CYBERLEEK subpoena](https://pasqualepillitteri.it/en/news/12599/gta-6-cyberleek-memecoin-leak-take-two-subpoena) · [GamesRadar — Take-Two marcas](https://www.gamesradar.com/gta-parent-company-take-two-reportedly-went-after-it-takes-twos-trademark) · [Cescon Barrieu — promoções](https://cesconbarrieu.com.br/portaria-promocoes-comerciais/) · [Mattos Filho — promoções](https://www.mattosfilho.com.br/unico/promocoes-comerciais-pontos-de-atencao/) · [Machado Meyer — jogos de azar](https://www.machadomeyer.com.br/pt/inteligencia-juridica/publicacoes-ij/penal-empresarial/decisao-do-stf-e-projeto-de-lei-aprovado-na-camara-do-deputados-podem-sacramentar-a-descriminalizacao-dos-jogos-de-azar-no-brasil) · [LCP art. 50](https://www.legjur.com/legislacao/art/DCL_00036881941-50) · [Mattos Filho — Parecer CVM 40](https://www.mattosfilho.com.br/?p=89671) · [Machado Meyer — BCB ativos virtuais](https://www.machadomeyer.com.br/pt/inteligencia-juridica/publicacoes-ij/bancario-seguros-e-financeiro-ij/bcb-regulamenta-o-mercado-de-ativos-virtuais-no-brasil) · [NatLawReview — SEC memecoins](https://natlawreview.com/article/sec-staff-issues-statement-meme-coins) · [Money Times — $EIKE](https://www.moneytimes.com.br/cvm-emite-alerta-sobre-operacao-irregular-do-token-de-eike-batista-e-tira-site-do-ar-rens/) · [Band — OnilX](https://www.band.com.br/band-parana/noticias/cvm-limita-stop-order-e-atende-parcialmente-onilx-202604101638)
