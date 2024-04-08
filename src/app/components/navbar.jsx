'use client'
import React, { useState, useEffect } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
// import {AcmeLogo} from "./AcmeLogo.jsx";

const Nav = () => {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const storedUid = localStorage.getItem('uid');
        setIsLoggedIn(!!storedUid);
    }, []);

    const handleRedirect = (linkData) => {
        let path;
        console.log('linked')
        switch (linkData) {
            case 'login':
                path = '/accounts/login';
                break;
            case 'signup':
                path = '/accounts/signup';
                break;
            case 'home':
                path = '/';
                break;
        }
        router.push(path);
    };

    const logout = () => {
        localStorage.clear();
        router.push('/', undefined, { shallow: false, reload: true });
    }

    const del = () => {
        console.log("delete");
        localStorage.clear();
        router.push('/', undefined, { shallow: false, reload: true });
    }

    return (
        <Navbar>
            <NavbarBrand>
                <p className="font-bold text-inherit" onClick={() => handleRedirect('home')}>PrismPlix</p>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Link onClick={() => handleRedirect('shows')} aria-current="page">
                        Shows
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link onClick={() => handleRedirect('booking')} color="foreground">
                        Booking
                    </Link>
                </NavbarItem>
            </NavbarContent>
            {isLoggedIn ? (
                <NavbarContent justify="end">
                    <NavbarItem className="hidden lg:flex">
                        <Link onClick={logout}>Logout</Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Button as={Link} color="primary" variant="flat" onClick={del}>
                            Delete
                        </Button>
                    </NavbarItem>
                </NavbarContent>
            ) : (
                <NavbarContent justify="end">
                    <NavbarItem className="hidden lg:flex">
                        <Link onClick={() => handleRedirect('login')}>Login</Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Button as={Link} color="primary" variant="flat" onClick={() => handleRedirect('signup')}>
                            Sign Up
                        </Button>
                    </NavbarItem>
                </NavbarContent>
            )}

        </Navbar>
    );
}

export default Nav;
