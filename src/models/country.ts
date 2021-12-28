export namespace Country {
  export interface Get {
    latitude: number;
    longitude: number;
    type: string;
    name: string;
    number: number;
    postal_code: number;
    street: string;
    confidence: number;
    region: string;
    region_code: number;
    county: string;
    locality: string;
    administrative_area: string;    
    neighbourhood: string;
    country: string;       
    country_code: string;
    continent: string;
    label: string;
  }
}