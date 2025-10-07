interface Link {
  url: string | null,
  label: string,
  page: number,
  active: boolean
}

const getCurrentPage = (links: Link[]) => {
  const activePage = links.find(link => link.active && link.page);
  return activePage ? activePage.page : 1;
};

const generatePagination = (links: Link[]) => {
  const getLink = (page: number, label?: string) => {
    const link = links.find(link => 
      link.page === page && link.label === `${page}`
    )

    if (link && label) {
      link.label = label;
    }

    return link;
  }
  const currentPage = getCurrentPage(links);
  const totalPages = links.length - 2; //excluding the "previous" and "next" links
  const pages = [];
  if (totalPages <= 5) {
    // Show all pages
    // for (let i = 1; i <= totalPages; i++) {
    //   pages.push(i);
    // }

    pages.push(...links)

  } else {
    if (currentPage <= 3) {
      // Show first 3 pages + ... + last page
      // pages.push(1, 2, 3, '...', totalPages);
      pages.push(
        getLink(1), getLink(2), getLink(3), getLink(4, '...'), getLink(totalPages)
      )

    } else if (currentPage >= totalPages - 2) {
      // Show first page + ... + last 3 pages
      // pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
      pages.push(
        getLink(1), getLink(2, '...'), getLink(totalPages - 2), getLink(totalPages - 1), getLink(totalPages)
      )
    } else {
      // Show first + ... + current-1, current, current+1 + ... + last
      // pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      pages.push(
        getLink(1),
        getLink(2, '...'),
        getLink(currentPage-1),
        getLink(currentPage),
        getLink(currentPage+1),
        getLink(currentPage+2),
        getLink(totalPages)
      )
    }
  }

  //add the "previous" and "next" links
  pages.unshift(links[0]);
  pages.push(links[links.length-1]);

  return pages;
};

export default generatePagination