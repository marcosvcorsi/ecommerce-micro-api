import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class ProductsController {
  private readonly logger = new Logger(ProductsController.name);

  @EventPattern('create-product')
  async create(@Payload() createProductDto: any) {
    this.logger.log(createProductDto);
  }
}
