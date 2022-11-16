import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Contract,
  OfferRequest,
} from '../models';
import {ContractRepository} from '../repositories';

export class ContractOfferRequestController {
  constructor(
    @repository(ContractRepository)
    public contractRepository: ContractRepository,
  ) { }

  @get('/contracts/{id}/offer-request', {
    responses: {
      '200': {
        description: 'OfferRequest belonging to Contract',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(OfferRequest)},
          },
        },
      },
    },
  })
  async getOfferRequest(
    @param.path.string('id') id: typeof Contract.prototype.id,
  ): Promise<OfferRequest> {
    return this.contractRepository.offerRequest(id);
  }
}
