export default (fromStation, toStation) =>
	fetch(
		`https://api.sncf.com/v1/coverage/sncf/journeys?from=stop_area:SNCF:${fromStation}&to=stop_area:SNCF:${toStation}&datetime=20210502T080000`,
		{
			headers: new Headers({
				Authorization: process.env.REACT_APP_SNCF_TOKEN,
			}),
		}
	).then((body) => body.json())
