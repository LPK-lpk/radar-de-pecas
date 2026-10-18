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
];
