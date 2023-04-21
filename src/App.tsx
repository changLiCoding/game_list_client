import "./App.css";
import Home from "./pages/Home";
import ContextWrapper from "./ContextWrapper";

function App() {
	return (
		<ContextWrapper>
			<div className='App'>
				<p>Hello World</p>
				<Home />
			</div>
		</ContextWrapper>
	);
}

export default App;
