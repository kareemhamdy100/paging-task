import { Component, OnInit } from '@angular/core';
import { GetDataService } from '../get-data.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  data = [];
  currPage = 1;
  nextPage = 1;
  hasNextPage = true;
  
  constructor(private Paging: GetDataService ) { }

  ngOnInit(): void {
    this.Paging.getAllData(1, '20').subscribe(res => {
      console.log(res);
      this.hasNextPage = res.hasNextPage;
      this.nextPage = res.nextPage;
      this.data = [...this.data , ...res.data]
    })
  }
  onScroll() {
    console.log('scrolled!!');
    if(this.hasNextPage){
      this.Paging.getAllData(this.nextPage,'20' ).subscribe(res => {
        console.log(res);
        this.hasNextPage = res.hasNextPage;
        this.nextPage = res.nextPage;
        this.data = [...this.data , ...res.data];
      })
    }
   
  }
}
