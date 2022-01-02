using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CRUDMongo.Model;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;

namespace CRUDMongo.Services
{
    public class AdminService
    {
        private readonly IMongoCollection<Admin> _admin;
        public AdminService(IConfiguration configuration)
        {
            var client = new MongoClient(configuration.GetConnectionString("CrudMongoDBCon"));
            var database = client.GetDatabase("quanlykho");
            _admin = database.GetCollection<Admin>("admin");
        }
        public List<Admin> GetUsers() => _admin.Find(admin => true).ToList();
        public Admin GetUser(string id) => _admin.Find(admin => admin.Id == id).FirstOrDefault();
        public Admin Login(string email, string pass) => _admin.Find(admin => admin.email == email && admin.password == pass).FirstOrDefault();
    }
}
