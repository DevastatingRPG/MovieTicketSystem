// 'use client'
// import React, { useState, useEffect } from "react";
// import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, Dropdown, DropdownItem } from "@nextui-org/react";
// import { useRouter } from "next/navigation";
// // import {AcmeLogo} from "./AcmeLogo.jsx";

// const Nav = () => {
//     const router = useRouter();
//     const [isLoggedIn, setIsLoggedIn] = useState(false);

//     useEffect(() => {
//         const storedUid = localStorage.getItem('uid');
//         setIsLoggedIn(!!storedUid);
//     }, []);

//     const handleRedirect = (linkData) => {
//         let path;
//         console.log('linked')
//         switch (linkData) {
//             case 'login':
//                 path = '/accounts/login';
//                 break;
//             case 'signup':
//                 path = '/accounts/signup';
//                 break;
//             case 'home':
//                 path = '/';
//                 break;
//             case 'shows':
//                 path = '/movies';
//                 break;
//             case 'booking':
//                 path = '/booking';
//                 break;
//             case 'profile':
//                 path = '/profile';
//                 break;
//             case 'myBookings':
//                 path = '/myBookings';
//                 break;
//             case 'deleteAccount':
//                 path = '/delete-acc';
//                 break;
//         }
//         router.push(path);
//     };

//     const logout = () => {
//         localStorage.clear();
//         router.push('/', undefined, { shallow: false, reload: true });
//     }

//     const del = () => {
//         console.log("delete");
//         localStorage.clear();
//         router.push('/', undefined, { shallow: false, reload: true });
//     }

//     return (
//         <Navbar>
//             <NavbarBrand>
//                 <p className="font-bold text-inherit" onClick={() => handleRedirect('home')}>PrismPlix</p>
//             </NavbarBrand>
//             <NavbarContent className="hidden sm:flex gap-4" justify="center">
//                 <NavbarItem>
//                     <Link onClick={() => handleRedirect('shows')} aria-current="page">
//                         Shows
//                     </Link>
//                 </NavbarItem>
//                 <NavbarItem>
//                     <Link onClick={() => handleRedirect('booking')} color="foreground">
//                         Booking
//                     </Link>
//                 </NavbarItem>
//             </NavbarContent>
//             {isLoggedIn ? (
//                 <NavbarContent justify="end">
//                     <NavbarItem className="hidden lg:flex">
//                         <Link onClick={logout}>Logout</Link>
//                     </NavbarItem>
//                     <NavbarItem>
//                         <Button as={Link} color="primary" variant="flat" onClick={del}>
//                             Delete
//                         </Button>
//                     </NavbarItem>
//                 </NavbarContent>
//             ) : (
//                 <NavbarContent justify="end">
//                     <NavbarItem className="hidden lg:flex">
//                         <Link onClick={() => handleRedirect('login')}>Login</Link>
//                     </NavbarItem>
//                     <NavbarItem>
//                         <Button as={Link} color="primary" variant="flat" onClick={() => handleRedirect('signup')}>
//                             Sign Up
//                         </Button>
//                     </NavbarItem>
//                 </NavbarContent>
//             )}

//         </Navbar>
//     );
// }

//     return (
//         <Navbar>
//             <NavbarBrand>
//                 <p className="font-bold text-inherit" onClick={() => handleRedirect('home')}>PrismPlix</p>
//             </NavbarBrand>
//             <NavbarContent className="hidden sm:flex gap-4" justify="center">
//                 <NavbarItem>
//                     <Link onClick={() => handleRedirect('shows')} aria-current="page">
//                         Shows
//                     </Link>
//                 </NavbarItem>
//                 <NavbarItem>
//                     <Link onClick={() => handleRedirect('booking')} color="foreground">
//                         Booking
//                     </Link>
//                 </NavbarItem>
//             </NavbarContent>
//             {isLoggedIn ? (
//                 <NavbarContent justify="end">
//                     <Dropdown
//                         label="Profile"
//                         handler={
//                             <NavbarItem className="hidden lg:flex">
//                                 <Link>Profile</Link>
//                             </NavbarItem>
//                         }
//                     >
//                         <DropdownItem onClick={() => handleRedirect('myBookings')}>
//                             My Bookings
//                         </DropdownItem>
//                         <DropdownItem onClick={() => handleRedirect('deleteAccount')}>
//                             Delete My Account
//                         </DropdownItem>
//                         <DropdownItem onClick={logout}>
//                             Logout
//                         </DropdownItem>
//                     </Dropdown>
//                 </NavbarContent>
//             ) : (
//                 <NavbarContent justify="end">
//                     <NavbarItem className="hidden lg:flex">
//                         <Link onClick={() => handleRedirect('login')}>Login</Link>
//                     </NavbarItem>
//                     <NavbarItem>
//                         <Button as={Link} color="primary" variant="flat" onClick={() => handleRedirect('signup')}>
//                             Sign Up
//                         </Button>
//                     </NavbarItem>
//                 </NavbarContent>
//             )}
//         </Navbar>
//     );
// }
// 
// export default Nav;


// import React, { useState, useEffect } from "react";
// import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, Dropdown, DropdownItem } from "@nextui-org/react";
// import { useRouter } from "next/navigation";

'use client'
import React, { useState, useEffect } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { useRouter } from "next/navigation";

const Nav = () => {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);

    useEffect(() => {
        const storedUid = localStorage.getItem('uid');
        setIsLoggedIn(!!storedUid);
    }, []);

    const handleRedirect = (linkData) => {
        let path;
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
            case 'shows':
                path = '/movies';
                break;
            case 'booking':
                path = '/booking';
                break;
            case 'myBookings':
                path = '/myBookings';
                break;
            case 'deleteAccount':
                path = '/deleteAccount';
                break;
            default:
                path = '/';
                break;
        }
        router.push(path);
    };

    const logout = () => {
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
                        <Button onClick={logout}>Logout</Button>
                    </NavbarItem>
                    <NavbarItem>
                        <Dropdown>
                            <DropdownTrigger>
                                <Button>
                                    Profile
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu>
                                <DropdownItem onClick={() => handleRedirect('myBookings')}>
                                    My Bookings
                                </DropdownItem>
                                <DropdownItem onClick={() => handleRedirect('deleteAccount')} className="text-danger" color="danger">
                                    Delete My Account
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
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