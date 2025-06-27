/**
 * 아파트 관련 데이터 관리 파일
 * 
 * 현재 백엔드 API가 구현되지 않은 상태에서 프론트엔드 개발을 위해
 * 임시로 생성된 목업(mock) 데이터입니다.
 * 
 * 목적:
 * - HomePage의 신축아파트 분양정보 및 요즘 뜨는 아파트 섹션 데이터 제공
 * - SearchPage의 자동완성, 추천 검색어, 인기 검색어, 최근 찾아본 단지 데이터 제공
 * - 컴포넌트 간 데이터 재사용성 및 중앙 집중식 관리
 * 
 * 향후 백엔드 API 연동 시 이 파일의 데이터는 실제 API 호출로 대체될 예정입니다.
 * 
 * 데이터 구조:
 * - Apartment: 기본 아파트 정보 (id, name, region, imageUrl, totalUnit, buildingRange)
 * - RecentApartment: 최근 찾아본 단지 정보 (Apartment 확장 + location, parkingCapacity, lastViewedAt)
 * - 각 섹션별 데이터: newApartments, trendingApartments, autocompleteData 등
 */

export interface Apartment {
  id: number;
  name: string;
  region: string;
  imageUrl: string;
  totalUnit: number;
  buildingRange: string;
  status?: string;
  price?: string;
  views?: string;
  favorites?: string;
}

export interface RecentApartment extends Apartment {
  location: string;
  parkingCapacity: number;
  lastViewedAt: string;
}

export const newApartments: Apartment[] = [
  { 
    id: 13, 
    name: '송도더샵센트럴파크', 
    region: '인천시 연수구 송도동', 
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=300&h=300&fit=crop',
    totalUnit: 2500,
    buildingRange: '101동 ~ 125동 (25개동)',
    status: '분양예정',
  },
  { 
    id: 14, 
    name: '판교아이파크', 
    region: '경기도 성남시 분당구 판교동', 
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=300&h=300&fit=crop',
    totalUnit: 1800,
    buildingRange: '101동 ~ 118동 (18개동)',
    status: '분양중',
  },
  { 
    id: 15, 
    name: '광교중앙푸르지오', 
    region: '경기도 수원시 영통구 광교동', 
    imageUrl: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=300&h=300&fit=crop',
    totalUnit: 1200,
    buildingRange: '101동 ~ 112동 (12개동)',
    status: '분양예정',
  },
  { 
    id: 16, 
    name: '동탄역롯데캐슬', 
    region: '경기도 화성시 동탄동', 
    imageUrl: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=300&h=300&fit=crop',
    totalUnit: 2200,
    buildingRange: '101동 ~ 122동 (22개동)',
    status: '분양중',
  },
];

export const trendingApartments: Apartment[] = [
  { 
    id: 1, 
    name: '래미안원베일리', 
    region: '서울시 서초구 반포동', 
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=300&h=300&fit=crop',
    totalUnit: 2990,
    buildingRange: '101동 ~ 123동 (23개동)',
  },
  { 
    id: 6, 
    name: '반포센트럴자이', 
    region: '서울시 서초구 잠원동', 
    imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=300&h=300&fit=crop',
    totalUnit: 757,
    buildingRange: '101동 ~ 107동 (7개동)',
  },
  { 
    id: 7, 
    name: '서초역푸르지오', 
    region: '서울시 서초구 서초동', 
    imageUrl: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=300&h=300&fit=crop',
    totalUnit: 890,
    buildingRange: '101동 ~ 110동 (10개동)',
  },
  { 
    id: 4, 
    name: '래미안타워', 
    region: '서울시 송파구 잠실동', 
    imageUrl: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=300&h=300&fit=crop',
    totalUnit: 2000,
    buildingRange: '101동 ~ 120동 (20개동)',
  },
];

