namespace Workshop15noiembrie.Db;

public class User
{
    public string FirstName { get; private set; }
    public string LastName { get;  private set; }
    public string Id { get;  private set; } //this will be primary key
    public string Role { get;  private set; }
    public string Gender { get;  private set; }
    public string Email { get;  private set; }
    public long PhoneNumber { get;  private set; }
    public string Password { get;  private set; }
    
    private User()
    {
        
    }

    public void SetFirstName(string firstName)
    {
        if (string.IsNullOrWhiteSpace(firstName))
        {
            throw new Exception("Last name can't be empty");
            
        }

        FirstName = firstName;
    }
    public void SetLastName(string lastName)
    {
        if (string.IsNullOrWhiteSpace(lastName))
        {
            throw new Exception("Last name can't be empty");
            
        }

        LastName = lastName;
    }
    public void SetRole(string role)
    {
        if (string.IsNullOrWhiteSpace(role))
        {
            throw new Exception("Role can't be empty");
            
        }

        Role = role;
    }
    public void SetGender(string gender)
    {
        if (string.IsNullOrWhiteSpace(gender))
        {
            throw new Exception("Gender can't be empty");
            
        }

        Gender = gender;
    }
    
    public void SetEmail(string email)
    {
        if (string.IsNullOrWhiteSpace(email))
        {
            throw new Exception("Email can't be empty");
            
        }

        Email = email;
    }
    public void SetPhoneNumber(long phoneNumber)
    {
        if (long.IsNegative(phoneNumber))
        {
            throw new Exception("Phone number can't be empty");
            
        }

        PhoneNumber = phoneNumber;
    }
    public void SetPassword(string password)
    {
        if (string.IsNullOrWhiteSpace(password))
        {
            throw new Exception("Password can't be empty");
            
        }

        Password = password;
    }
    public static User Create(string firstName, string lastName, string role, string gender, string email, long phoneNumber, string password)
    {
        if (string.IsNullOrWhiteSpace(firstName))
        {
            throw new Exception("First name can't be empty");
        }
        if (string.IsNullOrWhiteSpace(lastName))
        {
            throw new Exception("Last name can't be empty");
        }
        if (string.IsNullOrWhiteSpace(role))
        {
            throw new Exception("Role can't be empty");
        }

        if (string.IsNullOrWhiteSpace(gender))
        {
            throw new Exception("Gender can't be empty");
        }

        if (string.IsNullOrWhiteSpace(email))
        {
            throw new Exception("Email can't be empty");
        }

        if (long.IsNegative(phoneNumber))
        {
            throw new Exception("Phone number can't be empty");
        }

        if (string.IsNullOrWhiteSpace(password))
        {
            throw new Exception(" Password can't be empty");
        }

        return new User
        {
            Id = Guid.NewGuid().ToString(),
            FirstName = firstName,
            LastName = lastName,
            Role = role,
            Gender = gender,
            Email = email,
            PhoneNumber = phoneNumber,
            Password = password
        };
    }
    
}