export class RoomReservations{

    constructor (public Id?:number,  public StartDate?: Date, public EndDate?: Date, public Reserved?: boolean, public RoomId?:number, public AppUserId?:number){

    }
}