import {
  ServiceType,
  ServiceStatus,
} from './enum';

export interface IBikeStation {
  StationUID?: string;
  StationID?: string;
  AuthorityID?: string;
  StationName?: INameType;
  StationPosition?: IPointType;
  StationAddress?: INameType;
  StopDescription?: string;
  BikesCapacity?: number;
  ServiceType?: ServiceType;
  SrcUpdateTime?: Date | string;
  UpdateTime: Date | string;
}

export interface INameType {
  Zh_tw?: string;
  En?: string;
}

export interface IPointType {
  PositionLon?: number;
  PositionLat?: number;
  GeoHash?: string;
}

export interface IBikeAvailability {
  StationUID?: string;
  StationID?: string;
  ServiceStatus?: ServiceStatus;
  ServiceType?: ServiceType;
  AvailableRentBikes? :number;
  AvailableReturnBikes? :number;
  SrcUpdateTime?: Date | string;
  UpdateTime: Date | string;
}