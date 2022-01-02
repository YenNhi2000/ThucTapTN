import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const XemPhieuNhap = () => {
    const [product, setProduct] = useState([]);
    const [receipt, setReceipt] = useState([]);

    const { maPN } = useParams();

    useEffect(() => {
        loadProduct();
    }, []);

    const loadProduct = async () => {
        const pro = await axios.get(`http://localhost:43695/api/Product/${maPN}`);
        setProduct(pro.data);
        const rec = await axios.get(`http://localhost:43695/api/Receipt/${maPN}`);
        setReceipt(rec.data);
    };
    return (
        <section id="main-content">
            <section className="wrapper">
                <Link className="link-back" to={"/danh-sach-phieu-nhap"}>
                    <i className="fa fa-angle-left"></i>Quay về
                </Link>
                <div className="wrapper-header">
                    <p className="text-center">Chi tiết phiếu nhập</p>
                </div>
                <div className="info-receipt">
                    <table>
                        <tr>
                            <td>Mã phiếu :</td>
                            <td>{receipt.maPhieu}</td>
                        </tr>
                        <tr>
                            <td>Ngày nhập :</td>
                            <td>{receipt.ngayNhap}</td>
                        </tr>
                        <tr>
                            <td>Tên nhân viên :</td>
                            <td>{receipt.tenNV}</td>
                        </tr>
                        <tr>
                            <td>Tổng tiền :</td>
                            <td>{receipt.tongTien} VND</td>
                        </tr>
                    </table>
                </div>
                <div className="table-agile-info shadow">
                    <div className="panel panel-default">
                        <div className="table-responsive">
                            <table className="table table-striped table-hover b-t b-light">
                                <thead>
                                    <tr>
                                        <th className="check">
                                            <label className="i-checks m-b-none">
                                                <input type="checkbox" /><i></i>
                                            </label>
                                        </th>
                                        <th className="ma">Mã sản phẩm</th>
                                        <th className="ten">Tên sản phẩm</th>
                                        <th className="gia">Đơn giá</th>
                                        <th className="soluong">Số lượng</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {product.map((val) => (
                                    <tr>
                                        <td className="check">
                                            <label className="i-checks m-b-none">
                                                <input type="checkbox" name="post[]" /><i></i>
                                            </label>
                                        </td>
                                        <td className="ma">{val.maSP}</td>
                                        <td className="ten">{val.tenSP}</td>
                                        <td className="gia">{val.donGia}</td>
                                        <td className="soluong">{val.soLuong}</td>
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

export default XemPhieuNhap;