import React, { useState } from 'react';
import './App.css';
import Form from './components/Form';

/* ACTIVIDAD
  - Van a habilitar la opcion de editar el todo, abre un input y edita el todo.
  - Permitir completar la tarea
  - Van a organizar el CSS a un diseño mas agradable
 */
const App = () => {

  return (
    <>
      <div className='App'>
        <div className='App-content'>
          <p>Aqui haremos nuestro TODO</p>
          <Form />
        </div>
      </div>
    </>
  );

}

export default App;
