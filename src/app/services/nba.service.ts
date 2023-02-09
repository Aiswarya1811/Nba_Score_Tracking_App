import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Teams } from '../models/team-list';
import { TeamDetails } from '../models/team-details';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NbaService {
  baseURL = `${environment.apiURL}`;
  headers = new HttpHeaders()
  .set("X-RapidAPI-Key", `${environment.xRapidApiKey}`)
  .set("X-RapidAPI-Host", `${environment.xRapidApiHost}`)

  constructor(private http: HttpClient) { }

  getTeamList(url: string) {
    return this.http.get<Teams>(`${this.baseURL}/${url}`,{'headers':this.headers});
  }

  getTeamDetsils(id: string, url: string){
    return this.http.get<TeamDetails>(`${this.baseURL}/games?page=0&${url}&per_page=12&team_ids[]=${id}`,{'headers':this.headers});
  }
}
