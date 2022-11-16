import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {OfferRequest, OfferRequestRelations} from '../models';

export class OfferRequestRepository extends DefaultCrudRepository<
  OfferRequest,
  typeof OfferRequest.prototype.id,
  OfferRequestRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(OfferRequest, dataSource);
  }
}
