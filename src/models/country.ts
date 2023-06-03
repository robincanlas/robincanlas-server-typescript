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

export namespace Covid {
  export interface GetCountry {
    updated: number;
    country: string;
    countryInfo: {
      _id: number;
      iso2: string;
      iso3: string;
      lat: number;
      long: number;
      flag: string;
    };
    cases: number;
    todayCases: number;
    deaths: number;
    todayDeaths: number;
    recovered: number;
    todayRecovered: number;
    active: number;
    critical: number;
    casesPerOneMillion: number;
    deathsPerOneMillion: number;
    tests: number;
    testsPerOneMillion: number;
    population: number;
    continent: number;
    oneCasePerPeople: number;
    oneDeathPerPeople: number;
    oneTestPerPeople: number;
    activePerOneMillion: number;
    recoveredPerOneMillion: number;
    criticalPerOneMillion: number;
  }

  export interface GetHistoricalByCountry {
    country: string;
    province: string[];
    timeline: {
      cases: {
        date: number;
      };
      deaths: {
        date: number;
      };
      recovered: {
        date: number;
      };
    };
  }

  export interface GetHistorical {
    cases: {
      date: number;
    };
    deaths: {
      date: number;
    };
    recovered: {
      date: number;
    };
  }

  export interface GetAll {
    updated: number;
    cases: number;
    todayCases: number;
    deaths: number;
    recovered: number;
    todayRecovered: number;
    active: number;
    critical: number;
    casesPerOneMillion: number;
    deathsPerOneMillion: number;
    tests: number;
    testsPerOneMillion: number;
    population: number;
    oneCasePerPeople: number;
    oneDeathPerPeople: number;
    oneTestPerPeople: number;
    activePerOneMillion: number;
    recoveredPerOneMillion: number;
    criticalPerOneMillion: number;
    affectedCountries: number;
  }

  export interface WorldometerCountries {
    updated: number;
    country: string;
    countryInfo: {
      _id: number;
      iso2: string;
      iso3: string;
      lat: number;
      long: number;
      flag: string
    };
    cases: number;
    todayCases: number;
    deaths: number;
    todayDeaths: number;
    recovered: number;
    todayRecovered: number;
    active: number;
    critical: number;
    casesPerOneMillion: number;
    deathsPerOneMillion: number;
    tests: number;
    testsPerOneMillion: number;
    population: number;
    continent: number;
    oneCasePerPeople: number;
    oneDeathPerPeople: number;
    oneTestPerPeople: number;
    activePerOneMillion: number;
    recoveredPerOneMillion: number;
    criticalPerOneMillion: number;
  }

  export interface JhucsseCountries {
    country: string;
    county: string;
    updatedAt: string;
    stats: {
      confirmed: number;
      deaths: number;
      recovered: number;
    };
    coordinates: {
      latitude: string;
      longitude: string;
    };
    province: string;
    flag: string;
  }
}