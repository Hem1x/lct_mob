export interface ResponseAnalyze {
  analitika_admin: AnalitikaAdmin;
  worker_analitika: WorkerAnalitika[];
}

export interface AnalitikaAdmin {
  sum_all_today: number;
  sum_all: number;
  sum_high_priority: number;
  sum_medium_priority: number;
  sum_low_priority: number;
  sum_high_priority_today: number;
  sum_medium_priority_today: number;
  sum_low_priority_today: number;
  mean_time: number;
  mean_time_jun: number;
  mean_time_midle: number;
  mean_time_senior: number;
}

export interface WorkerAnalitika {
  quantity_tasks: number;
  fio: string;
  total_time_way: number;
  mean_time_way: number;
  total_time_tasks: number;
  total_distance: number;
}
