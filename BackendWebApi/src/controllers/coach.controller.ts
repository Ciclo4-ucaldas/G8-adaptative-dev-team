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
import {Coach} from '../models';
import {CoachRepository} from '../repositories';

export class CoachController {
  constructor(
    @repository(CoachRepository)
    public coachRepository : CoachRepository,
  ) {}

  @post('/coaches')
  @response(200, {
    description: 'Coach model instance',
    content: {'application/json': {schema: getModelSchemaRef(Coach)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Coach, {
            title: 'NewCoach',
            exclude: ['id'],
          }),
        },
      },
    })
    coach: Omit<Coach, 'id'>,
  ): Promise<Coach> {
    return this.coachRepository.create(coach);
  }

  @get('/coaches/count')
  @response(200, {
    description: 'Coach model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Coach) where?: Where<Coach>,
  ): Promise<Count> {
    return this.coachRepository.count(where);
  }

  @get('/coaches')
  @response(200, {
    description: 'Array of Coach model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Coach, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Coach) filter?: Filter<Coach>,
  ): Promise<Coach[]> {
    return this.coachRepository.find(filter);
  }

  @patch('/coaches')
  @response(200, {
    description: 'Coach PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Coach, {partial: true}),
        },
      },
    })
    coach: Coach,
    @param.where(Coach) where?: Where<Coach>,
  ): Promise<Count> {
    return this.coachRepository.updateAll(coach, where);
  }

  @get('/coaches/{id}')
  @response(200, {
    description: 'Coach model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Coach, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Coach, {exclude: 'where'}) filter?: FilterExcludingWhere<Coach>
  ): Promise<Coach> {
    return this.coachRepository.findById(id, filter);
  }

  @patch('/coaches/{id}')
  @response(204, {
    description: 'Coach PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Coach, {partial: true}),
        },
      },
    })
    coach: Coach,
  ): Promise<void> {
    await this.coachRepository.updateById(id, coach);
  }

  @put('/coaches/{id}')
  @response(204, {
    description: 'Coach PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() coach: Coach,
  ): Promise<void> {
    await this.coachRepository.replaceById(id, coach);
  }

  @del('/coaches/{id}')
  @response(204, {
    description: 'Coach DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.coachRepository.deleteById(id);
  }
}
