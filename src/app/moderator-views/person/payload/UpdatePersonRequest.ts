export interface UpdatePersonRequest {
    id: number;
    firstName: string | null;
    lastName: string | null;
    birthDate: Date | null;
    roleId: number | null;
}