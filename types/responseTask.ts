export const TaskStatusColor: Record<string, string> = {
  'в работе': 'rgba(254, 247, 230, 1)',
  выполнено: 'rgba(133, 221, 155, 0.33)',
  'не начата': 'rgba(186, 186, 186, 0.16)',
};

export interface ResponseTask {
  worker: {
    fio: string;
    id: number;
    graid: string;
    busy_until: string;
    current_address: string;
    address: string;
  };
  tasks: {
    point: string;
    fio: string;
    coordinates_finish: string;
    route_time: string;
    time_finish: string;
    name: string;
    address: string;
    id: number;
    coordinates_start: string;
    time_start: string;
    priority: string;
  }[];
}

export interface Task {
  address: string;
  coordinates_finish: string;
  coordinates_start: string;
  fio: string;
  id: number;
  name: string;
  point: string;
  priority: string;
  route_time: string;
  time_finish: string;
  time_start: string;
  status: number;
  worker: Worker;
}

export interface Worker {
  address: string;
  busy_until: string;
  current_address: string;
  fio: string;
  graid: string;
  id: number;
}
