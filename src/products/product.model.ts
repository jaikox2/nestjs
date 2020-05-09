import * as mongoose from "mongoose";


export const ProductSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number
})

export interface Product extends mongoose.Document {
  id: string,
  title: string,
  description: string,
  price: number
}

// export class Product {
//   constructor(
//     public id: string,
//     public title: string,
//     public description: string,
//     public price: number
//   ) {}
// }