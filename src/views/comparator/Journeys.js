//TODO what's this 000Z missing ?
const toDate = (navitiaDate) =>
  new Date(
    (navitiaDate + ".000Z").replace(
      /^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})(\.\d{3}Z)$/,
      "$1-$2-$3T$4:$5:$6$7"
    )
  );

const toMinutes = (d1, d2) =>
  Math.round((toDate(d1) - toDate(d2)) / (1000 * 60));

export const JourneySummary = ({ data }) => {
  const first = data[0];

  return (
    <div>
      <div>{data.length}</div>
      <div>
        {toMinutes(first.arrival_date_time, first.departure_date_time)} minutes
      </div>
    </div>
  );
};
