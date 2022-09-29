import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import CityBadge from './CityBadge'

const Wrapper = styled.div`
	position: relative;
	z-index: 10;
`
const Suggestion = styled.button`
	display: block;
	width: 100%;
	padding: 0.5rem 0.6em;
	background-color: transparent;
	border: none;
	cursor: pointer;
	transition: background-color 200ms ease-out;
	&:hover,
	&:focus {
		background-color: rgba(0, 0, 0, 0.15);
	}
	span {
		font-size: 1rem;
	}
`
export default function Suggestions(props) {
	const [scrolled, setScrolled] = useState(false)

	useEffect(() => {
		setScrolled(false)
	}, [props.suggestions])

	console.log(props.suggestions)

	return (
		<Wrapper onScroll={() => setScrolled(true)}>
			{props.suggestions.map(
				(suggestion, index) =>
					(index < 10 || scrolled) && (
						<Suggestion
							key={suggestion.properties.id}
							onClick={() => {
								props.onChange(
									console.log('suggestion selected', suggestion) || suggestion
								)
							}}
							type="button"
						>
							<div>
								<div
									css={`
										display: flex;
										align-items: center;
										justify-content: space-between;
									`}
								>
									<span>{suggestion.properties.name}</span>
									<CityBadge>{suggestion.properties.city} </CityBadge>
								</div>
								<small css="display: block; text-align: right; margin-top: .4rem">
									{suggestion.properties.context}
								</small>
							</div>
						</Suggestion>
					)
			)}
		</Wrapper>
	)
}
