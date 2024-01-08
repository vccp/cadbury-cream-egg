using System.Reflection;
using Microsoft.AspNetCore.Mvc;

namespace Cadbury.CremeEgg.Quiz;


public interface IMarketIdentifier
{
    public Market GetMarket();
}

public class DomainTldMarketIdentifier(IHttpContextAccessor context) : IMarketIdentifier
{
    public Market GetMarket()
    {
        return context.HttpContext!.Request.Host.Host.EndsWith(".ie", StringComparison.InvariantCultureIgnoreCase) ? Market.IE : Market.UK;
    }
}