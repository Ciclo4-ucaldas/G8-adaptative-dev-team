import {Entity, hasMany, model, property} from '@loopback/repository';
import {Contract} from './contract.model';
import {OfferRequest} from './offer-request.model';
import {Offer} from './offer.model';

@model({settings: {strict: false}})
export class Client extends Entity {

  @property({
    type: 'string',
    id: true,
    generated: true,
    required: false,
  })
  id?: string;

  @property({
    type: 'string',
    id: false,
    generated: false,
    required: true,
  })
  names: string;

  @property({
    type: 'string',
    required: true,
  })
  lastnames: string;

  @property({
    type: 'string',
    required: true,
  })
  address: string;

  @property({
    type: 'string',
    required: true,
  })
  country: string;

  @property({
    type: 'string',
    required: true,
  })
  city: string;

  @property({
    type: 'string',
    required: true,
  })
  phone: string;

  @property({
    type: 'date',
    required: true,
  })
  dateIn = new Date();

  @property({
    type: 'string',
    required: true,
  })
  mailUser: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'string',
    default: "clientRole",
  })
  role?: string;

  @hasMany(() => Contract)
  contracts: Contract[];

  @hasMany(() => OfferRequest)
  offerRequests: OfferRequest[];

  @hasMany(() => Offer)
  offers: Offer[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Client>) {
    super(data);
  }
}

export interface ClientRelations {
  // describe navigational properties here
}

export type ClientWithRelations = Client & ClientRelations;
