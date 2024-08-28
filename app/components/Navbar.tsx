import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white m-2 p-4 rounded-lg shadow-lg sticky top-0">
      <div className="flex justify-between items-center w-full">
        <div className="font-bold text-lg">
          <Link href="/" legacyBehavior>
            <a className="text-gray-900">Recipe blog</a>
          </Link>
        </div>
        <ul className="flex space-x-8">
          <li>
            <Link href="/recipe-library" legacyBehavior>
              <a className="text-gray-600 hover:text-gray-900">Recipe library</a>
            </Link>
          </li>
          <li>
            <Link href="/make-recipe" legacyBehavior>
              <a className="text-gray-600 hover:text-gray-900">My recipes</a>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
