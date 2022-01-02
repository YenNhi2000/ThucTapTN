import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';
import moment from "moment";     //moment(x.Date).format('DD/MM/YYYY');

const ThemPhieuXuat = () => {
    const id = localStorage.getItem("id");
    const [user, setUser] = useState([]);
    
    useEffect(() => {
        loadUser();
    }, []);
      
    const loadUser = async () => {
        const res = await axios.get(`http://localhost:43695/api/Admin/${id}`);
        setUser(res.data);
    };

    const [delivery, setDelivery] = useState({
        maPhieu: "PX" + Math.floor(Math.random() * 1000),
        ngayXuat: moment().format('DD/MM/YYYY'),
        tenNV: user.name,
        tongTien: 0,
    })  

    const [pro, setPro] = useState({
        maSP: "",
        tenSP: "",
        donGia: "",
        soLuong: ""
    });
    const [products, setProduct] = useState([]);

    const { maSP, tenSP, donGia, soLuong } = pro;
    const { maPhieu, ngayXuat, tenNV, tongTien } = delivery;

    const [key, setKey] = useState("");

    const handleKey = e => {
        setKey(e.target.value)
    }

    const handleSearch = async (e) => {
        e.preventDefault();
        const rs = await axios.post(`http://localhost:43695/api/Product/${key}`)
        setPro(rs.data);
        setKey("")
    }

    const handleChange = e => {
        setPro({ ...pro, [e.target.name]: e.target.value })
    }

    const handleAdd = e => {
        e.preventDefault();
        let a = tongTien + pro.donGia * pro.soLuong
        setDelivery({ ...delivery, tenNV: user.name, tongTien: a })
        products.push(pro)
        setProduct(products);
        setPro({
            maSP: "",
            tenSP: "",
            donGia: "",
            soLuong: "",
            maPN: maPhieu
        });
    }

    const handleSubmitPro = async () => {
        // await axios.post("http://localhost:43695/api/Product", products);
        await axios.post("http://localhost:43695/api/Delivery", delivery);
        window.location.href = "/danh-sach-phieu-xuat";
    };

    const handleDelete = (e) => {
        var currentProduct = products;
        currentProduct.splice(maSP,1);
        setProduct(currentProduct);
    }

    return (
        <section id="main-content">
            <section className="wrapper">
                <div className="wrapper-header row">
                    <div className="col-sm-8">
                        <p>Lập phiếu xuất sản phẩm</p>
                    </div>
                    <div className="col-sm-3">
                        <form onSubmit={(e) => handleSearch(e)}>
                            <div className="searchh">
                                <button type="submit" className="submit-search"><i className="fa fa-search"></i></button>
                                <input type="text" name="keyword" value={key} placeholder="Tên sản phẩm..."onChange={e => handleKey(e)}/>
                            </div>
                        </form>
                    </div>
                    <div className="col-sm-1"></div>
                </div>
                <div className="table-agile-info shadow info_form">
                    <h5>Thông tin chung</h5>
                    <form onSubmit={e => handleAdd(e)}>
                        <div className="row">
                            <div className="info">
                                <label>Mã phiếu</label>
                                <input type="text" className="form-control" name="maPhieu" value={maPhieu} readOnly />
                            </div>
                            <div className="info">
                                <label>Tên nhân viên</label>
                                <input type="text" className="form-control" name="tenNV" value={user.name} readOnly />
                            </div>
                            <div className="info">
                                <label>Ngày tạo phiếu</label>
                                <input type="date" className="form-control" name="ngayXuat" value={ngayXuat} onChange={e => handleChange(e)}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="info">
                                <label>Mã sản phẩm</label>
                                <input type="text" className="form-control" name="maSP" value={maSP} readOnly />
                            </div>
                            <div className="info">
                                <label>Tên sản phẩm</label>
                                <input type="text" className="form-control" name="tenSP" value={tenSP} readOnly />
                            </div>
                            <div className="info">
                                <label>Số lượng</label>
                                <input type="text" className="form-control" name="soLuong" value={soLuong} onChange={e => handleChange(e)}/>
                            </div>
                            <div className="info">
                                <label>Đơn giá</label>
                                <input type="text" className="form-control" name="donGia" value={donGia} readOnly />
                            </div>
                            <button type="submit" className="btn-addd"><i className="fa fa-plus-circle"></i>Thêm</button>
                        </div>
                    </form>
                </div>
                <div className="submit">
                    <button type="button" className="btn btn-submit" onClick={() => handleSubmitPro()}>
                        <i className="fa fa-plus-circle"></i>Lưu
                    </button>
                </div>
                <div className="table-agile-info shadow list">
                    <h5>Danh sách sản phẩm</h5>
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th className="check">
                                    <label className="i-checks m-b-none">
                                        <input type="checkbox" /><i></i>
                                    </label>
                                </th>
                                <th className="ma">STT</th>
                                <th className="ma">Mã SP</th>
                                <th className="ten">Tên sản phẩm</th>
                                <th className="soluong">Số lượng</th>
                                <th className="gia">Đơn giá</th>
                                <th className="action"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((pro, index) => (
                                
                            <tr key={pro.maPhieu}>
                                <td className="check">
                                    <label className="i-checks m-b-none"><input type="checkbox" name="post[]" /><i></i></label>
                                </td>
                                <td className="ma">{index + 1}</td>
                                <td className="ma">{pro.maSP}</td>
                                <td className="ten">{pro.tenSP}</td>
                                <td className="soluong">{pro.soLuong}</td>
                                <td className="gia">{pro.donGia}</td>
                                <td className="action">
                                    <Link className="btn-edit m-2" to="" title="Sửa">
                                        <i className="fa fa-edit"></i>
                                    </Link>

                                    <button className="btn-delete" onClick={() => handleDelete(pro.maSP)} title="Xóa">
                                        <i className="fa fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                            ))} 
                        </tbody>
                    </table>
                    <div className="total">
                        <p>Tổng tiền:<span>{tongTien}</span></p>
                    </div>
                </div>
            </section>
        </section>
    );
};

export default ThemPhieuXuat;