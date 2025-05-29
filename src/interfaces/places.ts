export interface PlacesResponse {
    type:        string;
    features:    Feature[];
    query:       string[];
    attribution: string;
}

export interface Feature {
    type:                 string;
    properties:           Properties;
    geometry:             Geometry;
    bbox:                 number[];
    center:               [number, number];
    place_name:           string;
    place_type:           string[];
    relevance:            number;
    id:                   string;
    text:                 string;
    place_type_name:      Array<null | string>;
    context:              Context[];
    language?:            string;
    text_es:              string;
    language_es?:         string;
    place_name_es:        string;
    matching_text?:       string;
    matching_place_name?: string;
}

export interface Context {
    ref:           string;
    id:            string;
    text:          string;
    country_code?: string;
    wikidata?:     string;
    kind?:         string;
    text_es:       string;
    language?:     string;
    language_es?:  string;
    categories?:   string[];
    "osm:tags"?:   OsmTags;
}

export interface OsmTags {
    population?:   string;
    wikipedia?:    string;
    sqkm?:         string;
    place?:        string;
    intermittent?: string;
    boat?:         string;
    waterway?:     string;
}

export interface Geometry {
    type:        string;
    coordinates: number[];
}

export interface Properties {
    ref:               string;
    country_code:      string;
    wikidata?:         string;
    kind:              string;
    place_type_name:   Array<null | string>;
    "osm:place_type"?: string;
}
