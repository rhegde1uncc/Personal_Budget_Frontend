import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BreadCrumb } from './breadcrumb';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';

@Component({
  selector: 'pb-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbs$ = this.router.events.pipe(
    filter((event) => event instanceof NavigationEnd),
    distinctUntilChanged(),
    map((event) => this.buildBreadCrumb(this.activatedRoute.root))
  );
  id: number;
  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    this.activatedRoute.params.subscribe( params => {this.id = params.id; });
  }

  ngOnInit(): void {}


  buildBreadCrumb(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: Array<BreadCrumb> = []
  ): Array<BreadCrumb> {
    // If no routeConfig is avalailable, we are on the root path
    const label = route.routeConfig
      ? route.routeConfig.data['breadcrumb']
      : 'Home';
    const path = route.routeConfig ? route.routeConfig.path : '';
    console.log('path', path);
    // In the routeConfig the complete path is not available,
    // so we rebuild it each time
    var nextUrl = `${url}${path}/`;
    if(nextUrl.includes(":id")){
      nextUrl = nextUrl.replace(":id", (this.id).toString());
    }
    console.log('nextUrl', nextUrl);
    const breadcrumb = {
      label,
      url: nextUrl,
    };
    const newBreadcrumbs = [...breadcrumbs, breadcrumb];
    if (route.firstChild) {
      // If we are not on our current path yet,
      // there will be more children to look after, to build our breadcumb
      return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
    }
    return newBreadcrumbs;
  }
}
