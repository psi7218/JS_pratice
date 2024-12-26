import * as S from "../styles/styles";
import TodoItem from "./todoItem";
import { useDragAndDrop } from "../hooks/useDragAndDrop";
import Vertical from "./vertical";
import Searchbar from "./Searchbar";
import { useTodos } from "../hooks/useTodos";

const TodoApp = () => {
  const {
    currentTodo,

    todos,
    setTodos,
    filter,
    setFilter,
    filteredtodos,
    setFilteredtodos,
    typing,

    currentEditingId,
    setCurrentEditingId,
    handleCurrentTodo,
    togglecheckebox,
    deleteTodo,
    addTodo,
    handleKeyword,
  } = useTodos();

  const { dragStart, dragEnter, drop } = useDragAndDrop({
    todos,
    setTodos,
    filter,
    filteredtodos,
    setFilteredtodos,
  });
  return (
    <S.Container>
      <S.Title>할 일 관리</S.Title>

      <S.InputContainer>
        <S.Input
          type="text"
          placeholder="할 일을 입력하세요"
          value={currentTodo}
          onChange={handleCurrentTodo}
        />
        <S.Button onClick={addTodo}>추가</S.Button>
      </S.InputContainer>

      <Vertical filter={filter} setFilter={setFilter} />
      <Searchbar typing={typing} handleKeyword={(e) => handleKeyword(e)} />

      {filteredtodos.map((todo, index) => {
        return (
          <S.TodoItem
            key={index}
            draggable={true}
            onDragStart={() => dragStart(index)}
            onDragEnter={() => dragEnter(index)}
            onDragEnd={() => drop()}
            onDragOver={(e) => e.preventDefault()}
          >
            <S.Checkbox
              type="checkbox"
              checked={todo.iscompleted}
              onChange={() => togglecheckebox(todo.id)}
            />
            <TodoItem
              todo={todo}
              setTodos={setTodos}
              todos={todos}
              currentEditingId={currentEditingId}
              setCurrentEditingId={setCurrentEditingId}
            />

            <S.Button variant="delete" onClick={() => deleteTodo(todo.id)}>
              삭제
            </S.Button>
          </S.TodoItem>
        );
      })}
    </S.Container>
  );
};

export default TodoApp;
