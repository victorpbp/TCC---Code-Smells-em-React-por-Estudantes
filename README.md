# TCC - Um Estudo de Prevalência de Code Smells em Projetos React Desenvolvidos por Estudantes

Repositório público com objetivo de centralizar recursos utilizados no desenvolvimento do trabalho de conclusão de curso.

## generate_spreadsheet.py
Código em Python feito para converter as informações presentes nos JSONs gerados pela ferramenta ReactSniffer2 com o formato de nome "smells-nome-do-projeto.json" para uma versão inicial .xlsx, permitindo maior liberdade para o usuário para gerar mais informações a partir dos dados organizados em linhas e colunas na spreadsheet.

## smell_analysis_report.xlsx
Versão final da planilha que foi gerada pelo código generate_spreadsheet.py, modificada com fins de trazer maior adequação para os objetivos do trabalho, com estatísticas relevantes e com a censura dos nomes originais dos projetos utilizados em prol de uma nomenclatura de índices como "PXX".

## Code_Smell_Examples
Pasta com os arquivos de exemplo que foram inseridos no trabalho por meio de figuras no capítulo de Background.

Contém os 16 smells reconhecidos pela ferramenta ReactSniffer2, abreviados pelos arquivos das seguintes formas:
- PIS: Props in Initial State
- AIK: Use of Index as Key
- JSX: Component Nesting / JSX Outside the Render
- LC: Large Component
- PD: Prop Drilling
- TMU: Too Many useState
- DOM: Direct DOM Manipulation
- PS: Props Spreading
- DI: Deep Indentation
- TP: Too Many Props
- LUE: Large useEffect
- MV: Mutable Variables
- PP: Procedural Patterns
- SL: String Literals
- PREVS: Use PrevState
- CD: Never Using Class Components
