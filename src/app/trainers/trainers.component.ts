import { Component, OnInit, ViewChild } from '@angular/core';
import { GetTrainersService } from '../services/get-trainers.service';
import { Trainer } from '../models/trainer.model';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NgFor } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-trainers',
  standalone: true,
  imports: [NgFor, 
    MatTableModule,
    MatPaginatorModule,
    FormsModule
  ],
  templateUrl: './trainers.component.html',
  styleUrl: './trainers.component.css',
  providers: [GetTrainersService]
})
export class TrainersComponent implements OnInit {
  trainers : any[] = [];
  displayedColumns: string[] = ['row_id', 'name', 'gender', 'height', 'weight'];
  dataSource = new MatTableDataSource<Trainer>([]);
  totalItems = 0;
  pageSize = 10;
  pageIndex=0;
  searchTerm: string = '';
  results: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private getTrainersService: GetTrainersService) {
  }

  ngOnInit(): void {
    this.loadTrainers();
    // this.getTrainersService.getTrainers().subscribe(
    //   (response) => {
    //     this.trainers = response
    //   },
    //   (error) => {
    //     console.error('error fetching trainers', error)
    //   }
    // )
    // this.getTrainersService.getTrainers().subscribe({
    //   next: (response) => {this.trainers = response},
    //   error: (error) => {console.error(error);},
    // })
  }


  loadTrainers(): void {
    
    this.getTrainersService.getTrainers(this.searchTerm, this.pageIndex +1, this.pageSize).subscribe(response => {
      this.dataSource.data = response.data;
      this.totalItems = response.total;
    });
  }

  onPageChange(event: any): void {
    console.log("pageIndex", event.pageIndex);
    
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;

    this.loadTrainers();
    console.log("pageIndex", event.pageIndex);

    
  }

}
