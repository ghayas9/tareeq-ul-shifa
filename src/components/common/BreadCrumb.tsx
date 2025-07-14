
import { useRouter } from 'next/router';
import Link from 'next/link';

const Breadcrumb = () => {
  const router = useRouter();
  const pathSegments = router.asPath.split('/').filter(Boolean);

  return (
    <nav className="flex text-sm text-gray-600 overflow-x-auto pb-2 max-w-full">
      <Link href="/" className="hover:text-teal-500">
        Home
      </Link>

      {pathSegments.map((segment, index) => {
        const path = `/${pathSegments.slice(0, index + 1).join('/')}`;
        const isLast = index === pathSegments.length - 1;

        return (
          <span key={path} className="flex items-center">
            <span className="mx-2"> &gt; </span>
            {isLast ? (
              <span className="text-primary capitalize">
                {decodeURIComponent(segment)}
              </span>
            ) : (
              <Link href={path} className="hover:text-primary capitalize">
                {decodeURIComponent(segment)}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
