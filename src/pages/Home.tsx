import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

type EditTodo = {
  id: number;
  newTitle: string;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
    
  function handleAddTask(newTaskTitle: string) {
    //TODO - add new task
    const taskAlready = tasks.find(task => task.title === newTaskTitle);

    if (taskAlready) {
      return Alert.alert('Task ja existe', 'Impossivel cadastrar task com o mesmo');
    }
    

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
    Alert.alert('Exluir Todo','Vai excluir mesmo?', [
      {
        style: 'cancel',
        text: 'Não'
      },
      {
        style: 'destructive',
        text: 'Sim',
        onPress: () => {
          const updateTask = tasks.filter(task => task.id !== id);
          setTasks(updateTask);
        }
      }
    ])
  }

  function handleEdit({id, newTitle}: EditTodo) {
        //TODO - toggle task done if exists
        const updateTask = tasks.map((task => ({...task})));
        const taskEdit = updateTask.find(task => task.id === id);
        
        if (!taskEdit){
          return;
        }
    
        taskEdit.title = newTitle;
        setTasks(updateTask)
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        // editTask = {handleEdit}
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