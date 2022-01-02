import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const DangNhap = () => {
    let history = useHistory();

    const [user, setUser] = useState({
        email: "",
        pass: "",
        isShowPassword: false
    });

    const { email, pass, isShowPassword } = user;

    const handleShowHidePassword = () => {
        setUser({ isShowPassword: !isShowPassword });
    }

    const handleChange = event => {
        setUser({ ...user, [event.target.name]: event.target.value });
    }

    const handleLogin = React.useCallback(async e => {
        e.preventDefault();
        const result = await axios.post(`http://localhost:43695/api/Admin?email=${user.email}&pass=${user.pass}`);
        if(result.data){
            window.location.href = "/danh-sach-san-pham";
            localStorage.setItem('id', result.data.id);
        }
    }, [user]);

    return (
        <div className="log-w3">
            <div className="w3layouts-main shadow">
                <h2>Đăng nhập</h2>
                <form onSubmit={e => handleLogin(e)}>
                    <input 
                        type="email" 
                        className="user" 
                        name="email" 
                        placeholder="EMAIL" 
                        autoFocus={true}
                        onChange={event => handleChange(event)}
                    />
                    <div className="input-pass">
                        <input 
                            type={isShowPassword ? "text" : "password"} 
                            className="ggg" 
                            name="pass" 
                            placeholder="MẬT KHẨU" 
                            onChange={event => handleChange(event)}
                        />
                        <span onClick={() => handleShowHidePassword() }>
                            <i className={isShowPassword ? "fa fa-eye" : "fa fa-eye-slash"}></i>
                        </span>
                    </div>
                    <h6><a href="#">Quên mật khẩu?</a></h6>
                    <div className="clearfix"></div>
                    <button type="submit">Đăng Nhập</button>
                </form>
            </div>
        </div>
    );
}
export default DangNhap;