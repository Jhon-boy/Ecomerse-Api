//Rutas 
import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'

//Importando los componentes navegables

import { Header } from './componets/Header';

import { Login } from './login/Login';
import { CrearCuenta } from './login/CrearCuenta';
import { Error } from './pages/Error';
import { ProductoDetalle } from './componets/ProductoDetalle';
import { Contactos } from './pages/Contactos';
import { ProtectedRoute } from './Router/ProtectRoute';
import { Home } from './pages/Home';
//Funciones de Firebase 
import app from './server/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { Crud } from './componets/Crud';
import { ListaProductos } from './componets/ListaProductos';
import { CrearProduct } from './componets/CrearProduct';


const auth = getAuth(app);


function AppRouter() {
    const [usuario, setUsuario] = React.useState(null);
    onAuthStateChanged(auth, (usuarioFirebase) => {
        if (usuarioFirebase) {
            setUsuario(usuarioFirebase);
        } else {
            setUsuario(null);
        }
    });

    useEffect(() => {
        onAuthStateChanged(auth, (usuarioFirebase) => {
            if (usuarioFirebase) {
                setUsuario(usuarioFirebase);
            } else {
                setUsuario(null);
            }

        }
        );
    });


    return (
        <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<CrearCuenta />} />
            <Route>
                <Route element={<ProtectedRoute usuario={usuario} />}>
                    <Route path='/' element={<Header usuario={usuario} />} >
                        <Route index element={<Home />} ></Route>
                        <Route path='/admin' element={<Crud />} ></Route>
                        <Route path='/list' element={<ListaProductos />} ></Route>
                        <Route path='/addProduct' element={<CrearProduct />} ></Route>
                        <Route path='/contactos' element={<Contactos />} ></Route>
                        <Route path='producto/:id' element={<ProductoDetalle />} />
                    </Route>
                </Route>
            </Route>
            <Route path='*' element={<Error />} />
        </Routes>
    )
}
export default AppRouter;