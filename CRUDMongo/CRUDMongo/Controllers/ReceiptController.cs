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
    public class ReceiptController : ControllerBase
    {
        private ReceiptService _receiptService;
        public ReceiptController(ReceiptService receiptService)
        {
            _receiptService = receiptService;
        }
        [HttpGet]
        public ActionResult<List<PhieuNhap>> GetReceipts() => _receiptService.GetReceipts();
        [HttpGet("{maPhieu}")]
        public ActionResult<PhieuNhap> GetReceipt(string maPhieu) => _receiptService.GetReceipt(maPhieu);
        [HttpPost]
        public ActionResult<PhieuNhap> PostReceipt(PhieuNhap receipt) => _receiptService.PostReceipt(receipt);
        [HttpPut("{id:length(24)}")]
        public ActionResult<PhieuNhap> PutReceipt(string id, PhieuNhap receipt) => _receiptService.PutReceipt(id, receipt);
        [HttpDelete("{id:length(24)}")]
        public ActionResult<PhieuNhap> DeleteReceipt(string id) => _receiptService.DeleteReceipt(id);
    }
}
