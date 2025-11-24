// 👎 Exemplo de Prop Drilling (PD)
// A prop 'userTheme' é passada por A e B para alcançar C.

import React from "react";

// Componente C: O ÚNICO que realmente precisa da prop.
/**
 * Componente que exibe o botão estilizado com o tema.
 * @param {object} props
 * @param {string} props.userTheme - Tema real que será usado.
 */
function ThemedButton({ userTheme }) {
	// Apenas aqui a prop 'userTheme' é utilizada para estilização.
	const style = {
		backgroundColor: userTheme === "dark" ? "#333" : "#FFF",
		color: userTheme === "dark" ? "#FFF" : "#000",
		padding: "10px",
		borderRadius: "5px",
	};
	return <button style={style}>Botão de Ação</button>;
}

// Componente B: Apenas repassa a prop 'userTheme'.
/**
 * Componente Wrapper que agrupa o botão.
 * @param {object} props
 * @param {string} props.userTheme - Passada adiante.
 */
function CardWrapper({ userTheme }) {
	// 👎 Prop Drilling: 'CardWrapper' não usa 'userTheme', mas precisa passá-la para o filho.
	return (
		<div className="card-wrapper">
			<h3>Wrapper</h3>
			<ThemedButton userTheme={userTheme} />
		</div>
	);
}

// Componente A: Apenas repassa a prop 'userTheme'.
/**
 * Componente de Layout que contém o wrapper.
 * @param {object} props
 * @param {string} props.userTheme - Passada adiante.
 */
function Layout({ userTheme }) {
	// 👎 Prop Drilling: 'Layout' não usa 'userTheme', mas precisa passá-la para o filho.
	return (
		<main className="layout">
			<h1>Dashboard</h1>
			<CardWrapper userTheme={userTheme} />
		</main>
	);
}

// Componente Pai: Onde o valor é definido.
function App() {
	const currentUserTheme = "dark"; // Valor que queremos passar para C

	// A prop precisa "perfurar" os níveis de aninhamento.
	return <Layout userTheme={currentUserTheme} />;
}
