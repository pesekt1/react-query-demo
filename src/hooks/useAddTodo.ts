import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Todo } from "./useTodos";
import ApiClient from "../services/apiClient";

const useAddTodo = () => {
  const QueryClient = useQueryClient();
  const apiClient = new ApiClient<Todo>("/todos");

  return useMutation<Todo, Error, Todo>({
    mutationFn: (todo: Todo) => apiClient.post(todo),

    onSuccess: (savedTodo, newTodo) => {
      //QueryClient.invalidateQueries({ queryKey: ["todos"] });
      QueryClient.setQueryData<Todo[]>(["todos"], (todos) => [
        savedTodo,
        ...(todos || []),
      ]);
    },
  });
};

export default useAddTodo;
