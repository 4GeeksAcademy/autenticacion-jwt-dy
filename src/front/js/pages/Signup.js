import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Signup = () => {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessages, setErrorMessages] = useState([]);
    
    const navigate = useNavigate();

    const handleCreateUser = async () => {
        const errors = [];

        // Validar cada campo
        if (!name.trim()) errors.push("Nombre");
        if (!lastName.trim()) errors.push("Apellido");
        if (!email.trim()) errors.push("Correo Electrónico");
        if (!password.trim()) errors.push("Contraseña");
        if (!confirmPassword.trim()) errors.push("Confirmar Contraseña");
        if (password && confirmPassword && password !== confirmPassword) {
            errors.push("Las contraseñas no coinciden");
        }

        if (errors.length > 0) {
            setErrorMessages(errors);
            return;
        }


        const data = {
            name: name,
            lastname: lastName,
            email: email,
            password: password,
        };

        
        try {
            const res = await fetch(process.env.BACKEND_URL + "/api/signup", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (res.ok) {
                alert("Registro Exitoso");
                console.log("Usuario agregado correctamente");
                navigate("/login"); // Redirige después de un registro exitoso
                // Resetear los campos
        setName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setErrorMessages([]);

            } else {
                const errorData = await res.json();
                throw new Error(errorData.message || "Error al registrar usuario");
            }
        } catch (error) {
            setErrorMessages([error.message]);  // Mostrar el mensaje de error a los usuarios
            console.warn(error);
        }

    };

    return (
        <div className="d-flex justify-content-center align-items-center py-3">
            <div className="form-container shadow p-4 formRegistro" style={{ width: "400px" }}>
                <h1 className="text-center mb-4 tituloJoin">Registro de Usuario</h1>
                {errorMessages.length > 0 && (
                    <div className="alert alert-danger">
                        <h5>Por favor completa los siguientes campos:</h5>
                        <ul>
                            {errorMessages.map((error, index) => (
                                <li key={index}>{error}</li>
                            ))}
                        </ul>
                    </div>
                )}
                <div className="mb-3">
                    <label>Nombre</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Ingresa tu nombre"
                        required
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                </div>
                <div className="mb-3">
                    <label>Apellido</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Ingresa tu apellido"
                        required
                        onChange={(e) => setLastName(e.target.value)}
                        value={lastName}
                    />
                </div>
                <div className="mb-3">
                    <label>Correo Electrónico</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Ingresa tu correo electrónico"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </div>
                
                
                <div className="mb-3">
                    <label>Contraseña</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Ingresa tu password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </div>
                <div className="mb-3">
                    <label>Confirmar Contraseña</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Confirma tu Contraseña"
                        required
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        value={confirmPassword}
                    />
                </div>
                <div className="d-flex justify-content-between align-items-center">
                    <Link to="/" className="btn btn-primary btnVolver text-light">Volver</Link>
                    <button className="btn btn-primary btnRegistrar text-light" onClick={handleCreateUser}>
                        Registrar
                    </button>
                </div>
            </div>
        </div>
    );
};