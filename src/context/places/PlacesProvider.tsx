import { useEffect, useReducer, type JSX } from "react";
import { PlacesContext } from "./PlacesContext";
import { getUserLocation } from "../../helpers";
import { placesReducer } from "./placesReducer";
import { searchApi } from "../../apis";

export interface PlacesState {
    isLoading: boolean;
    userLocation?: [number, number],
}

interface Props {
  children: JSX.Element | JSX.Element[]
}

const INITIAL_STATE: PlacesState = {
    isLoading: true,
    userLocation: undefined
}

export const PlacesProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(placesReducer, INITIAL_STATE);

  useEffect(() => {
    getUserLocation()
      .then(lngLat => dispatch({ type: "setUserLocation", payload: lngLat }));
  }, []);

  const searchPlacesByTerm = async (query: string) => {
    if (query.length === 0) return []; //TODO: limpiar state
    if (!state.userLocation) throw new Error('No hay ubicación del users')

    const resp = await searchApi.get(`/${query}.json`, {
      params: {
        proximity: state.userLocation.join(',')
      }
    });

    console.log(resp.data)
  }

  return (
    <PlacesContext.Provider value={{
      ...state,
      searchPlacesByTerm
    }}>
      { children }
    </PlacesContext.Provider>
  );
};
