import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import moment from "moment";     //moment(x.Date).format('DD/MM/YYYY');

const ThemPhieuNhap = () => {
    const id = localStorage.getItem("id");
    const [user, setUser] = useState([]);
    
    useEffect(() => {
        loadUser();
    }, []);
    
    const loadUser = async () => {
        const res = await axios.get(`http://localhost:43695/api/Admin/${id}`);
        setUser(res.data);
    };
    
    const [receipt, setReceipt] = useState({
        maPhieu: "PN" + Math.floor(Math.random() * 1000),
        ngayNhap: moment().format('DD/MM/YYYY'),
        tenNV: user.name,
        tongTien: 0,
    })

    const [pro, setPro] = useState({
        maSP: "SP" + Math.floor(Math.random() * 1000),
        tenSP: "",
        donGia: "",
        soLuong: "",
        maPN: receipt.maPhieu,
    });

    const [products, setProduct] = useState([]);
    const { maSP, tenSP, donGia, soLuong, maPN } = pro;
    const { maPhieu, ngayNhap, tenNV, tongTien } = receipt;

    const handleChange = e => {
        setPro({ ...pro, [e.target.name]: e.target.value })
        setReceipt({ ...receipt, tenNV: user.name })
    }

    const handleAdd = (e) => {
        e.preventDefault();
        let a = tongTien + pro.donGia * pro.soLuong
        setReceipt({ ...receipt, tenNV: user.name, tongTien: a })
        products.push(pro)
        setProduct(products);
        setPro({
            maSP: "SP" + Math.floor(Math.random() * 1000),
            tenSP: "",
            donGia: "",
            soLuong: "",
            maPN: maPhieu
        });
    }

    const handleSubmitPro = async () => {
        await axios.post("http://localhost:43695/api/Product", products);
        await axios.post("http://localhost:43695/api/Receipt", receipt);
        window.location.href = "/danh-sach-phieu-nhap";
    };

    const handleDelete = (maSP) => {
        var currentProduct = products;
        currentProduct.splice(maSP,1);
        setProduct(currentProduct);
    }

    return (
        <section id="main-content">
            <section className="wrapper">
                <div className="wrapper-header">
                    <p>L???p phi???u nh???p s???n ph???m</p>
                </div>
                <div className="table-agile-info shadow info_form">
                    <h5>Th??ng tin chung</h5>
                    <form onSubmit={e => handleAdd(e)}>
                        <div className="row">
                            <div className="info">  
                                <label>M?? phi???u</label>
                                <input type="text" className="form-control" name="maPhieu" value={receipt.maPhieu} readOnly />
                            </div>
                            <div className="info">
                                <label>T??n nh??n vi??n</label>
                                <input type="text" className="form-control" name="tenNV" value={user.name} readOnly onChange={e => handleChange(e)}/>
                            </div>
                            <div className="info">
                                <label>Ng??y t???o phi???u</label>
                                <input type="date" className="form-control" name="ngayNhap" value={ngayNhap} onChange={e => handleChange(e)}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="info">
                                <label>M?? s???n ph???m</label>
                                <input type="text" className="form-control" name="maSP" value={maSP} readOnly onChange={e => handleChange(e)} />
                            </div>
                            <div className="info">
                                <label>T??n s???n ph???m</label>
                                <input type="text" className="form-control" name="tenSP" value={tenSP} onChange={e => handleChange(e)} />
                            </div>
                            <div className="info">
                                <label>S??? l?????ng</label>
                                <input type="text" className="form-control" name="soLuong" value={soLuong} onChange={e => handleChange(e)}/>
                            </div>
                            <div className="info">
                                <label>????n gi??</label>
                                <input type="text" className="form-control" name="donGia" value={donGia} onChange={e => handleChange(e)}/>
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
                                    <button className="btn-edit" title="S???a">
                                        <i className="fa fa-edit"></i>
                                    </button>

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
                        <input type="hidden" name="tongTien" value={tongTien} onChange={e => handleChange(e)} />
                    </div>
                </div>
            </section>
        </section>
    );
};

export default ThemPhieuNhap;