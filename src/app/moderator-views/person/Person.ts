import { Dictionary } from "../dictionary/Dictionary";

export interface Person {
    id: number | null;
    firstName: string;
    lastName: string;
    birthDate: Date | null;
    personRole: Dictionary;
}