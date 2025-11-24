// 👎 Exemplo de Componente Grande (Large Component - LC)
// Este componente gerencia a busca de dados, o estado da página, o estado do formulário
// e renderiza três sub-componentes complexos.

import React, { useState, useEffect } from "react";
import axios from "axios";

function ComplexSettingsPage() {
	// 1. Lógica de Estado da Página
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [profileData, setProfileData] = useState(null);

	// 2. Lógica de Estado do Formulário (muitos campos)
	const [userName, setUserName] = useState("");
	const [userEmail, setUserEmail] = useState("");
	const [notificationsEnabled, setNotificationsEnabled] = useState(false);

	// 3. Lógica de Busca de Dados
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get("/api/user/settings");
				setProfileData(response.data);
				setUserName(response.data.name);
				setUserEmail(response.data.email);
				setNotificationsEnabled(response.data.prefs.notifications);
			} catch (err) {
				setError(err);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, []); // 👈 Este é um Long Method dentro do Large Component

	// 4. Lógica de Submissão do Formulário (Lógica de Negócios)
	const handleSaveSettings = async () => {
		// Validações extensas...
		if (!userName || !userEmail.includes("@")) {
			alert("Dados inválidos!");
			return;
		}

		// Chamada complexa à API...
		try {
			await axios.post("/api/user/update", {
				name: userName,
				email: userEmail,
				notifications: notificationsEnabled,
				// ... muitos outros campos de dados
			});
			alert("Configurações salvas!");
		} catch (err) {
			// Lógica de tratamento de erro...
		}
	};

	if (loading) return <div>Carregando configurações...</div>;
	if (error) return <div>Erro ao carregar.</div>;

	// 5. Renderização (muito JSX)
	return (
		<div className="settings-page">
			<h1>Configurações do Usuário</h1> {/* 👈 Seção 1 */}
			{/* Formulário de Perfil (deveria ser um componente separado) */}
			<section className="profile-section">
				<h3>Detalhes do Perfil</h3>
				<input
					value={userName}
					onChange={(e) => setUserName(e.target.value)}
					placeholder="Nome"
				/>
				<input
					value={userEmail}
					onChange={(e) => setUserEmail(e.target.value)}
					placeholder="Email"
				/>
				<button onClick={handleSaveSettings}>Salvar Perfil</button>
			</section>
			{/* Configurações de Notificação (deveria ser um componente separado) */}
			<section className="notification-section">
				<h3>Preferências de Notificação</h3>
				<label>
					<input
						type="checkbox"
						checked={notificationsEnabled}
						onChange={(e) => setNotificationsEnabled(e.target.checked)}
					/>
					Receber Emails de Notificação
				</label>
			</section>
			{/* Logs de Atividade (deveria ser um componente separado) */}
			<section className="activity-section">
				<h3>Histórico Recente</h3>
				{profileData.activities.map((activity) => (
					<p key={activity.id}>
						{activity.timestamp}: {activity.action}
					</p>
				))}
			</section>
			{/* 👎 Este componente é difícil de manter e re-renderiza TUDO 
          se apenas um checkbox for clicado. */}
		</div>
	);
}
