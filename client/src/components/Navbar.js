import { useNavigate, Link } from "react-router-dom";

import "../css/Navbar.css";

function Navbar() {
    let navigate = useNavigate();

    function handleClick(){
        navigate("/");
    }

    return(
        <nav>
            <h1 onClick={handleClick}>Project Nicholas</h1>
            <ul className="links">
                <li><Link to="/contactus" className="linkitems">Contact Us</Link></li>
                <li><Link to="/login" className="linkitems">Login</Link></li>
            </ul>
            <Link to="/signup"><button>Sign Up</button></Link>
        </nav>
    );
}

export default Navbar;