import { Body, Controller, Get, Post, Query } from '@nestjs/common';
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

  @Get()
  findAll() {
    return this.clientProxyProduct.send('find-products', {}).toPromise();
  }

  @Get('/search')
  search(@Query('q') name: string) {
    return this.clientProxyProduct
      .send('search-products', { name })
      .toPromise();
  }
}
