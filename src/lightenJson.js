const fs = require("fs");

let rawdata = fs.readFileSync("./liste-des-gares.json");
let data = JSON.parse(rawdata);

const result = data
  .map((gare) => {
    const {
      fields: { c_geo, commune, libelle, voyageurs, departemen, code_uic },
    } = gare;

    return {
      coordonnées: c_geo,
      commune,
      libelle,
      voyageurs: voyageurs === "O",
      département: departemen,
      uic: code_uic,
    };
  })
  .filter((gare) => gare.voyageurs)
  .reduce(
    (memo, next) =>
      memo.find((gare) => gare.libelle === next.libelle)
        ? memo
        : [...memo, next],
    []
  );

fs.writeFileSync("gares.json", JSON.stringify(result));

console.log("first two results", result[1], result[2]);
