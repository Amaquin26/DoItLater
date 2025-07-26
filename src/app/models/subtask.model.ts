export interface Subtask {
    id: number;
    taskId: number;
    orderId: number;
    name: string;
    beginTime?: string;
    endTime?: string;
    dateCreated: string;
    dateModified?: string;
    isChecked: boolean;
}