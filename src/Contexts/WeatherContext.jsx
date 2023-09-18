import { createContext } from "react";

const WeatherContext = createContext({
    searchText:"",
    wiki:[]
});

export default WeatherContext;