import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Offer,
  Client,
} from '../models';
import {OfferRepository} from '../repositories';

export class OfferClientController {
  constructor(
    @repository(OfferRepository)
    public offerRepository: OfferRepository,
  ) { }

  @get('/offers/{id}/client', {
    responses: {
      '200': {
        description: 'Client belonging to Offer',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Client)},
          },
        },
      },
    },
  })
  async getClient(
    @param.path.string('id') id: typeof Offer.prototype.id,
  ): Promise<Client> {
    return this.offerRepository.client(id);
  }
}
