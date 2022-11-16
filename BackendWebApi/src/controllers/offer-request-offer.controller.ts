import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  OfferRequest,
  Offer,
} from '../models';
import {OfferRequestRepository} from '../repositories';

export class OfferRequestOfferController {
  constructor(
    @repository(OfferRequestRepository)
    public offerRequestRepository: OfferRequestRepository,
  ) { }

  @get('/offer-requests/{id}/offer', {
    responses: {
      '200': {
        description: 'Offer belonging to OfferRequest',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Offer)},
          },
        },
      },
    },
  })
  async getOffer(
    @param.path.string('id') id: typeof OfferRequest.prototype.id,
  ): Promise<Offer> {
    return this.offerRequestRepository.offer(id);
  }
}
