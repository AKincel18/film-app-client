export interface UpdateFilmRequest {
    id: number,
    name: string | null,
    categoryId: number | null,
    directorId: number | null,
    releaseDate: Date | null,
    runningTime: number | null
}