import React from 'react'
import Link from 'next/link';
import styles from 'styles/navbar.module.css'

function Navbar() {
    return (
        <nav className={styles.navbar}>
            <div className={styles.navbar_left}>
                <h1><Link href="/">PrismPlix</Link></h1>
            </div>
            <div className={styles.navbar_right}>
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


