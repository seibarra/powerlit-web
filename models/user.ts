import { type Json } from "~/types/database.types"

export default class User {
    uid: string
    name: string
    lastname: string
    email: string
    phonenumber: { number: string, countryCode: string } | null
    phonenumber2: { number: string, countryCode: string } | null
    role: string
    createdAt: string
    updatedAt: string | null

    constructor(data: any) {
        this.uid = data.uid
        this.name = data.name
        this.lastname = data.lastname
        this.email = data.email
        this.phonenumber = data.phonenumber
        this.phonenumber2 = data.phonenumber2
        this.role = data.role
        this.createdAt = data.createdAt
        this.updatedAt = data.updatedAt
    }
}