import React, { useState, useEffect, useContext } from 'react'
import Table from 'react-bootstrap/Table';
import { getAllUsers } from '../server/UserController';
import Form from 'react-bootstrap/Form';
import { Econtext } from '../context/Econtext';



export const Contactos = () => {
  const {carga } = useContext(Econtext);
  const [users, setUsers] = useState([]);

  const MostrarUsuarios = async () => {
    await getAllUsers()
      .then(users => setUsers(users))
      .catch(error => console.error(error))
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      MostrarUsuarios();
    }, 1000);

    return () => clearTimeout(timer)

  },)

  return (
    <>
    
      <div className='home'>
    <div style={{ display: 'flex' , justifyContent: 'space-between', marginBottom: 17}}>
       <h2>Listado de Usuarios Registrados en la Plataforma</h2>
      <img  height={78} src='https://cdn-icons-png.flaticon.com/512/9977/9977306.png' alt='usuarios'/>
    </div>
     
      <span></span>
      <Table striped bordered hover size="sm" responsive="lg">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Correo</th>
            <th typeof='password'>Contraseña</th>
            <th>Direccion</th>
            <th>Telefono</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map(user => (
              <tr>
                <td>{user.id}</td>
                <td>{user.nombre}</td>
                <td>{user.apellido}</td>
                <td>{user.correo} </td>
                <td>{user.contraseña} </td>
                <td>{user.direccion} </td>
                <td>{user.telefono}</td>
                <td> <Form>

                  <Form.Check
                    enable
                    type="switch"
                  />
                </Form></td>
              </tr>
            ))
          }

        </tbody>
      </Table>
    </div>
    </>
    
  )
}
