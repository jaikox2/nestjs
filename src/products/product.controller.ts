import { Controller, Post, Body, Get, Param, Patch, Delete } from "@nestjs/common";
import { ProductService } from "./product.service";
import { Product } from "./product.model";


@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post()
  addProduct(
    @Body('title') title: string,
    @Body('description') desc: string,
    @Body('price') price: number) {
    const productId = this.productService.addProduct(title, desc, price);
    return productId;
  }

  @Get()
  async getAllProducts() {
    return await this.productService.allProducts();
  }

  @Get(':id')
  async getOneProduct(@Param('id') id: string) {
    return await this.productService.findOneProduct(id);
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body('title') title: string,
    @Body('description') desc: string,
    @Body('price') price: number) {
      return await this.productService.updateProduct(id, title, desc, price);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    return await this.productService.deleteProduct(id);
  }
}