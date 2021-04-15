const endpointUrl = "https://query.wikidata.org/sparql";
const getQuery = (uic) => `#defaultView:ImageGrid

SELECT ?item ?itemLabel ?country ?pic WHERE {
  ?item wdt:P722 "${uic}";
    wdt:P17 ?country;
    wdt:P18 ?pic.
  SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en" }

} `;

export default (uic) => {
  const query = getQuery(uic);

  const fullUrl = endpointUrl + "?query=" + encodeURIComponent(query);
  const headers = { Accept: "application/sparql-results+json" };

  return fetch(fullUrl, { headers }).then((body) => body.json());
};
