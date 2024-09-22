import { CheckSquare, Edit, Trash2, X } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "./ui/label";

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

const updateTodo = z.object({
  title: z.string().min(1, "Informe a atividade que deseja realizar"),
  description: z.string(),
});

type TodoDataUpdate = z.infer<typeof updateTodo>;

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
  const { register, handleSubmit, reset, formState } = useForm<TodoDataUpdate>({
    defaultValues: {
      title,
      description,
    },
    resolver: zodResolver(updateTodo),
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
              <div className="flex flex-col gap-6 h-full">
                <div className="flex items-center justify-between">
                  <DialogTitle>Editar Todo</DialogTitle>
                  <DialogClose>
                    <X className="size-5 text-zinc-600" />
                  </DialogClose>
                </div>

                <DialogDescription>
                  Atualize o título e a descrição da sua tarefa.
                </DialogDescription>
                <form
                  className="flex-1 flex flex-col justify-between"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="title">Qual a atividade?</Label>
                      <Input
                        id="title"
                        placeholder="Título"
                        className=""
                        {...register("title")}
                      />
                      {formState.errors.title && (
                        <p className="text-red-400 text-sm">
                          {formState.errors.title.message}
                        </p>
                      )}
                      <Label htmlFor="description">Descrição</Label>
                      <Textarea
                        id="description"
                        {...register("description")}
                        placeholder="Descrição"
                        className=""
                      />
                    </div>
                  </div>
                  <div className="flex flex-row items-center gap-3">
                    <DialogClose asChild>
                      <Button className="flex-1" variant="secondary">
                        Fechar
                      </Button>
                    </DialogClose>
                    <Button type="submit" className="flex-1">
                      Salvar
                    </Button>
                  </div>
                </form>
              </div>
            </DialogContent>
          </Dialog>
          <Trash2
            className="text-red-500 cursor-pointer hover:text-red-500/70 transition-all"
            onClick={onDelete}
          />
        </div>
      </div>
      <div className="">
        <div>
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="text-zinc-400 break-words">{description}</p>
        </div>
      </div>
    </div>
  );
};
