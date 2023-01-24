import Link from 'next/link';
import Image from 'next/image';
import useAuthCtx from '../stores/authContext.js';

export default function Navbar() {
  const { user, login, logout } = useAuthCtx();
  console.log(user);

  return (
    <div className='container'>
      <nav>
        <Image src='/rupee.png' width={50} height={48} alt='rupee' />
        <h1>Gaming Vibes</h1>
        <ul>
          <li>
            <Link href='/'>Home</Link>
          </li>
          <li>
            <Link href='/guides'>Guides</Link>
          </li>
          {!user && (
            <li className='btn' onClick={login}>
              <Link href='/guides'>Login / Signup</Link>
            </li>
          )}
          {user && (
            <li className='btn' onClick={logout}>
              <Link href='/guides'>Logot</Link>
            </li>
          )}
        </ul>
      </nav>
      <div className='banner'>
        <Image src='/banner.png' width={966} height={276} alt='banner' />
      </div>
    </div>
  );
}
