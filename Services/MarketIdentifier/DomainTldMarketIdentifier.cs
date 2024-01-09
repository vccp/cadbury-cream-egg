using System.Reflection;
using Microsoft.AspNetCore.Mvc;

namespace Cadbury.CremeEgg.Quiz;

public class DomainTldMarketIdentifier(IHttpContextAccessor context) : IMarketIdentifier
{
    public Market GetMarket()
    {
        return context.HttpContext!.Request.Host.Host.EndsWith(".ie", StringComparison.InvariantCultureIgnoreCase) ? Market.IE : Market.UK;
    }
}