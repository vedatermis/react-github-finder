import React, {Component} from 'react';
import {Link} from "react-router-dom";

class NavBar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-primary">
                <div className="container">
                    <Link to="/" className="navbar-brand">
                        <i className={this.props.icon}></i> {this.props.title}
                    </Link>

                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to="about" className="nav-link">
                                    About
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

            </nav>
        );
    }
}

NavBar.defaultProps = {
    title: "Github",
    icon: "fab fa-github"
}

export default NavBar;