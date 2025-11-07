import React, { useContext } from "react"
import { Link, NavLink } from "react-router"
import { toast } from "react-toastify"
// import logo from "../assets/logo.png"
import { AuthContext } from "../../Context/AuthProvider"

export default function Navbar() {
    const { user, signOutUser } = useContext(AuthContext)

    const activeClass = ({ isActive }) => 
        isActive
    ? "font-bold pb-1 bg-[linear-gradient(125.07deg,#632ee3,#9f62f2_100%)] text-transparent bg-clip-text border-b-2 border-[#9f62f2] transition-all duration-300"
    : "text-gray-700 hover:text-transparent hover:bg-[linear-gradient(125.07deg,#632ee3,#9f62f2_100%)] hover:bg-clip-text transition-all duration-300";

    const handleLogOut = () => {
        signOutUser()
            .then(() => toast.success("You've been successfully logged out!"))
            .catch((error) => toast.error(error.code));
    };

    const navLinks = (
        <>
        <li><NavLink end className={activeClass} to='/'>Home</NavLink></li>
        <li><NavLink end className={activeClass} to='/allProducts'>All Products</NavLink></li>

        {
            user && <> 
            <li><NavLink end className={activeClass} to='/myProducts'>My Products</NavLink></li>
            <li><NavLink end className={activeClass} to='/myBids'>My Bids</NavLink></li>
            </>
        }

        <li><NavLink end className={activeClass} to='/createProduct'>Create Product</NavLink></li>
        </>
    );

    return (
        <div className="navbar bg-white px-6 md:px-8 shadow-md sticky top-0 z-40">

            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost md:hidden"> <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg> </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"> {navLinks} </ul>
                </div>

                <Link to="/" className="flex items-center gap-2">
                    {/* <div className="rounded-full"> <img className="w-[1.9rem]" src={logo} alt="" /> </div> */}
                    <h1 className="text-[1.3rem] font-bold"> Smart<span className="text-gradient">Deals</span> </h1>
                </Link>
            </div>

            <div className="navbar-center hidden md:flex">
                <ul className="font-semibold menu menu-horizontal px-1 gap-2"> {navLinks} </ul>
            </div>

            <div className="navbar-end gap-3">
                {user ? (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full"> <img src={user?.photoURL || "https://i.ibb.co.com/RTyj1cSs/1559144-200.png"} alt="" /> </div>
                        </div>

                        <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li><a>{user?.displayName || "User"}</a></li>
                            <li><Link onClick={handleLogOut} className="text-red-600 hover:bg-red-50">Logout</Link></li>
                        </ul>
                    </div>
                ) : (
                    <div className="flex items-center gap-3">
                        <Link to="/login"    className="btn-secondary">Login</Link>
                        <Link to="/register" className="btn-primary">Register</Link>
                    </div>
                )}
            </div>
        </div>
    );
}