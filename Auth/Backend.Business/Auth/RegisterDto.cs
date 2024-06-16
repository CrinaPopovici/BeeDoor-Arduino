using System.ComponentModel.DataAnnotations;

namespace Backend.Business.Auth
{
    public class RegisterDto
    {
        public string FullName { get; set; }
        public string Username { get; set; }
        public string Role { get; set; }
        public string Gender { get; set; }

        [EmailAddress]
        [Required(ErrorMessage = "Email is required")]
        public string Email { get; set; }
        public long PhoneNumber { get; set; }
        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set; }
    }
}
