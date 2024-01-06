using ImgUpload.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MongoDB.Bson;
using System.Threading.Tasks;

namespace ImgUpload.Services
{
    public class ImageService : MongoDBService
    {
        private readonly IMongoCollection<BsonDocument> _imageCollection;
        public ImageService(IOptions<MongoDBSettings> settings) : base(settings)
        {
            _imageCollection = database.GetCollection<BsonDocument>("Image");
        }

        public async Task<Image> GetImageById(string id)
        {
            var image = await _imageCollection.Find(new BsonDocument("_id", new ObjectId(id))).FirstOrDefaultAsync();
            return new Image
            {
                ImageData = image.GetValue("ImageData").AsByteArray
            };
        }

        public async Task<Image> GetImageInfoById(string id)
        {
            var image = await _imageCollection.Find(new BsonDocument("_id", new ObjectId(id))).FirstOrDefaultAsync();
            return new Image
            {
                Id = image.GetValue("_id").AsString,
                ImageName = image.GetValue("ImageName").AsString,
                ImageDes = image.GetValue("ImageDes").AsString
            };
        }

        public async Task<List<Image>> GetAllImageInfo()
        {
            var imageList = await _imageCollection.Find(new BsonDocument()).ToListAsync();
            var result = new List<Image>();
            foreach (var image in imageList)
            {
                result.Add(new Image
                {
                    Id = image.GetValue("_id").AsObjectId.ToString(),
                    ImageName = image.GetValue("ImageName").AsString,
                    ImageDes = image.GetValue("ImageDes").AsString
                });
            }
            return result;
        }
        
        public void UploadImage(Stream stream, string imageName, string imageDes)
        {
            using (var memoryStream = new MemoryStream())
            {
                stream.CopyTo(memoryStream);

                var imageDocument = new BsonDocument
                {
                    {"ImageName", imageName},
                    {"ImageDes", imageDes},
                    {"ImageData", memoryStream.ToArray()}
                };

                _imageCollection.InsertOne(imageDocument);
            }
        }    
    }
}
