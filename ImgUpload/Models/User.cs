namespace ImgUpload.Models;
using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

public class User
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]

    public string? Id { get; set; } 
    public string? UserName { get; set; } = string.Empty;
    public string? Email { get; set; } = string.Empty;
    public string? Avatar { get; set; } = string.Empty;

    public List<Image>? Gallery { get; set; } = new List<Image>();

    public DateTime CreatedAt { get; set; } = DateTime.Now;
}
