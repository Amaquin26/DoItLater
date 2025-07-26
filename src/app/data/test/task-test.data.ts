import { Task } from "../../models/task.model";
import { testSubtaskData1, testSubtaskData2 } from "./subtask-test.data";

export const testTaskData: Array<Task> = [
    {
        id: 1,
        title: "Sample Task 1",
        subtitle: "Test sample task 1",
        status: "on-going",
        group: "personal",
        dateCreated: "2025-07-23T21:45:00Z",
        dateModified: "2025-07-24T21:45:00Z",
        estimatedEndDate: "2025-07-29T21:45:00Z",
        progress: 25,
        subtasks: testSubtaskData1,
    },
    {
        id: 2,
        title: "Sample Task 2",
        subtitle: "Test sample task 2",
        status: "on-going",
        group: "personal",
        dateCreated: "2025-07-21T21:45:00Z",
        dateModified: "2025-07-22T21:45:00Z",
        estimatedEndDate: "2025-07-26T21:45:00Z",
        progress: 50,
        subtasks: testSubtaskData2,
    },
]