import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="navbar-brand">BRUNO</div>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active mr-3">
            <NavLink
              to="/"
              exact={true}
              activeClassName="selected"
              style={{ color: "#6C757D", textDecoration: "none", padding: ""}}
              activeStyle={{ color: "#000000", textDecoration: "none"}}
              data-dd-action-name="user-action-nav-link">    
                Home
            </NavLink>
          </li>
          <li className="nav-item active mr-3">
            <NavLink
              to="/instructions"
              activeClassName="selected"
              style={{ color: "#6C757D", textDecoration: "none", padding: ""}}
              activeStyle={{ color: "#000000", textDecoration: "none"}}
              data-dd-action-name="user-action-nav-link">                  
                Instructions
            </NavLink>
          </li>
          <li className="nav-item active mr-3">
            <NavLink
              to="/startsession"
              activeClassName="selected"
              style={{ color: "#6C757D", textDecoration: "none", padding: ""}}
              activeStyle={{ color: "#000000", textDecoration: "none"}}
              data-dd-action-name="user-action-nav-link">
                Start Session
            </NavLink>
          </li>

        </ul>
        <form className="d-flex my-2 my-lg-0">
                <input
                  className="form-control mr-sm-2"
                  type="search"
                  placeholder="Search for games"
                  aria-label="Search"
                />
                <button className="btn btn-outline-success my-sm-0" type="submit">
                  Search
                </button>
        </form>
      </div>
</nav>
</div>
  );
}

export default Navbar;
