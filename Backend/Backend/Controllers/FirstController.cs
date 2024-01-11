using Microsoft.AspNetCore.Mvc;

namespace Workshop15noiembrie.Controllers;
[Route("base")]
[ApiController]
public class FirstController : ControllerBase
{
    public static List<string> _list = new List<string>()
    {
        "first", "second"
    };
    [HttpGet] 
    public ActionResult Get() 
    {
        return Ok(_list);
    }
    [HttpPost] 
    public ActionResult Post([FromBody] string str) 
    {
        _list.Add(str);
        return Ok(_list);
    }
    
}