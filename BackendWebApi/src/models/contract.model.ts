import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Offer} from './offer.model';
import {Status} from './status.model';
import {OfferRequest} from './offer-request.model';
import {Client} from './client.model';
import {Coach} from './coach.model';

// enum oferTypeStatus {
//   Rent,
//   Sale
// }
// enum propetyTypeStatus {
//   House,
//   Apto
// }
// enum Status {
//   Studing,
//   Close,
//   Declined
// }

@model({settings: {strict: false}})
export class Contract extends Entity {
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
  reference: string;

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
    type: 'string',
    required: true,
  })
  contract: string;

  @property({
    type: 'number',
    required: true,
  })
  status: Status["status"];

  @belongsTo(() => Offer, {name: 'offer_close'})
  offerId: string;

  @belongsTo(() => OfferRequest)
  offerRequestId: string;
  
  @belongsTo(() => Client, {name: 'hisClient'})
  clientId: string;

  @belongsTo(() => Coach)
  coachId: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Contract>) {
    super(data);
  }
}

export interface ContractRelations {
  // describe navigational properties here
}

export type ContractWithRelations = Contract & ContractRelations;
