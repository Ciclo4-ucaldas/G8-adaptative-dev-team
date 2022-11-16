import {Model, model, property} from '@loopback/repository';
enum Stats {
  Wait,
  Aproved,
  Reject,
  Vacant,
  Rented,
  Sold,
  Estuding,
  Closed,
  Declined
}

@model({settings: {strict: false}})
export class Status extends Model {
  @property({
    type: 'number',
    id: false,
    generated: false,
    required: false,
    jsonSchema: {
      enum: Object.values(Stats),
    },
  })
  status: Stats;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Status>) {
    super(data);
  }
}

export interface StatusRelations {
  // describe navigational properties here
}

export type StatusWithRelations = Status & StatusRelations;
