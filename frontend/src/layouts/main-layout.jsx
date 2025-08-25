import { Link, Outlet } from 'react-router-dom';
import supabase from '../client';

export default function MainLayout() {
  async function signOut() {
    const { error } = await supabase.auth.signOut();
  }
  return (
    <>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">
            <Link to="/">Donezo</Link>
          </a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <button className="btn btn-link" onClick={() => signOut()}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
      <Outlet />
    </>
  );
}
