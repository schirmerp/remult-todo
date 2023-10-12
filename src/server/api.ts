import { remultExpress } from "remult/remult-express";
import { Task } from "../shared/task"
import { TasksController } from "@/shared/taskController";
import { createPostgresConnection } from "remult/postgres";
export const api = remultExpress({
    entities: [Task],
    controllers:[TasksController],
    dataProvider: createPostgresConnection({
        connectionString:
            process.env["DATABASE_URL"] ||
            "postgres://postgres:password@localhost:5432/postgres",
    }),
})