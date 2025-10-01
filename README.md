# 📝 React Todo List App

A **modern, accessible, and responsive Todo List application** built with React and Material-UI (MUI).  
This project demonstrates **best practices** in React development, including **state management with `useReducer`**, **context API for global state**, **localStorage caching**, **custom hooks**, and **UI accessibility (WCAG compliant)**.

---

## 🚀 Features

- ➕ **Add, Update, Delete tasks** easily.
- ✅ **Mark tasks as done/undone**.
- 🔍 **Filter tasks** (All | Done | Undone).
- 💾 **Persistent storage** with `localStorage`.
- 🖼️ **Material-UI design** with a modern look & feel.
- 🎨 **Custom styled scrollbar** with blue theme.
- 🔔 **Toast notifications** for user feedback.
- ♿ **Accessible (A11y)**:
  - Keyboard navigation
  - ARIA labels for buttons and dialogs
  - High contrast design
  - Screen-reader friendly
- ⚡ **Performance optimized** with `React.memo`, `useCallback`, and `useMemo`.

---

## 🛠️ Tech Stack

- **React 18** (functional components & hooks)
- **Material-UI (MUI v5)** for UI components
- **React Context API** for state sharing
- **useReducer** for task state management
- **localStorage API** for persistence
- **uuid** for unique task IDs
- **Custom Toast Context** for notifications

---

---

## 📈 Performance & Optimization

This project is carefully optimized to ensure **high performance** and **smooth rendering**:

- ⚛️ **React.memo**  
  Prevents unnecessary re-renders of `TodoList` and child components when props/state haven't changed.

- 🔄 **useReducer for State Management**  
  Centralizes all todo logic inside a reducer, keeping `TodoList` focused on UI only.  
  This avoids heavy state mutations inside the component tree and makes logic more testable.

- 🎯 **Context API with separate Providers**  
  Split into `TodosContext` (read-only state) and `SetTodosContext` (dispatcher).  
  This reduces the number of re-renders for components that only _read_ state versus those that _dispatch actions_.

- 📦 **useCallback**  
  Memoizes event handlers (`addTask`, `handleDeleteOpen`, `handleUpdateOpen`) so child components don’t receive new function references on every render.

- 🧮 **useMemo**  
  Efficiently computes filtered todos (`filteredJSX`) only when `todos` or `filter` changes, instead of recalculating on every render.

- 🔔 **ToastProvider optimization**  
  The toast context was simplified to provide only the `showHideToast` function instead of an entire object, minimizing re-renders of consumers.

- 💾 **LocalStorage syncing via useEffect**  
  Synchronizes todos with `localStorage` on changes — ensuring persistence with minimal overhead.

- 🖥️ **Pure UI Components**  
  Each component is focused on rendering UI only, while business logic stays in the reducer/context.  
  This separation improves readability, scalability, and maintainability.

---

---

## 🗂 Project Architecture

The application follows a **clean architecture** using **React Context + Reducer**.  
This ensures a clear separation between **UI**, **state management**, and **business logic**.

### Architecture Flow

```
App
└── ThemeProvider (Material UI)
└── TodosProvider (Context + Reducer)
└── ToastProvider (Context for Snackbar)
└── TodoList
├── Todo (single task card)
├── DeleteDialog (MUI Dialog)
└── UpdateDialog (MUI Dialog)
```

### Explanation

- **App**  
  Root component that sets up global providers: MUI theme, Todos, and Toast.

- **TodosProvider**  
  Holds the **reducer** and provides state + dispatch separately for optimal re-renders.

- **ToastProvider**  
  Encapsulates Snackbar logic and exposes a single `showHideToast` function for performance.

- **TodoList**  
  Responsible only for UI logic: rendering todos, handling dialogs, and filtering tasks.

- **Todo**  
  A pure component (wrapped with `memo`) for rendering individual tasks with action buttons (done, edit, delete).

- **Dialogs (Delete / Update)**  
  Controlled from `TodoList` state, handle confirmation of updates and deletions.

---

## 📂 Project Structure

```
src/
├── components/
│ ├── Todo.js # Single todo item component
│ └── TodoList.js # Main Todo list & logic
│
├── contexts/
│ ├── TodosContext.js # Todos Context (state + dispatcher)
│ └── ToastContext.js # Toast notification context
│
├── reducers/
│ └── todosReducer.js # Reducer for todos
│
├── App.js # Root component
├── index.js # Entry point
└── styles.css # Custom styles (scrollbar, etc.)
```

## Developer

**Mohanad Ayoub** [GitHub profile](https://github.com/zlmohanadlz) - [Linkedin Profile](https://www.linkedin.com/in/mohanad-ayoub-55bb29382)
