import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Offer, OfferRelations, OfferRequest, Client} from '../models';
import {OfferRequestRepository} from './offer-request.repository';
import {ClientRepository} from './client.repository';

export class OfferRepository extends DefaultCrudRepository<
  Offer,
  typeof Offer.prototype.id,
  OfferRelations
> {

  public readonly offerRequests: HasManyRepositoryFactory<OfferRequest, typeof Offer.prototype.id>;

  public readonly client: BelongsToAccessor<Client, typeof Offer.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('OfferRequestRepository') protected offerRequestRepositoryGetter: Getter<OfferRequestRepository>, @repository.getter('ClientRepository') protected clientRepositoryGetter: Getter<ClientRepository>,
  ) {
    super(Offer, dataSource);
    this.client = this.createBelongsToAccessorFor('client', clientRepositoryGetter,);
    this.registerInclusionResolver('client', this.client.inclusionResolver);
    this.offerRequests = this.createHasManyRepositoryFactoryFor('offerRequests', offerRequestRepositoryGetter,);
    this.registerInclusionResolver('offerRequests', this.offerRequests.inclusionResolver);
  }
}
