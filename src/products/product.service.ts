import { Injectable, NotFoundException} from "@nestjs/common";
import { Product } from "./product.model";


@Injectable()
export class ProductService {
  private products: Product[] = [];
  
  addProduct(title: string, desc: string, price: number): {productId: string} {
    const productId = Math.random().toString();
    const newProduct = new Product(productId, title, desc, price);
    this.products.push(newProduct);
    return { productId };
  }

  allProducts() {
    return [...this.products];
  }

  findOneProduct(id) {
    const [product, index] = this.findProduct(id);
    if (!product) {
      throw new NotFoundException('not found that productId');
    }
    return product;
  }

  updateProduct(id, title, desc, price) {
    const [product, index] = this.findProduct(id);
    if (title) {
      product.title = title;
    } 
    if (desc) {
      product.description = desc;
    }
    if (price) {
      product.price = price;
    }
    this.products[index] = product;
  }

  deleteProduct(id) {
    const [product, index] = this.findProduct(id);
    this.products.splice(index, 1);
  }

  findProduct = (id): [Product, number] => {
    const index = this.products.findIndex((item) => item.id === id)
    return [this.products[index], index];
  }
}