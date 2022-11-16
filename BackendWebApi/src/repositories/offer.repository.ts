import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Offer, OfferRelations, OfferRequest} from '../models';
import {OfferRequestRepository} from './offer-request.repository';

export class OfferRepository extends DefaultCrudRepository<
  Offer,
  typeof Offer.prototype.id,
  OfferRelations
> {

  public readonly offerRequests: HasManyRepositoryFactory<OfferRequest, typeof Offer.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('OfferRequestRepository') protected offerRequestRepositoryGetter: Getter<OfferRequestRepository>,
  ) {
    super(Offer, dataSource);
    this.offerRequests = this.createHasManyRepositoryFactoryFor('offerRequests', offerRequestRepositoryGetter,);
    this.registerInclusionResolver('offerRequests', this.offerRequests.inclusionResolver);
  }
}
