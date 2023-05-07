import React, { useContext } from 'react'
import Table from 'react-bootstrap/Table';
import { Econtext } from '../context/Econtext';


export const ListaProductos = () => {
  const { allProducts } = useContext(Econtext);

  return (
    <div className='home'>
      <h2>Listado de productos Registrado</h2>
      <span></span>
      <Table striped bordered hover size="sm"  responsive="lg">
        <thead>
          <tr>
            <th>Id</th>
            <th>Producto</th>
            <th>Descripción</th>
            <th>Categoría</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          {
            allProducts.map(product => (
              <tr>
                <td>{product.id}</td>
                <td>{product.title}</td>
                <td>{product.description}</td>
                <td>{product.category}</td>
                <td>{product.price} $</td>
                <td></td>
              </tr>
            ))
          }

        </tbody>
      </Table>
    </div>

  )
}
