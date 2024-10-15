import { ReactNode, useEffect, useState } from "react";
import { AquaViaContext, AquaViaContextType } from "./AquiaViaContextType";
import { ApiService } from "../Service/apiService";
import { Reservoir } from "../Model/reservoir";
import { Sector } from "../Model/sector";

export function AquaViaContextProvider({ children }: { children: ReactNode }) {
    const [provinces, setProvinces] = useState<string[]>([]);
    const [reservoirs, setReservoirs] = useState<Reservoir[]>([]);
    const [currentProvince, setCurrentProvince] = useState<string>('');
    const [sectors, setSectors] = useState<any[]>([]);
    const [currentSector, setCurrentSector] = useState<Sector | null>(null);

    const api = new ApiService();

    useEffect(() => {
        api.getProvinces()
            .then(res => { setProvinces(res.data.provinces); })
            .catch(e => console.error(e));

        api.getReservoirs()
            .then(res => {
                setReservoirs(res.data.map((reservoir: any) =>
                    new Reservoir(reservoir.Latitud, reservoir.Longitud, reservoir['Nombre de la Presa']))
                );
            })
            .catch(e => console.error(e));
    }, [])

    useEffect(() => {
        api.getSectors(currentProvince)
            .then(res => {
                setSectors(res.data.map((sector: any) =>
                    new Sector(sector.Latitud, sector.Longitud, sector.Sector))
                );
            })
            .catch(e => console.error(e));
    }, [currentProvince])

    const AquaViaContextValues: AquaViaContextType = {
        provinces: provinces,
        setProvinces: setProvinces,
        reservoirs: reservoirs,
        setReservoirs: setReservoirs,
        currentProvince: currentProvince,
        setCurrentProvince: setCurrentProvince,
        sectors: sectors,
        setSectors: setSectors,
        currentSector: currentSector,
        setCurrentSector: setCurrentSector
    }

    return (
        <AquaViaContext.Provider value={AquaViaContextValues}>
            {children}
        </AquaViaContext.Provider>
    )
}
