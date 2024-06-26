// src/app/models/trainer.model.ts
export interface Trainer {
    row_id: number;
    name: string;
    height: number;
    weight: number;
    gender: string;
  }
  
  export interface PaginatedTrainers {
    data: Trainer[];
    total: number;
    page: number;
    size: number;
  }
  