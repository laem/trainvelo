export const getTrips = () =>
  fetch(
    "https://api.sncf.com/v1/coverage/sncf/journeys?from=stop_area:SNCF:87474007&to=stop_area:SNCF:87474270&datetime=20210423T140151",
    {
      headers: new Headers({
        Authorization: process.env.REACT_APP_SNCF_TOKEN,
      }),
    }
  ).then((body) => body.json());
