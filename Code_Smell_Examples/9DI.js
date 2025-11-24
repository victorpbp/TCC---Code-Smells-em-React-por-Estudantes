// 👎 Exemplo de Deep Indentation (DI)
// Múltiplas condicionais aninhadas no JSX, resultando em alta indentação.

import React from "react";

/**
 * Componente que renderiza um painel de usuário com muitas condições.
 * @param {object} props
 * @param {object} props.user - Objeto do usuário (pode ser null).
 * @param {boolean} props.isLoading - Flag de carregamento.
 * @param {string} props.role - A função do usuário ('admin', 'editor', 'basic').
 * @param {Array} props.dataList - Lista de dados a ser exibida (pode ser vazia).
 */
function UserDashboardPanel({ user, isLoading, role, dataList }) {
	// 👎 A lógica de renderização gera profunda indentação.
	return (
		<div className="dashboard-panel">
			{/* Nível 1 de Condição: Carregando */}
			{isLoading ? (
				<div>Carregando dados do painel...</div>
			) : // Nível 2 de Condição: Usuário Logado
			user ? (
				<div className="user-content">
					<h2>Bem-vindo, {user.name}</h2>

					{/* Nível 3 de Condição: Permissão de Admin */}
					{role === "admin" && (
						<p style={{ color: "red" }}>Acesso Total (Admin)</p>
					)}

					{/* Nível 3 de Condição: Lista de Dados */}
					{dataList && dataList.length > 0 ? (
						<ul className="data-list">
							{/* Nível 4 de Loop: Mapeamento de itens */}
							{dataList.map((item) => (
								<li key={item.id}>
									{/* Nível 5 de Condição: Item Completo */}
									{item.completed ? (
										<span style={{ textDecoration: "line-through" }}>
											{item.title}
										</span>
									) : (
										<span>{item.title}</span>
									)}
								</li>
							))}
						</ul>
					) : (
						<p>Nenhum dado disponível.</p>
					)}
				</div>
			) : (
				<div>Por favor, faça login para ver o painel.</div>
			)}
		</div>
	);
}
