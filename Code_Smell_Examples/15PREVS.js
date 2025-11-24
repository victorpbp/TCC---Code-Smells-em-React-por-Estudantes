// 👎 Exemplo de Use PrevState (PREVS)
// O novo estado depende do estado anterior ('count'), mas o setter usa o valor 'stale'.

import React, { useState } from "react";

function CounterApp() {
	const [count, setCount] = useState(0);

	// 👎 Code Smell: set-call que depende de 'count' no escopo
	const incrementBadly = () => {
		// Nesta linha, o 'count' é lido do escopo do render atual.
		// Se esta função for chamada múltiplas vezes rapidamente, ou se o
		// componente re-renderizar entre as chamadas, o valor de 'count'
		// pode estar "stale" (antigo).

		setCount(count + 1); // 👈 set-call ASSÍNCRONA usando o valor SÍNCRONO (stale)
		setCount(count + 1); // 👈 Esta linha também lerá o MESMO valor antigo de 'count'.
		// Resultado esperado: 2
		// Resultado real se chamado rapidamente: 1 (ou 2, dependendo do agrupamento do React)
	};

	// O modo correto de garantir a atualização com o valor mais recente
	const incrementCorrectly = () => {
		// O React garante que 'prevCount' será o valor mais recente do estado
		// ANTES de executar a atualização.
		setCount((prevCount) => prevCount + 1);
		setCount((prevCount) => prevCount + 1);
		// Resultado real: 2
	};

	return (
		<div>
			<h2>Contador: {count}</h2>

			<button onClick={incrementBadly}>Incrementar Errado (Stale State)</button>

			<button onClick={incrementCorrectly}>
				Incrementar Certo (PrevState)
			</button>

			<p>
				Ao clicar em "Incrementar Errado" rapidamente, a contagem pode não subir
				o valor esperado devido à leitura do estado antigo ('count').
			</p>
		</div>
	);
}
