import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Voyage from './Voyage'

export default () => (
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<Voyage />}></Route>
		</Routes>
	</BrowserRouter>
)
