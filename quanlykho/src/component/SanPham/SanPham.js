import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SanPham = (props) => {
    const [products, setProduct] = useState([]);

    useEffect(() => {
      loadProduct();
    }, []);
  
    const loadProduct = async () => {
      const result = await axios.get("http://localhost:43695/api/Product");
      setProduct(result.data);
    };
        // console.log(result.data.id);


    return (
        <section id="main-content">
            <section className="wrapper">
                <div className="wrapper-header row">
                    <div className="col-sm-8">
                        <p>Kho sản phẩm</p>
                    </div>
                    <div className="col-sm-3">
                        <div className="searchh">
                            <button type="submit" className="submit-search"><i className="fa fa-search"></i></button>
                            <input 
                                type="text"
                                placeholder="Tên sản phẩm..."
                            />
                        </div>
                    </div>
                    <div className="col-sm-1">
                    </div>
                </div>
                <div className="table-agile-info">
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
                                        <th className="soluong">Tồn kho</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((val) => (
                                    <tr>
                                        <td className="check"><label className="i-checks m-b-none"><input type="checkbox" name="post[]" /><i></i></label></td>
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

export default SanPham;