import { Injectable, NotFoundException} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Product } from "./product.model";


@Injectable()
export class ProductService {
  constructor(@InjectModel('Product') private readonly productModel: Model<Product>) {}
  
  async addProduct(title: string, desc: string, price: number) {
    const newProduct = new this.productModel({title, description: desc, price});
    const result = await newProduct.save();
    return {productId: result.id};
  }

  async allProducts() {
    return await this.productModel.find();
  }

  async findOneProduct(id) {
    const product = await this.findProduct(id);
    return product;
  }

  async updateProduct(id, title, desc, price) {
    const product = await this.findProduct(id);
    if (title) {
      product.title = title;
    } 
    if (desc) {
      product.description = desc;
    }
    if (price) {
      product.price = price;
    }
    return product.save();
  }

  async deleteProduct(id) {
    const result = await this.productModel.deleteOne({ _id: id});
    return result;
  }

  async findProduct(id) {
    try {
      const product = await this.productModel.findById(id);
      if (!product) {
        throw new NotFoundException('not found that productId');
      }
      return product;
    } catch (err) {
      throw new NotFoundException('not found that productId');
    }
  }
}