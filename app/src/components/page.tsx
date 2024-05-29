import { api } from "~/utils/api";
import Todo from "./Todo.tsx/page";



export default function Todos() {
  const { data: todos, isLoading, isError } = api.todo.all.useQuery();
  if (isLoading) return <div>Loding Todos</div>;
  if (isError) return <div>Error Feaching Todos</div>;
  return (
    <>
      {todos?.length
        ? todos.map((todo) => {
            return <Todo key={todo.id} todo={todo} />;
          })
        : "Create Your first"}
    </>
  );
}
