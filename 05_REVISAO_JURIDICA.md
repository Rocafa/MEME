# Pacote para revisão jurídica

> **Isto não é parecer jurídico.** É um resumo técnico preparado para um advogado brasileiro com experiência em mercado de capitais e criptoativos avaliar **antes de qualquer lançamento**. As referências legais abaixo indicam onde olhar, não conclusões.

## 1. O projeto em uma página ($TESOUREIRO)

- **O que é:** memecoin na Solana, lançada no pump.fun. Cada negociação paga uma taxa de criador de 0,30%.
- **Para onde vai a taxa:** 70% vira cbBTC (Bitcoin tokenizado pela Coinbase) e fica num cofre; 10% recompra e queima o próprio token; 20% cobre operação (servidores, auditoria, equipe).
- **O cofre:** carteira multisig Squads 2-de-3. Nada sai do cofre — não há regra que permita gastar, emprestar ou distribuir.
- **A "IA Tesoureira":** só propõe ações (trocar taxa por BTC, queimar). Não tem chave. Um motor de regras sem IA ("Guardião") aprova ou recusa; duas pessoas assinam.
- **O que o holder NÃO recebe:** nenhum pagamento, dividendo, rendimento, airdrop ou sorteio. Não tem direito sobre o cofre.
- **Marcos:** quando o cofre atinge 0,01 / 0,05 / 0,1 / 0,5 / 1 BTC, há uma postagem pública e, na maioria, uma queima de tokens.
- **Transparência:** todas as carteiras e transações publicadas; registro público de cada proposta, inclusive as recusadas.
- **Status:** nada foi lançado. O site mostra números simulados e rotulados como tal.

## 2. Pontos de atenção

### 2.1 Valor mobiliário (risco principal)

- **Referência:** Lei 6.385/1976, art. 2º, IX (contrato de investimento coletivo) e **Parecer de Orientação CVM nº 40/2022**, sobre criptoativos.
- **Por que preocupa:** o cofre crescente, a recompra/queima e os marcos podem ser lidos como "expectativa de benefício econômico decorrente do esforço de terceiros" (a equipe), mesmo sem distribuição.
- **O que já foi feito para reduzir:** nenhuma distribuição a holders; nenhuma promessa de retorno; avisos de risco em todas as páginas; textos dizendo que o cofre não lastreia o preço.
- **Pergunta:** com essa estrutura, o token se enquadra como contrato de investimento coletivo? A recompra/queima muda a análise? E os marcos com queima?

### 2.2 Sorteios e jogos de azar

- **Referência:** Decreto-Lei 3.688/1941 (LCP), arts. 50 e 51; Lei 5.768/1971 (distribuição gratuita de prêmios mediante autorização, só para pessoa jurídica).
- **Situação:** a ideia original de sortear itens entre holders **foi descartada** por esse motivo. Nenhuma moeda do plano tem sorteio.
- **Pergunta:** "eventos votados pela comunidade" (marco de 0,5 BTC) e votações sobre a história do $HEIST têm algum risco nesse campo, desde que não haja prêmio?

### 2.3 Prestador de serviços de ativos virtuais

- **Referência:** Lei 14.478/2022 (marco legal dos criptoativos) e a regulamentação do Banco Central para prestadoras de serviços de ativos virtuais.
- **Pergunta:** operar o cofre (custódia via multisig), fazer trocas automáticas e, no futuro, um launchpad que cria tokens para terceiros caracteriza atividade que exige autorização?

### 2.4 Estrutura e responsabilidade

- Hoje não há pessoa jurídica. Os signatários da multisig seriam pessoas físicas.
- **Perguntas:** convém constituir PJ antes do lançamento? Onde? Qual a responsabilidade pessoal de cada signatário? Como tratar a fatia de 20% de operação?

### 2.5 Tributário

- Taxas de criador recebidas, trocas SOL→cbBTC e queimas geram fato gerador? Para quem (PF, PJ, "o cofre")?
- Obrigações de declaração de operações com criptoativos à Receita Federal (IN RFB 1.888/2019 e normas que a sucederam).

### 2.6 Propriedade intelectual e publicidade

- O $HEIST tem tema de "assalto" com mundo próprio. Nenhum nome, logo ou arte de jogos de terceiros (ex.: GTA/Rockstar) é usado.
- **Pergunta:** há risco de marca ou de concorrência desleal pelo tema e pelo timing (lançamento perto de grandes jogos)? Os avisos de risco do site são suficientes do ponto de vista de publicidade/consumidor?

## 3. As outras moedas do plano (só conceito, nada lançado)

| Moeda | O que faz | Ponto jurídico | Risco percebido |
|---|---|---|---|
| $HEIST | Mesmo modelo do Tesoureiro, tema de assalto, 80% ao cofre | PI do tema; sem sorteios | Médio |
| Heist Launchpad | Qualquer pessoa lança moeda; cada uma ganha cofre próprio | "Crew Pass": NFT que recebe 10% das taxas de todas as moedas → parece participação nos lucros. Plataforma que emite tokens de terceiros | **Alto** (o Crew Pass só sai com aval jurídico; senão os 10% vão ao cofre) |
| $INDEX | Tesouraria compra uma cesta de memecoins por regra pública | Parece fundo / carteira administrada | **Alto** |
| $GIVE | Parte das taxas vai para instituições de caridade | Verificação das entidades, recibos, tributação de doações | Baixo–médio |
| $BOUNTY | Taxas pagam tarefas da comunidade (memes, ferramentas) | Pagamento por trabalho: tributário e possível vínculo; votação anti-fraude | Médio |
| $NECRO | Tesouraria compra pequenas posições em moedas "mortas" | Pode parecer compra coordenada / manipulação | Médio–alto |

## 4. Perguntas objetivas para o advogado

1. O $TESOUREIRO, como descrito na seção 1, é valor mobiliário segundo o Parecer CVM 40? O que mudaria a resposta?
2. A recompra e queima com parte das taxas é problema? E queimas vinculadas a marcos do cofre?
3. Precisamos de PJ antes de lançar? Qual tipo e em que jurisdição?
4. Qual a responsabilidade pessoal dos 2–3 signatários da multisig?
5. A operação do cofre exige autorização como prestadora de serviços de ativos virtuais?
6. Como tributar as taxas recebidas e as trocas por cbBTC?
7. Eventos e votações comunitárias sem prêmio têm algum risco de LCP?
8. O Crew Pass do Launchpad é viável de alguma forma? Se não, confirmamos a remoção.
9. $INDEX é viável sem registro? Se não, descartamos.
10. Que avisos e termos de uso o site precisa ter no lançamento?

## 5. O que acompanha este documento

- Regras do Guardião (código e testes): `tesoureiro/lib/guardian.ts`, `tesoureiro/tests/guardian.test.ts`.
- Documentação pública do projeto: página `/docs` do site.
- Robô executor (modo simulação, não assina nada): `executor/`.
- Histórico de decisões e tarefas: `WORKLOG.md` e o histórico do git.
