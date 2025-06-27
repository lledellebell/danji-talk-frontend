export interface Danji {
  id: number;
  name: string;
  address: string;
}

export interface PopularKeyword {
  keyword: string;
  score: number;
}

export interface RecentKeyword {
  keyword: string;
}

export interface RecentApartment {
  id: number;
  name: string;
  region: string;
  location: string;
  totalUnit: number;
  parkingCapacity: number;
  buildingRange: string;
  lastViewedAt: string;
  imageUrl: string;
} 