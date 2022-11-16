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
  Coach,
} from '../models';
import {ContractRepository} from '../repositories';

export class ContractCoachController {
  constructor(
    @repository(ContractRepository)
    public contractRepository: ContractRepository,
  ) { }

  @get('/contracts/{id}/coach', {
    responses: {
      '200': {
        description: 'Coach belonging to Contract',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Coach)},
          },
        },
      },
    },
  })
  async getCoach(
    @param.path.string('id') id: typeof Contract.prototype.id,
  ): Promise<Coach> {
    return this.contractRepository.coach(id);
  }
}
