/**
 * Internal dependencies.
 */
import { buildQueryByParameters } from "../../../src/utils/url-generator";

describe('buildQueryByParameters', () => {
    it('should build a query string from the given parameters', () => {
        const filter = {
            status: 'active',
            mission: 'CRS-1',
            type: 'Dragon 1.1',
        };
        const baseUrl = 'https://example.com';

        const expectedResult = 'https://example.com?status=active&mission=CRS-1&type=Dragon 1.1';
        const result = buildQueryByParameters(filter, baseUrl);

        expect(result).toBe(expectedResult);
    });

    it('should only include parameters with truthy values', () => {
        const filter = {
            a: '1',
            b: false,
            c: '',
        };
        const baseUrl = 'https://example.com';

        const expectedResult = 'https://example.com?a=1';
        const result = buildQueryByParameters(filter, baseUrl);

        expect(result).toBe(expectedResult);
    });
});