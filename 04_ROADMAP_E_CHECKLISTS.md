# 04 — Roadmap, orçamento por categoria e checklists

Junta a recomendação do ecossistema HEIST (`01`) com o plano de 12 semanas e os critérios de go/no-go do `fonte/plano_estrategico_memecoins_POP_LuckPad.md`.

---

## 1. Duas velocidades

O plano estratégico recomenda 12 semanas com auditoria e parecer jurídico. O hype do GTA 6 fecha em **19/11/2026** (15 dias a partir de 4/11). Por isso o roadmap tem duas trilhas:

- **Trilha rápida (Fase 1, 15 dias):** só o que é simples e de baixo risco: moeda no pump.fun, cofre multisig de BTC, painel e bot social. **Sem** sorteio em dinheiro, **sem** programa Rust próprio, **sem** promessa de rendimento.
- **Trilha completa (Fases 2 e 3, 12 semanas):** agente de IA, distribuição de BTC a holders, missões e sorteios, launchpad. Segue o cronograma e os critérios de aprovação do plano estratégico.

---

## 2. Fase 1 — $HEIST (4/11 → 19/11)

| Dia | Entrega | Pronto quando |
|---|---|---|
| 4–5/11 | Nome final, ticker, identidade visual (neon, sem marca Rockstar), frase de impacto | Logo, banner e 3 memes prontos; checagem de ticker livre |
| 5–6/11 | Contas X e Telegram; postagens de aquecimento; lista de espera | Primeiros seguidores reais, sem bots |
| 6–8/11 | Multisig Squads (2 de 3) + carteira de taxas + carteira de operação | Endereços testados com valor mínimo |
| 6–10/11 | Bot: resgate de taxa → divisão 80/20 → swap SOL→cbBTC (limiar mínimo) → proposta ao multisig → post no X | Testado na devnet e depois na mainnet com valores mínimos |
| 8–11/11 | Site + painel: cofre ao vivo, ⭐ marcos, sats por 1 milhão de $HEIST, transações, docs, FAQ "como você pode perder" | Dados batem com o Solscan |
| 11–12/11 | Revisão: textos sem promessa de lucro, aviso "sem afiliação com Rockstar/Take-Two", endereços oficiais | Checklist da seção 5 marcado |
| **~12–14/11** | **Lançamento no pump.fun** com dev buy na mesma transação; contrato divulgado só no momento | Contrato publicado no site e no X |
| 14–18/11 | Operação: bot postando, primeiros marcos ⭐, conteúdo diário | Reconciliação diária sem divergência |
| **19/11** | **Dia do Golpe:** 100% da taxa do dia para o cofre | Post de resultado com links das transações |

**Linguagens da Fase 1:** TypeScript (bot), Next.js/Tailwind (site), SQL (livro contábil).

---

## 3. Fases 2 e 3 — 12 semanas (a partir de 20/11)

Adaptado do cronograma do plano estratégico:

| Semana | Entrega | Critério de saída |
|---|---|---|
| 1 | Escopo da Fase 2: agente $TESOUREIRO, distribuição de BTC, missões | Documento de requisitos aprovado |
| 2 | Modelo econômico (simulação Python: volume baixo/base/alto, sequência de prêmios, ataque Sybil) e threat modeling | Simulação reproduzível publicada |
| 3–4 | Protótipos: agente de IA (só propõe), executor de regras, painel de distribuição | Fluxos demonstráveis na devnet |
| 5–6 | MVP técnico: distribuição proporcional a holders (mínimo US$ 20), missões, VRF | Testes unitários e de integração passando |
| 7 | Simulações de odds e solvência dos sorteios | Relatório reproduzível |
| 8 | **Revisão jurídica:** sorteios (Lei 5.768/71), CVM (distribuição a holders), marca | Go/no-go jurídico por escrito |
| 9 | Auditoria de segurança (bots, chaves, qualquer programa Rust) | Sem achados críticos/altos abertos |
| 10 | Beta fechado do launchpad (Fase 3) na devnet | Testes de abuso e carga aprovados |
| 11 | Piloto limitado com valores baixos | Indicadores dentro dos limites |
| 12 | Decisão de abrir o Heist Launchpad ao público | Checklist completo |

