import { remultExpress } from "remult/remult-express";
import { Task } from "../shared/task"
import { TasksController } from "@/shared/taskController";
export const api = remultExpress({
    entities: [Task],
    controllers:[TasksController]
})