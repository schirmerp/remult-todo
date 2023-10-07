<script setup lang="ts">
import { remult } from "remult"
import { onMounted, onUnmounted, ref } from 'vue';
import { Task } from './shared/task'
import { TasksController } from './shared/taskController'

const tasks = ref<Task[]>([])

const taskRepo = remult.repo(Task)
onMounted(() => 
  onUnmounted(
    taskRepo
    .liveQuery({
      where: {
        completed: undefined,
      },
    })
    .subscribe((info) => (tasks.value = info.applyChanges(tasks.value)))
  )
)

const newTaskTitle = ref("")

async function addTask() {
  try {
    const newTask = await taskRepo.insert({ title: newTaskTitle.value })
    newTaskTitle.value = ""
  } catch (error: any) {
    alert(error.message)
  }
}
async function deleteTask(task: Task){
  try{
    await taskRepo.delete(task)
  }catch(error:any){
    alert(error.message)
}
}
async function saveTask(task: Task){
  try{
    await taskRepo.save(task)
  }catch(error:any){
    alert(error.message)
}
}
async function setAllCompleted(completed: boolean){
  await TasksController.setAllCompleted(completed)
}

</script>

<template>
<h1>Tasks</h1>
<main>
  <form @submit.prevent="$event => addTask()">
    <input placeholder="What needs to be done" v-model="newTaskTitle" />
    <button type="submit">Add</button>
  </form>
<div v-for="task in tasks">
  <input type="checkbox" v-model="task.completed" @change="saveTask(task)"/>
  <input v-model="task.title">
  <button @click="saveTask(task)">Save</button>
  <button @click="deleteTask(task)">Delete</button>
</div>
<div>
  <button @click="setAllCompleted(true)">Set All Completed</button>
  <button @click="setAllCompleted(false)">Set All Uncompleted</button>
</div>
</main>
</template>

<style scoped>

</style>
