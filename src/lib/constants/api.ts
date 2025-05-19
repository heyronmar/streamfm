const fallbackServers = ['de2', 'de1', 'us1', 'nl1', 'fr1'];

export function getRadioBrowserBaseURL(): string {
  // You can enhance this later to actually ping/test availability
    return `https://${fallbackServers[0]}.api.radio-browser.info/json`;
    
}

export const RADIO_BROWSER_ENDPOINTS = {
    SEARCH_STATIONS: `${getRadioBrowserBaseURL()}/stations/search`,
    BY_COUNTRY: `${getRadioBrowserBaseURL()}/stations/bycountry`,
    BY_TAG: `${getRadioBrowserBaseURL()}/stations/bytag`,
    BY_UUID: (uuid: string) => `${getRadioBrowserBaseURL()}/stations/byuuid/${uuid}`,
    BY_NAME: (name: string) => `${getRadioBrowserBaseURL()}/stations/byname/${encodeURIComponent(name)}`
};