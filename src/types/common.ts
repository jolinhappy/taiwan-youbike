export interface ILatLngLiteral {
  lat: number;
  lng: number;
}
export interface IMapMakerInfo {
  position: ILatLngLiteral;
  map: any;
  html: string;
}
export interface IFormatedStationInfo {
  stationUID?: number;
  lat: number;
  lng: number;
  availableRentBikes: number;
  availableReturnBikes: number;
}