import { DealType } from './deal-type';

// all
export type Condition = "new" | "used" | 'other'
export type Color = "black" | "white" | "grey" | "red" | "pink" | "orange" | "yellow" | "green" | "blue" | "clear" | "multicolor"
export type Delivery = "cdek" | "yandex" | "dpd" | "other"
export type Amount = "1" | "2" | "3 - 5" | "6 - 10" | "11 - 20" | "21 - 50" | "> 51"

// personal
export type MaleClothesType = "outerwear" | "pants" | "shirts" | "jackets" | "sportwear" | "homewear" | "other"
export type MaleClothesSize = "s" | "m" | "l" | "xl" | "2xl" | "3xl" | "> 3xl" | "one-size"
export type MaleShoesType = "boots" | "sneakers" | "slippers" | "other"
export type MaleShoesSize = "< 38" | "38" | "39" | "40" | "41" | "42" | "43" | "> 43"
export type FemaleClothesType = "outerwear" | "pants" | "shirts" | "dresses" | "skirts" | "jackets" | "sportwear" | "homewear" | "other"
export type FemaleClothesSize = "xxs" | "xs" | "s" | "m" | "l" | "xl" | "2xl" | "> 2xl" | "one-size"
export type FemaleShoesType = "boots" | "sneakers" | "slippers" | "sandals" | "heels" | "other"
export type FemaleShoesSize = "< 35" | "35" | "36" | "37" | "38" | "39" | "40" | "> 40"
export type BagType = "backpack" | "sporstbag" | "bag" | "other"
export type BagSize = "s" | "m" | "l" | "xl"

// kids
export type GirlsClothesType = "dresses" | "skirts" | "outerwear" | "pants" | "shirts" | "jackets" | "sportwear" | "homewear" | "other"
export type BoysClothesType = "outerwear" | "pants" | "shirts" | "jackets" | "sportwear" | "homewear" | "other"
export type KidsClothesSize = "> 1" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "13" | "14" | "< 14" | "one-size"
export type KidsShoesType = "boots" | "sneakers" | "slippers" | "sandals" | "other"
export type KidsShoesSize = "< 16" | "16" | "17" | "18" | "19" | "20" | "21" | "22" | "23" | "24" | "25" | "26" | "27" | "28" | "29" | "30" | "31" | "32" | "33" | "34" | "35" | "36" | "> 36" | "one-size"
export type KidsForSchool = "books" | "sport" | "accessories" | "other"

// home
export type FurnitureType = "table" | "chair" | "bed" | "closet" | "other"
export type AppliancesType = "bathroom" | "kitchen" | "other"
export type DecorType = "mirror" | "textile" | "accessories" | "other"

// pets
export type PetType = "dog" | "cat" | "parrot" | "aquarium" | "other"
export type PetGender = "female" | "male" | "unknow"
export type PetAge = "newborn" | "< 1" | "1 - 2" | "2 - 3" | "3 - 5" | "5 - 8" | "> 8" | "unknow"
export type PetAccessoriesType = "cells" | "walk" | "food" | "accessories" | "other"


// у меня может быть 50+ категорий, я хочу организовать это удобно уже сейчас
export interface IItem {
    userId: string
    dealType: DealType
    name: string
    description?: string
    img?: string
    city?: string
    district?: string
}
export interface IDonate {
    amount: Amount
    condition: Condition
    delivery?: Delivery
}
export interface IDonatePets {
    amount: Amount
}

//category
export interface IPersonal extends IItem {
    color: Color
}
export interface IKids extends IItem {
    color: Color
}
export interface IHome extends IItem {
    color: Color
}
export interface IPet extends IItem {

}

//personal
export interface IFemaleClothes extends IPersonal {
    size: FemaleClothesSize
    type: FemaleClothesType
}
export interface IFemaleShoes extends IPersonal {
    size: FemaleShoesSize
    type: FemaleShoesType
}
export interface IMaleClothes extends IPersonal {
    size: MaleClothesSize
    type: MaleClothesType
}
export interface IMaleShoes extends IPersonal {
    size: MaleShoesSize,
    type: MaleShoesType
}
export interface IBags extends IPersonal {
    size: BagSize
    type: BagType
}

//kids
export interface IGirlsClothes extends IKids {
    size: KidsClothesSize,
    type: GirlsClothesType
}
export interface IBoysClothes extends IKids {
    size: KidsClothesSize
    type: BoysClothesType
}
export interface IKidsShoes extends IKids {
    size: KidsShoesSize,
    type: KidsShoesType
}
export interface IKidsSchool extends IItem {
    type: KidsForSchool
}

//home
export interface IHomeFurniture extends IHome {
    type: FurnitureType
}
export interface IHomeAppliances extends IHome {
    type: AppliancesType,
    year: number
}
export interface IHomeDecor extends IHome {
    type: DecorType
}

//pets
export interface IPets extends IPet {
    gender: PetGender
    type: PetType
    breed: string
    age: PetAge
}
export interface IPetAccesorries extends IItem {
    type: PetAccessoriesType
}





