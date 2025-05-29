import type { Map } from "@maptiler/sdk";
import { createContext } from "react";

interface MapContextProps {
    isMapReady: boolean,
    map?: Map,

    //methods
    setMap: (map: Map) => void,
}

export const MapContext = createContext( {} as MapContextProps);