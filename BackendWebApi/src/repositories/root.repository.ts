import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Root, RootRelations} from '../models';

export class RootRepository extends DefaultCrudRepository<
  Root,
  typeof Root.prototype.id,
  RootRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Root, dataSource);
  }
}
