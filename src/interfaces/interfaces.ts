export interface Store {
  storeChannels: StoreChannel[];
  placeId: string;
  name: string;
  location: Location;
  address: string;
  rating: number;
  numRatings: number;
}
export interface StoreChannel {
  phone: string;
  city: string;
  priceLevel: string;
  ticketPrice: number;
  rating: number;
  platform: PlatformType;
  platformStoreId: string;
  platformStoreName: string;
  platformStoreDescription: string;
  platformStoreAddress: string;
  platformStoreUrl: string;
  note: string;
  products: Product[];
  reviews: Review[];
  requestedToGoogleMaps: boolean;
  location: Location;
  placeId: string;
}
export interface Location {
  lat: number;
  lng: number;
}
export enum PlatformType {
  Deliveroo = 'Deliveroo',
  Glovo = 'Glovo',
  Google = 'Google',
  JustEat = 'JustEat',
  Tripadvisor = 'Tripadvisor',
  TheFork = 'TheFork',
  UberEats = 'UberEats',
}
export interface Product {
  platform: PlatformType;
  platformProductId: string;
  storeName: string;
  category: string;
  name: string;
  description: string;
  imageUrl: string;
  currency: string;
  price: number;
  discountedPrice: number;
}
export interface Review {
  date: Date;
  platformReviewId: string;
  ratingValue: number;
  review: string;
  reviewerId: string;
  reviewerAvatar: string;
  reviewerFirstName: string;
  reviewerLastName: string;
  reviewerCount: number;
}
