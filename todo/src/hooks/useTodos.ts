import { useState, useEffect } from "react";
import { todoProps } from "../types/types";

export const useTodos = () => {
  const [currentTodo, setCurrentTodo] = useState<string>("");
  const [todos, setTodos] = useState<todoProps[]>(() => {
    const temp = localStorage.getItem("todolist");
    return temp ? JSON.parse(temp) : [];
  });
  const [filter, setFilter] = useState<string>("all");
  const [filteredtodos, setFilteredtodos] = useState<todoProps[]>([]);
  const [typing, setTyping] = useState<string>("");
  const [keyword, setKeyword] = useState<string>("");
  const [currentEditingId, setCurrentEditingId] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem("todolist", JSON.stringify(todos));
  }, [todos]);
  useEffect(() => {
    const handler = setTimeout(() => {
      setKeyword(typing);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [typing]);

  useEffect(() => {
    let tempTodos = [...todos];
    if (filter === "ongoing") {
      tempTodos = tempTodos.filter((todo) => todo.iscompleted === false);
    } else if (filter === "end") {
      tempTodos = tempTodos.filter((todo) => todo.iscompleted === true);
    }

    if (keyword.trim()) {
      tempTodos = tempTodos.filter((todo) => todo.content.includes(keyword));
    }
    setFilteredtodos(tempTodos);
  }, [filter, todos, keyword]);
  const handleCurrentTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTodo(e.target.value);
  };
  const handleKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTyping(e.target.value);
  };

  const addTodo = () => {
    if (currentTodo === "") {
      return;
    }

    const newTodo = {
      iscompleted: false,
      content: currentTodo,
      id: crypto.randomUUID(),
    };
    setTodos([newTodo, ...todos]);
    setCurrentTodo("");
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const togglecheckebox = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, iscompleted: !todo.iscompleted } : todo
      )
    );
  };
  return {
    currentTodo,
    setCurrentTodo,
    todos,
    setTodos,
    filter,
    setFilter,
    filteredtodos,
    setFilteredtodos,
    typing,
    setTyping,
    keyword,
    setKeyword,
    currentEditingId,
    setCurrentEditingId,
    handleCurrentTodo,
    togglecheckebox,
    deleteTodo,
    addTodo,
    handleKeyword,
  };
};
