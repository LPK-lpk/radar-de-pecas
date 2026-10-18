// Base de amortecedores e kits. PREENCHA conforme os catálogos oficiais (Monroe/DRiV, Cofap, Axios).
// Cada item casa por marca + modelo (regex) + faixa de anos. Deixe "" onde não houver código.
//   monroe/cofap: amortecedor dianteiro e traseiro
//   axios: kits de batente + guarda-pó (dianteiro/traseiro), COM e SEM coxim
//
// EXEMPLO DE ESTRUTURA (os códigos abaixo são fictícios, apenas para mostrar o formato):
// {
//   marca: "VOLKSWAGEN", modelo: "GOL|VOYAGE|SAVEIRO", anos: [2009, 2022], nota: "G5/G6/G7",
//   monroe: { dianteiro: "XXXXX", traseiro: "XXXXX" },
//   cofap:  { dianteiro: "XXXXX", traseiro: "XXXXX" },
//   axios:  { dianteiroComCoxim: "XXXXX", dianteiroSemCoxim: "XXXXX", traseiroComCoxim: "XXXXX", traseiroSemCoxim: "XXXXX" }
// },
window.AMORT = [
  {
    marca: "VOLKSWAGEN", modelo: "SPACEFOX|FOX|CROSSFOX|SPACECROSS", anos: [2006, 2018],
    nota: "Spacefox/Fox 1.6 8V. Códigos levantados por pesquisa no Google em anúncios de lojas (não é catálogo oficial). Monroe dianteiro SP269 é o mais citado (alguns anúncios citam SP320); Cofap traseiro pode ser GB27611 em alguns anos; Crossfox/Spacecross usam outro dianteiro Monroe (SP267).",
    monroe: { dianteiro: "SP269", traseiro: "" },
    cofap:  { dianteiro: "GP32476", traseiro: "GB27320 (ou GB27611)" },
    axios:  { dianteiroComCoxim: "", dianteiroSemCoxim: "", traseiroComCoxim: "", traseiroSemCoxim: "0441674 (1 lado: batente + coifa)" }
  },
];
