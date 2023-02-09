import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TeamResult } from '../../models/team-details';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent {

  teamResult: TeamResult = new TeamResult();

  constructor(
    private shared: SharedService,
    private router: Router,
    ){
      let stored_data = localStorage.getItem('teamDetails');
      if (stored_data) {
        this.teamResult = JSON.parse(stored_data);
      } else {
        this.teamResult = this.shared.getData();  
      }
    localStorage.setItem('teamDetails', JSON.stringify(this.teamResult));
  }

  navigate() {
    localStorage.removeItem('teamDetails');
    this.router.navigateByUrl('');
  }
}
