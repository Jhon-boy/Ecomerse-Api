import React, { useEffect } from 'react';
import '../styles/login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import app from '../server/firebase';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const auth = getAuth(app)
const loginSchema = Yup.object().shape(
    {
        email: Yup.string()
            .email('Formato de Emial inválido')
            .required('Email es obligatorio'),
        password: Yup.string().required('Contraseña es obligatorio')
    }
)
const CredencialesInicial = {
    email: '',
    password: ''
}

//Props

export const Login = (props) => {

    const [usuario, setUsuario] = React.useState(null);

    const history = useNavigate();

    const navigateTo = (path) => {
        history(path);
    }
    const iniciarSesion = async (e) => {
        e.preventDefault();
        const emailRef = e.target.email.value;
        const contraseñaRef = e.target.password.value;
        try {
            await signInWithEmailAndPassword(auth, emailRef, contraseñaRef);
            localStorage.setItem('credentials', auth);
            sessionStorage.setItem('credentials', auth);
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Bienvenido',
                showConfirmButton: false,
                timer: 2500,
                timerProgressBar: true

            })
            navigateTo('/');
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Verifique correo o contraseña',
            })
        }
        //Aqui haremos la verificacion bro :3
    }
    useEffect(() => {
        onAuthStateChanged(auth, (usuarioFirebase) => {
            if (usuarioFirebase) {
                setUsuario(usuarioFirebase);
                console.log("Estamos en useeffect");
            } else {
                setUsuario(null);
            }

        }
        )
    });
    return (

        <>
            {
                usuario ?
                    navigateTo('/')
                    : <div>
                        <Formik
                            initialValues={CredencialesInicial}
                            //Yup Validaciones esquemas
                            validationSchema={loginSchema}
                            onSubmit={
                                async (values) => {
                                    await new Promise((r) => setTimeout(r, 500));
                                    // alert(JSON.stringify(values, null, 2));
                                }} >
                            {({
                                errors,
                                touched,
                                isSubmitting
                            }) => (
                                <Form onSubmit={iniciarSesion} >
                                    <center>
                                        <div className='Ingreso'>
                                            <div className="mb-3">
                                                <label className="form-label">Correo</label>
                                                <Field
                                                    className="form-control"
                                                    type="email"
                                                    id='email'
                                                    name='email'
                                                    placeholder='example@gmail.com'

                                                /> {
                                                    errors.email && touched.email &&
                                                    (

                                                        <ErrorMessage name='email' className='Errores' component='div'></ErrorMessage>

                                                    )
                                                }

                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Contraseña</label>
                                                <Field className="form-control"
                                                    type="password"
                                                    id='password'
                                                    name='password'

                                                />
                                                {
                                                    errors.password && touched.password &&
                                                    (
                                                        ( //Mostramos el error en caso de ser invalido con un DIV

                                                            <ErrorMessage name='password' className='Errores' component='div'></ErrorMessage>

                                                        )
                                                    )
                                                }
                                            </div>
                                            <button type='submit' className='btn btn-primary mb-3'>Ingresar</button>
                                            {isSubmitting ? (<p>Sending....</p>) : null}
                                            <br></br>
                                            <span className='NewCount' onClick={() => navigateTo('/register')}> ¿No tienes Cuenta? Crea una! </span>
                                        </div>
                                    </center>


                                </Form>
                            )
                            }

                        </Formik>

                        <div className='Demo'>
                            <div id='Demo1'>
                                <h5>¿No desea crear una cuenta? ¡Pruebe nuestra cuenta de demostración!</h5>
                            </div>
                            <div id='Demo2'>
                                <div>
                                    <h6>Correo:<p>demo12@gmail.com</p></h6>
                                    <h6>Contraseña: <p>Demo123</p></h6>
                                </div>

                            </div>

                        </div>

                    </div>
            }
        </>
    );
}
