import L from "leaflet";
import 'leaflet/dist/leaflet.css';
import { useContext } from "react";
import { MapContainer, Marker, Polyline, Popup, TileLayer } from "react-leaflet";
import marker from '../assets/marker.png';
import reservoir from '../assets/reservoir.png';
import { AquaViaContext } from "../Context/AquiaViaContextType";
import { Reservoir } from "../Model/reservoir";
import './Map.css';
import { SetMapCenter } from './SetMapCenter';

export function Map() {
    const peru: [number, number] = [-10.47701725856131, -75.44419329689929];
    const { reservoirs, currentSector, nearestReservoir } = useContext(AquaViaContext);

    const reservoirIcon = new L.Icon({
        iconUrl: reservoir, // URL de la imagen
        iconSize: [50, 50], // Tamaño del ícono en píxeles
        iconAnchor: [25, 25], // Punto de anclaje del ícono (centro en la base)
        popupAnchor: [0, -25], // Donde se abrirá el popup en relación al ícono
    });

    const markerIcon = new L.Icon({
        iconUrl: marker, // URL de la imagen
        iconSize: [50, 50], // Tamaño del ícono en píxeles
        iconAnchor: [25, 25], // Punto de anclaje del ícono (centro en la base)
        popupAnchor: [0, -25], // Donde se abrirá el popup en relación al ícono
    });


    return (
        <MapContainer center={peru} zoom={6}>
            <SetMapCenter center={currentSector || peru} />
            <TileLayer
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />

            {currentSector &&
                nearestReservoir &&
                <Polyline
                    positions={
                        [[currentSector.lat, currentSector.lon],
                        [nearestReservoir.lat, nearestReservoir.lon]]}
                    weight={5} />
            }


            {
                reservoirs.map((reservoir: Reservoir) =>
                    <Marker key={reservoir.name} position={[reservoir.lat, reservoir.lon]} icon={reservoirIcon}>
                        <Popup>
                            {reservoir.name}
                        </Popup>
                    </Marker>
                )
            }
            {
                currentSector &&
                <Marker position={[currentSector.lat, currentSector.lon]} icon={markerIcon}>
                    <Popup>
                        {currentSector.name}
                    </Popup>
                </Marker>
            }
        </MapContainer>
    )
}