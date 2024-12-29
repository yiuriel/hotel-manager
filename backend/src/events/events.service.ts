import { Injectable } from '@nestjs/common';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class EventsService {
  private readonly shiftsSubject = new Subject<any>();

  constructor() {}

  subscribeShifts() {
    return this.shiftsSubject
      .asObservable()
      .pipe(map((data) => ({ data: JSON.stringify(data) })));
  }

  emitShifts(data: any) {
    try {
      this.shiftsSubject.next(data);
      return data;
    } catch (error) {
      console.error('emitShifts error', error);
    }
  }
}