---

## 4. Orçamento por categoria (cotar, não chutar)

O plano estratégico não fixa valor sem escopo. Categorias a cotar, com o que mínimo cada fase precisa:

| Categoria | Fase 1 | Fases 2–3 |
|---|---|---|
| Criação da moeda | ~0,0072 SOL no pump.fun (rent) + dev buy | — |
| Infra (RPC Helius, hospedagem, banco) | Planos gratuitos/iniciais | Planos pagos + monitoramento |
| X API para postar | Plano pago necessário para automação | Idem |
| Design (logo, memes) | Freelancer ou próprio | Contínuo |
| Desenvolvimento | Próprio + Claude Code | Engenheiro Solana/Rust para o launchpad |
| Jurídico | Consulta inicial recomendada | **Parecer obrigatório** antes de sorteios e distribuição |
| Auditoria | — | **Obrigatória** antes do launchpad |
| Marketing (KOLs, boosts DexScreener) | Opcional, sempre com divulgação de "pago" | Contínuo |
| Reserva para incidentes | Sim | Sim |

---

## 5. Checklist de lançamento da Fase 1

### Produto
- [ ] Proposta entendida em uma frase ("A gangue está roubando Bitcoin, um trade por vez").
- [ ] Divisão de taxas publicada e igual à configurada.
- [ ] Marcos ⭐ e regras do Dia do Golpe publicados antes do lançamento.

### Segurança
- [ ] Multisig 2 de 3 funcionando; nenhuma chave em código ou `.env` compartilhado.
- [ ] Kill switch testado.
- [ ] Reconciliação banco × on-chain rodando.
- [ ] Limite diário de saída configurado.

### Comunicação
- [ ] Nenhuma frase de "lucro garantido", "renda passiva", "sem risco".
- [ ] FAQ "como você pode perder" publicado.
- [ ] "Projeto independente, sem afiliação com Rockstar Games ou Take-Two."
- [ ] Nada de nome GTA, logo, fonte ou arte oficial.
- [ ] Contrato oficial só no site e nos canais verificados.

### Mercado
- [ ] Sem volume artificial, sem carteiras isca, sem wash trading.
- [ ] Parcerias pagas divulgadas como pagas.

---

## 6. Critérios de go/no-go das Fases 2 e 3 (do plano estratégico)

- [ ] Tokenomics simulada em cenários adversos.
- [ ] Fontes de receita e custos comprovados.
- [ ] Contratos testados e auditados.
- [ ] Multisig, kill switch e plano de incidentes publicados.
- [ ] Parecer sobre sorteios/recompensas e sobre distribuição a holders.
- [ ] Termos, privacidade, riscos e publicidade revisados.
- [ ] Restrições geográficas definidas.
- [ ] Odds e limites reproduzíveis por terceiros.
- [ ] Painel conferido com dados on-chain.

---

## 7. Métricas para acompanhar

| Métrica | Por quê |
|---|---|
| Holders únicos com saldo ≥ US$ 20 | Comunidade real, não poeira |
| Retenção 1/7/30 dias | 79% das moedas morrem no 1º dia; passar disso já é diferencial |
| Volume orgânico × suspeito | Volume de poucas carteiras engana |
| Liquidez e spread | Volume sem liquidez é armadilha de saída |
| Concentração dos 10 maiores holders | Risco de despejo |
| BTC no cofre e sats por 1 milhão de $HEIST | A métrica-símbolo do projeto |
| Divergências banco × on-chain | Deve ser sempre zero |
| Engajamento no X (posts do bot e da comunidade) | Combustível do volume |
