"use client"
import Link from "next/link";
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

export default function Header() {
    const { push } = useRouter();
    const { currentUser, logout } = useAuth();

    const handleLogout = async () => {
        try {
          await logout();
          window.alert("Successfully logged out");
          push('/login');
        } catch (error) {
          console.error('Logout error', error.message);
        }
      };

  return (
    <div>
      <nav
        className="navbar bg-dark border-bottom border-bottom-dark"
        data-bs-theme="dark"
      >
        <div className="container">
          <Link href={"/"} className="navbar-brand">Task Management</Link>
          {
            currentUser ? 
            <button className="btn btn-outline-danger" onClick={handleLogout}>
                Logout
            </button> 
            : 
            <Link
            href={"/login"}
            className="btn btn-outline-success"
            type="submit"
          >
            Login
          </Link>
          }
        </div>
      </nav>
    </div>
  );
}
