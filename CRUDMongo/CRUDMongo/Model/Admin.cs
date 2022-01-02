using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace CRUDMongo.Model
{
    public class Admin
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        [BsonElement]
        public string email { get; set; }
        [BsonElement]
        public string password { get; set; }
        [BsonElement]
        public string name { get; set; }
        [BsonElement]
        public string phone { get; set; }
        [BsonElement]
        public string address { get; set; }
    }
}
