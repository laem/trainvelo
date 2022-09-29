import { useContext, useEffect, useState } from 'react'

import SearchContext from './SearchContext'

import { distance, point } from '@turf/turf'
import Emoji from 'Components/Emoji'
import gares from '../gares.json'
import { Stations } from './Stations'

export const filledParam = (s) => s != null && s !== ''

export default function Results() {
	const { itinerary, setItinerary } = useContext(SearchContext)
	const [stationsFrom, setStationsFrom] = useState([])
	const [stationsTo, setStationsTo] = useState([])

	useEffect(() => {
		garesProches(gares, itinerary, 'from', setStationsFrom)
		garesProches(gares, itinerary, 'to', setStationsTo)
	}, [itinerary])

	if (!itinerary.fromLatitude || itinerary.fromLatitude === '') {
		return (
			<div>
				<p></p>
				<h3>📍 Renseignez une adresse de départ.</h3>
				<br />
				<br />
				<p>
					<Emoji size="160%">🚧</Emoji> Attention, ceci n'est qu'une ébauche de
					projet.{' '}
				</p>
				<p>
					Rendez-vous sur{' '}
					<a href="https://github.com/laem/trainvelo/releases">
						{' '}
						github.com/laem/trainvelo
					</a>{' '}
					pour participer .
				</p>
			</div>
		)
	}
	if (
		filledParam(itinerary.fromLatitude) &&
		!filledParam(itinerary.fromStation) &&
		!filledParam(itinerary.toLatitude)
	) {
		return (
			<div>
				<StationListTitle type="from" />
				<Stations
					gares={stationsFrom}
					count={6}
					onClick={(stationUIC) =>
						setItinerary({ ...itinerary, fromStation: stationUIC })
					}
				/>
			</div>
		)
	}

	console.log(
		filledParam(itinerary.fromLatitude),
		filledParam(itinerary.fromStation),
		!filledParam(itinerary.toLatitude)
	)

	if (
		filledParam(itinerary.fromLatitude) &&
		filledParam(itinerary.fromStation) &&
		!filledParam(itinerary.toLatitude)
	) {
		return (
			<div>
				<h3>📍 Saisissez votre adresse d'arrivée</h3>
			</div>
		)
	}

	if (
		filledParam(itinerary.fromLatitude) &&
		filledParam(itinerary.fromStation) &&
		filledParam(itinerary.toLatitude)
	) {
		return (
			<div>
				<StationListTitle type="to" />
				<Stations gares={stationsTo} count={3} searchTripsFor={itinerary} />
			</div>
		)
	}
}

const StationListTitle = ({ type }) => (
	<h3
		css={`
			display: flex;
			align-items: center;
		`}
	>
		<img
			src="/images/gare.svg"
			width="1"
			height="1"
			css="width: 3rem; height: auto; margin-right: .6rem"
		/>{' '}
		{type === 'from' ? 'Votre gare de départ ?' : `Votre gare d'arrivée ?`}
	</h3>
)

const garesProches = (gares, itinerary, toOrFrom, then) => {
	console.log('G', gares)
	const sortedStations = gares
		.map(
			(gare) =>
				(gare.commune === 'BREST' &&
					console.log(
						'BBBBBBBBBRRRRRR',
						gare,
						gareDistance(gare, itinerary, toOrFrom),
						itinerary,
						toOrFrom
					)) || {
					...gare,
					distance: gareDistance(gare, itinerary, toOrFrom),
				}
		)
		.filter((gare) =>
			toOrFrom === 'to'
				? gare.distance > +itinerary.minBikeKm &&
				  gare.distance < +itinerary.maxBikeKm
				: true
		)
		.sort((g1, g2) => g1.distance - g2.distance)

	const tenStations = sortedStations.slice(0, 5)

	console.log('5STATIONS', tenStations)

	var enrichedStations = []

	tenStations.map(async (station) => {
		const bikeDistance = await computeBikeDistance(
			[...station.coordonnées].reverse(),
			[itinerary[toOrFrom + 'Longitude'], itinerary[toOrFrom + 'Latitude']]
		)

		const enriched = {
			...station,
			bikeDistance: bikeDistance?.features[0].properties['track-length'],
		}

		enrichedStations = [...enrichedStations, enriched]

		then(enrichedStations)
	})

	then(tenStations)
}

const computeBikeDistance = (from, to) =>
	fetch(
		`https://brouter.de/brouter?lonlats=${from.join(',')}|${to.join(
			','
		)}&profile=trekking&alternativeidx=0&format=geojson`
	)
		.then((res) => res.json())
		.catch((e) => console.log(e))

const gareDistance = (station, itinerary, toOrFrom) => {
	const [lat, long] = station.coordonnées

	const attributeLong = toOrFrom + 'Longitude'
	const attributeLat = toOrFrom + 'Latitude'

	const A = point([
		Number(itinerary[attributeLong]),
		Number(itinerary[attributeLat]),
	])
	const B = point([long, lat])
	return distance(A, B)
}
