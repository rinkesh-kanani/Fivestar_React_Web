import classNames from 'classnames';
import React, { useCallback, useMemo, useState } from 'react';
import { isEmpty } from '../helpers/common';

const PAGINATION_ACTION = {
  FIRST: 'First',
  PREVIOUS: 'Previous',
  NEXT: 'Next',
  LAST: 'Last'
};

const Pagination = ({ data, onChangePage }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const onClickPage = useCallback(
    (page) => {
      setCurrentPage(page);
      onChangePage(page);
    },
    [onChangePage]
  );

  const onPressPaginationAction = useCallback(
    (action) => {
      let page = 1;
      if (action === PAGINATION_ACTION.FIRST) {
        page = 1;
      } else if (action === PAGINATION_ACTION.PREVIOUS) {
        page = currentPage - 1;
      } else if (action === PAGINATION_ACTION.NEXT) {
        page = currentPage + 1;
      } else if (action === PAGINATION_ACTION.LAST) {
        page = data?.last;
      }
      onClickPage(page);
    },
    [onClickPage, currentPage, data?.last]
  );

  const pagination = useMemo(() => {
    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === data?.last;
    return { isFirstPage, isLastPage };
  }, [currentPage, data?.last]);

  if (isEmpty(data)) return null;
  return (
    <ul class='pagination'>
      <li
        p='1'
        className={classNames('page-item', {
          inactive: pagination?.isFirstPage,
          active: !pagination?.isFirstPage
        })}
        onClick={
          !pagination?.isFirstPage
            ? () => {
                onPressPaginationAction(PAGINATION_ACTION.FIRST);
              }
            : null
        }>
        <a class='page-link'>First</a>
      </li>
      <li
        style={{ borderRadius: 80 }}
        className={classNames('page-item', {
          inactive: pagination?.isFirstPage,
          active: !pagination?.isFirstPage
        })}
        onClick={
          !pagination?.isFirstPage
            ? () => {
                onPressPaginationAction(PAGINATION_ACTION.PREVIOUS);
              }
            : null
        }>
        <a class='page-link'>Previous</a>
      </li>
      {data?.pagination?.map((page_number, index) => {
        return (
          <li
            p='1'
            className={classNames('page-item', {
              pagination_active: currentPage === page_number,
              active: currentPage !== page_number
            })}
            key={`page_number_${page_number}_index_${index + 1}`}
            onClick={
              currentPage !== page_number
                ? () => {
                    onClickPage(page_number);
                  }
                : null
            }>
            <a class='page-link'>{page_number}</a>
          </li>
        );
      })}
      <li
        class='active page-item'
        className={classNames('page-item', {
          inactive: pagination?.isLastPage,
          active: !pagination?.isLastPage
        })}
        onClick={
          !pagination?.isLastPage
            ? () => {
                onPressPaginationAction(PAGINATION_ACTION.NEXT);
              }
            : null
        }>
        <a class='page-link'>Next</a>
      </li>
      <li
        p='1'
        className={classNames('page-item', {
          inactive: pagination?.isLastPage,
          active: !pagination?.isLastPage
        })}
        onClick={
          !pagination?.isLastPage
            ? () => {
                onPressPaginationAction(PAGINATION_ACTION.LAST);
              }
            : null
        }>
        <a class='page-link'>Last</a>
      </li>
    </ul>
  );
};

export default Pagination;
