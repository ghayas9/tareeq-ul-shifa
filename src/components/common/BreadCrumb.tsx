// import { useRouter } from 'next/router';
// import Link from 'next/link';

// const Breadcrumb = () => {
//   const router = useRouter();
//   const pathSegments = router.asPath.split('/').filter(Boolean);

//   return (
//     <nav className="flex text-sm text-gray-600 overflow-x-auto pb-2 max-w-full">
//       <Link href="/" className="hover:text-teal-500">
//         Home
//       </Link>

//       {pathSegments.map((segment, index) => {
//         const path = `/${pathSegments.slice(0, index + 1).join('/')}`;
//         const isLast = index === pathSegments.length - 1;

//         return (
//           <span key={path} className="flex items-center">
//             <span className="mx-2"> &gt; </span>
//             {isLast ? (
//               <span className="text-primary capitalize">
//                 {decodeURIComponent(segment)}
//               </span>
//             ) : (
//               <Link href={path} className="hover:text-primary capitalize">
//                 {decodeURIComponent(segment)}
//               </Link>
//             )}
//           </span>
//         );
//       })}
//     </nav>
//   );
// };

// export default Breadcrumb;

import { useRouter } from 'next/router';
import Link from 'next/link';

const Breadcrumb = () => {
  const router = useRouter();

  // Split path and remove query parameters
  const cleanPath = router.asPath.split('?')[0];
  const pathSegments = cleanPath.split('/').filter(Boolean);

  // Get category name from query params
  const categoryName = router.query.name as string;

  const getSegmentLabel = (segment: string) => {
    // If it's products-category page and we have the name
    if (segment === 'products-category' && categoryName) {
      return decodeURIComponent(categoryName);
    }

    // Fallback mapping for other segments
    const labelMap: Record<string, string> = {
      'products-category': 'Category',
      products: 'Products',
      categories: 'Categories',
      cart: 'Cart',
      checkout: 'Checkout',
    };

    return labelMap[segment] || decodeURIComponent(segment).replace(/-/g, ' ');
  };

  return (
    <nav className="flex text-sm text-gray-600 overflow-x-auto pb-2 max-w-full">
      <Link href="/" className="hover:text-teal-500">
        Home
      </Link>

      {pathSegments.map((segment, index) => {
        const path = `/${pathSegments.slice(0, index + 1).join('/')}`;
        const isLast = index === pathSegments.length - 1;
        const label = getSegmentLabel(segment);

        return (
          <span key={path} className="flex items-center">
            <span className="mx-2"> &gt; </span>
            {isLast ? (
              <span className="text-primary capitalize">
                {'Category >' + label}
              </span>
            ) : (
              <Link href={path} className="hover:text-primary capitalize">
                {label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
