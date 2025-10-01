import { createContext, useCallback, useContext, useState } from "react";
import Toast from "../components/SnackBarAlert";

// This will Follow the design pattern: Provider Design Pattern
const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
	const [open, setOpen] = useState(false);
	const [message, setMessage] = useState("");

	const showHideToast = useCallback((message) => {
		setOpen(true);
		setMessage(message);
		setTimeout(() => {
			setOpen(false);
		}, 3000);
	}, []);

	return (
		<ToastContext.Provider value={showHideToast}>
			<Toast open={open} message={message} />
			{children}
		</ToastContext.Provider>
	);
};

export const useToast = () => {
	return useContext(ToastContext);
};
