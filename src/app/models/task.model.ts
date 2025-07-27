import { Subtask } from "./subtask.model";

export interface Task{
    id: number;
    title: string;
    subtitle: string;
    status: string;
    group?: string;
    groupId?: number;
    dateCreated: string;
    dateModified?: string;
    estimatedEndDate?: string;
    progress: number;
    taskOwner: string;
    isOwner: boolean;
    subtasks?: Array<Subtask>;
}