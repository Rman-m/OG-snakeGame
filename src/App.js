import Router from "./routes/Router";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import theme from "./assets/style/theme";
const App = () => {
	return (
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<Router />
			</BrowserRouter>
		</ThemeProvider>
	);
};

export default App;
