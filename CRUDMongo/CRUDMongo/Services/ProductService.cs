using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CRUDMongo.Model;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;

namespace CRUDMongo.Services
{
    public class ProductService
    {
        private readonly IMongoCollection<SanPham> _products;
        public ProductService(IConfiguration configuration)
        {
            var client = new MongoClient(configuration.GetConnectionString("CrudMongoDBCon"));
            var database = client.GetDatabase("quanlykho");
            _products = database.GetCollection<SanPham>("sanpham");
        }
        public List<SanPham> GetProducts() => _products.Find(product => true).ToList();
        public List<SanPham> GetProduct(string maPhieu) => _products.Find(product => product.maPN == maPhieu).ToList();
        public SanPham Search(string tenSP) => _products.Find(admin => admin.tenSP == tenSP).FirstOrDefault();
        public List<SanPham> PostProduct(List<SanPham> product)
        {
            _products.InsertMany(product);
            return product;
        }
        //public SanPham PutProduct(string id, SanPham newProduct)
        //{
        //    _products.ReplaceOne(product => product.Id == id, newProduct);
        //    return newProduct;
        //}
        //public SanPham DeleteProduct(string id)
        //{
        //    var product = _products.Find(product => product.Id == id).FirstOrDefault();
        //    _products.DeleteOne(product => product.Id == id);
        //    return product;
        //}
    }
}
