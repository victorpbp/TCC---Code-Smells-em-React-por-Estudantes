import json
import os
import pandas as pd
import numpy as np

def analyze_smells(file_paths):
    """
    Analyzes software "smells" data from multiple JSON files and compiles
    statistics into a single spreadsheet.
    """

    smell_mapping = {
        'PIS': 'Props in Initial State',
        'AIK': 'Use of index as key in rendering with loops',
        'JSX': 'Component Nesting/JSX Outside the Render',
        'LC': 'Large Components',
        'PD': 'Prop Drilling',
        'TMU': 'Too many useState',
        'DOM': 'Direct DOM Manipulation',
        'PS': 'Props Spreading',
        'DI': 'Deep Indentation',
        'TP': 'Too many props',
        'LUE': 'Large useEffect',
        'MV': 'Mutable Variables',
        'PP': 'Procedural Patterns',
        'SL': 'String Literals',
        'CD': 'Never Using Class Components',
        'PREVS': 'Use PrevState'
    }

    project_data = []
    smell_occurrences = {smell_name: [] for smell_name in smell_mapping.values()}

    for file_path in file_paths:
        with open(file_path, 'r') as f:
            data = json.load(f)

        json_name = os.path.basename(file_path)
        
        # General Information
        general_smells = data.get('smells (General Infomation)', {})
        total_loc = sum(file.get('LOC', 0) for file in data.get('files/components (Specific Information)', {}).get('allFiles', []))
        total_smells_in_project = sum(general_smells.values())

        smell_density = (total_smells_in_project / total_loc) if total_loc > 0 else 0

        project_info = {
            'JSON Name': json_name,
            'Amount of LOC': total_loc,
            'Smell Density per LOC': smell_density,
            'Amount of Smells (Total)': total_smells_in_project,
        }
        
        # Add individual smell counts for the project
        for code, name in smell_mapping.items():
            occurrences = general_smells.get(name, 0)
            project_info[f'Amount of Smells ({name})'] = occurrences
            smell_occurrences[name].append(occurrences)
        
        project_data.append(project_info)

    # Convert project data to DataFrame for easier analysis
    df_projects = pd.DataFrame(project_data)

    # Prepare data for smell-wise analysis
    smell_analysis_data = []
    for smell_code, smell_name in smell_mapping.items():
        occurrences = smell_occurrences[smell_name]
        
        if not occurrences:  # Handle cases where a smell might not be present in any project
            min_val, p25, p50, p75, max_val = 0, 0, 0, 0, 0
            mean_val = 0
            std_dev = 0
            json_most = 'N/A'
            json_least = 'N/A'
        else:
            mean_val = np.mean(occurrences)
            std_dev = np.std(occurrences)
            
            # Calculate quartiles
            q = np.percentile(occurrences, [0, 25, 50, 75, 100])
            min_val, p25, p50, p75, max_val = q[0], q[1], q[2], q[3], q[4]

            # Find JSON with most and least occurrences
            if max_val > 0:
                json_most = df_projects.loc[df_projects[f'Amount of Smells ({smell_name})'] == max_val, 'JSON Name'].tolist()
            else:
                json_most = 'N/A'

            if min_val >= 0: # min_val can be 0 so we check for this case
                json_least = df_projects.loc[df_projects[f'Amount of Smells ({smell_name})'] == min_val, 'JSON Name'].tolist()
                
        smell_analysis_data.append({
            'Smell Name': smell_name,
            'Amount of Occurrences (Total across projects)': sum(occurrences),
            'Mean per Project': mean_val,
            'Standard Deviation': std_dev,
            'Min': min_val,
            '25%': p25,
            '50% (Median)': p50,
            '75%': p75,
            'Max': max_val,
            'JSON with Most Occurrences': json_most,
            'JSON with Least Occurrences': json_least
        })

    df_smell_analysis = pd.DataFrame(smell_analysis_data)

    # Create a Pandas Excel writer using XlsxWriter as the engine.
    output_filename = 'smell_analysis_report.xlsx'
    with pd.ExcelWriter(output_filename, engine='xlsxwriter') as writer:
        df_projects.to_excel(writer, sheet_name='Project Data', index=False)
        df_smell_analysis.to_excel(writer, sheet_name='Smell Analysis', index=False)

    print(f"Analysis complete. Report saved to {output_filename}")

# Get all JSON files in the current directory
json_files = [f for f in os.listdir('.') if f.endswith('.json')]

if not json_files:
    print("No JSON files found in the current directory.")
else:
    analyze_smells(json_files)