// 👎 Exemplo de String Literals (SL)
// Strings importantes para a lógica do componente são repetidas e "hardcoded".

import React from "react";

/**
 * Componente que renderiza um botão baseado no status do usuário.
 * @param {string} userStatus - O status atual do usuário (ex: 'pending', 'active', 'suspended').
 */
function UserActionButton({ userStatus }) {
	// 👎 Code Smell: Uso de String Literals para checagens
	// Se o valor de 'active' precisar ser mudado para 'online' no futuro,
	// será necessário mudar em todas as checagens manualmente.

	const isPending = userStatus === "pending"; // 👈 String Literal 1
	const isActive = userStatus === "active"; // 👈 String Literal 2

	const handleClick = () => {
		// 👎 String Literal repetida para controle de fluxo.
		if (userStatus === "active") {
			// 👈 String Literal 3
			console.log("Executando ação para usuário ativo...");
		} else if (userStatus === "suspended") {
			// 👈 String Literal 4
			console.log("Usuário suspenso. Ação não permitida.");
		}
	};

	return (
		<div className="action-button-container">
			{isActive && (
				<button onClick={handleClick} className="btn-success">
					Continuar
				</button>
			)}
			{isPending && (
				<button disabled className="btn-warning">
					Pendente (Aguardando Aprovação)
				</button>
			)}
			{/* // Se houvesse um estado 'suspended', ele teria outra String Literal.
      // E, se o componente pai decidisse usar 'SUSPENDED_USER' em maiúsculas,
      // todas essas checagens falhariam silenciosamente ou com bugs.
      */}
			<p>Status atual: {userStatus}</p>
		</div>
	);
}

// O jeito correto seria definir CONSTANTES:
// const USER_STATUSES = {
//    PENDING: 'pending',
//    ACTIVE: 'active',
//    SUSPENDED: 'suspended',
// };
// E usar USER_STATUSES.ACTIVE na checagem.
