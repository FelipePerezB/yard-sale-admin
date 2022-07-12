import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Pagination({ limit, rows, currentPage, numberOfProducts }) {
  const MAX_BUTTONS = 5
  const TOTAL_PAGES = Math.ceil(limit / rows);

  const [buttons, setButtons] = useState([])

  const changePage = (newPage) => {
    if (newPage < 1) {
      return 1;
    } else if (newPage > TOTAL_PAGES) {
      return Math.ceil(TOTAL_PAGES);
    } else {
      return newPage;
    }
  };
  const getButtons = (currentPage, MAX_BUTTONS) =>{
    const buttons=[]
    let maxButtons = (MAX_BUTTONS<=TOTAL_PAGES)
      ? MAX_BUTTONS
      : TOTAL_PAGES
    let add = true
    let i=0
    let positivesPages = currentPage
    let negativesPages = currentPage
  
    while(i<maxButtons){
      switch (add){
        case true:
          if(TOTAL_PAGES>=positivesPages){
            buttons?.push(positivesPages)
            positivesPages+=1
            add=false
            i++
          } else{add=false}
          break
          case false:
            if(negativesPages>1){
              negativesPages-=1
              buttons?.push(negativesPages)
              i++
              add=true
            } else{add=true}
            break
          default:
            i++
      }
    }
    return (buttons?.sort((a,b)=>a-b)?.map((e)=>e-currentPage))
  }
  useEffect(()=>{
    setButtons(getButtons(currentPage, MAX_BUTTONS))
  }, [TOTAL_PAGES, currentPage])

  const getMaxProducts = () => (numberOfProducts !== rows ? rows * (currentPage - 1) + numberOfProducts : rows * currentPage);
  return (
    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
      <div className="flex-1 flex justify-between sm:hidden">
        <a
          href={`#${changePage(currentPage - 1)}`}
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href={`#${changePage(currentPage + 1)}`}
          className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{currentPage * rows - rows + 1}</span> to <span className="font-medium">{getMaxProducts()}</span> of{' '}
            <span className="font-medium">{TOTAL_PAGES * rows}</span> results
          </p>
        </div>
        <div>
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <a
              href={`#${changePage(currentPage - 1)}`}
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </a>
            {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}
            {buttons?.map((increase) => {
              const page = currentPage + increase;
              const activeCssClass = 'z-10 bg-indigo-50 border-indigo-600 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium';
              let cssClass = 'hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium bg-white border-gray-300 text-gray-500';

              if (increase === 0) {
                cssClass = activeCssClass;
              }
              return (
                <a key={`PAGE-NUMBER-${page}`} href={`#${page}`} className={cssClass}>
                  {page}
                </a>
              );
            })}
            <a
              href={`#${changePage(currentPage + 1)}`}
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}
