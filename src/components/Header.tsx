
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "../App";
import Logout from "../Auth/Logout";
import './Header.css';

function Header() {
    const context = useContext(AppContext);
    const isLoggedIn = context !== null && context.userName.length > 0;

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <ul className="navbar-nav d-flex">
                        <li className="navbar-brand">
                            <NavLink className="nav-link active bg-white text-dark rounded-pill" to="/">
                                Business Cards App
                            </NavLink>
                        </li>


                        <li className="navbar-brand" >
                            <NavLink className="nav-link active  " to="/about">


                                About
                            </NavLink>

                        </li>

                        {
                            isLoggedIn &&
                            <>
                            <div className="d-flex ">
                            <li className="navbar-brand " >
                                    <NavLink className="nav-link active text-warning"
                                        aria-current="page"
                                        to="/businesscard">
                                        Craeate Card
                                    </NavLink>
                                </li>
                                <li className="navbar-brand" >
                                    <NavLink className="nav-link active text-info"
                                        aria-current="page"
                                        to="/cardslist">
                                        My Cards
                                    </NavLink>

                                </li>
                                <li className="navbar-brand" >
                                    <NavLink className="nav-link active text-primary"
                                        aria-current="page"
                                        to="/myFavorCards">
                                        My Favorite Cards
                                    </NavLink>

                                </li>
                            </div>
                               
                            </>

                        }


                    </ul>
                    <ul className="navbar-nav d-flex">
                       

                        {
                            !isLoggedIn &&
                            <>
                                <li className="navbar-brand">
                                    <NavLink className="nav-link active"
                                        aria-current="page"
                                        to="/signup">
                                        Sign up
                                    </NavLink>
                                </li>
                                <li className="navbar-brand">
                                    <NavLink className="nav-link active"
                                        aria-current="page"
                                        to="/signin">
                                        Sign in
                                    </NavLink>
                                </li>

                                <li className="navbar-brand" >
                                    <NavLink className="nav-link active"
                                        aria-current="page"
                                        to="/business">
                                        Business
                                    </NavLink>
                                </li>
                            </>

                        }

                        {
                            isLoggedIn &&
                            <li className="nav-link active  ">
                                <Logout />
                            </li>

                        }


                    </ul>

                </div>

            </nav>

        </>
    );
}

export default Header;