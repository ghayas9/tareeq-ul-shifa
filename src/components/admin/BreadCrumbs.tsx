
import React from 'react';
import Link from 'next/link';
import { FiChevronRight } from 'react-icons/fi';

export interface BreadcrumbItem {
  label: string;
  href: string;
  active?: boolean;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
}

const Breadcrumbs: React.FC<BreadcrumbProps> = ({ items = [] }) => {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <nav className="flex w-full overflow-x-auto" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2 whitespace-nowrap py-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="inline-flex items-center">
              {index > 0 && (
                <FiChevronRight className="mx-1 text-gray-400 flex-shrink-0" size={14} />
              )}

              {isLast ? (
                <span className="text-sm font-medium text-primary truncate max-w-xs md:max-w-md">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href || '#'}
                  className="text-sm font-medium text-gray-700 hover:text-gray-900 truncate max-w-xs md:max-w-md"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;