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
  Client,
} from '../models';
import {ContractRepository} from '../repositories';

export class ContractClientController {
  constructor(
    @repository(ContractRepository)
    public contractRepository: ContractRepository,
  ) { }

  @get('/contracts/{id}/client', {
    responses: {
      '200': {
        description: 'Client belonging to Contract',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Client)},
          },
        },
      },
    },
  })
  async getClient(
    @param.path.string('id') id: typeof Contract.prototype.id,
  ): Promise<Client> {
    return this.contractRepository.hisClient(id);
  }
}
