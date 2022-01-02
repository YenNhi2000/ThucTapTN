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
    public class ProductController : ControllerBase
    {
        private ProductService _productService;
        public ProductController(ProductService productService)
        {
            _productService = productService;
        }
        //Xem danh sách sản phẩm
        [HttpGet]
        public ActionResult<List<SanPham>> GetProducts() => _productService.GetProducts();

        //Xem chi tiết phiếu nhập
        [HttpGet("{maPhieu}")]
        public ActionResult<List<SanPham>> GetProduct(string maPhieu) => _productService.GetProduct(maPhieu);

        //Tìm kiếm sản phẩm
        [HttpPost("{tenSP}")]
        public ActionResult<SanPham> Search(string tenSP) => _productService.Search(tenSP);

        //Thêm danh sách sản phẩm
        [HttpPost]
        public ActionResult<List<SanPham>> PostProduct(List<SanPham> pro) => _productService.PostProduct(pro);

        //[HttpPut("{id:length(24)}")]
        //public ActionResult<SanPham> PutProduct(string id, SanPham pro) => _productService.PutProduct(id, pro);
        //[HttpDelete("{id:length(24)}")]
        //public ActionResult<SanPham> DeleteProduct(string id) => _productService.DeleteProduct(id);
    }
}
