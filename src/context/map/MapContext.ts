import type { Map } from "@maptiler/sdk";
import { createContext } from "react";

interface MapContextProps {
    isMapReady: boolean,
    map?: Map,

    //methods
    setMap: (map: Map) => void,
    getRouteBetweenPoints: (start: [number, number], end: [number, number]) => Promise<void>
}

export const MapContext = createContext( {} as MapContextProps);