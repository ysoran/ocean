import { Dispatch, SetStateAction } from "react";

export interface IShipInterface {
  MMSI: number;
  TIME: string;
  LONGITUDE: number;
  LATITUDE: number;
  COG: number;
  SOG: number;
  HEADING: number;
  ROT: number;
  NAVSTAT: number;
  IMO: number;
  NAME: string;
  CALLSIGN: string;
  TYPE: number;
  A: number;
  B: number;
  C: number;
  D: number;
  DRAUGHT: number;
  DEST: string;
  ETA: string;
}

export interface ILister {
  ships: Array<IShipInterface> | undefined;
  showHeader: boolean;
  setShowHeader: (opt: boolean) => void;
  port: IPort;
}

export interface IPort {
  name: string;
  country_code: string;
  city_code: string;
  location: string;
  value: string;
}

export interface IMapProps {
  center?: any;
  zoom?: number;
  ships: Array<IShipInterface>;
  port: IPort;
}

export interface IPortProps {
  lat: number;
  lng: number;
  name?: string;
}

export interface IShipProps {
  lat: number;
  lng: number;
  name: string;
  idle: boolean;
  eta: string;
  dest: string;
  imo: number;
}

export interface ISearchPanel {
  handleSearch: (
    port: number,
    startDate: string,
    endDate: string,
    distance: number | string,
    includeIdleVessels: boolean,
    setSearchWarning: Dispatch<SetStateAction<string | undefined>>
  ) => void;
  clear: any;
}
