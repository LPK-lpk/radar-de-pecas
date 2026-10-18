# Radar Peças – busca por placa

Painel estático: digite a **placa** e a **peça** e veja os códigos equivalentes das marcas mais usadas (Tecfil, Mann, Fram, Cobreq, NGK, Bosch…).

## Como funciona
- **Placa → veículo**: exige uma API externa (a base de placas não é pública). Configure no painel o endpoint com `{placa}`, ex.: `https://wdapi2.com.br/consulta/{placa}/SEU_TOKEN`. Fica só no `localStorage` do navegador (o token nunca vai para o repositório).
- **Alternativa grátis**: escolher marca/modelo/ano pela tabela FIPE.
- **Códigos das peças**: ficam em [`data.js`](data.js). Os valores incluídos são **exemplos** – confira em catálogos oficiais e complete/corrija a base.

## Publicar no GitHub Pages
1. Crie um repositório e suba `index.html`, `data.js` e `README.md`.
2. Settings → Pages → Branch `main` / pasta `/ (root)` → Save.
3. Acesse `https://SEU_USUARIO.github.io/NOME_DO_REPO/`.

## Adicionar peça
```js
{ id:"correia", nome:"Correia dentada", sinonimos:["correia"],
  aplicacoes:[{ marca:"FIAT", modelo:"UNO|PALIO", anos:[2000,2015],
    codigos:[{marca:"Gates", codigo:"XXXX"}] }] }
```

## Busca ao vivo no catálogo Tecfil
O painel consulta o catálogo oficial (catalogo.tecfil.com.br) e mostra todos os filtros Tecfil do veículo.
O site da Tecfil não permite leitura direta pelo navegador (CORS), então há uma "ponte":

- **Local (mais simples):** `node server.mjs` e abra http://localhost:3000 (Node 18+).
- **Online (GitHub Pages):** publique `worker.js` + `tecfil.mjs` num Cloudflare Worker (`npx wrangler deploy worker.js --name radar-tecfil`) e cole a URL em *Configurar API → Endereço da ponte*.

Sem ponte, o painel usa a base local de `data.js`.

## Como usar (sem API de placa)
1. **Veículo:** escolha na tabela FIPE (marca → modelo → ano) ou digite marca, modelo e ano.
2. **Peça:** ex. "óleo do motor", "filtro de ar", "amortecedores".
3. A placa é opcional: o link ao lado abre o Busca Placas para você descobrir o veículo.

## Aplicativo (PWA)
O painel é instalável como app: no celular, abra o endereço do GitHub Pages e use *Adicionar à tela inicial* (ou o botão **Instalar** em *Ajustes*). No computador, o Chrome/Edge mostra o ícone de instalar na barra de endereço.
Arquivos do app: `manifest.webmanifest`, `sw.js` (casco offline) e a pasta `icons/`. Dados da FIPE e da Tecfil nunca ficam em cache.
