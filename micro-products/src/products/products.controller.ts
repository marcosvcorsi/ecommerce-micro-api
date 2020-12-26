import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { Product } from './product.entity';
import { ProductsService } from './products.service';

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @EventPattern('create-product')
  async create(@Payload() createProductDto: Omit<Product, 'id'>) {
    await this.productsService.create(createProductDto);
  }

  @MessagePattern('find-products')
  async findAll(@Payload() data: any) {
    const { ids } = data;

    if (ids) {
      return this.productsService.findByIds(ids);
    }

    return this.productsService.findAll();
  }

  @MessagePattern('search-products')
  async search(@Payload() data: any) {
    const { name } = data;

    return this.productsService.findAllByName(name);
  }

  @MessagePattern('suggest-products')
  async suggest(@Payload() data: any) {
    const { name } = data;

    return this.productsService.search(name);
  }
}
