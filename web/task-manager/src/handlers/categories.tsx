import { ICategory } from "../components/Category"; 

export const copyCategories = (categories: ICategory[]): ICategory[] => {
    let cats: ICategory[] = [];
    for (let c of categories) {
        cats.push(c)
    }
    return cats;
}