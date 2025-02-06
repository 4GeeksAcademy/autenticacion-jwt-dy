import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";

export const Private = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

     useEffect(() => {
         // Verificar si hay un token de autenticación
         const token = localStorage.getItem("token"); // O sessionStorage.getItem("authToken")
         if (!token) {
             navigate("/login");
             return;
       };
     }, []);

    return (
        <div className="text-center mt-5">
            <h1><strong>FELICIDADES...!!!!!!!!</strong></h1>
            <p>
            <video width="600" autoPlay loop muted>
                <source src="https://cdnl.iconscout.com/lottie/premium/preview-watermark/dinero-monedas-lluvia-8725840-7079712.mp4" type="video/mp4" />
                Tu navegador no soporta el video.
            </video>
            </p>
            <p>
            <h1><strong>FELICIDADES...!!!!!!!!</strong></h1>
            </p>
            <p>
            Has ganado 100 créditos para tu primer juego.....DISFRÚTALO...!!!!!!

            
            </p>
        </div>
    );
};
