import {Entity, model, property, hasMany} from '@loopback/repository';
import {OfferRequest} from './offer-request.model';
import {Offer} from './offer.model';
import {Contract} from './contract.model';

@model({settings: {strict: false}})
export class Coach extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  code: string;

  @property({
    type: 'string',
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
  document: string;

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
    default: "coachRole",
  })
  role?: string;

  @hasMany(() => OfferRequest)
  coach_requests: OfferRequest[];

  @hasMany(() => OfferRequest)
  offerRequests: OfferRequest[];

  @hasMany(() => Offer)
  offers: Offer[];

  @hasMany(() => Contract)
  contracts: Contract[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Coach>) {
    super(data);
  }
}

export interface CoachRelations {
  // describe navigational properties here
}

export type CoachWithRelations = Coach & CoachRelations;
