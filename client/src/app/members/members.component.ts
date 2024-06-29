import { Component, OnInit } from '@angular/core';
import { GetMembersService } from '../services/get-members.service';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-members',
  standalone: true,
  imports: [NgFor,
    CommonModule
  ],
  templateUrl: './members.component.html',
  styleUrl: './members.component.css'
})
export class MembersComponent implements OnInit {
  members: any[] = [];
  currentpage: number = 1;
  itemsPerpage: number = 10;
  totalPages!: number;
  pagedMembers: any[] = [];

  constructor(private getMembersService: GetMembersService) {}

  ngOnInit() {
    this.getMembersService.getMembers().subscribe({
      next: (data) => {
        this.members = data;
        this.totalPages = Math.ceil(this.members.length / this.itemsPerpage)
        this.updatePagedMembers()
      },
      error: (error) => {
        console.error('Error fetching members', error)
      }}
    )
  }

  updatePagedMembers(){
    const startIndex = (this.currentpage - 1) * this.itemsPerpage;
    const endIndex = startIndex + this.itemsPerpage;
    this.pagedMembers = this.members.slice(startIndex, endIndex)

  }

  onPageSelectChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const pageNumber = Number(selectElement.value);
    this.goToPage(pageNumber);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentpage = page;
      this.updatePagedMembers();
    }
  }


}
