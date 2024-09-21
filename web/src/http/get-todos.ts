export type TodoReponse = {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

export async function getTodos(): Promise<TodoReponse[]> {
  const baseURL = import.meta.env.VITE_API_URL;
  const response = await fetch(`${baseURL}/todo`);
  const data = await response.json();

  return data;
}
