interface Links {
  url: string | null,
  label: string,
  page: number,
  active: boolean
}

const getCurrentPage = (links: Links[]) => {
  const activePage = links.find(link => link.active && link.page);
  return activePage ? activePage.page : 1;
};

const generatePagination = (links: Links[]) => {
  const currentPage = getCurrentPage(links);
  const totalPages = links.length - 2; 
  const pages = [];

  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    if (currentPage <= 3) {
      pages.push(links[0], links[1], links[2], links[3]);
      links[4].label = '...';
      pages.push(links[4]);
      pages.push(links[links.length - 1]);
      pages.push(links[links.length - 2]);

    } else if (currentPage >= totalPages - 2) {
      pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);

    } else {
      pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
    }
  }



  return pages;
};

export default generatePagination