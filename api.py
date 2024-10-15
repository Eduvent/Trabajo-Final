from flask import Flask, jsonify, request
import pandas as pd
from flask_cors import CORS
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
    
    return jsonify()

app.run(debug=True, port=3000)