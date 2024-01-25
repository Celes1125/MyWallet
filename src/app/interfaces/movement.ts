import { Vendor } from './vendor';
import { CurrencyType } from "../enums/currency-type";
import { MovementType } from "../enums/movement-type";
import { Category } from './category';
import { Pocket } from './pocket';

export interface Movement {
    _id: string,
    type: MovementType,
    date: Date,
    amount: number,
    currency: CurrencyType,
    user: string | null | undefined,
    vendor: Vendor,
    category: Category,
    pocket: Pocket
}
