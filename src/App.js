import "./App.css";
import TodoList from "./components/TodoList";
import { createTheme, ThemeProvider } from "@mui/material";
import TodosProvider from "./contexts/TodosContext";
import { ToastProvider } from "./contexts/ToastContext";

const theme = createTheme({
	typography: {
		fontFamily: "Inter, Roboto",
	},
});

function App() {
	// Toast Function

	return (
		<ThemeProvider theme={theme}>
			<TodosProvider>
				<ToastProvider>
					<div className="app">
						<TodoList />
					</div>
				</ToastProvider>
			</TodosProvider>
		</ThemeProvider>
	);
}

export default App;
