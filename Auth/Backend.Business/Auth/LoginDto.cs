using System.ComponentModel.DataAnnotations;

namespace Backend.Business.Auth
{
    public class LoginDto
    {
        [Required(ErrorMessage = "Email is required")]
        public string UsernameOrEmail { get; set; }
        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set; }

    }
}
