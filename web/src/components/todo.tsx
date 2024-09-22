import { Plus } from "lucide-react";
import { Button } from "./buttonCuston";
import { TodoComponent } from "./todo-solo";
import { DialogTrigger } from "./ui/dialog";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getTodos, type TodoReponse } from "@/http/get-todos";
import { deleteTodo } from "@/http/delete-todo";
import { updateTodoFunction } from "@/http/update-todo";
import githublogo from "../assets/github-mark-white.svg";

const TodoListComponent = () => {
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["todo"],
    queryFn: getTodos,
    staleTime: 1000 * 60,
  });

  const mutationUpdate = useMutation({
    mutationFn: updateTodoFunction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todo"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todo"] });
    },
  });

  async function handleDeleteTodo(todoId: string) {
    deleteMutation.mutate(todoId);
  }

  const handleToggleComplete = (todo: TodoReponse) => {
    mutationUpdate.mutate({ ...todo, isCompleted: !todo.isCompleted });
  };

  const handleUpdateTodo = (updatedTodo: {
    id: string;
    title: string;
    description: string;
  }) => {
    mutationUpdate.mutate(updatedTodo);
  };

  if (!data) return null;

  return (
    <div className="mx-4 text-zinc-100 flex flex-col mt-10 mb-20 gap-4 justify-center items-center">
      <div className="flex container max-w-3xl justify-between">
        <div className="">
          <a
            className="px-4 py-2 bg-zinc-900 gap-2 flex hover:bg-zinc-900/70 rounded-xl"
            target="_blank"
            href="https://github.com/diogosarti/desafio-moshe"
          >
            <img src={githublogo} className="" width={24} alt="" />
            <span>Projeto no github</span>
          </a>
        </div>
        <DialogTrigger asChild>
          <Button size="sm">
            <Plus className="size-4" />
            Cadastrar meta
          </Button>
        </DialogTrigger>
      </div>

      {data.map((todo) => (
        <TodoComponent
          key={todo.id}
          id={todo.id}
          title={todo.title}
          description={todo.description}
          isCompleted={todo.isCompleted}
          onComplete={() => handleToggleComplete(todo)}
          onDelete={() => handleDeleteTodo(todo.id)}
          onUpdate={handleUpdateTodo} // -> Nao consigui fazer esta parte sem GPT(muito complexa)
        />
      ))}
    </div>
  );
};

export { TodoListComponent };
