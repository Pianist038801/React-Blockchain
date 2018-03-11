import React from 'react'
import { Link } from 'react-router-dom'
import { ROUTE_URL } from 'containers/constants.js'
import Assets from './assets'
import './style.css'

const Footer = () => (
  <footer className="Footer">
    <div className="container">
      <div className="row">
        <div className="col-xs-12 col-md-6">
          APPII Ltd &copy; 2017
        </div>
        <div className="col-xs-12 col-md-6">
          <ul className="Footer-nav">
            <li>
              <Link to={ROUTE_URL.privacy}>Privacy</Link>
            </li>
            <li>
              <Link to={ROUTE_URL.terms}>Terms of Use</Link>
            </li>
            <li>
              <Link to={ROUTE_URL.cookies}>Cookies</Link>
            </li>

          </ul>
        </div>
      </div>
    </div>
  </footer>
)

export default Footer
