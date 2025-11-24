// 👎 Exemplo de Use of Index as Key (AIK)
// Usando o segundo argumento (index) do map como o 'key'.

import React, { useState } from "react";

function TodoList() {
	const [todos, setTodos] = useState([
		{ id: 1, text: "Comprar pão", completed: false },
		{ id: 2, text: "Estudar para o TCC", completed: false },
		{ id: 3, text: "Pagar contas", completed: false },
	]);

	// Função para remover um item do meio da lista (simulando reordenação de índices)
	const removeTodo = (indexToRemove) => {
		setTodos(todos.filter((_, index) => index !== indexToRemove));
	};

	return (
		<div>
			{/* 👎 Code Smell: Usando 'index' como key */}
			{todos.map((todo, index) => (
				// Se 'Comprar pão' (index 0) for removido, o React
				// tentará apenas atualizar o item na 'key=1' e 'key=2',
				// em vez de recriar os elementos corretamente.
				<div key={index} className="todo-item">
					<input
						type="checkbox"
						checked={todo.completed}
						// Se este item fosse um componente mais complexo com estado interno,
						// o uso do index como key causaria problemas de estado.
					/>
					<span>{todo.text}</span>
					<button onClick={() => removeTodo(index)}>Remover</button>
				</div>
			))}
		</div>
	);
}
