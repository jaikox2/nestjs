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
    @Body('price') price: number): 
    { productId: string } {
    const productId = this.productService.addProduct(title, desc, price);
    return productId;
  }

  @Get()
  getAllProducts(): Product[] {
    return this.productService.allProducts();
  }

  @Get(':id')
  getOneProduct(@Param('id') id: string): {} {
    return this.productService.findOneProduct(id);
  }

  @Patch(':id')
  updateProduct(
    @Param('id') id: string,
    @Body('title') title: string,
    @Body('description') desc: string,
    @Body('price') price: number) {
      this.productService.updateProduct(id, title, desc, price);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    this.productService.deleteProduct(id);
  }
}