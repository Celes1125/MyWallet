export interface Pocket {
    _id: string,
    name: string,
    amount: number,
    currency: string,
    creationDate: Date,
    lastModified: Date | null | undefined,
    wallet: {
        _id: string,
        name: string,
        creationDate: Date,
        lastModified: Date | null | undefined
        activated: boolean,
        creator: string | null | undefined
    }

}