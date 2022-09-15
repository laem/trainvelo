import { useContext } from 'react'
import styled from 'styled-components'
import SearchContext from './SearchContext'
import Emoji from 'Components/Emoji'
import gares from '../gares.json'

import Address from './Address'
import { filledParam } from './Results'

const SimpleButton = styled.button`
	background: none;
	border: none;
	cursor: pointer;
`

export default function Itinerary() {
	const { itinerary, setItinerary } = useContext(SearchContext)
	console.log('iti', itinerary)
	return (
		<div>
			<h1>Voyager en train</h1>
			<Address type="from" />
			{itinerary.fromStation?.length > 0 && (
				<p>
					<Emoji e="🚉" /> Gare choisie :{' '}
					{gares.find(({ uic }) => uic === itinerary.fromStation).libelle}
					&nbsp;
					<SimpleButton
						onClick={() => setItinerary({ ...itinerary, fromStation: '' })}
					>
						<Emoji e="❌" />
					</SimpleButton>
				</p>
			)}
			{filledParam(itinerary.fromStation) && <Address type="to" />}
			{itinerary.toLatitude && itinerary.fromLatitude && (
				<BikeDistance {...{ itinerary, setItinerary }} />
			)}
		</div>
	)
}

const BikeDistance = ({ itinerary, setItinerary }) => (
	<div>
		<label>
			au moins{' '}
			<ShortNumberInput
				type="number"
				onChange={(e) =>
					setItinerary({ ...itinerary, minBikeKm: e.target.value })
				}
				value={itinerary.minBikeKm}
			/>{' '}
			km à vélo
		</label>
		<br />
		<label>
			{' '}
			au maximum{' '}
			<ShortNumberInput
				type="number"
				value={itinerary.maxBikeKm}
				onChange={(e) =>
					setItinerary({ ...itinerary, maxBikeKm: e.target.value })
				}
			/>{' '}
			km à vélo
		</label>
	</div>
)

const ShortNumberInput = styled.input`
	width: 5.5rem;
`
