import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Contract, ContractRelations, OfferRequest} from '../models';
import {OfferRequestRepository} from './offer-request.repository';

export class ContractRepository extends DefaultCrudRepository<
  Contract,
  typeof Contract.prototype.id,
  ContractRelations
> {

  public readonly offerRequest: BelongsToAccessor<OfferRequest, typeof Contract.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('OfferRequestRepository') protected offerRequestRepositoryGetter: Getter<OfferRequestRepository>,
  ) {
    super(Contract, dataSource);
    this.offerRequest = this.createBelongsToAccessorFor('offerRequest', offerRequestRepositoryGetter,);
    this.registerInclusionResolver('offerRequest', this.offerRequest.inclusionResolver);
  }
}
