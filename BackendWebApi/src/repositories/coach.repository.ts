import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Coach, CoachRelations, Contract} from '../models';
import {ContractRepository} from './contract.repository';

export class CoachRepository extends DefaultCrudRepository<
  Coach,
  typeof Coach.prototype.id,
  CoachRelations
> {

  public readonly contracts: HasManyRepositoryFactory<Contract, typeof Coach.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ContractRepository') protected contractRepositoryGetter: Getter<ContractRepository>,
  ) {
    super(Coach, dataSource);
    this.contracts = this.createHasManyRepositoryFactoryFor('contracts', contractRepositoryGetter,);
    this.registerInclusionResolver('contracts', this.contracts.inclusionResolver);
  }
}
