import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Coach,
  Contract,
} from '../models';
import {CoachRepository} from '../repositories';

export class CoachContractController {
  constructor(
    @repository(CoachRepository) protected coachRepository: CoachRepository,
  ) { }

  @get('/coaches/{id}/contracts', {
    responses: {
      '200': {
        description: 'Array of Coach has many Contract',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Contract)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Contract>,
  ): Promise<Contract[]> {
    return this.coachRepository.contracts(id).find(filter);
  }

  @post('/coaches/{id}/contracts', {
    responses: {
      '200': {
        description: 'Coach model instance',
        content: {'application/json': {schema: getModelSchemaRef(Contract)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Coach.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Contract, {
            title: 'NewContractInCoach',
            exclude: ['id'],
            optional: ['coachId']
          }),
        },
      },
    }) contract: Omit<Contract, 'id'>,
  ): Promise<Contract> {
    return this.coachRepository.contracts(id).create(contract);
  }

  @patch('/coaches/{id}/contracts', {
    responses: {
      '200': {
        description: 'Coach.Contract PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Contract, {partial: true}),
        },
      },
    })
    contract: Partial<Contract>,
    @param.query.object('where', getWhereSchemaFor(Contract)) where?: Where<Contract>,
  ): Promise<Count> {
    return this.coachRepository.contracts(id).patch(contract, where);
  }

  @del('/coaches/{id}/contracts', {
    responses: {
      '200': {
        description: 'Coach.Contract DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Contract)) where?: Where<Contract>,
  ): Promise<Count> {
    return this.coachRepository.contracts(id).delete(where);
  }
}
