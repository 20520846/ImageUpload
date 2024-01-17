using Microsoft.AspNetCore.Mvc;
using ImgUpload.Models;
using ImgUpload.Services;
using Microsoft.AspNetCore.Http;
using MongoDB.Bson;
using MongoDB.Driver;
using System.IO;


namespace ImgUpload.Controllers
{
    [ApiController]
    [Route("user")]

    public class UserController : ControllerBase
    {
        private readonly UserService _userService;
        public UserController(UserService userService)
        {
            _userService = userService;
        }

        [HttpGet("getuser/{id}")]
        public async Task<User> GetUserById(string id)
        {
            return await _userService.GetUserById(id);
        }

        [HttpGet("getalluser")]
        public async Task<List<User>> GetAllUser()
        {
            return await _userService.GetAllUser();
        }

        [HttpPost("createuser")]
        public async Task<IActionResult> CreateUser([FromBody] User user)
        {
            try
            {
                await _userService.CreateUser(user);
                return CreatedAtAction(nameof(GetUserById), new { id = user.Id }, user);

            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        [HttpPut("updateuser/{id}")]
        public async Task<IActionResult> UpdateUser(string id, [FromBody] User user)
        {
            try
            {
                var existUser = await _userService.GetUserById(id);
                if (existUser == null)
                {
                    return NotFound();
                }

                user.Id = existUser.Id;
                await _userService.UpdateUser(id, user);
                return Ok(new { message = "User updated successfully" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        [HttpDelete("deleteuser/{id}")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            try
            {
                var existUser = await _userService.GetUserById(id);
                if (existUser == null)
                {
                    return NotFound();
                }

                await _userService.DeleteUser(id);
                return Ok(new { message = "User deleted successfully" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }
    }
}
