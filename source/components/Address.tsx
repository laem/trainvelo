import { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'

import SearchContext from 'Components/SearchContext'
import { useDebounce } from 'use-debounce'
import Suggestions from './Suggestions'

const Input = styled.input`
	border-radius: 0.3rem;
	border: 2px solid var(--color);
	font-size: 100%;
	height: 1.8rem;
	padding: 0 0.3rem;
`

const Wrapper = styled.div`
	position: relative;
	margin: 0 0 1.5rem ${(props) => (props.type === 'from' ? '2rem' : '6rem')};
	padding: calc(0.3em + 2px) 0;
	line-height: 1.15;
`
export default function Address({ className, type }) {
	const { km, itinerary, setItinerary } = useContext(SearchContext)
	const [search, setSearch] = useState(itinerary[type])
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
		<Wrapper className={className} type={type}>
			<span>{type === 'from' ? 'depuis' : 'vers'}&nbsp;</span>
			<>
				<Input
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
							[type]: suggestion.properties.label,
							[type + 'Longitude']: suggestion.geometry.coordinates[0],
							[type + 'Latitude']: suggestion.geometry.coordinates[1],
						})
					}}
				/>
			</>
		</Wrapper>
	)
}
