import { useRef } from "react";
import useAddTodo from "../hooks/useAddTodo";

const TodoForm = () => {
  const { error, mutate, isLoading } = useAddTodo();

  const ref = useRef<HTMLInputElement>(null);

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>{error.message}</p>;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        mutate({
          id: 1,
          title: ref.current!.value,
          userId: 1,
          completed: false,
        });
        ref.current!.value = "";
      }}
      className="row mb-3"
    >
      <div className="col">
        <input ref={ref} type="text" className="form-control" />
      </div>
      <div className="col">
        <button className="btn btn-primary">Add</button>
      </div>
    </form>
  );
};

export default TodoForm;
