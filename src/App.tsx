import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import TodoListRQ from "./components/TodoListRQ";

function App() {
  return (
    <div>
      <h1>React Query Demo</h1>
      <TodoForm />
      <TodoListRQ />
    </div>
  );
}

export default App;
