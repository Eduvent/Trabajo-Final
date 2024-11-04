import { createContext } from "react";
import { Reservoir } from "../Model/reservoir";
import { Sector } from "../Model/sector";

export type AquaViaContextType = {
    provinces: string[],
    setProvinces: (val: string[]) => void,
    reservoirs: Reservoir[],
    setReservoirs: (val: Reservoir[]) => void,
    currentProvince: string,
    setCurrentProvince: (val: string) => void,
    sectors: Sector[],
    setSectors: (val: Sector[]) => void,
    currentSector: Sector | null,
    setCurrentSector: (val: Sector) => void,
    nearestReservoir: Sector | null,
    setNearestReservoir: (val: Reservoir | null) => void,
    minDistance: number,
    setMinDistance: (val: number) => void
}

/*default values */
export const AquaViaContext = createContext<AquaViaContextType>({
    provinces: [],
    setProvinces: () => { },
    reservoirs: [],
    setReservoirs: () => { },
    currentProvince: '',
    setCurrentProvince: () => { },
    sectors: [],
    setSectors: () => { },
    currentSector: null,
    setCurrentSector: () => { },
    nearestReservoir: null,
    setNearestReservoir: () => { },
    minDistance: 0,
    setMinDistance: () => { }
});