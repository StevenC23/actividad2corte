import React, { useState } from "react";

import { Button } from "reactstrap";

const Todo = ({
  todo,
  onCompleteTodo,
  onOpenModal: handleOpenModal,
  onRemove: handleRemoveTodo,
}) => {
  const [isCompleted, setIsCompleted] = useState(todo.isCompleted);

  const handleOnChange = (e) => {
    setIsCompleted(e.target.checked);
    onCompleteTodo(!isCompleted);
  };

  return (
    <>
      <tr>
        <td>
          <h3>{todo.text}</h3>
        </td>
        <td>
          <input
            type="checkbox"
            value={isCompleted}
            onChange={handleOnChange}
          />
        </td>
        <td className="buttons">
          <Button
            className="btn-delete"
            onClick={() => handleRemoveTodo(todo.id)}
          >
            X
          </Button>
          <Button className="btn-edit" onClick={() => handleOpenModal(todo)}>
            E
          </Button>
        </td>
      </tr>
    </>
  );
};

export default Todo;
