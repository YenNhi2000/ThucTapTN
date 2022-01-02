import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
// import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../src/assets/css/style.css';
import Nav from './component/Nav/Nav';
import DangNhap from './component/DangNhap/DangNhap';
import SanPham from './component/SanPham/SanPham';
import DanhSachPhieuNhap from './component/PhieuNhap/DanhSachPhieuNhap';
import DanhSachPhieuXuat from './component/PhieuXuat/DanhSachPhieuXuat';
import ThemPhieuNhap from './component/PhieuNhap/ThemPhieuNhap';
import ThemPhieuXuat from './component/PhieuXuat/ThemPhieuXuat';
import XemPhieuNhap from './component/PhieuNhap/XemPhieuNhap';

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <DangNhap/>
                </Route>
                <Route path="/danh-sach-san-pham">
                    <Nav/>
                    <SanPham/>
                </Route>
                <Route path="/danh-sach-phieu-nhap">
                    <Nav/>
                    <DanhSachPhieuNhap/>
                </Route>
                <Route path="/phieu-nhap/xem-phieu-nhap/ma-phieu=:maPN">
                    <Nav/>
                    <XemPhieuNhap/>
                </Route>
                <Route path="/phieu-nhap/tao-phieu-nhap">
                    <Nav/>
                    <ThemPhieuNhap/>
                </Route>
                <Route path="/danh-sach-phieu-xuat">
                    <Nav/>
                    <DanhSachPhieuXuat/>
                </Route>
                <Route path="/phieu-xuat/tao-phieu-xuat">
                    <Nav/>
                    <ThemPhieuXuat/>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
