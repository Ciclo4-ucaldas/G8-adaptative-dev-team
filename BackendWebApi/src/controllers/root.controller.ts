import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Root} from '../models';
import {RootRepository} from '../repositories';

export class RootController {
  constructor(
    @repository(RootRepository)
    public rootRepository : RootRepository,
  ) {}

  @post('/roots')
  @response(200, {
    description: 'Root model instance',
    content: {'application/json': {schema: getModelSchemaRef(Root)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Root, {
            title: 'NewRoot',
            exclude: ['id'],
          }),
        },
      },
    })
    root: Omit<Root, 'id'>,
  ): Promise<Root> {
    return this.rootRepository.create(root);
  }

  @get('/roots/count')
  @response(200, {
    description: 'Root model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Root) where?: Where<Root>,
  ): Promise<Count> {
    return this.rootRepository.count(where);
  }

  @get('/roots')
  @response(200, {
    description: 'Array of Root model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Root, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Root) filter?: Filter<Root>,
  ): Promise<Root[]> {
    return this.rootRepository.find(filter);
  }

  @patch('/roots')
  @response(200, {
    description: 'Root PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Root, {partial: true}),
        },
      },
    })
    root: Root,
    @param.where(Root) where?: Where<Root>,
  ): Promise<Count> {
    return this.rootRepository.updateAll(root, where);
  }

  @get('/roots/{id}')
  @response(200, {
    description: 'Root model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Root, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Root, {exclude: 'where'}) filter?: FilterExcludingWhere<Root>
  ): Promise<Root> {
    return this.rootRepository.findById(id, filter);
  }

  @patch('/roots/{id}')
  @response(204, {
    description: 'Root PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Root, {partial: true}),
        },
      },
    })
    root: Root,
  ): Promise<void> {
    await this.rootRepository.updateById(id, root);
  }

  @put('/roots/{id}')
  @response(204, {
    description: 'Root PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() root: Root,
  ): Promise<void> {
    await this.rootRepository.replaceById(id, root);
  }

  @del('/roots/{id}')
  @response(204, {
    description: 'Root DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.rootRepository.deleteById(id);
  }
}
