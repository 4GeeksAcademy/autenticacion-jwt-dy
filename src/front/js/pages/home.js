import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<h1>DY CASINO ON LINE</h1>
			<p>
				<img src="https://img.freepik.com/vector-premium/cartel-casino-poker-realista-vector_208581-247.jpg?w=740" />
			</p>
			<p>
			<strong>BIENVENIDO A DY CASINO ON LINE</strong>
			</p>
			<p>
			DY Casino On Line ha llegado al mercado nacional para lograr una revolución en las casas de apuestas junto a los amantes de las apuestas deportivas y el casino online en Chile con una plataforma sencilla, rápida y segura.

			Descubre la razón por la que miles de usuarios disfrutan de la mejor experiencia de apuestas y si aún no formas parte de la casa de apuestas deportivas más famosa del país, no esperes más y registra una cuenta de juego en el sitio favorito de los chilenos y chilenas.
			</p>
		</div>
	);
};
