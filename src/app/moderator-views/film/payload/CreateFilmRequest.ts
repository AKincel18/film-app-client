export interface CreateFilmRequest {
    name: string,
    categoryId: number,
    directorId: number,
    releaseDate: Date,
    runningTime: number
}