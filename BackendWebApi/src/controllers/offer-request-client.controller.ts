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
  Client,
} from '../models';
import {OfferRequestRepository} from '../repositories';

export class OfferRequestClientController {
  constructor(
    @repository(OfferRequestRepository)
    public offerRequestRepository: OfferRequestRepository,
  ) { }

  @get('/offer-requests/{id}/client', {
    responses: {
      '200': {
        description: 'Client belonging to OfferRequest',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Client)},
          },
        },
      },
    },
  })
  async getClient(
    @param.path.string('id') id: typeof OfferRequest.prototype.id,
  ): Promise<Client> {
    return this.offerRequestRepository.client(id);
  }
}
