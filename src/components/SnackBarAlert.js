import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Alert from "@mui/material/Alert";

export default function Toast({ open, message }) {
	const action = (
		<React.Fragment>
			<IconButton size="small" aria-label="close" color="inherit">
				<CloseIcon fontSize="small" />
			</IconButton>
		</React.Fragment>
	);

	return (
		<>
			<Snackbar
				open={open}
				autoHideDuration={3000}
				message="Note archived"
				action={action}
				slotProps={{
					root: {
						role: "status",
						"aria-live": "polite",
					},
				}}
			>
				<Alert severity="success" variant="filled" sx={{ width: "100%" }}>
					{message}
				</Alert>
			</Snackbar>
		</>
	);
}
