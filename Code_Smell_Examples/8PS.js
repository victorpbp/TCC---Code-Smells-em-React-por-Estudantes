// 👎 Exemplo de Props Spreading (PS)
// O componente Wrapper passa TODAS as props que recebe para o elemento <a>.

import React from "react";

/**
 * Componente que envolve um link.
 * @param {object} props
 * @param {string} props.href - A única prop explicitamente usada.
 */
function LinkWrapper(props) {
	// Apenas a prop 'href' é usada para o link, mas TUDO será repassado.
	const { href, ...otherProps } = props;

	// 👎 Code Smell: Espelhamento cego de props
	// Se o componente pai passar 'userData', 'handleDelete' ou 'isLoading'
	// essas props inúteis serão passadas para o elemento <a> da DOM,
	// o que pode resultar em atributos inválidos na DOM.
	return (
		<div className="wrapper-container">
			{/* O ideal seria passar SOMENTE as props relevantes (ex: className, style) */}
			<a href={href} {...otherProps}>
				{/* otherProps pode conter props que não são padrão HTML, como 'handleSave'. */}
				Clique Aqui
			</a>
		</div>
	);
}

// Componente Pai usando o LinkWrapper e acidentalmente passando props não-HTML:
function ParentComponent() {
	const customProp = "analytics-id-123";
	const nonHtmlProp = () => console.log("Função de callback"); // Função irrelevante sendo passada

	return (
		<LinkWrapper
			href="/details"
			data-tracking={customProp} // Prop de rastreamento OK
			onIrrelevantEvent={nonHtmlProp} // Prop função que não é padrão HTML
			// 👎 O 'LinkWrapper' irá repassar 'onIrrelevantEvent' para a tag <a>
		/>
	);
}

//a
