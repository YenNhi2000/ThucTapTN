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
    public class DeliveryController : ControllerBase
    {
        private DeliveryService _deliveryService;
        public DeliveryController(DeliveryService deliveryService)
        {
            _deliveryService = deliveryService;
        }
        //Xem danh sách phiếu xuất
        [HttpGet]
        public ActionResult<List<PhieuXuat>> GetDeliveries() => _deliveryService.GetDeliveries();

        //Xem chi tiết phiếu xuất
        [HttpGet("{maPhieu}")]
        public ActionResult<PhieuXuat> GetDelivery(string maPhieu) => _deliveryService.GetDelivery(maPhieu);

        //Thêm phiếu xuất
        [HttpPost]
        public ActionResult<PhieuXuat> PostDelivery(PhieuXuat delivery) => _deliveryService.PostDelivery(delivery);

        //[HttpPut("{id:length(24)}")]
        //public ActionResult<PhieuXuat> PutDelivery(string id, PhieuXuat delivery) => _deliveryService.PutDelivery(id, delivery);
        //[HttpDelete("{id:length(24)}")]
        //public ActionResult<PhieuXuat> DeleteDelivery(string id) => _deliveryService.DeleteDelivery(id);
    }
}
