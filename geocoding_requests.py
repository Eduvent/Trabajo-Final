import pandas as pd
import requests

# Cargar el archivo CSV con las presas
file_path_embalses = '/Users/eduventura/Desktop/workspace/Complejidad Algoritmic/Trabajo Final/embalses.csv'  # Cambia esta ruta a la ubicación de tu archivo
df_embalses = pd.read_csv(file_path_embalses)

# Función para obtener coordenadas de una presa usando OpenStreetMap Nominatim
def get_coordinates(presa_name):
    url = f"https://nominatim.openstreetmap.org/search?q={presa_name}&format=json"
    response = requests.get(url).json()
    if response:
        lat = response[0]["lat"]
        lon = response[0]["lon"]
        return lat, lon
    else:
        return None, None

# Aplicar la función a cada presa para obtener las coordenadas
df_embalses['Latitud'], df_embalses['Longitud'] = zip(*df_embalses['Nombre de la Presa'].apply(get_coordinates))

# Guardar el archivo actualizado con las coordenadas añadidas
df_embalses.to_csv('embalses_con_coordenadas.csv', index=False)

# Verifica que el archivo embalses_con_coordenadas.csv haya sido generado correctamente
print("Archivo con coordenadas generado correctamente.")
