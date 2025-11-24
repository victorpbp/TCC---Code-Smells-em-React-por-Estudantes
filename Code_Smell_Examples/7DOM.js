// 👎 Exemplo de Direct DOM Manipulation (DOM)
// Usando document.getElementById para mudar o estilo.

import React, { useEffect, useState } from "react";

function HeaderController() {
	const [isScrolled, setIsScrolled] = useState(false);

	// 👎 Code Smell: Manipulação Direta da DOM dentro de useEffect
	useEffect(() => {
		const handleScroll = () => {
			// Lógica para detectar scroll (ex: window.scrollY > 100)
			const scrolled = window.scrollY > 100;
			setIsScrolled(scrolled);

			// 👎 O problema: Acessando e mudando o estilo DIRETAMENTE na DOM.
			const headerElement = document.getElementById("main-header");
			if (headerElement) {
				// Isso ignora o React e sua Virtual DOM.
				headerElement.style.backgroundColor = scrolled
					? "black"
					: "transparent";
				headerElement.style.color = scrolled ? "white" : "black";
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		// O ID é necessário para a manipulação direta.
		<header id="main-header" style={{ padding: "20px", transition: "0.3s" }}>
			<h1>Meu App</h1>
			<p>{isScrolled ? "Fundo Preto (DOM)" : "Fundo Transparente (DOM)"}</p>

			{/* O React perde o controle sobre as propriedades CSS 'backgroundColor' e 'color' */}
		</header>
	);
}

// O jeito correto seria usar 'useRef' e fazer a mudança de estilo via className/state
// ou simplesmente deixar o estado 'isScrolled' no React controlar o estilo.
