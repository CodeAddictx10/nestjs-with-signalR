using Microsoft.AspNetCore.SignalR;

namespace Signalr;
public sealed class PriceHub: Hub
{
  public override async Task OnConnectedAsync()
  {
    await Task.Run(() => Console.WriteLine($"New client connected"));
  }
  public async Task NewPrice(object data)
  {
    await Clients.Others.SendAsync("newprice", data);
  }
}