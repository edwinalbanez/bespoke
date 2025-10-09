import { Link } from "@/types";

const getCurrentPage = (links: Link[]) => {
  const activePage = links.find(link => link.active);
  return activePage ? activePage.page : 1;
};

const generatePagination = (urls: Link[]) => {

  const links = structuredClone(urls); 

  //remove the "previous" and "next" links
  const previousLink = links.shift();
  const nextLink = links.pop();
  
  const getLink = (page: number, label?: string) => {
    const link = links.find(link => link.page === page);

    if (link) {
      link.label = label ? label : link.label;
    }

    return link;
  }

  const currentPage = getCurrentPage(links);
  const totalPages = links.length; //excluding the "previous" and "next" links
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
      )
    }
  }

  //add the "previous" and "next" links
  pages.unshift(previousLink);
  pages.push(nextLink);

  return pages.filter(page => page !== undefined);
};

export default generatePagination