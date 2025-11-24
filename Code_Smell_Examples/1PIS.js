// 👎 Exemplo de Props in Initial State (PIS)
// O valor inicial do 'username' é copiado do prop.
// Se o prop 'initialName' mudar posteriormente, o 'name' no state não será atualizado.

import React, { useState } from "react";

/**
 * Componente que permite a edição do nome do usuário.
 * * @param {object} props
 * @param {string} props.initialName - O nome original passado pelo componente pai.
 */
function UserEditor({ initialName }) {
	// 👎 Code Smell: Copiando o valor do prop para o state local.
	// Este state 'name' só será inicializado na PRIMEIRA renderização.
	const [name, setName] = useState(initialName);

	const handleNameChange = (event) => {
		// Apenas o state local 'name' é atualizado.
		setName(event.target.value);
	};

	// Se o componente pai quebrou a sincronia (ex: fez logoff e logou com outro usuário),
	// o prop 'initialName' pode ter mudado, mas o state 'name' local
	// permanece com o valor antigo, causando desincronização.

	return (
		<div>
			<label>
				Nome:
				<input type="text" value={name} onChange={handleNameChange} />
			</label>
			<p>Nome inicial (prop): **{initialName}**</p>
			<p>Nome atual (state): **{name}**</p>
		</div>
	);
}
