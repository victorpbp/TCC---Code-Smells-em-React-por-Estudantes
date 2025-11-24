// Exemplo de Never Using Class Components (CD)
// Embora funcional, este padrão é obsoleto em novos desenvolvimentos React pela introdução de Hooks.

import React, { Component } from "react";

/**
 * Este é um Componente de Classe.
 * Ele usa 'class extends Component' e o método 'render()'.
 */
class LegacyCounter extends Component {
	constructor(props) {
		super(props);
		// 👎 Gerenciamento de estado via 'this.state' (padrão antigo)
		this.state = {
			count: 0,
		};
		this.handleClick = this.handleClick.bind(this);
	}

	// 👎 Métodos de ciclo de vida específicos de classe (ex: componentDidMount)
	componentDidMount() {
		console.log("Componente montado (Ciclo de Vida de Classe)");
	}

	handleClick() {
		// 👎 Atualização de estado via 'this.setState' (padrão antigo)
		this.setState({
			count: this.state.count + 1,
		});
	}

	render() {
		return (
			<div>
				<h2>Contador de Classe: {this.state.count}</h2>
				<button onClick={this.handleClick}>Incrementar (this.setState)</button>
			</div>
		);
	}
}

// O detector identificaria este arquivo por:
// 1. Importar { Component }
// 2. Usar a palavra-chave 'class'
// 3. Conter o método 'render()'
