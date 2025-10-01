import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

// React Hook, context and reducer
import { useCallback, useState, useMemo, memo, useEffect } from "react";
import { useTodo, useTodosDispatch } from "../contexts/TodosContext";
import { useToast } from "../contexts/ToastContext";

// Components

import Todo from "./Todo";

function TodoList() {
	const todos = useTodo();
	const dispatch = useTodosDispatch();

	// Update LocalStorage

	useEffect(() => {
		localStorage.setItem("tasks", JSON.stringify(todos));
	}, [todos]);
	// Toast configure
	const showHideToast = useToast();
	// input Task
	const [taskTitle, setTaskTitle] = useState("");
	// Filter Option
	const [filter, setFilter] = useState("all");

	const [dialogTodo, setDialogTodo] = useState({
		id: "",
		title: "",
		details: "",
	});
	// Delete States
	const [showDeleteAlert, setShowDeleteAlert] = useState(false);

	// Update States
	const [showUpdateAlert, setShowUpdateAlert] = useState(false);
	// const [dialogTodo, setDialogTodo] = useState({});

	// all Todos JSX

	const filteredJSX = useMemo(() => {
		if (filter === "all") {
			return todos;
		} else if (filter === "done") {
			return todos.filter((task) => task.isCompleted);
		} else {
			return todos.filter((task) => !task.isCompleted);
		}
	}, [todos, filter]);

	const addTask = useCallback(() => {
		dispatch({ type: "ADD_Task", payload: { newTitle: taskTitle } });
		setTaskTitle("");
		// Toast Message
		showHideToast("Task has been Added Successfully");
	}, [dispatch, taskTitle, showHideToast]);

	// Delete Dialog functions

	const handleDeleteOpen = useCallback((task) => {
		setShowDeleteAlert(true);
		setDialogTodo(task);
	}, []);

	function handleDeleteClose() {
		setShowDeleteAlert(false);
		setDialogTodo({ id: "", title: "", details: "" });
	}

	function handleConfirmDelete() {
		dispatch({ type: "DELETE_Task", payload: dialogTodo });
		setShowDeleteAlert(false);
		showHideToast("Task has been deleted Successfully");
	}

	// Update Dialog Functions
	const handleUpdateOpen = useCallback((task) => {
		setDialogTodo(task);
		setShowUpdateAlert(true);
	}, []);

	function handleUpdateClose() {
		setShowUpdateAlert(false);
		setDialogTodo({ id: "", title: "", details: "" });
	}

	function handleConfirmUpdate() {
		dispatch({ type: "UPDATE_Task", payload: dialogTodo });
		// { ...task, title: dialogTodo.title, details: dialogTodo.details }
		setDialogTodo({ id: "", title: "", details: "" });
		setShowUpdateAlert(false);
		showHideToast("Task Edit Done");
	}

	const UXKeys = (event) => {
		if (event.key === "Enter") {
			handleConfirmUpdate();
		} else if (event.key === "Escape") {
			handleUpdateClose();
		}
	};

	return (
		<>
			{/* Delete Modal */}
			<Dialog
				open={showDeleteAlert}
				onClose={handleDeleteClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
				onKeyUp={(event) => event.key === "Escape" && handleDeleteClose()}
			>
				<DialogTitle id="alert-dialog-title">
					{"Deleting Task Permanently?"}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Do you wish To delete the selected Task. You won't be able to
						retrieve it
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleDeleteClose} aria-label="Cancel delete task">
						Close
					</Button>
					<Button onClick={handleConfirmDelete} autoFocus>
						Delete
					</Button>
				</DialogActions>
			</Dialog>
			{/* Delete Modal */}
			{/* Update Modal */}
			<Dialog
				open={showUpdateAlert}
				onClose={handleUpdateClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">Editing Task</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Edit Task
					</DialogContentText>
					{/* Edit Task Title */}
					<TextField
						autoFocus
						required
						margin="dense"
						id="task-title"
						name="task Title"
						label="task Title"
						type="text"
						fullWidth
						variant="standard"
						value={dialogTodo.title}
						onChange={(event) =>
							setDialogTodo((prevTodo) => {
								return { ...prevTodo, title: event.target.value };
							})
						}
						onKeyUp={UXKeys}
					/>
					{/* Edit Task Details */}
					<TextField
						margin="dense"
						id="task-details"
						name="task Details"
						label="task Details"
						type="text"
						fullWidth
						variant="standard"
						value={dialogTodo.details}
						onChange={(event) =>
							setDialogTodo((prevTodo) => {
								return { ...prevTodo, details: event.target.value };
							})
						}
						onKeyUp={UXKeys}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleUpdateClose} aria-label="Cancel editing task">
						Close
					</Button>
					<Button onClick={handleConfirmUpdate} autoFocus>
						Edit
					</Button>
				</DialogActions>
			</Dialog>
			{/* Update Modal */}
			<Container maxWidth="sm">
				<Card sx={{ minWidth: 275, maxHeight: "93vh", overflowY: "auto" }}>
					<CardContent>
						<Typography
							sx={{ color: "text.primary", fontWeight: "bold" }}
							variant="h2"
						>
							Tasks
						</Typography>
						<Divider />
						{/* Filter Buttons */}
						<ToggleButtonGroup
							style={{ marginTop: "1.5rem" }}
							// value={alignment}
							exclusive
							aria-label="Filter Tasks"
							value={filter}
							onChange={(_, newFilter) => {
								if (newFilter !== null) setFilter(newFilter);
							}}
							color="primary"
						>
							<ToggleButton value="all" aria-label="all">
								All
							</ToggleButton>
							<ToggleButton value="done" aria-label="done">
								Done
							</ToggleButton>
							<ToggleButton value="undone" aria-label="undone">
								Undone
							</ToggleButton>
						</ToggleButtonGroup>
						{/* Filter Buttons */}
						{/* All Todos */}
						<ul aria-label="Todo list">
							{filteredJSX.map((task) => {
								return (
									<li key={task.id}>
										<Todo
											todo={task}
											showDelete={handleDeleteOpen}
											showUpdate={handleUpdateOpen}
										/>
									</li>
								);
							})}
						</ul>
						{/* All Todos */}
						{/* Input Field */}
						<Grid container spacing={2} style={{ marginTop: "1.2rem" }}>
							<Grid
								size={{ xs: 8 }}
								display="flex"
								justifyContent="space-around"
								alignItems="center"
							>
								<TextField
									id="standard-basic"
									label="Task Title"
									variant="filled"
									style={{ width: "100%" }}
									value={taskTitle}
									onChange={(event) => setTaskTitle(event.target.value)}
									onKeyUp={(event) => event.key === "Enter" && addTask()}
								/>
							</Grid>
							<Grid
								size={{ xs: 4 }}
								display="flex"
								justifyContent="space-around"
								alignItems="center"
							>
								<Button
									variant="contained"
									style={{ width: "100%", height: "100%" }}
									onClick={addTask}
								>
									Add Task
								</Button>
							</Grid>
						</Grid>
						{/* Input Field */}
					</CardContent>
				</Card>
			</Container>
		</>
	);
}

export default memo(TodoList);
