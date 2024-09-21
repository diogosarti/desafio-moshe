export async function deleteTodo(id: string) {
  const baseURL = import.meta.env.VITE_API_URL;
  await fetch(`${baseURL}/todo/${id}`, {
    method: "DELETE",
  });
}
