import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";

// ICONS
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { memo } from "react";
import { useTodosDispatch } from "../contexts/TodosContext";
import { useToast } from "../contexts/ToastContext";

function Todo({ todo, showDelete, showUpdate }) {
	// console.log(`Todo Rerendered From ${todo.title}`);

	const dispatch = useTodosDispatch();
	const showHideToast = useToast();

	// Event Handlers
	function handleDone() {
		dispatch({ type: "Toggle_Task", payload: todo });
		showHideToast("Task Has been Edited");
	}

	// Event Handlers
	return (
		<>
			<Card
				sx={{
					minWidth: 275,
					backgroundColor: "#283593",
					color: "white",
					marginTop: 5,
				}}
				className="task"
			>
				<CardContent>
					<Grid container spacing={2} sx={{ textAlign: "left", padding: 1 }}>
						<Grid size={{ xs: 8 }}>
							<Typography
								variant="h5"
								sx={{
									textDecoration: todo.isCompleted ? "line-through" : "none",
								}}
							>
								{todo.title}
							</Typography>
							<Typography variant="h6">{todo.details}</Typography>
						</Grid>
						<Grid
							size={{ xs: 4 }}
							display="flex"
							justifyContent="space-around"
							alignItems="center"
						>
							{/* Check Icon */}
							<IconButton
								className="icon-button"
								aria-label="Mark task as complete"
								style={{
									color: todo.isCompleted ? "white" : "#8bc34a",
									backgroundColor: todo.isCompleted ? "#8bc34a" : "white",
									border: "solid #8bc34a 3px",
								}}
								onClick={() => handleDone(todo.id)}
							>
								<CheckIcon />
							</IconButton>
							{/* Check Icon */}
							{/* Edit Icon */}
							<IconButton
								className="icon-button"
								aria-label="Edit task"
								style={{
									color: "#1769aa",
									backgroundColor: "white",
									border: "#1769aa solid 3px",
								}}
								onClick={() => showUpdate(todo)}
							>
								<EditIcon />
							</IconButton>
							{/* Edit Icon */}
							{/* Delete Icon */}
							<IconButton
								className="icon-button"
								aria-label="Delete task"
								style={{
									color: "#b23c17",
									backgroundColor: "white",
									border: "#b23c17 solid 3px",
								}}
								onClick={() => showDelete(todo)}
							>
								<DeleteIcon />
							</IconButton>
							{/* Delete Icon */}
						</Grid>
					</Grid>
				</CardContent>
			</Card>
		</>
	);
}

export default memo(Todo);
