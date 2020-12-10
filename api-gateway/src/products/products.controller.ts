import { Body, Controller, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ClientProxyService } from 'src/shared/services/client-proxy.service';
import { CreateProductDto } from './dtos/create-product.dto';

@Controller('products')
export class ProductsController {
  private readonly clientProxyProduct: ClientProxy;

  constructor(clientProxyService: ClientProxyService) {
    this.clientProxyProduct = clientProxyService.getClientProxyInstance(
      'products',
    );
  }

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    this.clientProxyProduct.emit('create-product', createProductDto);
  }
}
