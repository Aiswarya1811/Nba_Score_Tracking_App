import { Team } from './team-list';

export class TeamDetails {
  data: Result[] = [];
}

export class Result {
  id: number = 0;
  date: Date = new Date();
  home_team: Team = new Team();
  home_team_score: number = 0;
  period: number = 0;
  postseason: boolean = false;
  season: number = 0;
  status: string = '';
  time: string = '';
  visitor_team: Team = new Team();
  visitor_team_score: number = 0;
}

export class TeamResult {
  teamId: number = 0;
  teamCode: string = '';
  teamName: string = '';
  teamURL: string = '';
  result: Result[] = [];
  avgPointScored: number = 0;
  avgPointsConceded: number = 0;
  conference: string = '';
}
