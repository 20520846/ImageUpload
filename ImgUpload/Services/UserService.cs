using ImgUpload.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MongoDB.Bson;
using System.Threading.Tasks;
using ImgUpload.Services;

namespace ImgUpload.Services
{
    public class UserService : MongoDBService
    {
        private readonly IMongoCollection<User> _userCollection;
        public UserService(IOptions<MongoDBSettings> settings) : base(settings)
        {
            _userCollection = database.GetCollection<User>("User");
        }

        public async Task<User> GetUserById(string id)
        {
            return await _userCollection.Find(u => u.Id == id).FirstOrDefaultAsync();
        }

        public async Task<List<User>> GetAllUser(){
            return await _userCollection.Find(a => true).ToListAsync();          
        }

        public async Task<User> CreateUser(User user){
            await _userCollection.InsertOneAsync(user);
            return user;
        }

        public async Task<User> UpdateUser(string id, User user){
            await _userCollection.ReplaceOneAsync(a => a.Id == id, user);
            return user;
        }

        public async Task<User> DeleteUser (string id){
            return await _userCollection.FindOneAndDeleteAsync(a => a.Id == id);
        }
    }
}
