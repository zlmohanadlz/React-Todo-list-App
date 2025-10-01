import { createContext, useContext, useReducer } from "react";
import todosReducer from "../reducers/todosReducer";

const TodosContext = createContext([]);
const SetTodosContext = createContext(null);

export default function TodosProvider({ children }) {
	const initialState = JSON.parse(localStorage.getItem("tasks")) || [];
	const [todos, todosDispatch] = useReducer(todosReducer, initialState);
	return (
		<TodosContext.Provider value={todos}>
			<SetTodosContext.Provider value={todosDispatch}>
				{children}
			</SetTodosContext.Provider>
		</TodosContext.Provider>
	);
}

export const useTodo = () => {
	return useContext(TodosContext);
};

export const useTodosDispatch = () => {
	return useContext(SetTodosContext);
};
