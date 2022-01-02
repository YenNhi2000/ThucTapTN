using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CRUDMongo.Model;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;

namespace CRUDMongo.Services
{
    public class DeliveryService
    {
        private readonly IMongoCollection<PhieuXuat> _phieuxuat;
        public DeliveryService(IConfiguration configuration)
        {
            var client = new MongoClient(configuration.GetConnectionString("CrudMongoDBCon"));
            var database = client.GetDatabase("quanlykho");
            _phieuxuat = database.GetCollection<PhieuXuat>("phieuxuat");
        }
        public List<PhieuXuat> GetDeliveries() => _phieuxuat.Find(phieuxuat => true).ToList();
        public PhieuXuat GetDelivery(string maPhieu) => _phieuxuat.Find(phieuxuat => phieuxuat.maPhieu == maPhieu).FirstOrDefault();
        public PhieuXuat PostDelivery(PhieuXuat phieuxuat)
        {
            _phieuxuat.InsertOne(phieuxuat);
            return phieuxuat;
        }

        //public PhieuXuat PutDelivery(string id, PhieuXuat newReceipt)
        //{
        //    _phieuxuat.ReplaceOne(phieuxuat => phieuxuat.Id == id, newReceipt);
        //    return newReceipt;
        //}
        //public PhieuXuat DeleteDelivery(string id)
        //{
        //    var phieuxuat = _phieuxuat.Find(phieuxuat => phieuxuat.Id == id).FirstOrDefault();
        //    _phieuxuat.DeleteOne(phieuxuat => phieuxuat.Id == id);
        //    return phieuxuat;
        //}
    }
}
