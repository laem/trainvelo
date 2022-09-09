import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Voyage from './Voyage'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<Voyage />}></Route>
		</Routes>
	</BrowserRouter>
)
