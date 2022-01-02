using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace CRUDMongo.Model
{
    public class SanPham
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        [BsonElement]
        public string maSP { get; set; }
        [BsonElement]
        public string tenSP { get; set; }
        [BsonElement]
        public string donGia { get; set; }
        [BsonElement]
        public string soLuong { get; set; }
        [BsonElement]
        public string maPN { get; set; }
    }
}
