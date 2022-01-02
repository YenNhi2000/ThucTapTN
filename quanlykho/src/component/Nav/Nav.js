import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Link,
    NavLink, 
    useParams
} from "react-router-dom";
import logo from '../../assets/images/logo.png';
import avatar from '../../assets/images/avatar.jpg';

const Nav = () => {
    const [user, setUser] = useState([]);

    const id = localStorage.getItem('id');
    
    useEffect(() => {
        loadUser();
    }, []);
      
    const loadUser = async () => {
        const res = await axios.get(`http://localhost:43695/api/Admin/${id}`);
        setUser(res.data);
    };

    const logout = () => {
        localStorage.clear();
        window.location.href = '/';
    }

    return (
        <aside>
            <div id="sidebar" className="nav-collapse">
                <div>
                    <a href><img src={logo} className="img-logo" alt=""/></a>
                </div>
                <div className="leftside-navigation">
                    <ul className="sidebar-menu" id="nav-accordion">
                        <li>
                            <NavLink to="/danh-sach-san-pham"><i className="fa fa-tasks"></i>Sản phẩm</NavLink>
                        </li>
                        <li>
                            <NavLink to="/danh-sach-phieu-nhap"><i className="fa fa-file-text"></i>Phiếu nhập</NavLink>
                        </li>
                        <li>
                            <NavLink to="/danh-sach-phieu-xuat"><i className="fa fa-file-text"></i>Phiếu xuất</NavLink>
                        </li>
                    </ul>
                    <div className="dropdown avatar">
                        <img alt="" src={avatar} />
                        <span className="username">{user.name}</span>
                        <button type="button" className="btn-logout" onClick={() => logout()}>Đăng xuất</button>
                    </div>
                </div>
            </div>
        </aside>
    )
}

export default Nav;