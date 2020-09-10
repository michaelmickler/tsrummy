using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace tsrummy.Hubs
{
    public class GameHub : Hub
    {
      public async Task SendMessage(string username, string message)
        {
            await Clients.All.SendAsync("receiveMessage", username, message);
        }

    }
}