export const autocompleteData: Apartment[] = [
  { 
    id: 1, 
    name: '래미안원베일리', 
    region: '서울시 서초구 반포동', 
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=300&h=300&fit=crop',
    totalUnit: 2990,
    buildingRange: '101동 ~ 123동 (23개동)'
  },
  { 
    id: 2, 
    name: '래미안아파트', 
    region: '서울시 강남구 역삼동', 
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=300&h=300&fit=crop',
    totalUnit: 1500,
    buildingRange: '101동 ~ 115동 (15개동)'
  },
  { 
    id: 3, 
    name: '래미안빌라', 
    region: '서울시 마포구 합정동', 
    imageUrl: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=300&h=300&fit=crop',
    totalUnit: 800,
    buildingRange: '101동 ~ 108동 (8개동)'
  },
  { 
    id: 4, 
    name: '래미안타워', 
    region: '서울시 송파구 잠실동', 
    imageUrl: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=300&h=300&fit=crop',
    totalUnit: 2000,
    buildingRange: '101동 ~ 120동 (20개동)'
  },
  { 
    id: 5, 
    name: '래미안하이츠', 
    region: '서울시 영등포구 여의도동', 
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=300&h=300&fit=crop',
    totalUnit: 1200,
    buildingRange: '101동 ~ 112동 (12개동)'
  },
  { 
    id: 6, 
    name: '반포센트럴자이', 
    region: '서울시 서초구 잠원동', 
    imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=300&h=300&fit=crop',
    totalUnit: 757,
    buildingRange: '101동 ~ 107동 (7개동)'
  },
  { 
    id: 7, 
    name: '서초역푸르지오', 
    region: '서울시 서초구 서초동', 
    imageUrl: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=300&h=300&fit=crop',
    totalUnit: 890,
    buildingRange: '101동 ~ 110동 (10개동)'
  },
  { 
    id: 8, 
    name: '송파역푸르지오', 
    region: '서울시 송파구 송파동', 
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=300&h=300&fit=crop',
    totalUnit: 1200,
    buildingRange: '101동 ~ 115동 (15개동)'
  },
  { 
    id: 9, 
    name: '영등포역푸르지오', 
    region: '서울시 영등포구 영등포동', 
    imageUrl: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=300&h=300&fit=crop',
    totalUnit: 950,
    buildingRange: '101동 ~ 108동 (8개동)'
  },
  { 
    id: 10, 
    name: '오목교역푸르지오', 
    region: '서울시 양천구 목동', 
    imageUrl: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=300&h=300&fit=crop',
    totalUnit: 1100,
    buildingRange: '101동 ~ 112동 (12개동)'
  },
  { 
    id: 11, 
    name: '마포구아파트', 
    region: '서울시 마포구 공덕동', 
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=300&h=300&fit=crop',
    totalUnit: 850,
    buildingRange: '101동 ~ 105동 (5개동)'
  },
  { 
    id: 12, 
    name: '양천구아파트', 
    region: '서울시 양천구 신월동', 
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=300&h=300&fit=crop',
    totalUnit: 1300,
    buildingRange: '101동 ~ 118동 (18개동)'
  },
];

export const recentApartmentsData: RecentApartment[] = [
  { 
    id: 1, 
    name: '래미안원베일리', 
    region: '서울시 서초구 반포동',
    location: '서울시 서초구 반포동 1',
    totalUnit: 2990,
    parkingCapacity: 3500,
    buildingRange: '101동 ~ 123동 (23개동)',
    lastViewedAt: '2024-01-01',
    imageUrl: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=300&h=300&fit=crop'
  },
  { 
    id: 2, 
    name: '반포센트럴자이', 
    region: '서울시 서초구 잠원동',
    location: '서울시 서초구 잠원동 162',
    totalUnit: 757,
    parkingCapacity: 3500,
    buildingRange: '101동 ~ 107동 (7개동)',
    lastViewedAt: '2024-01-01',
    imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=300&h=300&fit=crop'
  },
];

export const recommendedKeywords = [
  '래미', '래미안원베일리', '서초구', '마포구', '송파구', '영등포구', '양천구'
];

export const popularKeywordsData = [
  '래미안원베일리', '서초역', '반포르엘 아파트', '송파역', '영등포역', '오목교역'
]; 