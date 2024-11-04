"use server";

import { getWeather } from "@/client/weather/getWeather";

export const WeatherInfo = async () => {
    const { city, celcius } = await getWeather();

    return (
        <section className="text-3xl">
            The temperature in <span className="font-bold">{city}</span> is{" "}
            {celcius}°C
        </section>
    );
};
