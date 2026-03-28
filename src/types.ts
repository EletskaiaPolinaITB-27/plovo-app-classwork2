export interface IDishShort {
  name: string
  description: string
  price: number
}
export interface IDishList {
    [id:string]: IDishShort
}
export interface IDish extends IDishShort{
    id: string
}
export interface IBasket {
  dish: IDish
  count: number
}
export interface IBasketState{
  items: IBasket[]
  totalPrice: number
  totalCount: number
}
export interface IDeliveryDetails {
  name: string;
  address: string;
  phone: string;
}

export interface IOrder {
  items: IBasket[];
  totalPrice: number;
  totalCount: number;
  deliveryDetails: IDeliveryDetails;
}