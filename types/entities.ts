import { type Tables } from './database.types'

export type User = Tables<'users'>
export type Product = Tables<'products'>
export type ProductCategory = Tables<'product_categories'>
export type ProductTag = Tables<'product_tags'>
export type Tag = Tables<'tags'>