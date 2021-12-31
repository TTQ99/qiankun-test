import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { BasePage } from 'src/app/pages/base-page';
import { GlobalState } from 'src/app/global.state';

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.scss']
})
export class AssessmentComponent extends BasePage implements OnInit {

  constructor(

    public router: Router,
    public activedRoute: ActivatedRoute,
    public state: GlobalState,
  ) {
    super(router, activedRoute, state)
  }
  public breadcrumbList = [
    { name: 'bigDataApplication.title' },
    { name: 'bigDataApplication.healthAssessment.title' }
  ];

  ngOnInit(): void {
  }

}
