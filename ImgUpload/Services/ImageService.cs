using ImgUpload.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MongoDB.Bson;
using System.Threading.Tasks;

namespace ImgUpload.Services
{
    public class ImageService : MongoDBService
    {
        private readonly IMongoCollection<Image> _imageCollection;
        public ImageService(IOptions<MongoDBSettings> settings) : base(settings)
        {
            _imageCollection = database.GetCollection<Image>("Image");
        }

        public async Task<Image> GetImageById(string id)
        {
            return await _imageCollection.Find(u => u.Id == id).FirstOrDefaultAsync();
        }

        public async Task<List<Image>> GetAllImage(){
            return await _imageCollection.Find(a => true).ToListAsync();          
        }

        public async Task<Image> Upload(Image image){
            await _imageCollection.InsertOneAsync(image);
            return image;
        }

        public async Task<Image> Update(string id, Image image){
            await _imageCollection.ReplaceOneAsync(a => a.Id == id, image);
            return image;
        }
    }
}
