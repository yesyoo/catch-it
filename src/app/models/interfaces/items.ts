import { Category, Collection } from "./category";
import { Deal } from "./deal-type";

export type Condition = "new" | "used" | "other";
export type Delivery = "dpd" | "yandex" | "cdek" | "all" | "no-delivery" | "other";
export type DealType = "donate" | "request" | "exchange";
export type ClothesType = "outerwear" | "pants" | "shirts" | "jackets" | "sportwear" | "homewear" | "dresses" | "skirts" | "other";
export type ShoesType = "boots" | "sneakers" | "slippers" | "sandals" | "heels" | "other";
export type ShoesSize =  "16" | "17" | "18" | "19" | "20" | "21" | "22" | "23" | "24" | "25" | "26" | "27" | "28" | "29" | "30" 
| "31" | "32" | "33" | "34" | "35" | "36" | "37" | "38" | "39" | "40" | "41" | "42" | "43" | "44" | "45" | "46" | "47" | "one-size";
export type ClothesSize = "xxs" | "xs" | "s" | "m" | "l" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "104" | "110" | "116" | "122" | "128" 
| "134" | "140" | "146" | "152" | "158" | "164" | "one-size";
export type Gender = "male" | "female";
export type Age = "adult" | "child";
export type Color = "black" | "white" | "multi-color";
export type Season = "summer" | "winter" | "demi-season"

export type UnionCategoryType = IPersonalClothes | IPersonalShoes

export interface IItem {
    title: string,
    description: string,
    condition?: Condition,
    amount?: number,
    city: string,
    district?: string
    delivery?: Delivery,
};
export interface IPersonalClothes {
    type: ClothesType,
    size: ClothesSize,
    season: Season,
    color: Color,
    gender?: string,
    adult?: boolean
};
export interface IPersonalShoes {
    type: ShoesType,
    size: ShoesSize,
    season: Season,
    color: Color,
    gender?: string,
    adult?: boolean
};

export interface IPostItem {
    user: string,
    username: string,
    collection: Collection,
    category: Category,
    deal: Deal,
    item: IItem,
    cat: UnionCategoryType,
    img?: File
};
export interface IItemDB {
    _id: string,
    user: string,
    username: string,
    collection: Collection,
    category: Category,
    deal: Deal,
    date: number,
    show: boolean,
    reserved: boolean,
    blocked: boolean,
    item: IItem,
    cat: UnionCategoryType,
    img?: string,
    bookmark?: boolean
}


