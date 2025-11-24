// 👎 Exemplo de Component Nesting / JSX Outside the Render (JSX)
// Componente 'NestedButton' sendo definido DENTRO de 'ParentComponent'.

import React, { useState, useCallback } from "react";

function ParentComponent() {
	const [count, setCount] = useState(0);

	// 👎 Code Smell: Definição de componente aninhado
	// Esta função/componente 'NestedButton' é recriada do zero a CADA render do ParentComponent.
	// Isso quebra a referência da função, invalidando qualquer memoização (ex: React.memo)
	// que pudesse ser aplicada a 'NestedButton' se estivesse em um arquivo separado.
	const NestedButton = ({ onClick }) => {
		// Note: React vai tratar isso como um COMPONENTE completamente novo a cada render,
		// o que leva à perda de state interno ou recriação desnecessária da DOM.
		return <button onClick={onClick}>Aumentar Contador</button>;
	};

	// Função de callback otimizada para o botão
	const incrementCount = useCallback(() => {
		setCount((c) => c + 1);
	}, []);

	return (
		<div>
			<h2>Contador: {count}</h2>

			{/* O componente filho está sendo usado aqui */}
			<NestedButton onClick={incrementCount} />

			{/* Quando 'setCount' é chamado, 'ParentComponent' re-renderiza, 
          e 'NestedButton' é recriado como uma nova função/componente. */}
		</div>
	);
}

// O jeito correto seria definir 'NestedButton' FORA de 'ParentComponent' (ex: em seu próprio arquivo).
