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
  OfferRequest,
  Contract,
} from '../models';
import {OfferRequestRepository} from '../repositories';

export class OfferRequestContractController {
  constructor(
    @repository(OfferRequestRepository) protected offerRequestRepository: OfferRequestRepository,
  ) { }

  @get('/offer-requests/{id}/contract', {
    responses: {
      '200': {
        description: 'OfferRequest has one Contract',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Contract),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Contract>,
  ): Promise<Contract> {
    return this.offerRequestRepository.hisContrat(id).get(filter);
  }

  @post('/offer-requests/{id}/contract', {
    responses: {
      '200': {
        description: 'OfferRequest model instance',
        content: {'application/json': {schema: getModelSchemaRef(Contract)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof OfferRequest.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Contract, {
            title: 'NewContractInOfferRequest',
            exclude: ['id'],
            optional: ['offerRequestId']
          }),
        },
      },
    }) contract: Omit<Contract, 'id'>,
  ): Promise<Contract> {
    return this.offerRequestRepository.hisContrat(id).create(contract);
  }

  @patch('/offer-requests/{id}/contract', {
    responses: {
      '200': {
        description: 'OfferRequest.Contract PATCH success count',
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
    return this.offerRequestRepository.hisContrat(id).patch(contract, where);
  }

  @del('/offer-requests/{id}/contract', {
    responses: {
      '200': {
        description: 'OfferRequest.Contract DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Contract)) where?: Where<Contract>,
  ): Promise<Count> {
    return this.offerRequestRepository.hisContrat(id).delete(where);
  }
}
