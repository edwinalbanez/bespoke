import { Link } from "@/types";
import { router } from "@inertiajs/react";

const getValidData = (object: object) => {
  return Object.fromEntries(
    Object.entries(object)
      .filter(([, value]) =>
         (value !== null && value !== undefined && value !== '')
      )
  );
}

const handleNavigation = (
  link: Link,
  query: object = {}
) => {
  
  if (!link.url || link.active) return
  const data = getValidData(query);

  router.get(
    link.url,
    data,
    { preserveState: true }
  );
}

const getCurrentPage = (links: Link[]) => {
  const activePage = links.find(link => link.active);
  return activePage ? activePage.page : 1;
};


const generatePagination = (urls: Link[], data: object = {}) => {

  const links = structuredClone(urls); 

  const getLink = (page: number, label?: string) => {
    const link = links.find(link => link.page === page);
    if (link) {
      link.label = label ? label : link.label;
    }
    return link;
  }

  //remove the "previous" and "next" links
  const previousLink = links.shift();
  const nextLink = links.pop();

  const currentPage = getCurrentPage(links);
  const totalPages = links.length;
  const pages = [];
  if (totalPages <= 5) {
    // Show all pages
    pages.push(...links)

  } else {
    if (currentPage <= 3) {
      // Show first 3 pages + ... + last page
      pages.push(
        getLink(1), getLink(2), getLink(3), getLink(4, '...'), getLink(totalPages)
      )

    } else if (currentPage >= totalPages - 2) {
      // Show first page + ... + last 3 pages
      pages.push(
        getLink(1), getLink(2, '...'), getLink(totalPages - 2), getLink(totalPages - 1), getLink(totalPages)
      )
    } else {
      // Show first + ... + current-1, current, current+1 + ... + last
      pages.push(
        getLink(1),
        getLink(2, '...'),
        getLink(currentPage-1),
        getLink(currentPage),
        getLink(currentPage+1),
        getLink(currentPage+2, '...'),
        getLink(totalPages)
      );
    }
  }

  //add the "previous" and "next" links
  pages.unshift(previousLink);
  pages.push(nextLink);

  const queryData = getValidData(data);
  pages.forEach(page => {    
    if (page) { 
      page.click = () => handleNavigation(page, queryData)
    }
  })

  return pages.filter(page => page !== undefined);
};

export default generatePagination