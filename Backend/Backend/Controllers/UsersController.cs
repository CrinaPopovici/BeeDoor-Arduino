using Microsoft.AspNetCore.Mvc;
using Workshop15noiembrie.Db;

namespace Workshop15noiembrie.Controllers;
[Route("users")]
[ApiController]
public class UsersController : ControllerBase
{
    private static readonly List<User> _list = new() 
    {
        Db.User.Create("Petraru","Maria","Employee","Male","s@gmail.com",03435,"herl"), 
        Db.User.Create("Neamtu","Andrei","Employer","Male","s@gmail.com",03435,"hhkerl")
    };

    [HttpGet(Name="GetAllUsers")]
    public ActionResult GetUsers()
    {
        return Ok(_list);
    }
    [HttpGet("{Id}")]
    public ActionResult GetUsers(string Id)
    {
        var user = _list.FirstOrDefault(s => s.Id == Id);
        if (user is null)
        {
            return NotFound($"User with id: {Id} does not exist");
        }
    
        return Ok(user);
    
    }
    [HttpPost]
    public ActionResult CreateUsers([FromBody] UserRequest userRequest)
    {
        User user = null;
        try
        { 
            user = Db.User.Create(userRequest.FirstName, userRequest.LastName, userRequest.Role, userRequest.Gender, userRequest.Email, userRequest.PhoneNumber,  userRequest.Password ); 
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }

        _list.Add(user);
         return Ok(userRequest);
    }

    [HttpDelete("{Id}")]
    public ActionResult RemoveUser(string Id)
    {
        var user = _list.FirstOrDefault(s => s.Id == Id);

        if (user is null)
        {
            return NotFound($"User with id: {Id} does not exist");
        }

        _list.Remove(user);
        return Ok($"User with id: {Id} was removed");
    }
    
    [HttpPatch("{Id}")]
    public ActionResult UpdateUserFirstName(string Id, [FromBody] string firstName)
    {
        var user = _list.FirstOrDefault(s => s.Id == Id);

        if (user is null)
        {
            return NotFound($"User with id: {Id} does not exist");
        
        }

        try
        {
            user.SetFirstName(firstName);
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }

        return Ok(user);

    }
    [HttpPut("{Id}")]  
    public ActionResult UpdateUser(string Id, [FromBody] UserRequest userRequest) 
    {
        var user = _list.FirstOrDefault(s => s.Id == Id);
        
        if (user is null)
        {
            return NotFound($"User with id {Id} does not exist");
        }

        try
        {
            user.SetFirstName(userRequest.FirstName);
            user.SetLastName(userRequest.LastName);
            user.SetRole(userRequest.Role);
            user.SetGender(userRequest.Gender);
            user.SetEmail(userRequest.Email);
            user.SetPhoneNumber(userRequest.PhoneNumber);
            user.SetPassword(userRequest.Password);

        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }

        return Ok(user);
    }
    
}
   










