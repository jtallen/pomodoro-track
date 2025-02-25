import { useState } from 'react';

export default function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [taskId, setTaskId] = useState(0);

  const submitTask = (submittedTask) => {
    const extraTask = { id: taskId, content: submittedTask };
    setTasks([...tasks, extraTask]);
    setNewTask('');
    setTaskId(taskId + 1);
  };

  return (
    <>
      <h1>Tasks</h1>
      <textarea
        value={newTask}
        onChange={(event) => {
          setNewTask(event.target.value);
        }}
      />
      <button onClick={() => submitTask(newTask)} disabled={newTask === ''}>
        Add Task
      </button>
      <ul>
        {tasks.map((task) => {
          return <li key={task.id}>{task.content}</li>;
        })}
      </ul>
    </>
  );
}
