import { AccommodationType } from '../accommodation-type/accommodation-type.model';

export class Accommodation{

    constructor(public Id?: number, public Name?: string, public Description?: string, public Address?: string, public AvargeGrade?: number, public Latitude?: number, public Longitude?: number, public ImageURL?: string, public Approved?: boolean, public PlaceId?: number, public AccommodationTypeId?: number, public AppUserId?: number, public AccType?: AccommodationType){

    }
}