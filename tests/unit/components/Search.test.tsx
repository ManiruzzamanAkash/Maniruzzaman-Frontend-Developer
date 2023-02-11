import { render } from '@testing-library/react';
import Search from '../../../src/components/spacex-data-search/Search';

describe('Search', () => {
    it('renders the form with the correct options', () => {
        const onSearched = jest.fn();
        const onFiltered = jest.fn();
        const searchButtonstyle = {};
        const { getByText } = render(
            <Search
                filter={{ status: '', mission: '', type: '' }}
                onSearched={onSearched}
                onFiltered={onFiltered}
                searchButtonstyle={searchButtonstyle}
            />
        );

        expect(getByText('Search')).toBeInTheDocument();
        expect(getByText('All types')).toBeInTheDocument();
        expect(getByText('All missions')).toBeInTheDocument();
        expect(getByText('All statuses')).toBeInTheDocument();
    });
});