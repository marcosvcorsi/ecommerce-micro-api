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

  async search(name: string) {
    const { body } = await this.elasticsearchService.search({
      index: 'products',
      size: 20,
      body: {
        query: {
          match: { name },
        },
      },
    });

    const findProducts = body.hits.hits.map((hit) => hit['_source']);

    return findProducts;
  }

  async findAllByName(name: string): Promise<Product[]> {
    const findProducts = await this.search(name);

    const productsIds = findProducts.map((product) => product.id);

    const products = await this.productsRepository.findByIds(productsIds);

    return products;
  }
}
