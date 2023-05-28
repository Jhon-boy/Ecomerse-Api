import React, { useContext, useState, useEffect } from 'react'
import { Outlet, Link } from 'react-router-dom'
import { getAuth, signOut } from "firebase/auth";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom'
import { getUsuario } from '../server/UserController';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { BsFillPersonXFill, BsSearch, BsPersonAdd } from "react-icons/bs"
import { Econtext } from '../context/Econtext';
import '../styles/Header.css'

export const Header = ({ usuario }) => {
	const auth = getAuth();
	const { active, setActive } = useContext(Econtext);
	const [emailU, setEmailU] = useState('')
	const navigate = useNavigate();
	let titlee = emailU ? ("Hola, " + emailU) : (usuario.email);
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);


	const logOut = () => {
		signOut(auth)
			.then(() => {
				localStorage.removeItem('credentials');
			}).catch((error) => {
				console.log(error);
			});
	}
	const MostrarE = async () => {
		await getUsuario(usuario.email)
			.then((user) => setEmailU(user))
			.catch((e) =>
				console('Error + ', e)
			)
		titlee = emailU ? ("Hola, " + emailU) : (usuario.email);
		console.log("GetUsuario()", emailU);
	}
	useEffect(() => {
		const timer = setTimeout(() => {
			MostrarE();
		}, 1000);

		return () => clearTimeout(timer)

	},)


	return (
		<>
			<div className="area"></div>
			<nav className="main-menu">
				<div>
					<img className='logo' src='https://1000marcas.net/wp-content/uploads/2020/01/Nokia-Logo.png' alt='logo ' />
				</div>
				<ul>
					<li>
						<p >
							<i className="fa fa-home fa-2x" style={{ color: 'white' }}></i>
							<span className="nav-text">
								<Link className='listadoH' to='/' > Home</Link>
							</span>
						</p>

					</li>

					<li>
						<p	 >
							<i className="fa fa-pencil-square-o" style={{ color: 'white' }}></i>
							<span className="nav-text">
								<Link className='listadoH' to='/admin' > Administrar</Link>
							</span>
						</p>

					</li>
					<li>
						<p >
							<i className="fa fa-list" style={{ color: 'white' }}></i>
							<span className="nav-text">
								<Link className='listadoH' to='/list' > Ver Listado</Link>
							</span>
						</p>

					</li>

					<li className="has-subnav">
						<p >
							<i className="fa fa-globe fa-2x" style={{ color: 'white' }}></i>
							<span className="nav-text">
								<Link className='listadoH' to='/contactos'>  Usuarios </Link>
							</span>
						</p>

					</li>
					<li className="has-subnav">
						<p >
							<i className="fa fa-comments fa-2x"></i>
							<span className="nav-text">
								<Link className='listadoH' to='/infoPage' >  Información </Link>
							</span>
						</p>

					</li>

					<li>
						<p >
							<i className="fa fa-book fa-2x"></i>
							<span className="nav-text">
								<div>

									<div>
										<div className='opciones'>
											<DropdownButton
												align="end"
												title={titlee}
												id="dropdown-menu-align-end"
												className=''
											>
												<Dropdown.Item eventKey="1" onClick={() => navigate('/perfil')}><BsPersonAdd />	Ver Perfil</Dropdown.Item>
												<Dropdown.Item eventKey="2" href='https://pokeapi.co'><BsSearch /> Fake Store</Dropdown.Item>
												<Dropdown.Divider />
												<button id='btnCerrar' onClick={handleShow} > <BsFillPersonXFill /> Cerrar Sesión</button>
											</DropdownButton>
										</div>
									</div>
								</div>
							</span>
						</p>
					</li>

				</ul>
			</nav>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Cerrando Sesión!</Modal.Title>
				</Modal.Header>
				<Modal.Body>¿Estas seguro de abandonar la página?</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose} style={{ background: 'red' }}>
						Cancelar
					</Button>
					<Button variant="primary" onClick={logOut} style={{ background: '#0896ba' }}>
						Si, Salir
					</Button>
				</Modal.Footer>
			</Modal>

			<Outlet />
		</>

	)
}
