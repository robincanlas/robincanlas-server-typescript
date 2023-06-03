export namespace Earthquake {
  interface Features {
    type: string,
    properties: {
      mag: number
      place: string;
      time: number;
      updated: number;
      tz: number;
      url: string;
      detail: string;
      felt:number;
      cdi: number
      mmi: number
      alert: string;
      status: string;
      tsunami: number;
      sig:number;
      net: string;
      code: string;
      ids: string;
      sources: string;
      types: string;
      nst: number;
      dmin: number
      rms: number
      gap: number
      magType: string;
      type: string;
    };
    geometry: {
      type: string;
      coordinates: any[];
    };
    id: string;
  }

  export interface Get {
    type: string;
    metadata: {
      generated: number;
      url: string;
      title: string;
      api: string;
      count: number;
      status: number;    
    };
    bbox: any[];
    features: Features[];
  }
}

