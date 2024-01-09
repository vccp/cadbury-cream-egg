namespace Cadbury.CremeEgg.Quiz;

public static class WorkingEnvironmentExtensions
{
    public static bool IsLocal(this IHostEnvironment hostEnvironment)
    {
        ArgumentNullException.ThrowIfNull(hostEnvironment);

        return hostEnvironment.IsEnvironment(CustomEnvironments.Local);
    }
}
