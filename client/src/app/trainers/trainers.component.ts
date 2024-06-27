import { Component, OnInit, ViewChild } from '@angular/core';
import { GetTrainersService } from '../services/get-trainers.service';
import { Trainer } from '../models/trainer.model';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NgFor } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-trainers',
  standalone: true,
  imports: [NgFor, 
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule
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
  }

  onSearch() : void {
    this.pageIndex = 0;
    this.loadTrainers();
  }


  loadTrainers(): void {
    
    this.getTrainersService.getTrainers(this.searchTerm, this.pageIndex + 1, this.pageSize).subscribe(response => {
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
