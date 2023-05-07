
import React, { useContext, useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import { Econtext } from '../context/Econtext';
import Button from 'react-bootstrap/Button';
import { BsTrash, BsPencilSquare } from 'react-icons/bs'
import Swal from 'sweetalert2'
import Modal from 'react-bootstrap/Modal';
import { CrearProduct } from './CrearProduct';
import { Loader } from './Loader';


export const Crud = () => {
  const { allProducts, deleteProduct, getAllProducts, carga } = useContext(Econtext);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const eliminar = async (id) => {
    Swal.fire({
      title: 'Estas seguro?',
      text: "No podras recuperar la informacion!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          deleteProduct(id)
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Producto Eliminado Correctamente',
            showConfirmButton: false,
            timer: 2500,
            timerProgressBar: true
          })
        }
        catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se ha podido eliminar el Producto!',
            footer: 'Intente de nuevo'
          });

        }
      }
    })

  }

  //----------------------------------------------------------------


  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <>
      {
        carga ? (
          <center>
            <Loader />
           
          </center>

        )
          : (
            <div className='home'>
              <div className='CrudTitle'>
                <h2>Listado de productos Registrado</h2>
                <span><Button onClick={handleShow}>Agregar Producto</Button></span>
              </div>

              <Table striped bordered hover size="sm" responsive="lg">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Producto</th>
                    <th>Categoría</th>
                    <th>Precio</th>
                    <th>  </th>
                    <th>  </th>
                  </tr>
                </thead>
                <tbody>
                  <>
                    {
                      allProducts.map(product => (
                        <tr key={product.id}>
                          <td>{product.id}</td>
                          <td>{product.title}</td>
                          <td>{product.category}</td>
                          <td>{product.price} $</td>
                          <td > <Button variant="warning" onClick={() => eliminar(product.id)}> <BsTrash /></Button></td>
                          <td> <Button variant="danger"> <BsPencilSquare /></Button>    </td>
                        </tr>
                      ))
                    }

                  </>
                </tbody>
              </Table>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Registro de Producto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <CrearProduct />
                </Modal.Body>

              </Modal>
            </div>
          )
      }

    </>



  )
}
