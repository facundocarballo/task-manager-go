import { ICategory } from "../components/Category";

export interface ITaskManagerContext {
    // React useState attributes
    categories: ICategory[] | null,

    // React useState methods
    setCategories: (_categories: ICategory[]|null) => void
}