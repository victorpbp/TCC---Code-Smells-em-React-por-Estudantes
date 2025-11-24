// 👎 Exemplo de Mutable Variables (MV) / State Mutation
// Modificando um objeto de estado diretamente sem usar o setter.

import React, { useState } from "react";

function UserListEditor() {
	const [userList, setUserList] = useState([
		{ id: 1, name: "Alice", active: true },
		{ id: 2, name: "Bob", active: false },
	]);

	const toggleUserStatus = (userId) => {
		// 1. Encontra o objeto a ser modificado
		const user = userList.find((u) => u.id === userId);

		// 👎 Code Smell: Mutação Direta do Estado
		if (user) {
			// Modificando a propriedade do objeto DENTRO do estado 'userList'.
			// O React NÃO detecta que 'userList' foi alterado porque a
			// REFERÊNCIA de 'userList' continua a mesma.
			user.active = !user.active; // 👈 Mutação!
		}

		// 2. Chama o setter, mas com a MESMA referência do array
		// O React compara: [array antigo] === [array novo] -> true.
		// O componente não re-renderiza, mas o dado na memória já mudou.
		setUserList(userList); // 👈 Re-render não ocorre de forma confiável.
	};

	return (
		<div>
			<h3>Lista de Usuários</h3>
			<ul>
				{userList.map((user) => (
					<li key={user.id}>
						{user.name} - Status: {user.active ? "Ativo" : "Inativo"}
						<button onClick={() => toggleUserStatus(user.id)}>
							Alternar Status
						</button>
					</li>
				))}
			</ul>
			{/* O componente não irá atualizar o status na tela ao clicar no botão
          porque o React não percebeu a mudança no estado, devido à mutação. */}
		</div>
	);
}

/* O jeito correto seria:
const newUsers = userList.map(u => 
    u.id === userId ? { ...u, active: !u.active } : u
);
setUserList(newUsers); 
(Criando um novo array e um novo objeto para o usuário modificado.)
*/
