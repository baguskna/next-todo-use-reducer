import type { NextPage } from "next";
import React, { useReducer, useState } from "react";

type Todo = {
  completed: boolean;
  text: string;
};

type State = {
  todos: Todo[];
  totalTodo: number;
};

function reducer(state: State, action: any) {
  switch (action.type) {
    case "add-todo":
      return {
        todos: [{ text: action.text, completed: false }, ...state.todos],
        totalTodo: state.totalTodo + 1,
      };
    case "toogle-todo":
      return {
        todos: state.todos.map((todo: Todo, i: number) =>
          i === action.index ? { ...todo, completed: !todo.completed } : todo
        ),
        totalTodo: state.totalTodo,
      };
    default:
      return state;
  }
}

const Home: NextPage = () => {
  const [{ todos, totalTodo }, dispatch] = useReducer(reducer, {
    todos: [],
    totalTodo: 0,
  });
  const [text, setText] = useState<string>("");

  const onSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: "add-todo", text });
    setText("");
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setText(e.target.value);
  };

  const toggleCompleted = (index: number) => {
    dispatch({ type: "toogle-todo", index });
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" value={text} onChange={onInputChange} />
      </form>
      <div>Total Todo: {totalTodo}</div>
      {todos.map((todo: Todo, i: number) => (
        <div
          key={i}
          onClick={() => toggleCompleted(i)}
          style={{
            textDecoration: todo.completed ? "line-through" : "",
            cursor: "pointer",
          }}
        >
          {todo.text}
        </div>
      ))}
    </div>
  );
};

export default Home;
