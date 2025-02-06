import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const Navbar = () => {

    const [store, setStore] = useState([])

    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("profesionales"); // Limpiar el listado de profesionales
        setStore({ userType: null, profesionales: [] }); // Limpiar el estado global
        window.location.href = "/";
    //     navigate("/");
    }


    return (
        <nav className="navbar navbar-expand-lg bg-transparent m-3">
            <div className="container">
                
                <div className="collapse navbar-collapse d-flex justify-content-end menu" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        {token ?
                            (
                                <li className="nav-item">
                                    <a className="btn btn-primary btn-cs" aria-current="page" onClick={() => logout()}>Cerrar Sesión</a>
                                </li>
                            ) :
                            (
                                <>
									<li>
										<Link to="/">
										<button className="btn btn-primary">Home</button>
										</Link>
									</li>
                                    <li className="nav-item">
                                        <Link to="/signup">
										<button className="btn btn-primary mx-3" >Regístrate</button>
										</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/login">
										<button className="btn btn-primary" >Inicia Sesión</button>
										</Link>
                                    </li>
                                </>
                            )
                        }
                    </ul>

                </div>
            </div>
        </nav>
    );
}; ''
