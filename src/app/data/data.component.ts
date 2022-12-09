import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {

  constructor(private data : DataService) { }

  ngOnInit(): void {
    this.dataList();
  }

  timeSeriesList:any;
  dataList(){
    this.timeSeriesList = [];
    this.data.getData().subscribe((res:any) =>{
      this.timeSeriesList.push(res) ;
       this.getTimeSeries();
    });
    // console.log(this.timeSeriesList);
  }

  finalData:any;
  timeData:any;
  timeDataValue :any ;
  DateTime:any;
  Open:any;
  High:any;
  Low:any;
  Close:any;
  Volum:any;

  getTimeSeries(){
    this.finalData = this.timeSeriesList.map(function(item:any) {
      for(const key of Object.keys(item)) {
        const lowerCaseKey = key.replace(/[- )(]/g, '');
        if (lowerCaseKey !== key) {
          item[lowerCaseKey] = item[key];
          delete item[key];
        }
      }
      return item;
    });
    // console.log(this.finalData);
    for(let obj of this.finalData){
      this.timeDataValue  = Object.values(obj.TimeSeries5min);
      this.timeData = Object.keys(obj.TimeSeries5min);
    }
  }

}
