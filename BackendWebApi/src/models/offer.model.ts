import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Status} from './status.model';
import {OfferRequest} from './offer-request.model';
import {Client} from './client.model';

// let Status = new PostStatus();
// enum offerStatus {
//   Wait,
//   Accepted,
//   Reject,
//   Vacant,
//   Estuding,
//   Sold,
//   Rented
// }
// enum oferTypeStatus {
//   Rent,
//   Sale
// }
// enum propetyTypeStatus {
//   House,
//   Apto
// }
@model({settings: {strict: false}})
export class Offer extends Entity {
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
  propetyType: Status["status"];

  @property({
    type: 'number',
    required: true,
  })
  price: number;

  @property({
    type: 'string',
    required: true,
  })
  address: string;

  @property({
    type: 'number',
    required: true,
  })
  country: number;

  @property({
    type: 'number',
    required: true,
  })
  city: number;

  @property({
    type: 'number',
    required: true,
  })
  status: Status["status"];


  @property({
    type: 'array',
    itemType: 'number',
    required: true,
  })
  features: number[];

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  multimedia: string[];
  @hasMany(() => OfferRequest)
  offerRequests: OfferRequest[];

  @belongsTo(() => Client)
  clientId: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Offer>) {
    super(data);
  }
}

export interface OfferRelations {
  // describe navigational properties here
}

export type OfferWithRelations = Offer & OfferRelations;
