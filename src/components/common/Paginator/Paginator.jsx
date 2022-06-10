import React, {useEffect, useState} from 'react';
import styles from './Paginator.module.css';
import classNames from 'classnames';

const Paginator = ({totalItemsCount, pageSize, currentPage, onPageChanged, portionSize = 10}) => {
  const pagesCount = Math.ceil(totalItemsCount / pageSize);
  const pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }
  const portionCount = Math.ceil(pagesCount / portionSize);
  const [portionNumber, setPortionNumber] = useState(1);
  const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  const rightPortionPageNumber = portionNumber * portionSize;

  useEffect(() => {
      onPageChanged((portionNumber - 1) * portionSize + 1);
    },
    [portionNumber, onPageChanged, portionSize]);

  const goToPortion = (portion) => () => {
    setPortionNumber(portion);
  };


  return (
    <div className={styles.paginator}>
      {portionNumber > 2 && <button onClick={goToPortion(1)}>FIRST</button>}
      {portionNumber > 1 && <button onClick={goToPortion(portionNumber - 1)}>PREV</button>}
      {pages
        .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
        .map(p => {
          return (
            <span className={classNames({[styles.selectedPage]: currentPage === p}, styles.pageNumber)}
                  key={p}
                  onClick={(e) => {onPageChanged(p);}}>{p}</span>);
        })}
      {portionCount > portionNumber && <button onClick={goToPortion(portionNumber + 1)}>NEXT</button>}
      {portionCount > portionNumber + 1 && <button onClick={goToPortion(portionCount)}>LAST</button>}
    </div>
  );
};

export default Paginator;