namespace Workshop15noiembrie.Controllers;

public record UserRequest(string FirstName, string LastName, string Role, string Gender, string Email, long PhoneNumber, string Password);

public class UserRequest1
{
    public string Id { get;  private set; } //this will be primary key
    public string FirstName { get; private set; }
    public string LastName { get;  private set; }
    public string Role { get;  private set; }
    public string Gender { get;  private set; }
    public string Email { get;  private set; }
    public long PhoneNumber { get;  private set; }
    public string Password { get;  private set; }
}

public struct Student2
{
    public string Id { get;  private set; } //this will be primary key
    public string FirstName { get; private set; }
    public string LastName { get;  private set; }
    public string Role { get;  private set; }
    public string Gender { get;  private set; }
    public string Email { get;  private set; }
    public long PhoneNumber { get;  private set; }
    public string Password { get;  private set; }
}

