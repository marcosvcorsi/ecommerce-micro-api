import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { Product } from './product.entity';
import { ProductsService } from './products.service';

@Controller()
export class ProductsController {
  private readonly logger = new Logger(ProductsController.name);

  constructor(private readonly productsService: ProductsService) {}

  @EventPattern('create-product')
  async create(@Payload() createProductDto: Omit<Product, 'id'>) {
    await this.productsService.create(createProductDto);
  }
}
