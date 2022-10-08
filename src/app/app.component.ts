import { Component, OnInit } from '@angular/core';
import { ConfigurationService } from '../app/configuration.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private ApiService: ConfigurationService) { }

  ngOnInit() {
          
  }
}
