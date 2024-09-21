
export type UpdateTodoRes = {
  id: string;
  title: string;
  description: string;
  isCompleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

export async function updateTodoFunction(todo: UpdateTodoRes) {
  const baseURL = import.meta.env.VITE_API_URL;
  await fetch(`${baseURL}/todo/${todo.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: todo.title,
      description: todo.description,
      isCompleted: todo.isCompleted,
    }),
  });
}
