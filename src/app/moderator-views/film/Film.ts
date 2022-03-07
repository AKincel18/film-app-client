import { Dictionary } from "../dictionary/Dictionary";
import { Person } from "../person/Person";

export interface Film {
    id: number,
    name: string, 
    category: Dictionary,
    director: Person,
    releaseDate: Date,
    runningTime: number,
    budget: number
}