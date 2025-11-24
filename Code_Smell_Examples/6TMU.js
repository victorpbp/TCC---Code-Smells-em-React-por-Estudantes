// 👎 Exemplo de Too Many useState (TMU)
// O componente de formulário usa um hook useState para CADA campo/flag.

import React, { useState } from "react";

function UserProfileForm() {
	// 👎 Code Smell: Excesso de declarações de useState
	// Esses estados estão fortemente relacionados, mas declarados separadamente.
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitError, setSubmitError] = useState(null);
	const [isFormValid, setIsFormValid] = useState(false);

	const handleValidation = () => {
		// A lógica de validação precisa ler e manipular múltiplos estados isolados.
		const isValid = firstName.trim() !== "" && email.includes("@");
		setIsFormValid(isValid);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setIsSubmitting(true);
		// ... Lógica de submissão que precisa coletar todos os estados.
		console.log({ firstName, lastName, email, phoneNumber });
		setIsSubmitting(false);
		// ...
	};

	// A lógica do componente fica fragmentada e mais longa devido à
	// necessidade de gerenciar todas essas funções de estado separadamente.

	return (
		<form onSubmit={handleSubmit}>
			<h3>Informações Pessoais</h3>
			<input
				value={firstName}
				onChange={(e) => {
					setFirstName(e.target.value);
					handleValidation();
				}}
				placeholder="Primeiro Nome"
				disabled={isSubmitting}
			/>
			<input
				value={lastName}
				onChange={(e) => setLastName(e.target.value)}
				placeholder="Sobrenome"
				disabled={isSubmitting}
			/>
			{/* ... mais campos ... */}

			{submitError && <p style={{ color: "red" }}>Erro: {submitError}</p>}
			<button type="submit" disabled={isSubmitting || !isFormValid}>
				{isSubmitting ? "Enviando..." : "Salvar Perfil"}
			</button>
		</form>
	);
}
