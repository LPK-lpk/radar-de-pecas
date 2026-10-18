// Base de referência cruzada. EDITE AQUI para adicionar/corrigir peças.
// Cada item de "aplicacoes" casa por marca + modelo (regex, sem acento/maiúsculas) + faixa de anos.
// ATENÇÃO: os códigos abaixo são EXEMPLOS de estrutura/ponto de partida.
// Confira sempre no catálogo oficial do fabricante antes de comprar.
window.PECAS = [
  {
    // Tipo especial: mostra óleo de fábrica, capacidade e os filtros Tecfil.
    // Códigos Tecfil ("filtros") conferidos no catálogo oficial catalogo.tecfil.com.br em 18/10/2026 para: Gol G5 1.0/1.6, Palio 1.0, Onix 1.4, HB20 1.6.
    // Óleo/litros vêm de pesquisa e podem variar por motor: confirmar no manual do proprietário.
    id: "oleo-motor",
    nome: "Óleo do motor",
    sinonimos: ["oleo", "oleo motor", "oleo do motor", "lubrificante", "troca de oleo"],
    aplicacoes: [
      {
        marca: "VOLKSWAGEN", modelo: "GOL|VOYAGE|SAVEIRO|FOX|UP", anos: [2009, 2023],
        oleo: { viscosidade: "5W-40 sintético", norma: "VW 502 00 / API SN", litros: "3,5 L (com filtro)" },
        filtros: { "Óleo": "PSL560", "Ar do motor": "ARL6096 (1.0) · ART6098 (1.6)", "Combustível": "GI50/7", "Ar-condicionado (cabine)": "ACP303", "Lubrificante 2 (TM)": "TM2" }
      },
      {
        marca: "FIAT", modelo: "UNO|PALIO|SIENA|STRADA|MOBI|ARGO", anos: [2000, 2023],
        oleo: { viscosidade: "5W-30 / 5W-40 sintético", norma: "Fiat 9.55535-S2 / API SN", litros: "3,0 a 3,5 L (com filtro)" },
        filtros: { "Óleo": "PSL55", "Ar do motor": "ARL4150 (Palio 1.0)", "Combustível": "GI04/7", "Ar-condicionado (cabine)": "ACP906 (Attractive) · ACP103 (Fire)", "Lubrificante 2 (TM)": "TM5" }
      },
      {
        marca: "CHEVROLET", modelo: "ONIX|PRISMA|COBALT|SPIN|CELTA|CORSA", anos: [2005, 2023],
        oleo: { viscosidade: "5W-30 sintético", norma: "GM dexos1 / API SN", litros: "≈3,5 L 1.4 (3,75 L no 1.0 turbo), com filtro" },
        filtros: { "Óleo": "PSL619", "Ar do motor": "ARL8830", "Combustível": "GI04/7", "Ar-condicionado (cabine)": "ACP126 (carvão: ACA126)", "Lubrificante 2 (TM)": "TM3" }
      },
      {
        marca: "HYUNDAI", modelo: "HB20|CRETA", anos: [2012, 2023],
        oleo: { viscosidade: "5W-30 sintético", norma: "API SL ou superior / ACEA A5", litros: "2,9 L (1.0) · 3,6 L (1.6) · 3,5 L (1.0 turbo)" },
        filtros: { "Óleo": "PSL818", "Ar do motor": "ARL2340", "Combustível": "GI50/7", "Ar-condicionado (cabine)": "ACP972", "Câmbio automático": "FCA1551" }
      }
    ]
  },
  {
    id: "filtro-oleo",
    nome: "Filtro de óleo",
    sinonimos: ["filtro oleo", "filtro de oleo"],
    aplicacoes: [
      {
        marca: "VOLKSWAGEN", modelo: "GOL|VOYAGE|SAVEIRO|FOX|UP", anos: [2009, 2023],
        codigos: [
          { marca: "Tecfil", codigo: "PSL560" },
          { marca: "Mann-Filter", codigo: "W 712/52" },
          { marca: "Fram", codigo: "PH 5949" },
          { marca: "Mahle", codigo: "OC 1195" }
        ]
      },
      {
        marca: "FIAT", modelo: "UNO|PALIO|SIENA|STRADA|MOBI|ARGO", anos: [2000, 2023],
        codigos: [
          { marca: "Tecfil", codigo: "PSL55" },
          { marca: "Mann-Filter", codigo: "W 610/3" },
          { marca: "Fram", codigo: "PH 6811" }
        ]
      },
      {
        marca: "CHEVROLET", modelo: "ONIX|PRISMA|COBALT|SPIN|CELTA|CORSA", anos: [2005, 2023],
        codigos: [
          { marca: "Tecfil", codigo: "PSL619" },
          { marca: "Mann-Filter", codigo: "W 67/1" },
          { marca: "Fram", codigo: "PH 6811" }
        ]
      },
      {
        marca: "HYUNDAI", modelo: "HB20|CRETA", anos: [2012, 2023],
        codigos: [
          { marca: "Tecfil", codigo: "PSL818" },
          { marca: "Mann-Filter", codigo: "HU 7005 X" },
          { marca: "Fram", codigo: "PH 11027" }
        ]
      }
    ]
  },
  {
    id: "filtro-ar",
    nome: "Filtro de ar do motor",
    sinonimos: ["filtro ar", "ar motor"],
    aplicacoes: [
      {
        marca: "VOLKSWAGEN", modelo: "GOL|VOYAGE|SAVEIRO|FOX|UP", anos: [2009, 2023],
        codigos: [
          { marca: "Tecfil", codigo: "ARL6096" },
          { marca: "Mann-Filter", codigo: "C 25 114/1" },
          { marca: "Fram", codigo: "CA 10120" }
        ]
      },
      {
        marca: "FIAT", modelo: "UNO|PALIO|SIENA|STRADA|MOBI|ARGO", anos: [2000, 2023],
        codigos: [
          { marca: "Tecfil", codigo: "ARL4150" },
          { marca: "Mann-Filter", codigo: "C 1858" },
          { marca: "Fram", codigo: "CA 9731" }
        ]
      }
    ]
  },
  {
    id: "pastilha-freio",
    nome: "Pastilha de freio dianteira",
    sinonimos: ["pastilha", "freio", "pastilha freio"],
    aplicacoes: [
      {
        marca: "VOLKSWAGEN", modelo: "GOL|VOYAGE|SAVEIRO|FOX", anos: [2009, 2023],
        codigos: [
          { marca: "Cobreq", codigo: "N-480" },
          { marca: "Fras-le", codigo: "PD/58" },
          { marca: "Bosch", codigo: "BB 0480" },
          { marca: "TRW", codigo: "GDB 1330" }
        ]
      },
      {
        marca: "FIAT", modelo: "UNO|PALIO|SIENA|STRADA", anos: [2000, 2020],
        codigos: [
          { marca: "Cobreq", codigo: "N-333" },
          { marca: "Fras-le", codigo: "PD/31" },
          { marca: "TRW", codigo: "GDB 1186" }
        ]
      }
    ]
  },
  {
    id: "vela-ignicao",
    nome: "Vela de ignição",
    sinonimos: ["vela", "ignicao"],
    aplicacoes: [
      {
        marca: "VOLKSWAGEN", modelo: "GOL|VOYAGE|SAVEIRO|FOX|UP", anos: [2009, 2023],
        codigos: [
          { marca: "NGK", codigo: "BKR6E" },
          { marca: "Bosch", codigo: "FR7DC+" },
          { marca: "Denso", codigo: "K20PR-U" }
        ]
      },
      {
        marca: "FIAT", modelo: "UNO|PALIO|SIENA|STRADA|MOBI|ARGO", anos: [2000, 2023],
        codigos: [
          { marca: "NGK", codigo: "BKR6E" },
          { marca: "Bosch", codigo: "FR7DC+" },
          { marca: "Denso", codigo: "K20PR-U" }
        ]
      }
    ]
  }
];
