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
                        <p>L???p phi???u xu???t s???n ph???m</p>
                    </div>
                    <div className="col-sm-3">
                        <form onSubmit={(e) => handleSearch(e)}>
                            <div className="searchh">
                                <button type="submit" className="submit-search"><i className="fa fa-search"></i></button>
                                <input type="text" name="keyword" value={key} placeholder="T??n s???n ph???m..."onChange={e => handleKey(e)}/>
                            </div>
                        </form>
                    </div>
                    <div className="col-sm-1"></div>
                </div>
                <div className="table-agile-info shadow info_form">
                    <h5>Th??ng tin chung</h5>
                    <form onSubmit={e => handleAdd(e)}>
                        <div className="row">
                            <div className="info">
                                <label>M?? phi???u</label>
                                <input type="text" className="form-control" name="maPhieu" value={maPhieu} readOnly />
                            </div>
                            <div className="info">
                                <label>T??n nh??n vi??n</label>
                                <input type="text" className="form-control" name="tenNV" value={user.name} readOnly />
                            </div>
                            <div className="info">
                                <label>Ng??y t???o phi???u</label>
                                <input type="date" className="form-control" name="ngayXuat" value={ngayXuat} onChange={e => handleChange(e)}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="info">
                                <label>M?? s???n ph???m</label>
                                <input type="text" className="form-control" name="maSP" value={maSP} readOnly />
                            </div>
                            <div className="info">
                                <label>T??n s???n ph???m</label>
                                <input type="text" className="form-control" name="tenSP" value={tenSP} readOnly />
                            </div>
                            <div className="info">
                                <label>S??? l?????ng</label>
                                <input type="text" className="form-control" name="soLuong" value={soLuong} onChange={e => handleChange(e)}/>
                            </div>
                            <div className="info">
                                <label>????n gi??</label>
                                <input type="text" className="form-control" name="donGia" value={donGia} readOnly />
                            </div>
                            <button type="submit" className="btn-addd"><i className="fa fa-plus-circle"></i>Th??m</button>
                        </div>
                    </form>
                </div>
                <div className="submit">
                    <button type="button" className="btn btn-submit" onClick={() => handleSubmitPro()}>
                        <i className="fa fa-plus-circle"></i>L??u
                    </button>
                </div>
                <div className="table-agile-info shadow list">
                    <h5>Danh s??ch s???n ph???m</h5>
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th className="check">
                                    <label className="i-checks m-b-none">
                                        <input type="checkbox" /><i></i>
                                    </label>
                                </th>
                                <th className="ma">STT</th>
                                <th className="ma">M?? SP</th>
                                <th className="ten">T??n s???n ph???m</th>
                                <th className="soluong">S??? l?????ng</th>
                                <th className="gia">????n gi??</th>
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
                                    <Link className="btn-edit m-2" to="" title="S???a">
                                        <i className="fa fa-edit"></i>
                                    </Link>

                                    <button className="btn-delete" onClick={() => handleDelete(pro.maSP)} title="X??a">
                                        <i className="fa fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                            ))} 
                        </tbody>
                    </table>
                    <div className="total">
                        <p>T???ng ti???n:<span>{tongTien}</span></p>
                    </div>
                </div>
            </section>
        </section>
    );
};

export default ThemPhieuXuat;