/**
 * External dependencies.
 */
import {__} from "@wordpress/i18n";

/**
 * Internal dependencies.
 */
import {IPagination} from "../../interfaces";

export default function Pagination({
                                       totalItems,
                                       perPage = 10,
                                       pageItems,
                                       currentPage = 1,
                                       onChangePage = () => {},
                                       buttonStyle = {},
                                       secondaryButtonStyle = {},
                                       previousTextLabel = __('Previous', 'bsf-spacex'),
                                       nextTextLabel = __('Next', 'bsf-spacex'),
                                   }: IPagination) {
    const totalPages = Math.ceil(totalItems / perPage);

    return (
        <div className='bsf-spacex-pagination'>
            <div className='total-items'>
                {
                    pageItems > 0 &&
                    <div>
                        <b className="page-count">
                            {__('Page', 'bsf-spacex')} - {currentPage} of {totalPages} &nbsp;
                        </b>

                        <span className="items-count">
                            {__('Showing', 'bsf-spacex')} {pageItems} in {totalItems} {__('items', 'bsf-spacex')}
                        </span>
                    </div>
                }
            </div>

            {
                totalPages > 1 &&
                <div className='pagination-prev-next'>
                    <button disabled={currentPage === 1} className="pagination-prev" style={secondaryButtonStyle}
                            onClick={() => onChangePage(currentPage - 1)}>
                        {previousTextLabel}
                    </button>
                    <button disabled={currentPage === totalPages} className="pagination-next" style={buttonStyle}
                            onClick={() => onChangePage(currentPage + 1)}>
                        {nextTextLabel}
                    </button>
                </div>
            }
        </div>
    )
}
