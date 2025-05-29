import { MapView, MyLocationButton, ReactLogo, SearchBar } from "../components";

export const HomeScreen = () => {
  return (
    <div>
        <MapView />
        <SearchBar />
        <MyLocationButton />
        <ReactLogo />
    </div>
  );
};
