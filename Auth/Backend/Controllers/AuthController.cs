using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Backend.Business.Auth;
using Backend.DataAccess.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
namespace Backend.Controllers
{

    [ApiController]
    [Route("api/auth")]
    public class AuthController(UserManager<User> userManager, RoleManager<Role> roleManager, IConfiguration configuration) : ControllerBase
    {
        [HttpPost]
        [Route("login")]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<TokenDto>> Login(LoginDto request)
        {
            var user = await userManager.FindByNameAsync(request.UsernameOrEmail) ??
                             await userManager.FindByEmailAsync(request.UsernameOrEmail);

            if (user is null)
            {
                return NotFound();
            }

            var wrongPassword = !await userManager.CheckPasswordAsync(user, request.Password);
            if (wrongPassword)
            {
                return Unauthorized();
            }

            var userRoles = await userManager.GetRolesAsync(user);

            var authClaims = new List<Claim>
        {
            new("id", user.Id),
            new("username", user.UserName),
            new("email", user.Email),
            new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

            authClaims.AddRange(userRoles.Select(userRole => new Claim("role", userRole)));

            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JWT:Secret"]));

            var token = new JwtSecurityToken(
                configuration["JWT:ValidIssuer"],
                configuration["JWT:ValidAudience"],
                expires: DateTime.Now.AddHours(5),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
            );

            return Ok(new TokenDto
            {
                Token = new JwtSecurityTokenHandler().WriteToken(token),
                Expiration = token.ValidTo
            }); ;
        }

        [HttpPost]
        [Route("register")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<UserDto>> Register(RegisterDto request)
        {
            var rolesDoesNotExist = !await roleManager.RoleExistsAsync("admin");
            var admins = await userManager.GetUsersInRoleAsync("admin");

            if (rolesDoesNotExist || admins.Count == 0)
            {
                await AddRoles();
                return await AddUser(request, true);
            }

            var userWithSameName = await userManager.FindByNameAsync(request.Username);
            var userWithSameEmail = await userManager.FindByEmailAsync(request.Email);
            var userExists = userWithSameEmail is not null || userWithSameName is not null;
            if (userExists)
            {
                return BadRequest("User already exists, please login");
            }

            return await AddUser(request, false);
        }

        private async Task AddRoles()
        {
            var role = new Role { Id = Guid.NewGuid().ToString(), Name = "admin" };
            var result = await roleManager.CreateAsync(role);
            if (!result.Succeeded)
            {
                Console.WriteLine(result.Errors);
            }
        }

        private async Task<ActionResult<UserDto>> AddUser(RegisterDto model, bool makeAdmin)
        {
            var puser = new User { UserName = model.Username, Email = model.Email };

            var result = await userManager.CreateAsync(puser, model.Password);
            if (!result.Succeeded)
            {
                var errors = result.Errors.Select(error => error.Description);
                return new UserDto { Errors = errors };
            }

            var user = await userManager.FindByNameAsync(puser.UserName);
            if (makeAdmin)
            {
                await userManager.AddToRoleAsync(user, "admin");
            }

            return Created("", new UserDto { Id = user.Id, Email = user.Email, UserName = user.UserName });
        }

    }
}
