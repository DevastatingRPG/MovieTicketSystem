import React from 'react'
import Link from 'next/link';
import 'styles/navbar.css'

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <h1><Link href="/">PrismPlix</Link></h1>
            </div>
            <div className="navbar-right">
                <ul>
                    <li>
                        <Link href="/signup">Sign-up/Log-in</Link>
                    </li>
                    <li>
                        <Link href="/movies">Shows</Link>
                    </li>
                    <li>
                        <Link href="/booking">Booking and Payment</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;


