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
});