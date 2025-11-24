// 👎 Exemplo de Procedural Patterns - PP
// O componente usa funções que são chamadas sequencialmente para "construir" a UI
// e manipular a visibilidade diretamente, em vez de depender do estado.

import React, { useState } from "react";

// Função auxiliar com lógica imperativa (o que DEVERIA ser evitado em React)
const showElementById = (id) => {
	const element = document.getElementById(id);
	if (element) {
		element.style.display = "block";
	}
};

const hideElementById = (id) => {
	const element = document.getElementById(id);
	if (element) {
		element.style.display = "none";
	}
};

function ImperativeForm() {
	const [step, setStep] = useState(1);
	const [formData, setFormData] = useState({});

	// 👎 Code Smell: Lógica imperativa no handler
	const handleNextStepProcedural = () => {
		if (step === 1) {
			// Validação procedural
			if (!formData.name) {
				alert("Preencha o nome!");
				return;
			}

			// 👎 Comandos para manipular a UI (Em vez de mudar o estado 'step')
			hideElementById("step-1");
			showElementById("step-2");
			setStep(2); // Muda o estado, mas a visibilidade já foi comandada pela DOM
		} else if (step === 2) {
			// Finaliza o formulário...
			alert("Formulário enviado!");
		}
	};

	return (
		<div className="imperative-container">
			<h2>Formulário (Estilo Procedural)</h2>

			{/* 👎 A renderização usa IDs e comandos, não o estado 'step' diretamente. */}

			<div id="step-1" style={{ display: step === 1 ? "block" : "none" }}>
				<h3>Passo 1: Dados Pessoais</h3>
				<input
					placeholder="Nome"
					onChange={(e) => setFormData({ ...formData, name: e.target.value })}
				/>
			</div>

			<div id="step-2" style={{ display: step === 2 ? "block" : "none" }}>
				<h3>Passo 2: Configurações</h3>
				<input placeholder="Preferência" />
			</div>

			<button onClick={handleNextStepProcedural}>Próximo</button>

			{/*
      // O modo declarativo CORRETO seria:
      {step === 1 && <StepOne formData={formData} setFormData={setFormData} />}
      {step === 2 && <StepTwo />}
      // A visibilidade é DECLARADA pelo valor do estado 'step'.
      */}
		</div>
	);
}
