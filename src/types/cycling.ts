export interface IBikeShape {
  RouteName: string;
  AuthorityName?: string;
  CityCode: string;
  City: string;
  Town?: string;
  RoadSectionStart?: string;
  RoadSectionEnd?: string;
  Direction?: string;
  CyclingType?: string;
  CyclingLength?: number;
  FinishedTime?: string;
  UpdateTime: Date | string;
  Geometry: string;
  EncodedPolyline: string;
}