interface createTodoRequest {
  title: string;
  description: string;
}

export async function createTodoFunction({ title, description }: createTodoRequest) {
  const baseURL = import.meta.env.VITE_API_URL;
  await fetch(`${baseURL}/todo`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      description,
    }),
  });
}
