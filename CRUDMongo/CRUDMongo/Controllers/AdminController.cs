using CRUDMongo.Model;
using CRUDMongo.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CRUDMongo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private AdminService _adminService;
        public AdminController(AdminService adminService)
        {
            _adminService = adminService;
        }
        [HttpGet]
        public ActionResult<List<Admin>> GetUsers() => _adminService.GetUsers();
        [HttpGet("{id:length(24)}")]
        public ActionResult<Admin> GetUser(string id) => _adminService.GetUser(id);
        [HttpPost]
        public ActionResult<Admin> Login(string email, string pass) => _adminService.Login(email, pass); 
    }
}
