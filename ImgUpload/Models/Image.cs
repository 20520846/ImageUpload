namespace ImgUpload.Models;
using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

public class Image
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]

    public string? Id { get; set; } 
    public string? ImageName { get; set; } = null;
    public string? ImageDes { get; set; } = null;
    public string? ImageURL { get; set; } = null;
}
