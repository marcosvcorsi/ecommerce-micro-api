import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Product } from './product.entity';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productsRepository: ProductsRepository,
    private readonly elasticsearchService: ElasticsearchService,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productsRepository.find();
  }

  async create(productDto: Omit<Product, 'id'>): Promise<Product> {
    const product = this.productsRepository.create(productDto);

    await this.productsRepository.save(product);

    const { id, name } = product;

    await this.elasticsearchService.index({
      index: 'products',
      body: {
        id,
        name,
      },
    });

    return product;
  }
}
