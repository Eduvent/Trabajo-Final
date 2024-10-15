/* {
    "Departamento": "ANCASH",
    "Latitud": -10.07241400737472,
    "Longitud": -10.07241400737472,
    "Sector": "Aquia"
} */

export class Sector {
    lat: number;
    lon: number;
    name: string;

    constructor(lat: number, lon: number, name: string) {
        this.lat = lat;
        this.lon = lon;
        this.name = name;
    }
}