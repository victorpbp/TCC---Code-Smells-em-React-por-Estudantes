// 👎 Exemplo de Too Many Props (TP)
// O componente 'UserCard' aceita 10 props diferentes para lidar com dados, UI e eventos.

import React from "react";

/**
 * Componente altamente especializado que gerencia visualização, edição e estado.
 * Aceita uma longa lista de props que poderiam ser agrupados ou divididos em componentes.
 */
function UserCard({
	// 1. Dados do Usuário (deveria ser um objeto único 'user')
	userId,
	userName,
	userEmail,
	userAvatarUrl,

	// 2. Flags de UI/Estado (poderia ser um objeto 'options')
	isAdmin,
	isOnline,
	isEditing,

	// 3. Funções de Callback/Eventos (deveriam ser passadas em um contexto específico)
	onEditClick,
	onSaveProfile,
	onDeleteAccount,
}) {
	// 👎 Code Smell: A lista de props é excessivamente longa e lida com domínios diferentes.

	const handleSave = () => {
		// Lógica para salvar...
		onSaveProfile(userId, userName, userEmail);
	};

	return (
		<div className="user-card">
			<img src={userAvatarUrl} alt={`${userName}'s avatar`} />

			{/* Seção 1: Visualização de Dados */}
			{!isEditing && (
				<>
					<h3>
						{userName} ({isOnline ? "Online" : "Offline"})
					</h3>
					<p>Email: {userEmail}</p>
				</>
			)}

			{/* Seção 2: Edição e Funções */}
			{isEditing ? (
				<button onClick={handleSave}>Salvar</button>
			) : (
				<button onClick={onEditClick}>Editar</button>
			)}

			{/* Seção 3: Ações Administrativas */}
			{isAdmin && <button onClick={onDeleteAccount}>Deletar Conta</button>}
		</div>
	);
}

// O componente é dificilmente reutilizável e difícil de instanciar.
function ParentComponent() {
	const user = {
		/* ... dados do usuário ... */
	};
	const callbacks = {
		/* ... funções ... */
	};

	return (
		<UserCard
			userId={user.id}
			userName={user.name}
			userEmail={user.email}
			userAvatarUrl={user.avatar}
			isAdmin={user.role === "admin"}
			isOnline={user.status === "online"}
			isEditing={false}
			onEditClick={callbacks.handleEdit}
			onSaveProfile={callbacks.handleSave}
			onDeleteAccount={callbacks.handleDelete}
		/>
	);
}
