import { v4 as uuidv4 } from "uuid";

export default function todosReducer(currentTodos, action) {
	switch (action.type) {
		case "ADD_Task": {
			const newTask = {
				id: uuidv4(),
				title: action.payload.newTitle,
				details: "",
				isCompleted: false,
			};

			return [...currentTodos, newTask];
		}
		case "DELETE_Task": {
			const updatedTodos = currentTodos.filter(
				(task) => task.id !== action.payload.id
			);
			return updatedTodos;
		}
		case "UPDATE_Task": {
			const updatedTodos = currentTodos.map((task) =>
				task.id === action.payload.id ? action.payload : task
			);
			return updatedTodos;
		}
		case "Toggle_Task": {
			const updatedTodos = currentTodos.map((task) => {
				return task.id === action.payload.id
					? { ...task, isCompleted: !task.isCompleted }
					: task;
			});
			return updatedTodos;
		}
		default: {
			console.error("Unknown Action " + action.type);
		}
	}
}
