// app/components/search.tsx
'use client';

import { Search as SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { useRef, useEffect } from 'react'; // Import useRef and useEffect

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // Create a ref to hold the input element
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1'); // Reset to first page when searching
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
    // Note: Focus is lost *after* this function completes,
    // because the page re-renders and the input element is recreated.
  }, 500); // 300ms delay

  // This effect runs after the component (and its children) have been updated and hydrated
  useEffect(() => {
    // Check if the inputRef is attached to an actual DOM element
    if (inputRef.current) {
      // Focus the input element
      inputRef.current.focus();
    }
  }, []); // Empty dependency array means this effect runs once after initial mount
           // and after every re-render caused by props/state changes *within this component*
           // However, since the component itself is re-rendered due to URL change via replace(),
           // this effect will run after the new input is mounted.

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full md:w-64 rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get('query')?.toString()}
        // Attach the ref to the input element
        ref={inputRef}
      />
      <SearchIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}