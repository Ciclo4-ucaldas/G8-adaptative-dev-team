import {Entity, model, property} from '@loopback/repository';
import {Status} from './status.model';

// enum Status {
//   Wait,
//   Confirmed,
//   Reject
// }

@model({settings: {strict: false}})
export class OfferRequest extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'date',
    required: true,
  })
  date = new Date();

  @property({
    type: 'number',
    required: true,
  })
  offerType: Status["status"];

  @property({
    type: 'number',
    required: true,
  })
  status: Status["status"];

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  documentation: string[];

  @property({
    type: 'string',
  })
  clientId?: string;

  @property({
    type: 'string',
  })
  coachId?: string;

  @property({
    type: 'string',
  })
  offerId?: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<OfferRequest>) {
    super(data);
  }
}

export interface OfferRequestRelations {
  // describe navigational properties here
}

export type OfferRequestWithRelations = OfferRequest & OfferRequestRelations;
