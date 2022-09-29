import md5 from 'Components/md5'

const endpointUrl = 'https://query.wikidata.org/sparql'
const getQuery = (uic) => `#defaultView:ImageGrid
SELECT ?item ?itemLabel ?country ?pic WHERE {
  ?item wdt:P722 "${uic}";
    wdt:P17 ?country;
    wdt:P18 ?pic.
  SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en" }
} `

export default (uic) => {
	const query = getQuery(uic)

	const fullUrl = endpointUrl + '?query=' + encodeURIComponent(query)
	const headers = { Accept: 'application/sparql-results+json' }

	return fetch(fullUrl, { headers }).then((body) => body.json())
}

export const toThumb = (url) => {
	console.log(url)
	const paths = url.includes('FilePath/')
		? url.split('FilePath/')
		: url.split('Fichier:')
	const fileName = paths[1]
	console.log(fileName)
	const decoded = decodeURIComponent(fileName).replaceAll(' ', '_')
	const hash = md5(unescape(encodeURIComponent(decoded)))
	console.log(decoded, hash)

	return `https://upload.wikimedia.org/wikipedia/commons/thumb/${hash[0]}/${hash[0]}${hash[1]}/${decoded}/300px-${fileName}`
}
