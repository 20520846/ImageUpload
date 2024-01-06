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
        public async Task<IActionResult> GetImageById(string id)
        {
            var image = await _imageService.GetImageById(id);
            return File(image.ImageData, "image/jpeg");
        }


        [HttpGet("getimageinfo/{id}")]
        public async Task<IActionResult> GetImageInfoById(string id)
        {
            var imageInfo = await _imageService.GetImageInfoById(id);
            return Ok(imageInfo);
        }

        [HttpGet("getallimageinfo")]
        public async Task<IActionResult> GetAllImageInfo()
        {
            var imageList = await _imageService.GetAllImageInfo();
            return Ok(imageList);
        }

        [HttpPost("uploadimage")]
        public IActionResult UploadImage([FromForm] IFormFile file, [FromForm] string imageName, [FromForm] string imageDes)
        {
            _imageService.UploadImage(file.OpenReadStream(), imageName, imageDes);
            return Ok();
        }
    }
}
