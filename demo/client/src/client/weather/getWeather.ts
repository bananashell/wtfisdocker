import { weatherServiceEndpointsApiWeatherWeatherEndpoint } from "./generated";

export const getWeather = async () => {
    const res = await weatherServiceEndpointsApiWeatherWeatherEndpoint({});
    if (!res.data) {
        throw new Error("No data");
    }

    return res.data;
};
