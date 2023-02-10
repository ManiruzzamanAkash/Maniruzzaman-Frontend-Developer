/**
 * External dependencies.
 */
import domReady from "@wordpress/dom-ready";
import {render, useState} from "@wordpress/element";
import {__} from '@wordpress/i18n';

/**
 * Internal dependencies.
 */
import {ICapsule, ICapsuleItem, IFilter, ISpacexDataView} from "../../interfaces";
import {CAPSULE_BASE_URL, initialFilter} from "../../utils/spacex-data-helper";
import Search from "../../components/spacex-data-search/Search";
import Modal from "../../components/modal/Modal";
import CapsuleItem from "../../components/capsule/CapsuleItem";
import LoadingSpinner from "../../components/spinner/LoadingSpinner";
import {buildQueryByParameters} from "../../utils/url-generator";
import Pagination from "../../components/pagination";
import useCapsuleFetchData from "../../hooks/use-capsule-fetch-data";
import NoCapsule from "../../components/capsule/NoCapsule";

const View = ({
                  searchTextLabel = '',
                  buttonStyle = {},
                  secondaryButtonStyle = {},
                  previousTextLabel,
                  nextTextLabel
              }: ISpacexDataView) => {
    const [path, setPath] = useState<string>(CAPSULE_BASE_URL);
    const [showModal, setShowModal] = useState(false);
    const {capsules, total, loading} = useCapsuleFetchData(path);
    const [filter, setFilter] = useState<IFilter>({...initialFilter});
    const onFiltered = (filtersData: object) => {
        setFilter({
            ...filter,
            [filtersData.name]: filtersData.value
        })
    }

    const onSearched = () => {
        setPath(buildQueryByParameters(filter, CAPSULE_BASE_URL));
    }

    const onResetFilter = () => {
        setPath(buildQueryByParameters(initialFilter, CAPSULE_BASE_URL));
        setFilter(initialFilter);
    }

    // @ts-ignore
    const [selectedCapsule, setSelectedCapsule] = useState<ICapsuleItem>(null);
    const onSelectCapsule = (capsule: ICapsule) => {
        setShowModal(true);
        setSelectedCapsule({
            capsule,
            isShortView: false,
        });
    };

    const onChangePage = (page: number) => {
        onFiltered({
            name: 'page',
            value: page,
        });

        setPath(buildQueryByParameters({
            ...filter,
            page
        }, CAPSULE_BASE_URL));
    }

    return (
        <>
            <Search
                filter={filter}
                onFiltered={onFiltered}
                onSearched={onSearched}
                searchText={searchTextLabel}
                searchButtonstyle={buttonStyle}
            />

            <>
                {
                    loading ? <LoadingSpinner count={4}/> :
                        <div className="capsules-area">
                            {
                                capsules.map((capsule, index) => (
                                    <div onClick={() => onSelectCapsule(capsule)} key={index}>
                                        <CapsuleItem capsule={capsule} isShortView={true}/>
                                    </div>
                                ))
                            }
                            <NoCapsule
                                length={capsules.length}
                                filterResetButtonStyle={buttonStyle}
                                onResetFilter={onResetFilter}
                            />
                        </div>
                }
            </>

            <Modal
                show={showModal}
                onCloseModal={() => setShowModal(false)}
                title={`#${selectedCapsule?.capsule?.capsule_serial}`}
            >
                {selectedCapsule !== null && <div>
                    <CapsuleItem capsule={selectedCapsule.capsule} isShortView={false}/>
                </div>}
            </Modal>

            {
                (!loading && capsules.length > 0) &&
                <Pagination
                    totalItems={total}
                    pageItems={capsules.length}
                    onChangePage={onChangePage}
                    currentPage={filter.page === undefined ? 1 : filter.page}
                    previousTextLabel={previousTextLabel}
                    nextTextLabel={nextTextLabel}
                    buttonStyle={buttonStyle}
                    secondaryButtonStyle={secondaryButtonStyle}
                />
            }
        </>
    );
};

domReady(function () {
    const container = document.querySelector("#bsf-spacex-spacex-data-view");

    if (container === null) {
        return;
    }

    const searchTextLabel = container.getAttribute("data-search-text-label") ?? __('Search', 'bsf-spacex');
    const previousTextLabel = container.getAttribute("data-prev-text-label") ?? __('Previous', 'bsf-spacex');
    const nextTextLabel = container.getAttribute("data-next-text-label") ?? __('Next', 'bsf-spacex');
    const buttonColorBg = container.getAttribute("data-button-color-bg");
    const buttonColorText = container.getAttribute("data-button-color-text");
    const buttonStyle = {
        backgroundColor: buttonColorBg,
        color: buttonColorText
    }
    const buttonColorBgSecondary = container.getAttribute("data-button-color-bg-secondary");
    const buttonColorTextSecondary = container.getAttribute("data-button-color-text-secondary");
    const buttonStyleSecondary = {
        backgroundColor: buttonColorBgSecondary,
        color: buttonColorTextSecondary
    }

    const observer = new IntersectionObserver(
        function (entries) {
            render(
                <View
                    searchTextLabel={searchTextLabel}
                    buttonStyle={buttonStyle}
                    secondaryButtonStyle={buttonStyleSecondary}
                    previousTextLabel={previousTextLabel}
                    nextTextLabel={nextTextLabel}
                />,
                container
            );
        }
    );
    observer.observe(container);
});
