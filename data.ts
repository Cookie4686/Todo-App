import { randomUUID } from "crypto";

type Todo = {
  id: string;
  name: string;
};

export const data: Todo[] = [
  {
    id: "1",
    name: "test1",
  },
  {
    id: "2",
    name: "test2",
  },
  {
    id: "3",
    name: "test3",
  },
];

export async function addTodo(formData: FormData) {
  "use server";
  const name = formData.get("todo-name");

  if (name) {
    data.push({ id: randomUUID(), name: name.toString() });
  }
}
