import React, { useState , useContext} from 'react'
import { Econtext } from '../context/Econtext';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as  Yup from 'yup'
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2'

export const CrearProduct = () => {
  const { insertProduct } = useContext(Econtext);
  const [product, setProduct] = useState({ title: '', description: '', category: '', image: '', price: '' });


  const initialValues = {
    title: '',
    description: '',
    price: '',
    image: '',
    category: ''
  }


  const registerSchema = Yup.object().shape(
    {

      title: Yup.string()
        .required('Campo Obligatorio'),
      description: Yup.string()
        .min(10, 'Es necesario caracteres')
        .required('Campo Obligatorio'),
      price: Yup.string()
        .min(1, 'Es necesario 10 numeros')
        .max(4, 'Precio no se encontrada')
        .required('Campo Obligatorio'),
      image: Yup.string()
        .required("Campo Obligatorio"),
    }
  )
  // --------------------------- Funcion que permite registrar al title
  const Createproduct = async (e) => {
    e.preventDefault();
    product.title = e.target.title.value;
    product.description = e.target.description.value;
    product.price = e.target.price.value;
    product.category = e.target.category.value;
    product.image = e.target.image.value;
    const hayCampoVacio = Object.values(product).some(valor => !valor);
    if (hayCampoVacio) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Verifique que los campos esten completos',
      })
    } else {
      try {
        insertProduct(product)
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Producto Insertado Correctamente',
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true
        })
        setProduct(null)
      }
      catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No se ha podido insertar el Producto!',
          footer: 'Intente de nuevo'
        });

      }
    }
  }



  return (
    <div>
      <div className='formCrear'>
        <Formik
          initialValues={initialValues}
          validationSchema={registerSchema}
          onSubmit={async (values) => {
            await new Promise((r) => setTimeout(r, 500));
            alert(JSON.stringify(values, null, 2));
          }}

        >
          {({
            errors,
            touched,
            values
          }) => (
            <Form onSubmit={Createproduct} >
              <h6>Nombre </h6>
              <div className='DatosP'>
                <br></br>
                <Field
                  placeholder='Nombre del Producto'
                  className="form-control"
                  type="text"
                  id='title'
                  name='title'
                />  {
                  errors.title && touched.title &&
                  (

                    <ErrorMessage name='title' className='Errores' component='div'></ErrorMessage>

                  )
                }


              </div>
              <h6>Descripcion </h6>
              <div className='DatosP'>

                <Field
                  type='text'
                  className="form-control"
                  id='description'
                  name='description'
                />
                {
                  errors.description && touched.description &&
                  (
                    <ErrorMessage name='description' className='Errores' component='div'></ErrorMessage>
                  )
                }
              </div>
              <h6>Precio </h6>
              <div className='DatosP'>

                <Field
                  type='number'
                  className="form-control"
                  name="price"
                  id="price"
                >

                </Field>
                {
                  errors.price && touched.price &&
                  (
                    <ErrorMessage name='price' className='Errores' component='div'></ErrorMessage>
                  )
                }



              </div>
              <h6>Categoría </h6>
              <div className='Datos'>

                <Field
                  as='select'
                  className="form-select"
                  aria-label="Default select example"
                  name="category"
                  id="category"
                >
                  <option value="men">Hombre</option>
                  <option value="jewelery">Joyas</option>
                  <option value="electronics">Electronics</option>
                  <option value="women">Mujer	</option>

                </Field>

              </div>
              <h6>Imagen Referencial</h6>
              <div className='Datos'>
                <Field
                  type='file'
                  className="form-control"
                  name="image"
                  id="image"

                >
                </Field>
                {
                  errors.image && touched.image &&
                  (
                    <ErrorMessage name='image' className='Errores' component='div'></ErrorMessage>
                  )
                }


              </div>
              <div className='btn'>
                <button type='submit' className='btnRegistar'>Registrar</button>
              </div>
            </Form>
          )
          }
        </Formik>
      </div>
    </div>
  )
}
