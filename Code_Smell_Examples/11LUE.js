// 👎 Exemplo de Large useEffect (LUE)
// Um único useEffect fazendo busca de dados, manipulação de título e inscrição em eventos.

import React, { useState, useEffect } from "react";
import api from "./api";

function ComplexDashboard() {
	const [userId, setUserId] = useState(1);
	const [data, setData] = useState(null);
	const [isOnline, setIsOnline] = useState(navigator.onLine);

	// 👎 Code Smell: Lógica misturada e dependências excessivas no mesmo useEffect
	useEffect(() => {
		// 1. Busca de Dados (Responsabilidade 1)
		const fetchUserData = async () => {
			const result = await api.fetchUser(userId);
			setData(result);
		};

		// 2. Título da Página (Responsabilidade 2)
		document.title = data ? `Dashboard de ${data.name}` : "Carregando...";

		// 3. Listener de Evento (Responsabilidade 3)
		const handleOnlineStatus = () => {
			setIsOnline(navigator.onLine);
		};
		window.addEventListener("online", handleOnlineStatus);
		window.addEventListener("offline", handleOnlineStatus);

		fetchUserData(); // Chamada da função de busca

		// Cleanup: Inscrições devem ser separadas
		return () => {
			// O cleanup também fica misturado
			window.removeEventListener("online", handleOnlineStatus);
			window.removeEventListener("offline", handleOnlineStatus);
		};

		// 👎 Array de Dependências Longo e Complexo
	}, [userId, data]);
	// Se 'data' muda (na busca), o efeito inteiro roda novamente,
	// incluindo a reinscrição nos listeners e a nova busca (se data fosse uma dependência,
	// o que causaria um loop infinito se não fosse a checagem dentro da função).

	if (!data) return <div>Carregando...</div>;

	return (
		<div>
			<h1>Status: {isOnline ? "Conectado" : "Desconectado"}</h1>
			<p>Dados de {data.name} carregados com sucesso.</p>
		</div>
	);
}

// O correto seria:
// 1. useEffect(fetchUserData, [userId]);
// 2. useEffect(updateTitle, [data]);
// 3. useEffect(setupOnlineListener, []);
