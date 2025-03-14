"use client";

import { TrashIcon } from "@heroicons/react/24/outline";
import { ActionDispatch, useReducer, useRef } from "react";

type Todo = {
  id: string;
  name: string;
};

export default function Todo() {
  function reducer(
    data: Todo[],
    action: { type: "add"; name: string } | { type: "delete"; id: string },
  ) {
    switch (action.type) {
      case "add": {
        return [
          ...data,
          {
            id: window.crypto.randomUUID(),
            name: action.name,
          },
        ];
      }
      case "delete": {
        return data.filter((e) => e.id != action.id);
      }
      default:
        return data;
    }
  }

  const [data, dispatchData] = useReducer(reducer, []);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col items-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatchData({ type: "add", name: inputRef.current?.value || "" });
          if (inputRef.current) inputRef.current.value = "";
        }}
      >
        <input
          className="rounded-sm border border-emerald-100 px-4 py-2 focus:outline-emerald-300"
          type="text"
          name="body"
          id="todo-name"
          placeholder="What todo..."
          ref={inputRef}
        />
      </form>
      <ul className="grid grid-cols-[repeat(auto-fit,16rem)] justify-center gap-4 py-4">
        {data.map((e) => (
          <Card {...e} key={e.id} dispatch={dispatchData} />
        ))}
      </ul>
    </div>
  );
}

function Card({
  id,
  name,
  dispatch,
}: Todo & {
  dispatch: ActionDispatch<
    [action: { type: "add"; name: string } | { type: "delete"; id: string }]
  >;
}) {
  return (
    <li className="flex w-3xs justify-between rounded-md border border-cyan-200 p-4">
      <div className="w-4/5 overflow-hidden">{name}</div>
      <div className="flex justify-end">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            dispatch({ type: "delete", id });
          }}
        >
          <button className="cursor-pointer">
            <TrashIcon width="1rem" height="1rem" />
          </button>
        </form>
      </div>
    </li>
  );
}
