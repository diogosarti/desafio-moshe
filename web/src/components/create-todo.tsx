import { X } from "lucide-react";
import { Button } from "./ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "./ui/textarea";
import { createTodoFunction } from "@/http/create-todo";
import { useQueryClient } from "@tanstack/react-query";

const createTodo = z.object({
  title: z.string().min(1, "Informe a atividade que deseja realizar"),
  description: z.string(),
});

type createTodoForm = z.infer<typeof createTodo>;

export function CreateTodo() {
  const queryClient = useQueryClient();

  const { register, handleSubmit, formState, reset } = useForm<createTodoForm>({
    resolver: zodResolver(createTodo),
  });

  async function handleCreateGoal(data: createTodoForm) {
    await createTodoFunction(data);
    queryClient.invalidateQueries({ queryKey: ["todo"] });
    reset();
  }

  return (
    <DialogContent>
      <div className="flex flex-col gap-6 h-full">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <DialogTitle>Cadastrar atividade</DialogTitle>
            <DialogClose>
              <X className="size-5 text-zinc-600" />
            </DialogClose>
          </div>
          <DialogDescription>
            Adicione atividades que você precisa realizar
          </DialogDescription>
        </div>
        <form
          className="flex-1 flex flex-col justify-between"
          onSubmit={handleSubmit(handleCreateGoal)}
        >
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <Label htmlFor="title">Qual a atividade?</Label>
              <Input
                id="title"
                autoFocus
                placeholder="Praticar exercícios, meditar, etc..."
                {...register("title")}
              />

              {formState.errors.title && (
                <p className="text-red-400 text-sm">
                  {formState.errors.title.message}
                </p>
              )}
              <Label htmlFor="description">Descrição</Label>
              <Textarea id="description" {...register("description")} />
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
  );
}
