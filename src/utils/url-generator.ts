export const buildQueryByParameters = (filter: object, baseUrl: string) => {
    const queryParams = Object.entries(filter)
        .filter(([key, value]) => value)
        .map(([key, value]) => `${key}=${value}`)
        .join('&');

    return `${baseUrl}?${queryParams}`;
}
