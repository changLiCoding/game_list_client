import "./App.css";
// import Home from "./pages/Home";
import ContextWrapper from "./ContextWrapper";
import Router from "./Router";
import Navbar from "./components/Navbar/Navbar";

function App() {
	return (
		<ContextWrapper>
			<Navbar />
			<Router />
		</ContextWrapper>
	);
}

export default App;
