import { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'

import SearchContext from 'Components/SearchContext'
import { useDebounce } from 'use-debounce'
import Suggestions from './Suggestions'

const Wrapper = styled.div`
	position: relative;
	margin: 0 0 1.5rem ${(props) => (props.type === 'from' ? '2rem' : '6rem')};
	padding: calc(0.3em + 2px) 0;
	line-height: 1.15;
`
export default function Address(props) {
	const { km, itinerary, setItinerary } = useContext(SearchContext)
	const [search, setSearch] = useState(itinerary[props.type])
	const [debouncedSearch] = useDebounce(search, 500)
	console.log('search', debouncedSearch)

	const [suggestions, setSuggestions] = useState([])

	useEffect(() => {
		if (debouncedSearch && debouncedSearch.length > 2) {
			fetch(`https://api-adresse.data.gouv.fr/search/?q=${debouncedSearch}`)
				.then((res) => res.json())
				.then((res) => setSuggestions(res.features || []))
		} else {
			setSuggestions([])
		}
	}, [debouncedSearch])

	return (
		<Wrapper className={props.className} type={props.type}>
			<span
				dangerouslySetInnerHTML={{
					__html: `${props.type === 'from' ? 'depuis' : 'vers'}&nbsp;`,
				}}
			/>
			<>
				<input
					name={'address'}
					autoComplete="off"
					value={search}
					onChange={(e) => {
						setSearch(e.target.value)
					}}
					placeholder={'Adresse, ville, code postal'}
				/>
				<Suggestions
					suggestions={suggestions}
					onChange={(suggestion) => {
						setSearch(suggestion.place_name_fr)
						setItinerary({
							[props.type]: suggestion.properties.label,
							[props.type + 'Longitude']: suggestion.geometry.coordinates[0],
							[props.type + 'Latitude']: suggestion.geometry.coordinates[1],
						})
					}}
				/>
			</>
		</Wrapper>
	)
}
