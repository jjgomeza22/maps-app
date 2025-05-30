export interface DirectionsResponse {
    code:      string;
    routes:    Route[];
    waypoints: Waypoint[];
}

export interface Route {
    legs:        Leg[];
    weight_name: string;
    geometry:    Geometry;
    weight:      number;
    duration:    number;
    distance:    number;
}

export interface Geometry {
    coordinates: Array<[number, number]>;
    type:        string;
}

export interface Leg {
    steps:    any[];
    weight:   number;
    summary:  string;
    duration: number;
    distance: number;
}

export interface Waypoint {
    hint:     string;
    location: number[];
    name:     string;
    distance: number;
}
