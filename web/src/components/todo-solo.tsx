import { CheckSquare, Edit, Trash2, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";

interface TodoComponentParams {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  onComplete: () => void;
  onDelete: () => void;
  onUpdate: (updatedTodo: {
    id: string;
    title: string;
    description: string;
  }) => void;
}

type TodoDataUpdate = {
  title: string;
  description: string;
};

export const TodoComponent = ({
  id,
  title,
  description,
  isCompleted,
  onComplete,
  onDelete,
  onUpdate,
}: TodoComponentParams) => {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      title,
      description,
    },
  });

  const onSubmit = (data: TodoDataUpdate) => {
    const updatedTodo = {
      id,
      ...data,
    };
    onUpdate(updatedTodo);
    queryClient.invalidateQueries({ queryKey: ["todo"] });
    reset();
  };

  return (
    <div
      className={`container max-w-3xl border border-zinc-600 rounded-lg p-5 ${
        isCompleted ? "bg-green-950" : "bg-zinc-900"
      }`}
    >
      <div className="mb-2 flex justify-between">
        {isCompleted ? (
          <span className="py-1 px-4 rounded-xl bg-green-500 text-zinc-100">
            Feito
          </span>
        ) : (
          <span className="py-1 px-4 rounded-xl bg-zinc-700 text-zinc-300">
            A fazer
          </span>
        )}
        <div className="flex flex-row gap-2 items-center">
          {isCompleted ? (
            <X
              className="text-red-500 cursor-pointer hover:text-red-500/70 transition-all"
              onClick={onComplete}
            />
          ) : (
            <CheckSquare
              className="text-green-500 cursor-pointer hover:text-green-500/70 transition-all"
              onClick={onComplete}
            />
          )}

          <Dialog>
            <DialogTrigger>
              <Edit className="cursor-pointer text-zinc-400" />
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Editar Todo</DialogTitle>
              <DialogDescription>
                Atualize o título e a descrição da sua tarefa.
              </DialogDescription>
              <form onSubmit={handleSubmit(onSubmit)}>
                <input
                  id="title"
                  placeholder="Título"
                  className="border p-2 rounded mb-2 w-full"
                  {...register("title")}
                />
                <textarea
                  id="description"
                  {...register("description")}
                  placeholder="Descrição"
                  className="border p-2 rounded mb-2 w-full"
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white p-2 rounded"
                >
                  Atualizar
                </button>
              </form>
            </DialogContent>
          </Dialog>
          <Trash2
            className="text-red-500 cursor-pointer hover:text-red-500/70 transition-all"
            onClick={onDelete}
          />
        </div>
      </div>
      <div className="">
        <div className="max-w-80">
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="text-zinc-400 break-words">{description}</p>
        </div>
      </div>
    </div>
  );
};
