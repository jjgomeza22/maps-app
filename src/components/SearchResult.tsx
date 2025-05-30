import { useContext, useState } from "react";
import { MapContext, PlacesContext } from "../context";
import { LoadingPlaces } from "./LoadingPlaces";
import type { Feature } from "../interfaces/places";

export const SearchResult = () => {
    const { places, isLoadingPlaces, userLocation } = useContext(PlacesContext);
    const { map, getRouteBetweenPoints } = useContext(MapContext);

    const [activeId, setActiveId] = useState('');

    const onPlaceClicked = (place: Feature) => {
        setActiveId(place.id);
        map?.flyTo({
            zoom: 14,
            center: place.center
        });
    }

    if (isLoadingPlaces) {
        return (<LoadingPlaces />);
    }

    const getRoute = (place: Feature) => {
        if (!userLocation) return;
        const start = userLocation;
        const end = place.center;
        getRouteBetweenPoints(start, end);
    }

    return (
        <ul className={`list-group mb-0 ${places.length === 0 ? '' : 'mt-3'}`}>
            { places.map((place) => (
                <li
                    onClick={ () => onPlaceClicked(place) }
                    key={place.id}
                    className={`list-group-item list-group-item-action cursor-pointer ${activeId === place.id ? 'active' : ''}`}
                >
                    <h6> { place.text_es } </h6>
                    <p style={{ fontSize: '12px' }}> { place.place_name } </p>
                    <button onClick={ () => getRoute(place)}  className={`btn btn-sm ${activeId === place.id ? 'btn-outline-light' : 'btn-outline-primary'}`}>Direcciones</button>
                </li>
            )) }
        </ul>
    );
};