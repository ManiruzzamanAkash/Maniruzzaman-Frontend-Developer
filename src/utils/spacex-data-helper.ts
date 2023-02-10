/**
 * External dependencies.
 */
import {__} from '@wordpress/i18n';

export const CAPSULE_BASE_URL = '/bsf-spacex/v1/capsules';

export const statuses = {
    '': __('All statuses', 'bsf-spacex'),
    'active': __('Active', 'bsf-spacex'),
    'retired': __('Retired', 'bsf-spacex'),
    'destroyed': __('Destroyed', 'bsf-spacex'),
    'unknown': __('Unknown', 'bsf-spacex'),
}

export const types = {
    '': __('All types', 'bsf-spacex'),
    'Dragon 1.0': __('Dragon 1.0', 'bsf-spacex'),
    'Dragon 1.1': __('Dragon 1.1', 'bsf-spacex'),
    'Dragon 2.0': __('Dragon 2.0', 'bsf-spacex'),
};

export const missions = {
    '': __('All missions', 'bsf-spacex'),
    'COTS 1': __('COTS 1', 'bsf-spacex'),
    'COTS 2': __('COTS 2', 'bsf-spacex'),
    'CRS-1': __('CRS-1', 'bsf-spacex'),
    'CRS-2': __('CRS-2', 'bsf-spacex'),
    'CRS-3': __('CRS-3', 'bsf-spacex'),
};

export const colors = [
    {name: 'black', color: '#000'},
    {name: 'primary', color: '#0891b2'},
    {name: 'white', color: '#fff'},
    {name: 'cyan', color: '#8BF5FA'},
    {name: 'blue', color: '#85CDFD'},
    {name: 'purple', color: '#645CBB'},
];

export const initialFilter = {
    status: '',
    mission: '',
    type: '',
    page: 1,
    limit: 10,
}
