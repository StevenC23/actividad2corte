import React, { useState } from "react";
import Todo from "./Todo";
import "../App.css";
import {
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";

const Form = () => {
  const [todos, setTodos] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [todoText, setTodoText] = useState("");
  const [newTodoText, setNewTodoText] = useState("");

  const [todoToEdit, setTodoToEdit] = useState({});

  //mostrar modal
  const mostrarModal = (todo) => {
    setTodoToEdit(todo);
    setShowModal(true);
  };

  //cerrar modal
  const cerrarModal = () => {
    setShowModal(false);
  };

  //detecta el cambio de string
  const handleChange = (e) => {
    setTodoText(e.target.value);
  };

  const handleNewTodoChange = (e) => {
    setNewTodoText(e.target.value);
  };

  // Crear tarea
  const crearTarea = (e) => {
    e.preventDefault();

    if (todoText === "") {
      alert("El campo se encuentra vacio o null");
      return;
    }

    const newTodo = {
      id: todos.length + 1,
      text: todoText,
      isCompleted: false,
    };

    setTodos([...todos, newTodo]);
    setTodoText("");
  };

  const editTodo = (id, newText) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id);

    const newTodoList = [
      ...todos.slice(0, todoIndex),
      { ...todoToEdit, text: newText },
      ...todos.slice(todoIndex + 1),
    ];

    setTodos(newTodoList);
    cerrarModal();
  };

  const toggleCompleteTodo = (id, isCompleted) => {
    const todoToComplete = todos.find((todo) => todo.id === id);
    const todoIndex = todos.findIndex((todo) => todo.id === id);

    const newTodoList = [
      ...todos.slice(0, todoIndex), // mitad del array hasta el index del objeto que vamos a modificar
      { ...todoToComplete, isCompleted }, // el objeto modificado
      ...todos.slice(todoIndex + 1), // el resto del array desde el objeto que editamos
    ];

    setTodos(newTodoList);
    cerrarModal();
  };

  //borrar una tarea
  const borrarTarea = (id) => {
    const newTodoList = todos.filter((todo) => todo.id !== id);

    setTodos(newTodoList);
    cerrarModal();
  };

  return (
    <>
      <form onSubmit={crearTarea}>
        <label>Agregar tarea</label>
        <br />
        <input
          type="text"
          name="todo"
          value={todoText}
          onChange={handleChange}
        ></input>
        <button onClick={crearTarea}>Agregar</button>
      </form>
      <br />
      <Table id="tareas">
        <thead>
          <tr>
            <th>Tarea</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {todos.length > 0 ? (
            todos.map((todo) => (
              <Todo
                key={todo.id}
                todo={todo}
                onCompleteTodo={(isCompleted) =>
                  toggleCompleteTodo(todo.id, isCompleted)
                }
                onOpenModal={(todo) => mostrarModal(todo)}
                onRemove={(id) => borrarTarea(id)}
              />
            ))
          ) : (
            <tr>
          <td colSpan={3}>No hay tareas</td>
            </tr>
          )}
        </tbody>
      </Table>

      <Modal isOpen={showModal}>
        <ModalHeader>
          <div>
            <h3>Editar Tarea {todoToEdit.text}</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <label>Todo:</label>
            <input
              name="todoEdit"
              type="text"
              value={newTodoText}
              onChange={handleNewTodoChange}
            />
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button onClick={() => editTodo(todoToEdit.id, newTodoText)}>
            Editar
          </Button>
          <Button onClick={cerrarModal}>Cancelar</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default Form;
