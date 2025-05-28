import { useReducer, type JSX } from "react";

import type { Map } from "@maptiler/sdk";

import { MapContext } from "./MapContext";
import { mapReducer } from "./MapReducer";

interface Props {
    children: JSX.Element | JSX.Element[]
}

export interface MapState {
    isMapReady: boolean,
    map?: Map,
}

const INITIAL_STATE: MapState = {
    isMapReady: false,
    map: undefined
}

export const MapProvider = ({ children }: Props) => {

    const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE);

    const setMap = (map: Map) => {
        dispatch({ type: "setMap", payload: map })
    }

    return (
        <MapContext.Provider
            value={{
                ...state,

                //methods
                setMap
            }}
        >
            { children }
        </MapContext.Provider>
    );
};