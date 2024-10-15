import { useMap } from "react-leaflet";
import { useEffect } from "react";
import { Sector } from "../Model/sector";

export function SetMapCenter({ center }: { center: Sector | [number, number] }) {
    const map = useMap();

    useEffect(() => {
        if (center instanceof Sector)
            map.setView([center.lat, center.lon], 10);
    }, [center]);

    return null;
}
