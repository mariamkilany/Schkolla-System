import { Container, Navbar, Nav } from "react-bootstrap";
import { Link ,useLocation } from "react-router-dom";
import logo from '../../pages/login/images/logo.png'
    
const Layout = ({ children }) => {
    //Read the 'user' information from the 'AuthContext'.
    const accessToken = localStorage.getItem('accessToken');
    const location=useLocation()
    return (
        <>
        {!(location.pathname.toLowerCase().includes('dashboard'))&&
        <Navbar style={{background:'#F3F4F8'}}>
            <Navbar.Brand as={Link} to="/" className="d-flex">
                    <img src={logo} alt="logo"  className="w-50"/>
            </Navbar.Brand>
            <Nav className="ms-auto me-2 ">
                {accessToken && (<Nav.Link as={Link} to="/dashboard">لوحة التحكم</Nav.Link>)}
            </Nav>
            {!accessToken&&location.pathname!=='/login' &&
            <Nav className="ms-auto me-2">
            <Nav.Link as={Link} to="/login">تسجيل الدخول</Nav.Link>
            </Nav>}
        </Navbar>}
        <Container>{children}</Container>
        </>
    );
};
export default Layout;