/**
 * External dependencies.
 */
import {__} from "@wordpress/i18n";
import {useState} from "@wordpress/element";
import {InspectorControls, useBlockProps} from "@wordpress/block-editor";
import {__experimentalInputControl as InputControl, ColorPalette, PanelBody} from '@wordpress/components';

/**
 * Internal dependencies.
 */
import "./editor.scss";
import Search from "../../components/spacex-data-search/Search";
import LoadingSpinner from "../../components/spinner/LoadingSpinner";
import CapsuleItem from "../../components/capsule/CapsuleItem";
import {IFilter} from "../../interfaces";
import {buildQueryByParameters} from "../../utils/url-generator";
import {CAPSULE_BASE_URL, colors, initialFilter} from "../../utils/spacex-data-helper";
import Pagination from "../../components/pagination";
import useCapsuleFetchData from "../../hooks/use-capsule-fetch-data";
import NoCapsule from "../../components/capsule/NoCapsule";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 * @return {WPElement} Element to render.
 */
export default function Edit({attributes, setAttributes}) {
    const {
        searchTextLabel,
        buttonColorBg,
        buttonColorText,
        colorBgSecondary,
        colorTextSecondary,
        previousTextLabel,
        nextTextLabel
    } = attributes;
    const [, setPath] = useState<string>(CAPSULE_BASE_URL);
    const [filter, setFilter] = useState<IFilter>({...initialFilter, limit: 2});
    const pathFiltered = buildQueryByParameters({ ...filter }, CAPSULE_BASE_URL);
    const {capsules, total, loading} = useCapsuleFetchData(pathFiltered);

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
        <div {...useBlockProps()}>
            <>
                <Search
                    filter={filter}
                    onFiltered={onFiltered}
                    onSearched={onSearched}
                    searchText={searchTextLabel}
                    searchButtonstyle={{
                        background: buttonColorBg,
                        color: buttonColorText
                    }}
                />

                {
                    loading ? <LoadingSpinner count={3} /> :
                        <div className="capsules-area">
                            {
                                capsules.map((capsule, index: number) => (
                                    <CapsuleItem capsule={capsule} isShortView={true} key={index}/>
                                ))
                            }

                            <NoCapsule
                                length={capsules.length}
                                filterResetButtonStyle={{
                                    background: buttonColorBg,
                                    color: buttonColorText
                                }}
                                onResetFilter={onResetFilter}
                            />
                        </div>
                }

                {
                    (!loading && capsules.length > 0) &&
                    <Pagination
                        totalItems={total}
                        pageItems={capsules.length}
                        onChangePage={onChangePage}
                        currentPage={filter.page === undefined ? 1 : filter.page}
                        perPage={filter.limit}
                        buttonStyle={{
                            backgroundColor: buttonColorBg,
                            color: buttonColorText
                        }}
                        secondaryButtonStyle={{
                            backgroundColor: colorBgSecondary,
                            color: colorTextSecondary
                        }}
                        previousTextLabel={previousTextLabel}
                        nextTextLabel={nextTextLabel}
                    />
                }
            </>

            <InspectorControls>
                <PanelBody
                    title={__('Text labels', 'bsf-spacex')}
                    initialOpen
                >
                    <p className="!my-3 text-sm">
                        {__('Search button text label', 'bsf-spacex')}
                    </p>
                    <InputControl
                        value={searchTextLabel}
                        onChange={(searchTextValue: string | undefined) => setAttributes({
                            searchTextLabel: searchTextValue ?? ''
                        })}
                    />

                    <p className="!my-3 text-sm">
                        {__('Pagination Previous text label', 'bsf-spacex')}
                    </p>
                    <InputControl
                        value={previousTextLabel}
                        onChange={(previousTextLabelValue: string | undefined) => setAttributes({
                            previousTextLabel: previousTextLabelValue ?? ''
                        })}
                    />

                    <p className="!my-3 text-sm">
                        {__('Pagination Next text label', 'bsf-spacex')}
                    </p>
                    <InputControl
                        value={nextTextLabel}
                        onChange={(nextTextLabelValue: string | undefined) => setAttributes({
                            nextTextLabel: nextTextLabelValue ?? ''
                        })}
                    />
                </PanelBody>

                <PanelBody
                    title={__('Color Settigs', 'bsf-spacex')}
                    initialOpen={false}
                >
                    <p className="!my-3 text-sm">
                        {__('Button background color', 'bsf-spacex')}
                    </p>
                    <ColorPalette
                        colors={colors}
                        value={buttonColorBg}
                        onChange={(colorValue: string | undefined) => setAttributes({
                            buttonColorBg: colorValue ?? ''
                        })}
                    />

                    <p className="!my-3 text-sm">
                        {__('Button text color', 'bsf-spacex')}
                    </p>
                    <ColorPalette
                        colors={colors}
                        value={buttonColorText}
                        onChange={(colorValue) => setAttributes({
                            buttonColorText: colorValue ?? ''
                        })}
                    />

                    <p className="!my-3 text-sm">
                        {__('Secondary background color', 'bsf-spacex')}
                    </p>
                    <ColorPalette
                        colors={colors}
                        value={colorBgSecondary}
                        onChange={(colorValue) => setAttributes({
                            colorBgSecondary: colorValue ?? ''
                        })}
                    />

                    <p className="!my-3 text-sm">
                        {__('Secondary text color', 'bsf-spacex')}
                    </p>
                    <ColorPalette
                        colors={colors}
                        value={colorTextSecondary}
                        onChange={(colorValue) => setAttributes({
                            colorTextSecondary: colorValue ?? ''
                        })}
                    />
                </PanelBody>
            </InspectorControls>
        </div>
    );
}
