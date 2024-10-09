import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-not-found',
    templateUrl: './app-not-found.component.html',
    styleUrls: ['./app-not-found.component.scss']
})
export class AppNotFoundComponent implements OnInit {

    constructor(private router: Router) { }

    ngOnInit(): void { }

    navigateToHomePage(): void {
        this.router.navigateByUrl('/');
    }
}
