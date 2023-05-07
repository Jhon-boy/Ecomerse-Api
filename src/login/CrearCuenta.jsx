import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import '../styles/Register.css';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as  Yup from 'yup'
import 'bootstrap/dist/css/bootstrap.min.css';
import app from '../server/firebase';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import Swal from 'sweetalert2'
import { AñadirUsuario } from '../server/UserController';

// Aqui traemos la funcion que permite obtener el registro de sesiion 
const auth = getAuth(app)


export const CrearCuenta = () => {
  const [user, setUser] = useState({ nombre: '', apellido: '', telefono: '', correo: '', direccion: '', contraseña: ''});


  const initialValues = {
    usuario: '',
    apellido: '',
    email: '',
    password: '',
    telefono: '',
    direccion: ''
  }


  const registerSchema = Yup.object().shape(
    {
      usuario: Yup.string()
        .min(3, 'Usuario muy corto ')
        .required('Campo Obligatorio'),
      apellido: Yup.string()
        .required('Campo Obligatorio'),
      email: Yup.string()
        .email('Formato invalido')
        .required('Campo Obligatorio'),
      telefono: Yup.string()
        .min(10, 'Es necesario 10 numeros')
        .max(10, 'Es necesario 10 numeros')
        .required('Campo Obligatorio'),
      direccion: Yup.string()
        .required('Campo Obligatorio'),
      password: Yup.string()
        .min(5, 'Se necesita al menos 7 caracteres')
        .matches(/[0-9]/, 'Se necesita al menos un Numero')
        .matches(/[a-z]/, 'Se necesita al menos una letra [a-z]')
        .matches(/[A-Z]/, 'Se necesita al menos una letra [A-Z]')
        .required("Campo Obligatorio"),
      confirm: Yup.string()
        .oneOf([Yup.ref('password'), null], 'La contraseña debe coincidir'),
    }
  )
  // --------------------------- Funcion que permite registrar al usuario
  const CreateUser = async (e) => {
    e.preventDefault();
    const emailRef = e.target.email.value;
    const passwordRef = e.target.password.value;
    user.nombre = e.target.usuario.value;
    user.apellido = e.target.apellido.value;
    user.telefono = e.target.telefono.value;
    user.correo = e.target.email.value;
    user.direccion = e.target.direccion.value;
    user.contraseña = e.target.password.value;
    const hayCampoVacio = Object.values(user).some(valor => !valor);
    if (hayCampoVacio) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Verifique que los campos esten completos',
      })
    } else {
      try {
        createUserWithEmailAndPassword(auth, emailRef, passwordRef);
        await AñadirUsuario(user).catch(e => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se ha podido crear su Cuenta!!',
            footer: 'Intente de nuevo'
          })
        });
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Cuenta creada Correctamente',
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true
        })
        history('/');
        setUser(null);
        localStorage.setItem('credentials', auth);
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No se ha podido crear su Cuenta!!',
          footer: 'Intente de nuevo'
        })
      }
    }

  }


  //Funcion de routers para la navegacion 
  const history = useNavigate();
  const navigateTo = (path) => {
    history(path);
  }

  return (
    <div className="Registro">
      <h2 className='title'>Registrarte </h2>
      <h6 className='subtitle'>Es rápido y fácil.</h6>

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
          <Form onSubmit={CreateUser} >
            <div className='DatosP'>

              <Field
                placeholder='Nombre'
                className="form-control"
                type="text"
                id='usuario'
                name='usuario'
              />  {
                errors.usuario && touched.usuario &&
                (

                  <ErrorMessage name='usuario' className='Errores' component='div'></ErrorMessage>

                )
              }

              <Field
                type='text'
                placeholder='Apellido'
                className="form-control"
                id='apellido'
                name='apellido'
              />
              {
                errors.apellido && touched.apellido &&
                (
                  <ErrorMessage name='apellido' className='Errores' component='div'></ErrorMessage>
                )
              }
            </div>

            <div className='Datos'>
              <Field
                type='number'
                className="form-select"
                name="telefono"
                id="telefono"
                placeholder='0978454878'

              >
               
              </Field>
              <div>
              {
                  errors.telefono && touched.telefono &&
                  (
                    <ErrorMessage name='telefono' className='Errores' component='div'></ErrorMessage>
                  )
                }

              </div>

              <Field
                type='text'
                className="form-control"
                name="direccion"
                id="direccion"
                placeholder='Direccion'

              >
               
              </Field>
              <div>
              {
                  errors.direccion && touched.direccion &&
                  (
                    <ErrorMessage name='direccion' className='Errores' component='div'></ErrorMessage>
                  )
                }

              </div>


              <Field
                type='email'
                placeholder='Correo electrónico'
                className="form-control"
                id='email'
                name='email'

              />
              {
                errors.email && touched.email &&
                (
                  <ErrorMessage name='email' className='Errores' component='div'></ErrorMessage>
                )
              }

              <Field
                type='password'
                placeholder='Contraseña'
                className="form-control"
                id='password'
                name='password'

              />
              {
                errors.password && touched.password &&
                (
                  <ErrorMessage name='password' className='Errores' component='div'></ErrorMessage>
                )
              }

              <Field
                type='password'
                placeholder='Confirme password'
                className="form-control"
                id='confirm'
                name='confirm'

              />
              {
                errors.confirm && touched.confirm &&
                (
                  <ErrorMessage name='confirm' className='Errores' component='div'></ErrorMessage>
                )
              }
              {/* {errors.confirm && <p>{errors.confirm}</p>} */}

            </div>
            <div className='btn'>
              <button type='submit' className='btnRegistar'>Registrase</button>
              <br></br>
              <button className='btnVolver' onClick={() => navigateTo('/')}> Volver </button>
            </div>
          </Form>
        )
        }
      </Formik>


    </div>
  )
}
