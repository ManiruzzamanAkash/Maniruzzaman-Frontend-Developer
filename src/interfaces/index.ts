export interface IModal {
    show?: boolean;
    title?: string;
    onCloseModal: () => void,
    children?: React.ReactNode
}

export interface IMission {
    name: string;
    flight: number;
}

export interface ICapsule {
    status: string;
    capsule_serial: string;
    capsule_id: string;
    landings: string;
    missions: Array<IMission>;
    type: string;
    original_launch: string;
    details: string;
}

export interface ICapsuleItem {
    capsule: ICapsule,
    isShortView?: boolean;
}

export interface INoCapsule {
    length: number;
    onResetFilter: () => void,
    filterResetButtonStyle?: object;
}

export interface IFilter {
    status?: string;
    mission?: string;
    type?: string;
    page?: number;
    limit?: number;
};

export interface ISearch {
    filter: IFilter;
    onFiltered: (filter: object) => void;
    onSearched: (filter: object) => void;
    searchText?: string;
    searchButtonstyle?: object
};

export interface IPagination {
    totalItems: number;
    pageItems: number;
    perPage?: number;
    onChangePage: (page: number) => void;
    currentPage: number;
    buttonStyle?: React.CSSProperties;
    secondaryButtonStyle?: React.CSSProperties;
    previousTextLabel?: string;
    nextTextLabel?: string;
}

export interface ISpacexDataView {
    searchTextLabel?: string;
    previousTextLabel?: string;
    nextTextLabel?: string;
    buttonStyle?: object;
    secondaryButtonStyle?: object;
}

export interface IBadge {
    status: 'active' | 'retired' | 'unknown';
}