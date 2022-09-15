import StationSearch from 'Components/StationSearch'
import SearchProvider from 'Components/SearchProvider'
import { QueryParamProvider } from 'use-query-params'
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6'
export default () => (
	<div
		css={`
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			height: 100%;
			img {
				width: 6rem;
				height: auto;
			}
		`}
	>
		<img src="/images/logo.svg" width="1" height="1" />
		<QueryParamProvider adapter={ReactRouter6Adapter}>
			>
			<SearchProvider>
				<StationSearch />
			</SearchProvider>
		</QueryParamProvider>
	</div>
)
