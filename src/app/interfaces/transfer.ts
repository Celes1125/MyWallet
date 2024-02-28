import { Pocket } from "./pocket"
import { User } from "./user"

export interface Transfer {
    date: Date,
    user: User,
    fromPocket: Pocket,
    toPocket: Pocket, 
    amount: number,
    note: string   

}
