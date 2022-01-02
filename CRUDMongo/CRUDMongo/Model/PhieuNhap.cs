using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace CRUDMongo.Model
{
    public class PhieuNhap
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        [BsonElement]
        public string maPhieu { get; set; }
        [BsonElement]
        public string ngayNhap { get; set; }
        [BsonElement]
        public string tenNV { get; set; }
        [BsonElement]
        public int tongTien { get; set; }
    }
}
