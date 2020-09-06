import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const PagWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;
const Pag = styled.ul`
  display: flex;
  padding: 0 10px;
  border-radius: 26px;
  background-color: #fff;
  overflow: hidden;
`;

const PagListItem = styled.li`
  font-size: 16px;
  line-height: 50px;

  a {
    display: block;
    padding: 0 14px;
    color: #595959;
    text-decoration: none;
  }

  &:hover,
  &.active {
    background-color: #86c023;
    a {
      color: #fff;
    }
  }

  &:hover:first-child,
  &:hover:last-child {
    background-color: transparent;
    a {
      color: #86c023;
    }
  }
`;

const Pagination = ({ totalItems, itemsPerPage, onPaginate, ...rest }) => {
  const [start, setStart] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pages = [];

  for (let i = 0; i < totalPages; i++) pages[i] = i + 1;

  const currentPages = pages.splice(start, 5);

  const onClick = (e) => {
    e.preventDefault();

    const { textContent: value } = e.target;

    setCurrentPage(parseInt(value));
  };

  useEffect(() => {
    const currentPageIndex = currentPages.indexOf(currentPage);

    if (currentPageIndex > 3) {
      if (currentPages.pop() !== totalPages) setStart(start + 1);
    }

    if (currentPageIndex < 1 && currentPages.shift() !== 1) setStart(start - 1);

    onPaginate(currentPage);
  }, [currentPage]);

  return (
    <PagWrapper>
      <Pag {...rest}>
        <PagListItem className={`${currentPage === 1 && 'disabled'}`}>
          <a
            style={{ boxShadow: 'none' }}
            className='page-link'
            href='#'
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) setCurrentPage(currentPage - 1);
            }}>
            Prev
          </a>
        </PagListItem>
        {currentPages.map((page, key) => (
          <>
            <PagListItem
              key={key}
              className={`${page === currentPage && 'active'}`}>
              <a
                onClick={onClick}
                className='page-link'
                style={{ boxShadow: 'none' }}
                href='#'>
                {page}
              </a>
            </PagListItem>
          </>
        ))}
        <PagListItem className={`${currentPage === totalPages && 'disabled'}`}>
          <a
            style={{ boxShadow: 'none' }}
            className='page-link'
            href='#'
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages) setCurrentPage(currentPage + 1);
            }}>
            Next
          </a>
        </PagListItem>
      </Pag>
    </PagWrapper>
  );
};

export default Pagination;
