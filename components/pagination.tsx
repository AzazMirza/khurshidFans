// app/components/pagination.tsx
'use client';

import { ArrowLeft, ArrowRight } from "lucide-react";
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  // Generate array of page numbers to show
  const allPages = generatePagination(currentPage, totalPages);

  return (
    <div className="inline-flex">
      <PaginationArrow
        direction="left"
        href={createPageURL(currentPage - 1)}
        isDisabled={currentPage <= 1}
      />

      <div className="flex -space-x-px">
        {allPages.map((page, index) => {
          // Initialize position as 'undefined' instead of 'null'
          let position: 'first' | 'last' | 'single' | 'middle' | undefined = undefined;

          if (index === 0) position = 'first';
          if (index === allPages.length - 1) position = 'last';
          if (allPages.length === 1) position = 'single';
          if (page === '...') position = 'middle';

          // Fix the key prop: use a unique string combination
          // If page is a number, use it; if it's '...', use the index or a unique string based on index
          const key = typeof page === 'number' ? `page-${page}` : `ellipsis-${index}`;

          return (
            <PaginationNumber
              key={key} // Use the corrected key
              href={createPageURL(page)}
              page={page}
              position={position} // position is now correctly typed as 'undefined' or the specific string
              isActive={currentPage === page}
            />
          );
        })}
      </div>

      <PaginationArrow
        direction="right"
        href={createPageURL(currentPage + 1)}
        isDisabled={currentPage >= totalPages}
      />
    </div>
  );
}

function PaginationNumber({
  page,
  href,
  isActive,
  position,
}: {
  page: number | string; // Accept both number and string ('...')
  href: string;
  position?: 'first' | 'last' | 'middle' | 'single'; // Type now excludes 'null', uses 'undefined' implicitly for the optional prop
  isActive: boolean;
}) {
  const className = clsx(
    'flex h-10 w-10 items-center justify-center text-sm border',
    {
      'rounded-l-md border-r-0': position === 'first' || position === 'single',
      'rounded-r-md border-l-0': position === 'last' || position === 'single',
      'z-10 bg-blue-600 border-blue-600 text-white': isActive,
      'hover:bg-gray-100': !isActive,
      'text-gray-300': position === 'middle',
    },
  );

  if (page === '...') {
    return <div className={className}>...</div>;
  }

  // 'page' is guaranteed to be a number here
  return (
    <Link href={href} className={className}>
      {page}
    </Link>
  );
}

function PaginationArrow({
  href,
  direction,
  isDisabled,
}: {
  href: string;
  direction: 'left' | 'right';
  isDisabled?: boolean;
}) {
  const className = clsx(
    'flex h-10 w-10 items-center justify-center rounded-md border',
    {
      'pointer-events-none text-gray-300': isDisabled,
      'hover:bg-gray-100': !isDisabled,
      'mr-2 md:mr-4': direction === 'left',
      'ml-2 md:ml-4': direction === 'right',
    },
  );

  const icon = direction === 'left' ? <ArrowLeft /> : <ArrowRight />;

  return isDisabled ? (
    <div className={className}>{icon}</div>
  ) : (
    <Link className={className} href={href}>
      {icon}
    </Link>
  );
}

// Helper function to generate page numbers for the pagination UI
function generatePagination(current: number, total: number) {
  const delta = 2;
  const range: (number | string)[] = []; // Explicitly type the range array to hold numbers or strings ('...')
  for (let i = Math.max(2, current - delta); i <= Math.min(total - 1, current + delta); i++) {
    range.push(i); // Push number
  }

  if (current - delta > 2) {
    range.unshift('...'); // Push string
  }
  if (current + delta < total - 1) {
    range.push('...'); // Push string
  }

  if (total > 1) {
    if (!range.includes(1)) range.unshift(1); // Push number
    if (!range.includes(total)) range.push(total); // Push number
  }

  return range;
}