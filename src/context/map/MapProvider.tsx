import { useContext, useEffect, useReducer, type JSX } from "react";

import { Marker, Popup, type Map } from "@maptiler/sdk";

import { MapContext } from "./MapContext";
import { mapReducer } from "./MapReducer";
import { PlacesContext } from "../places/PlacesContext";

interface Props {
    children: JSX.Element | JSX.Element[]
}

export interface MapState {
    isMapReady: boolean,
    map?: Map,
    markers: Marker[];
}

const INITIAL_STATE: MapState = {
    isMapReady: false,
    map: undefined,
    markers: []
}

export const MapProvider = ({ children }: Props) => {

    const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE);
    const { places } = useContext(PlacesContext);

    useEffect(() => {
        state.markers.forEach((marker) => marker.remove());
        const newMarkers: Marker[] = [];

        places.forEach((place) => {
            const popUp = new Popup()
            .setHTML(`
                <h4>${place.text_es}</h4>
                <p>${place.place_name_es}</p>
            `);
            const newMarker = new Marker({
                color: '#61dafb'
            })
            .setLngLat(place.center)
            .setPopup(popUp)
            .addTo(state.map!)

            newMarkers.push(newMarker);
        });

        dispatch({ type: "setMarkers", payload: newMarkers });
    }, [places])

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
    };

    return (
        <MapContext.Provider
            value={{
                ...state,

                //methods
                setMap,
            }}
        >
            { children }
        </MapContext.Provider>
    );
};