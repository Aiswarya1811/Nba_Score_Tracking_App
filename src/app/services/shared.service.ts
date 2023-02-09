import { Injectable } from '@angular/core';
import { TeamResult } from '../models/team-details';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private data: TeamResult = new TeamResult();

  setData(data: TeamResult) {
    this.data = data;
  }

  getData(): TeamResult {
    return this.data;
  }
}
