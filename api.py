from flask import Flask, jsonify, request
import pandas as pd
from flask_cors import CORS
import math
import heapq
#import utm

crucialPoints = pd.read_csv('crucial_points.csv')
crucialPoints = crucialPoints[['Sector', 'Departamento', 'Latitud', 'Longitud']]

reservoirs = pd.read_csv('embalses_con_coordenadas.csv')
reservoirs = reservoirs[['Nombre de la Presa', 'Latitud', 'Longitud']]

provinces = crucialPoints['Departamento'].unique().tolist()

# Convertir datos a listas de nodos
nodesCrucialPoints = crucialPoints[['Latitud', 'Longitud']].values.tolist()
nodesReservoirs = reservoirs[['Latitud', 'Longitud']].values.tolist()

#crucialPoints['Latitud'] = None
#crucialPoints['Longitud'] = None
#
#for index, row in crucialPoints.iterrows():
#    zone = row['Zona']
#    east = row['Este (Inicial)']
#    north = row['Norte (Inicial)']
#
#    lat, lon = utm.to_latlon(east, north, zone, northern = False)
#
#    crucialPoints.at[index, 'Latitud'] = lat
#    crucialPoints.at[index, 'Longitud'] = lon
#
#crucialPoints.to_csv('crucial_points.csv')


def haversineDistance(lat1, lon1, lat2, lon2):
    # Radio de la Tierra en kilómetros
    R = 6371.0
    phi1 = math.radians(lat1)
    phi2 = math.radians(lat2)
    delta_phi = math.radians(lat2 - lat1)
    delta_lambda = math.radians(lon2 - lon1)
    a = math.sin(delta_phi / 2.0)**2 + \
        math.cos(phi1) * math.cos(phi2) * \
        math.sin(delta_lambda / 2.0)**2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    return R * c  # Distancia en kilómetros

# Implementación de Dijkstra para encontrar la distancia mínima
def min_distance(graph, start):
    min_distance = float('inf')
    node = None

    for i in graph[start]:
        distance = i[0]

        if i[0] < min_distance:
            min_distance = distance
            node = i

    return min_distance, node[1]
    """ distances = {node: float('inf') for node in graph}
    distances[start] = 0
    predecessors = {node: None for node in graph}
    priority_queue = [(0, start)]  # (distancia, nodo)

    while priority_queue:
        current_distance, current_node = heapq.heappop(priority_queue)

        if current_distance > distances[current_node]:
            continue

        for distance, neighbor in graph[current_node]:
            total_distance = current_distance + distance

            if total_distance < distances[neighbor]:
                distances[neighbor] = total_distance
                heapq.heappush(priority_queue, (total_distance, neighbor))

    return distances """
    

# Crear el grafo de distancias
graph = {}

for index, point in crucialPoints.iterrows():
    graph[point['Sector']] = []
    
    for index, reservoir in reservoirs.iterrows():
        distance = haversineDistance(
            point['Latitud'], point['Longitud'],
            reservoir['Latitud'], reservoir['Longitud']
        )
        graph[point['Sector']].append((distance, reservoir['Nombre de la Presa']))

app = Flask(__name__)
CORS(app)

@app.route("/")
def hello_world():
    data = jsonify(crucialPoints.to_dict(orient='index'))
    return data

@app.route("/provinces")
def getProvinces():
    data = jsonify({'provinces': provinces})
    return data

@app.route("/sectors", methods=['POST'])
def getSectors():
    data = request.get_json()

    if 'Departamento' not in data:
        return jsonify({"error": "Bad Request"}), 400

    data = crucialPoints[crucialPoints['Departamento'] == data['Departamento']]
    data = data.to_dict(orient='records') 
    
    return data

@app.route("/reservoirs")
def getReservoirs():
    data = jsonify(reservoirs.to_dict(orient='records'))
    return data

@app.route("/distance", methods=['POST'])
def get_closest_reservoir():
    data = request.get_json()

    if 'Sector' not in data:
        return jsonify({"error": "Bad Request. 'sector' is required"}), 400

    # Buscar el sector en la lista de puntos cruciales
    sectorData = crucialPoints[crucialPoints['Sector'] == data['Sector']['name']]

    if sectorData.empty:
        return jsonify({"error": "Sector not found"}), 404

    sectorName = str(sectorData['Sector'].values[0])

    distance, nearest_reservoir_name = min_distance(graph, sectorName)

    nearest_reservoir = reservoirs[reservoirs['Nombre de la Presa'] == nearest_reservoir_name].squeeze()

    return jsonify({
        "distance": distance,
        "reservoir": nearest_reservoir.to_dict()
    })

    return jsonify(nearest_reservoir)
    
    return jsonify({
        "reservoir": nombre_embalse,
        "sector": data['sector'],
        "distance": distancia_minima
    })

app.run(debug=True, port=3000)