import type { MapState } from "./MapProvider";
import type { Map, Marker } from "@maptiler/sdk";

type MapAction =
    | { type: 'setMap', payload: Map }
    | { type: 'setMarkers', payload: Marker[] }

export const mapReducer = (state: MapState, action: MapAction): MapState => {
    switch (action.type) {
        case 'setMap':
            return {
                ...state,
                isMapReady: true,
                map: action.payload
            };
        case 'setMarkers':
            return {
                ...state,
                markers: action.payload
            };
        default:
            return state;
    }
};