import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-unauthorized',
    templateUrl: './app-unauthorized.component.html',
    styleUrls: ['./app-unauthorized.component.scss']
})
export class AppUnauthorizedComponent implements OnInit {

    constructor(private router: Router) { }

    ngOnInit(): void { }

    navigateToHomePage(): void {
        this.router.navigateByUrl('/');
    }
}
