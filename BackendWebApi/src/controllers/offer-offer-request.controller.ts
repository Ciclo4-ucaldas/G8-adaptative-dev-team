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
  Offer,
  OfferRequest,
} from '../models';
import {OfferRepository} from '../repositories';

export class OfferOfferRequestController {
  constructor(
    @repository(OfferRepository) protected offerRepository: OfferRepository,
  ) { }

  @get('/offers/{id}/offer-requests', {
    responses: {
      '200': {
        description: 'Array of Offer has many OfferRequest',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(OfferRequest)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<OfferRequest>,
  ): Promise<OfferRequest[]> {
    return this.offerRepository.offerRequests(id).find(filter);
  }

  @post('/offers/{id}/offer-requests', {
    responses: {
      '200': {
        description: 'Offer model instance',
        content: {'application/json': {schema: getModelSchemaRef(OfferRequest)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Offer.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OfferRequest, {
            title: 'NewOfferRequestInOffer',
            exclude: ['id'],
            optional: ['offerId']
          }),
        },
      },
    }) offerRequest: Omit<OfferRequest, 'id'>,
  ): Promise<OfferRequest> {
    return this.offerRepository.offerRequests(id).create(offerRequest);
  }

  @patch('/offers/{id}/offer-requests', {
    responses: {
      '200': {
        description: 'Offer.OfferRequest PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OfferRequest, {partial: true}),
        },
      },
    })
    offerRequest: Partial<OfferRequest>,
    @param.query.object('where', getWhereSchemaFor(OfferRequest)) where?: Where<OfferRequest>,
  ): Promise<Count> {
    return this.offerRepository.offerRequests(id).patch(offerRequest, where);
  }

  @del('/offers/{id}/offer-requests', {
    responses: {
      '200': {
        description: 'Offer.OfferRequest DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(OfferRequest)) where?: Where<OfferRequest>,
  ): Promise<Count> {
    return this.offerRepository.offerRequests(id).delete(where);
  }
}
