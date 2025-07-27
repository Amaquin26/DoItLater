export const SORT_BY_FILTERS: Array<{label: string, value: string}> = [
    {label: 'Newest', value: 'newest'},
    {label: 'Oldest', value: 'oldest'},
]

export const SORT_BY_FILTERS_DEFAULT = SORT_BY_FILTERS.length ?  SORT_BY_FILTERS[0].value: "";