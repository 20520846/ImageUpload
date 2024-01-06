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
    [Route("image")]
    public class ImageController : ControllerBase
    {
        private readonly ImageService _imageService;
        public ImageController(ImageService imageService)
        {
            _imageService = imageService;
        }

        [HttpGet("getimage/{id}")]
        public async Task<Image> GetImageById(string id)
        {
            return await _imageService.GetImageById(id);
        }

        [HttpGet("getallimage")]
        public async Task<List<Image>> GetAllImage()
        {
            return await _imageService.GetAllImage();
        }

        [HttpPost("upload")]
        public async Task<IActionResult> Upload([FromBody] Image image)
        {
            try
            {
                await _imageService.Upload(image);
                return CreatedAtAction(nameof(GetImageById), new { id = image.Id }, image);

            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> Update(string id, [FromBody] Image image)
        {
            try
            {
                var existImage = await _imageService.GetImageById(id);
                if (existImage == null)
                {
                    return NotFound();
                }

                image.Id = existImage.Id;
                var updatedImage = await _imageService.Update(id, image);

                return Ok(updatedImage);
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }
    }
}
