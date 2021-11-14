import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

// interface TodoList {
//   id: string;
//   nome: string;
//   done: boolean;
// }

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
    
  function handleAddTask(newTaskTitle: string) {
    //TODO - add new task
    const data = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    }
    setTasks(oldState => [...oldState, data])
  }

  function handleToggleTaskDone(id: number) {
    //TODO - toggle task done if exists
    const updateTask = tasks.map((task => ({...task})));
    const lookTask = updateTask.find(task => task.id === id);
    
    if (!lookTask){
      return;
    }

    lookTask.done = !lookTask.done;
    setTasks(updateTask)
  }

  function handleRemoveTask(id: number) {
    //TODO - remove task from state
    setTasks(oldState => oldState.filter(
      task => task.id !== id
    ));
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})