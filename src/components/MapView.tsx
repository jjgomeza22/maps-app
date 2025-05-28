import { useContext, useLayoutEffect, useRef } from "react";
import { MapContext, PlacesContext } from "../context";
import { Loading } from "./Loading";
import { Map, MapStyle } from '@maptiler/sdk';

export const MapView = () => {

  const { isLoading, userLocation } = useContext( PlacesContext );
  const { setMap } = useContext(MapContext);
  const mapDiv = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!isLoading) {
      const map = new Map({
        container: mapDiv.current!, // container's id or the HTML element in which the SDK will render the map
        style: MapStyle.STREETS,
        center: userLocation, // starting position [lng, lat]
        zoom: 14 // starting zoom
      });
      setMap(map);
    }
  }, [ isLoading ])

  if (isLoading) {
    return (<Loading />);
  }

  return (
    <div 
      ref={ mapDiv }
      style={{
        height: '100vh',
        left: 0,
        position: 'fixed',
        top: '0',
        width: '100vw'
      }}
    >
        { userLocation?.join(',') }
    </div>
  );
};
