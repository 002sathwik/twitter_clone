import type { Todo } from "~/types";
import React from "react";

type TodoProps = {
  todo: {
    id: string;
    text: string;
    done: boolean;
  };
};

export default function Todo({ todo }: TodoProps) {
  const { id, text, done } = todo;
  return (
    <div>
      <p>
        {text} - {done ? "Done" : "Not Done"}
      </p>
    </div>
  );
}
