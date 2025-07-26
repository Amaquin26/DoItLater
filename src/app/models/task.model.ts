import { Subtask } from "./subtask.model";

export interface Task{
    id: number;
    title: string;
    subtitle: string;
    status: string;
    group: string;
    dateCreated: string;
    dateModified?: string;
    estimatedEndDate?: string;
    progress: number;
    subtasks?: Array<Subtask>;
}