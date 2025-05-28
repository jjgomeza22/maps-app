import { useReducer, type JSX } from "react";

import { Marker, Popup, type Map } from "@maptiler/sdk";

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
        const popUp = new Popup()
            .setHTML(`
                <h4>Aquí estoy</h4>
                <p>En algún ligar de mundo</p>
            `)
        new Marker({
            color: '#61dafb'
        })
            .setLngLat(map.getCenter())
            .setPopup(popUp)
            .addTo(map);

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