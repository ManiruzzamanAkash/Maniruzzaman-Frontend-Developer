/**
 * External dependencies.
 */
import {__} from '@wordpress/i18n';

/**
 * Internal dependencies.
 */
import {missions, statuses, types} from "../../utils/spacex-data-helper";
import {ISearch} from "../../interfaces";

export default function Search({
                                   filter,
                                   onSearched,
                                   onFiltered,
                                   searchText = __('Search', 'bsf-spacex'),
                                   searchButtonstyle = {}
                               }: ISearch) {

    const handleSearch = (e: any) => {
        e.preventDefault();
        onSearched(filter);
    }

    const handleChange = (e: any) => {
        onFiltered({
            name: e.target.name,
            value: e.target.value
        });
    }

    return (
        <form className="capsule-filter-form" onSubmit={handleSearch}>
            <div className="form-div-area">
                <select className=""
                        value={filter.status}
                        onChange={handleChange}
                        name="status"
                >
                    {
                        Object.keys(statuses).map((status, index) => (
                            <option value={status} key={index}>
                                {statuses?.[status]}
                            </option>
                        ))
                    }
                </select>

                <select className=""
                        value={filter.mission}
                        onChange={handleChange}
                        name="mission"
                >
                    {
                        Object.keys(missions).map((mission, index) => (
                            <option value={mission} key={index}>
                                {missions?.[mission]}
                            </option>
                        ))
                    }
                </select>

                <select className=""
                        name="type"
                        value={filter.type}
                        onChange={handleChange}
                >
                    {
                        Object.keys(types).map((type, index) => (
                            <option value={type} key={index}>
                                {types?.[type]}
                            </option>
                        ))
                    }
                </select>
            </div>

            <div className="search-button">
                <button type="submit" className="" style={searchButtonstyle}>
                    {searchText}
                </button>
            </div>
        </form>
    )
}
