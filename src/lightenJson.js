const fs = require("fs");

let rawdata = fs.readFileSync("./liste-des-gares.json");
let data = JSON.parse(rawdata);

const result = data
  .map((gare) => {
    const {
      fields: { c_geo, commune, libelle, voyageurs, departemen },
    } = gare;

    return {
      coordonnées: c_geo,
      commune,
      libelle,
      voyageurs: voyageurs === "O",
      département: departemen,
    };
  })
  .filter((gare) => gare.voyageurs);

fs.writeFileSync("gares.json", JSON.stringify(result));

console.log(result[1], result[2]);
