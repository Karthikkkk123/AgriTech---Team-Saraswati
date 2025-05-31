const API_BASE_URL = 'http://localhost:8000';

import { Crop, Task } from './types';

export async function createCrop(cropData: Crop) {
    const response = await fetch(`${API_BASE_URL}/crops/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(cropData),
    });
    return response.json();
}

export async function getCrops() {
    const response = await fetch(`${API_BASE_URL}/crops/`);
    return response.json();
}

export async function getCropDetails(cropId: string) {
    const response = await fetch(`${API_BASE_URL}/crops/${cropId}`);
    return response.json();
}

export async function getCropTasks(cropId: string) {
    const response = await fetch(`${API_BASE_URL}/crops/${cropId}/tasks`);
    return response.json();
}

export async function updateTaskStatus(cropId: string, taskId: number, status: string) {
    const response = await fetch(`${API_BASE_URL}/crops/${cropId}/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
    });
    return response.json();
}