export interface Crop {
    id?: string;
    name: string;
    variety?: string;
    plot_size?: string;
    sowing_date?: string;
    expected_harvest?: string;
    current_stage?: string;
    notes?: string;
    progress?: number;
    status?: string;
    next_task?: string;
    next_task_date?: string;
}

export interface Task {
    task_name: string;
    due_date: string;
    stage: string;
    status: string;
    priority: string;
    description?: string;
}

export interface CropWithTasks extends Crop {
    tasks: Task[];
}