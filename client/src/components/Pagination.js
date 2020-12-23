import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

const PaginationStyles = styled.div`
  display: flex;
  align-content: center;
  align-items: center;
  justify-items: center;
  border: 1px solid var(--gray);
  margin: 2rem 0;
  border-radius: 5px;
  text-align: center;
  & > * {
    padding: 1rem;
    flex: 1;
    border-right: 1px solid var(--gray);
    text-decoration: none;
    &[aria-current],
    &.current {
      color: var(--red);
    }
    &[disabled] {
      pointer-events: none;
      color: var(--gray);
    }
  }
`;

export default function Pagination({
  pageSize,
  totalCount,
  currentPage,
  skip,
  basePath,
}) {
  const totalPages = Math.ceil(totalCount / pageSize);
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;
  const hasNextPage = !(nextPage <= totalPages);
  const hasPrevPage = !(prevPage >= 1);
  const pages = Array.from(Array(totalPages).keys(), (k) => k + 1);

  return (
    <PaginationStyles>
      <Link disabled={hasPrevPage} to={`${basePath}/${prevPage}`}>
        &#8592; Prev
      </Link>
      {pages.map((pageNum) => (
        <Link
          key={`page-${pageNum}`}
          to={`${basePath}${pageNum > 1 ? `/${pageNum}` : ''}`}
        >
          {pageNum}
        </Link>
      ))}
      <Link disabled={hasNextPage} to={`${basePath}/${nextPage}`}>
        Next &#8594;
      </Link>
    </PaginationStyles>
  );
}
