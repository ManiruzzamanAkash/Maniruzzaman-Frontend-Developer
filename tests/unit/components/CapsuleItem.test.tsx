import { render } from '@testing-library/react';
import CapsuleItem from '../../../src/components/capsule/CapsuleItem';
import { ICapsule } from '../../../src/interfaces';

const capsule: ICapsule = {
    capsule_serial: 'C101',
    capsule_id: 'dragon01',
    type: 'Dragon 1.0',
    status: 'active',
    original_launch: '2010-12-08T00:00:00.000Z',
    landings: 5,
    missions: [
        {
            name: 'FalconSat-2',
            flight: 1
        },
        {
            name: 'COTS 1',
            flight: 2
        }
    ],
    details: 'This is a test capsule'
};

describe('CapsuleItem', () => {
    it('renders without crashing', () => {
        const { container } = render(<CapsuleItem capsule={capsule} isShortView={false} />);
        expect(container).toBeDefined();
    });

    it('hides details and missions when isShortView is true', () => {
        const { queryByText } = render(<CapsuleItem capsule={capsule} isShortView={true} />);
        expect(queryByText(/Missions/i)).toBeNull();
        expect(queryByText(/Details/i)).toBeNull();
        expect(queryByText('#C102')).toBeDefined();
        expect(queryByText(/Dragon 2.0/i)).toBeDefined();
        expect(queryByText(/Landed/i)).toBeDefined();
    });
});