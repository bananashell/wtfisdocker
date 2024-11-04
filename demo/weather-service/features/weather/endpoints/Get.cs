using System.Net;
using FastEndpoints;

namespace WeatherService.Endpoints.Api.Weather;

public struct WeatherResponse
{
    public required string City { get; set; }
    public decimal Celcius { get; set; }
}

public class WeatherEndpoint : Endpoint<EmptyRequest, WeatherResponse>
{
    private Random random = new();

    public override void Configure()
    {
        Get("/api/weather");
        AllowAnonymous();
    }

    public override async Task HandleAsync(EmptyRequest req, CancellationToken ct)
    {
        await this.SendOkAsync(
            new WeatherResponse
            {
                City = CityList.Cities[random.Next(CityList.Cities.Count)],
                Celcius = random.Next(0, 50),
            },
            cancellation: ct
        );
    }
}

public static class CityList
{
    public static readonly List<string> Cities =
    [
        "New York",
        "Los Angeles",
        "Stockholm",
        "London",
        "Berlin",
        "Madrid",
        "Rome",
        "Paris",
        "Vienna",
        "Amsterdam",
        "Brussels",
        "Copenhagen",
        "Dublin",
    ];
}
