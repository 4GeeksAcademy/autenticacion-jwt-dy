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
            <h1>DY CASINO ON LINE</h1>
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
            DY Casino On Line ha llegado al mercado nacional para lograr una revolución en las casas de apuestas junto a los amantes de las apuestas deportivas y el casino online en Chile con una plataforma sencilla, rápida y segura.

            Descubre la razón por la que miles de usuarios disfrutan de la mejor experiencia de apuestas y si aún no formas parte de la casa de apuestas deportivas más famosa del país, no esperes más y registra una cuenta de juego en el sitio favorito de los chilenos y chilenas.
            </p>
        </div>
    );
};
