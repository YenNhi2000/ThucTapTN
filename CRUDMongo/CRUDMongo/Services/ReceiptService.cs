using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CRUDMongo.Model;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;

namespace CRUDMongo.Services
{
    public class ReceiptService
    {
        private readonly IMongoCollection<PhieuNhap> _phieunhap;
        public ReceiptService(IConfiguration configuration)
        {
            var client = new MongoClient(configuration.GetConnectionString("CrudMongoDBCon"));
            var database = client.GetDatabase("quanlykho");
            _phieunhap = database.GetCollection<PhieuNhap>("phieunhap");
        }
        public List<PhieuNhap> GetReceipts() => _phieunhap.Find(phieunhap => true).ToList();
        public PhieuNhap GetReceipt(string maPhieu) => _phieunhap.Find(phieunhap => phieunhap.maPhieu == maPhieu).FirstOrDefault();
        public PhieuNhap PostReceipt(PhieuNhap phieunhap)
        {
            _phieunhap.InsertOne(phieunhap);
            return phieunhap;
        }
        public PhieuNhap PutReceipt(string id, PhieuNhap newReceipt)
        {
            _phieunhap.ReplaceOne(phieunhap => phieunhap.Id == id, newReceipt);
            return newReceipt;
        }
        public PhieuNhap DeleteReceipt(string id)
        {
            var phieunhap = _phieunhap.Find(phieunhap => phieunhap.Id == id).FirstOrDefault();
            _phieunhap.DeleteOne(phieunhap => phieunhap.Id == id);
            return phieunhap;
        }
    }
}
