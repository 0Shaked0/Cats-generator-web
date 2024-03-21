import { useImperativeHandle } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
export default function Navbar() {
    return (

        <nav className="nav">
            
            <footer>
                <div className="footerContainer">
                <Link to="/" className="site-title">Cats Generator</Link>
                    <div className="socialIcons">
                        <Link to="https://www.linkedin.com/in/shaked-ovadia-9628742ba/"><i className="fa-brands fa-linkedin"></i></Link>
                        <Link to="https://github.com/0Shaked0"><i className="fa-brands fa-github"></i></Link>
                </div>
                    <div className="footerNav">
                        <ul>
                            <CustomLink to="/favorites">Favorites</CustomLink>
                            <CustomLink to="/about">About</CustomLink>
                        </ul>
                </div>
        
                </div>
                <div className="footerBottom">
                    <p>Copyright &copy;2023; Designed by <span className="designer">Shaked Ovadia</span></p>
                </div>
            </footer>
            
        </nav>

    )
}

function CustomLink({to, children, ...props}) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({path: resolvedPath.pathname, end: true })
    
    return (
        <li className={isActive === to ? "active" : ""}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    )
}