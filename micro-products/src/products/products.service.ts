import { Injectable } from '@nestjs/common';
import { Product } from './product.entity';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async findAll(): Promise<Product[]> {
    return this.productsRepository.find();
  }

  async create(productDto: Omit<Product, 'id'>): Promise<Product> {
    const product = this.productsRepository.create(productDto);

    await this.productsRepository.save(product);

    return product;
  }
}
