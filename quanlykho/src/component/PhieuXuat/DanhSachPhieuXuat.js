import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Link
} from "react-router-dom";
// import moment from "moment";     moment(x.Date).format('DD/MM/YYYY');

const DanhSachPhieuXuat = () => {
    const [deliverys, setDelivery] = useState([]);
  
    useEffect(() => {
      loadDelivery();
    }, []);
  
    const loadDelivery = async () => {
      const result = await axios.get("http://localhost:43695/api/Delivery");
      setDelivery(result.data);
    };

    return (
        <section id="main-content">
            <section className="wrapper">
                <div className="wrapper-header row">
                    <div className="col-sm-4">
                        <p>Phiếu xuất</p>
                    </div>
                    <div className="col-sm-6">
                        <label>Từ: </label>
                        <input type="date" className="form-control date"/>
                        <label>Đến: </label>
                        <input type="date" className="form-control date"/>
                    </div>
                    <div className="col-sm-2">
                        <Link to="/phieu-xuat/tao-phieu-xuat" className="btn-add">Thêm mới</Link>
                    </div>
                </div>
                <div className="table-agile-info">
                    <div className="panel panel-default">
                        <div className="table-responsive">
                            <table className="table table-striped b-t b-light">
                                <thead>
                                    <tr>
                                        <th className="check">
                                            <label className="i-checks m-b-none">
                                                <input type="checkbox" /><i></i>
                                            </label>
                                        </th>
                                        <th className="ma">Mã phiếu</th>
                                        <th className="ngay">Ngày tạo phiếu</th>
                                        <th className="ten">Tên nhân viên</th>
                                        <th className="ngay">Tổng tiền</th>
                                        <th className="check"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {deliverys.map((delivery) => (
                                    <tr>
                                        <td className="check"><label className="i-checks m-b-none"><input type="checkbox" name="post[]" /><i></i></label></td>
                                        <td className="ma">{delivery.maPhieu}</td>
                                        <td className="ngay">{delivery.ngayXuat}</td>
                                        <td className="ten">{delivery.tenNV}</td>
                                        <td className="ngay">{delivery.tongTien}</td>
                                        <td className="check">
                                            <Link className="btn-view m-2" to={`/phieu-xuat/xem-phieu-xuat/ma-phieu=${delivery.maPhieu}`} title="Xem">
                                                <i className="fa fa-eye"></i>
                                            </Link>
                                        </td>
                                    </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </section>
    );
};

export default DanhSachPhieuXuat;