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
import {OfferRequest} from '../models';
import {OfferRequestRepository} from '../repositories';

export class OfferRequestController {
  constructor(
    @repository(OfferRequestRepository)
    public offerRequestRepository : OfferRequestRepository,
  ) {}

  @post('/offer-requests')
  @response(200, {
    description: 'OfferRequest model instance',
    content: {'application/json': {schema: getModelSchemaRef(OfferRequest)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OfferRequest, {
            title: 'NewOfferRequest',
            exclude: ['id'],
          }),
        },
      },
    })
    offerRequest: Omit<OfferRequest, 'id'>,
  ): Promise<OfferRequest> {
    return this.offerRequestRepository.create(offerRequest);
  }

  @get('/offer-requests/count')
  @response(200, {
    description: 'OfferRequest model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(OfferRequest) where?: Where<OfferRequest>,
  ): Promise<Count> {
    return this.offerRequestRepository.count(where);
  }

  @get('/offer-requests')
  @response(200, {
    description: 'Array of OfferRequest model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(OfferRequest, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(OfferRequest) filter?: Filter<OfferRequest>,
  ): Promise<OfferRequest[]> {
    return this.offerRequestRepository.find(filter);
  }

  @patch('/offer-requests')
  @response(200, {
    description: 'OfferRequest PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OfferRequest, {partial: true}),
        },
      },
    })
    offerRequest: OfferRequest,
    @param.where(OfferRequest) where?: Where<OfferRequest>,
  ): Promise<Count> {
    return this.offerRequestRepository.updateAll(offerRequest, where);
  }

  @get('/offer-requests/{id}')
  @response(200, {
    description: 'OfferRequest model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(OfferRequest, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(OfferRequest, {exclude: 'where'}) filter?: FilterExcludingWhere<OfferRequest>
  ): Promise<OfferRequest> {
    return this.offerRequestRepository.findById(id, filter);
  }

  @patch('/offer-requests/{id}')
  @response(204, {
    description: 'OfferRequest PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OfferRequest, {partial: true}),
        },
      },
    })
    offerRequest: OfferRequest,
  ): Promise<void> {
    await this.offerRequestRepository.updateById(id, offerRequest);
  }

  @put('/offer-requests/{id}')
  @response(204, {
    description: 'OfferRequest PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() offerRequest: OfferRequest,
  ): Promise<void> {
    await this.offerRequestRepository.replaceById(id, offerRequest);
  }

  @del('/offer-requests/{id}')
  @response(204, {
    description: 'OfferRequest DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.offerRequestRepository.deleteById(id);
  }
}
