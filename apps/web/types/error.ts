import { AxiosError } from "axios"

export type ServerError = { message: string }
export type ApiError = AxiosError<ServerError>
