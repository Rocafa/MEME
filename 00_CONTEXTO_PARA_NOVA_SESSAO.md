# 00 — Contexto para uma nova sessão

Cole o bloco abaixo como primeira mensagem numa nova sessão do Claude (Code, desktop ou web), junto com os arquivos deste pacote.

---

```
Contexto do projeto (pacote "memecoins", 4/11/2026):

Estou planejando lançar uma memecoin na Solana. Este pacote tem:
- 01_HIERARQUIA_DE_IDEIAS.md: 20 ideias pontuadas por potencial (S/A/B/C) com fichas.
- 02_STACK_E_LINGUAGENS.md: linguagens, bibliotecas verificadas, arquitetura e repositório.
- 03_REFERENCIAS_E_MERCADO.md: projetos de referência ($POP, LuckPad, OTC), snapshot do mercado
  e verificação de fatos técnicos e jurídicos.
- 04_ROADMAP_E_CHECKLISTS.md: roadmap de 15 dias (Fase 1) + 12 semanas (Fases 2-3) e checklists.
- fonte/plano_estrategico_memecoins_POP_LuckPad.md: plano estratégico original.

Decisão atual: ecossistema HEIST.
- Fase 1 (até 19/11/2026, lançamento do GTA VI): $HEIST, moeda no pump.fun com cofre público
  de cbBTC em multisig Squads, marcos de "nível de procurado" ⭐ que disparam queimas e conteúdo,
  "Dia do Golpe" em 19/11, bot que posta cada ação no X. SEM distribuição de BTC a holders e
  SEM sorteio pago nesta fase (risco CVM Parecer 40 e LCP arts. 50/51).
- Fase 2: agente de IA "$TESOUREIRO" que propõe ações dentro de regras fixas (não tem a chave).
- Fase 3: Heist Launchpad no modelo OTC (cada moeda lançada alimenta cofre próprio + queima $HEIST
  + Passe da Gangue NFT).

Regras que não mudam:
- Nada de nome, logo ou arte da Rockstar/GTA; aviso de "sem afiliação".
- Nada de promessa de lucro; FAQ "como você pode perder".
- Nada de volume falso, carteiras isca ou manipulação de bots.
- Chaves nunca em código ou .env compartilhado; cofre em multisig.
- Stack do MVP: TypeScript (bots), Next.js + Tailwind (site), PostgreSQL (livro contábil).
  Jupiter Swap API V2 (exige x-api-key), @solana/kit, @pump-fun/pump-sdk v4, @sqds/multisig.

Leia os arquivos antes de responder. Próximo passo que quero: [descreva aqui].
```

---

## Sugestões de "próximo passo" para colar no fim

- "Montar o site e o painel do cofre do $HEIST (Next.js + Tailwind), com dados simulados claramente marcados."
- "Escrever o bot da Fase 1 em TypeScript: resgate de taxa → divisão 80/20 → swap SOL→cbBTC → proposta ao Squads → post no X. Com testes."
- "Escrever a documentação pública do $HEIST no estilo do $POP/OTC, incluindo 'como você pode perder'."
- "Fazer a simulação em Python da economia do cofre em volume baixo, base e alto."
- "Criar o kit de lançamento: nome final, descrição do pump.fun, 10 posts para o X e o FAQ."
- "Detalhar a Fase 2: personalidade, regras e guardrails do agente $TESOUREIRO."

## Skill útil

Nesta máquina existe a skill **`superpowers-harvey`** (`~/.claude/skills/superpowers-harvey`). Ela tem guias de brainstorming, planos, TDD, debugging e code review para a parte técnica, e guias de vendas e copy para a parte de marketing. Peça: "use a superpowers-harvey para ...".
