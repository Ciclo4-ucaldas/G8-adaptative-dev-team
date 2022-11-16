import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Contract, ContractRelations, OfferRequest, Client, Coach} from '../models';
import {OfferRequestRepository} from './offer-request.repository';
import {ClientRepository} from './client.repository';
import {CoachRepository} from './coach.repository';

export class ContractRepository extends DefaultCrudRepository<
  Contract,
  typeof Contract.prototype.id,
  ContractRelations
> {

  public readonly offerRequest: BelongsToAccessor<OfferRequest, typeof Contract.prototype.id>;

  public readonly hisClient: BelongsToAccessor<Client, typeof Contract.prototype.id>;

  public readonly coach: BelongsToAccessor<Coach, typeof Contract.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('OfferRequestRepository') protected offerRequestRepositoryGetter: Getter<OfferRequestRepository>, @repository.getter('ClientRepository') protected clientRepositoryGetter: Getter<ClientRepository>, @repository.getter('CoachRepository') protected coachRepositoryGetter: Getter<CoachRepository>,
  ) {
    super(Contract, dataSource);
    this.coach = this.createBelongsToAccessorFor('coach', coachRepositoryGetter,);
    this.registerInclusionResolver('coach', this.coach.inclusionResolver);
    this.hisClient = this.createBelongsToAccessorFor('hisClient', clientRepositoryGetter,);
    this.registerInclusionResolver('hisClient', this.hisClient.inclusionResolver);
    this.offerRequest = this.createBelongsToAccessorFor('offerRequest', offerRequestRepositoryGetter,);
    this.registerInclusionResolver('offerRequest', this.offerRequest.inclusionResolver);
  }
}
