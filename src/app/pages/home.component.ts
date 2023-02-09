import { Component } from '@angular/core';
import { Router } from '@angular/router';
import moment=require('moment');
import { environment } from '../../environments/environment';
import { TeamDetails, TeamResult } from '../models/team-details';
import { Team, Teams } from '../models/team-list';
import { NbaService } from '../services/nba.service';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  teamList: Team[] = [];
  teamOptions: Team[] = [];
  teamDetailsList: TeamResult[] = [];
  selectedId: string = '';
  adding: boolean = false;

  constructor(
    private nbaService: NbaService, 
    private shared: SharedService,
    private router: Router,
    ) {
    this.nbaService.getTeamList("teams").subscribe((resp: Teams) => {
      this.teamList = resp.data;
      this.teamOptions = JSON.parse(JSON.stringify(this.teamList));

      let storedData = localStorage.getItem('teamDetailsList');
      if (storedData) {
        this.teamDetailsList = JSON.parse(storedData);
      }
    });
  }

  getTeamName(event: any) {
    this.selectedId = event.target.value;
  }

  async getTeamDetails() {
    try {
      const index = this.teamDetailsList.findIndex(c => c.teamId == Number(this.selectedId));
      this.adding = true;
      if (this.selectedId && index <= -1) {
        let url = `games?page=0&`;
        for (let i = 1; i <= 12; i++) {
          let date = moment();
          let newDate = date.add(-i, 'day').format('YYYY-MM-DD');
          url = url + `dates[]=${newDate}&`
        }
        let selectedTeam = this.teamList.filter(x => x.id === Number(this.selectedId))[0];
        if (selectedTeam) {

          this.nbaService.getTeamDetsils(this.selectedId, url).subscribe((res: TeamDetails) => {
            const data = res.data;
            const details: TeamResult = {
              teamId: selectedTeam?.id == undefined ? 0 : selectedTeam.id,
              teamName: selectedTeam?.full_name == undefined ? '' : selectedTeam.full_name,
              teamCode: selectedTeam?.abbreviation == undefined ? '' : selectedTeam.abbreviation,
              teamURL: `${environment.logoURL}/nba-logos/${selectedTeam?.abbreviation}.png`,
              result: data,
              avgPointScored: 0,
              avgPointsConceded: 0,
              conference: ''
            }

            details.result.forEach(x => {
              if (x.home_team.id === selectedTeam.id) {
                details.avgPointScored += x.home_team_score;
                details.conference = x.home_team.conference;
              }
              else if (x.visitor_team.id === selectedTeam.id) {
                details.avgPointScored += x.visitor_team_score
              }
            })

            details.result.forEach(x => {
              if (x.visitor_team.id !== selectedTeam.id) {
                details.avgPointsConceded += x.visitor_team_score
              }
              else if (x.visitor_team.id !== selectedTeam.id) {
                details.avgPointsConceded += x.visitor_team_score
              }
            })
            details.avgPointScored = Math.ceil(details.avgPointScored / details.result.length);
            details.avgPointsConceded = Math.ceil(details.avgPointsConceded / details.result.length);
            this.teamDetailsList.push(details);
          })
        }
      }
      this.adding = false;
    }
    catch (error) {
      console.log(error);
    }
  }

  deleteTeam(item: TeamResult) {
    localStorage.clear();
    const index = this.teamDetailsList.indexOf(item);
    this.teamDetailsList.splice(index, 1);
    localStorage.setItem('teamDetailsList', JSON.stringify(this.teamDetailsList));
  }

  navigate(item: TeamResult){
    localStorage.setItem('teamDetailsList', JSON.stringify(this.teamDetailsList));
    this.shared.setData(item);
    this.router.navigate(['results',item.teamCode]);
  }
}
