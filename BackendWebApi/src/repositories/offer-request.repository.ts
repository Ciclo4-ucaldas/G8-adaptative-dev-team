import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {OfferRequest, OfferRequestRelations, Contract, Offer, Client} from '../models';
import {ContractRepository} from './contract.repository';
import {OfferRepository} from './offer.repository';
import {ClientRepository} from './client.repository';

export class OfferRequestRepository extends DefaultCrudRepository<
  OfferRequest,
  typeof OfferRequest.prototype.id,
  OfferRequestRelations
> {

  public readonly hisContrat: HasOneRepositoryFactory<Contract, typeof OfferRequest.prototype.id>;

  public readonly offer: BelongsToAccessor<Offer, typeof OfferRequest.prototype.id>;

  public readonly client: BelongsToAccessor<Client, typeof OfferRequest.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ContractRepository') protected contractRepositoryGetter: Getter<ContractRepository>, @repository.getter('OfferRepository') protected offerRepositoryGetter: Getter<OfferRepository>, @repository.getter('ClientRepository') protected clientRepositoryGetter: Getter<ClientRepository>,
  ) {
    super(OfferRequest, dataSource);
    this.client = this.createBelongsToAccessorFor('client', clientRepositoryGetter,);
    this.registerInclusionResolver('client', this.client.inclusionResolver);
    this.offer = this.createBelongsToAccessorFor('offer', offerRepositoryGetter,);
    this.registerInclusionResolver('offer', this.offer.inclusionResolver);
    this.hisContrat = this.createHasOneRepositoryFactoryFor('hisContrat', contractRepositoryGetter);
    this.registerInclusionResolver('hisContrat', this.hisContrat.inclusionResolver);
  }
}
