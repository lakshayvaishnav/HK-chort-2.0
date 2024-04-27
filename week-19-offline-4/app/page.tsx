import Image from "next/image";
import revalidate1 from "./lib/actions/action1";
export default async function Home() {
  const response = await fetch("https://sum-server.100xdevs.com/todos", {
    next: { tags: ["todos"] },
  });
  const data = await response.json();
  revalidate1();
  console.log("data found from be:-");
  console.log(JSON.stringify(data));
  return (
    <div>
      {data.todos.map((todo: any) => (
        <div key={todo.id}>
          {todo.title}
          {todo.description}
        </div>
      ))}
    </div>
  );
}
