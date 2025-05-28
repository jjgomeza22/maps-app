import { useContext } from "react";
import { MapContext, PlacesContext } from "../context";

export const MyLocationButton = () => {
    const { map, isMapReady } = useContext(MapContext);
    const { userLocation } = useContext(PlacesContext);
    const onClick = () => {
        if (!isMapReady) throw new Error('Mapa no está listo');
        if (!userLocation) throw new Error('No hay ubicación del usuario');

        map?.flyTo({
            zoom: 14,
            center: userLocation
        })
    }

    return (
        <button
            className="btn btn-primary"
            onClick={onClick}
            style={{
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                zIndex: 999,
                backgroundColor: '#61dafb',
                color: '#000000'
            }}
        >
            Mi Ubicación
        </button>
    );
};