import { useContext, useEffect, useReducer, type JSX } from "react";

import { coordinates, data, LngLatBounds, Marker, Popup, type Map, type SourceSpecification } from "@maptiler/sdk";

import { MapContext } from "./MapContext";
import { mapReducer } from "./MapReducer";
import { PlacesContext } from "../places/PlacesContext";
import { directionsApi } from "../../apis";
import type { DirectionsResponse } from "../../interfaces/directions";

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

    const getRouteBetweenPoints = async (start: [ number, number ], end: [ number, number ]): Promise<void> => {
        const response = await directionsApi.get<DirectionsResponse>(`/${start.join(',')};${end.join(',')}`);
        const { distance, duration, geometry } = response.data.routes[0];
        const { coordinates: coords } = geometry;

        let kms = distance / 1000;
            kms = Math.round(kms * 100);
            kms /= 100;

        const minutes = Math.floor( duration / 60 );
        const bounds = new LngLatBounds(
            start,
            start
        );

        coords.forEach((coord) => bounds.extend(coord));

        state.map?.fitBounds(bounds, {
            padding: 200
        });

        //Polyline
        const sourceData: SourceSpecification = {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: [
                    {
                        type: 'Feature',
                        properties: {},
                        geometry: {
                            type: 'LineString',
                            coordinates: coords
                        }
                    }
                ]
            }
        }

        if (state.map?.getLayer('RouteString')) {
            state.map.removeLayer('RouteString');
            state.map.removeSource('RouteString');
        }

        state.map?.addSource('RouteString', sourceData);
        state.map?.addLayer({
            id: 'RouteString',
            type:'line',
            source: 'RouteString',
            layout: {
                'line-cap': 'round',
                'line-join': 'round'
            },
            paint: {
                'line-color': 'black',
                "line-width": 3
            }
        })
    }

    return (
        <MapContext.Provider
            value={{
                ...state,

                //methods
                setMap,
                getRouteBetweenPoints
            }}
        >
            { children }
        </MapContext.Provider>
    );
};