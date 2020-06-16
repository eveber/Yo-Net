import React, {useState} from "react";
import css from './Paginator.module.scss';

//Paginator
let Paginator = React.memo(({totalUsersCount, usersPageSize, currentPage, onCurrentPageClick, portionSize = 10}) => {
    let pages = [];
    let pageCount = Math.ceil(totalUsersCount / usersPageSize);
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i);
    }

    let portionCount = Math.ceil(pageCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;

    return (
        <div className={`${css.site_pagination} ${css.site_block}`}>
            {portionNumber > 1 && <a
                className={css.site_link + ' ' + css.btnPrev}
                onClick={() => setPortionNumber(portionNumber - 1)}>
                <i className="fas fa-chevron-left">{null}</i></a>}

            {
                pages
                    .filter((p) => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                    .map((p) => <span
                        key={p}
                        className={currentPage === p ? css.current_page : null}
                        onClick={() => onCurrentPageClick(p)}>{p}</span>)
            }

            {portionCount > portionNumber && <a
                className={css.site_link + ' ' + css.btnNext}
                onClick={() => setPortionNumber(portionNumber + 1)}>
                <i className="fas fa-chevron-right">{null}</i></a>}
        </div>
    )
});

export default Paginator;
