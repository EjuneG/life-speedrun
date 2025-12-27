import { useStore } from './stores/useStore';
import { TaskList } from './components/TaskList';
import { Timer } from './components/Timer';
import { ResultModal } from './components/ResultModal';
import { AddTaskModal } from './components/AddTaskModal';

function App() {
  const isRunning = useStore((state) => state.isRunning);

  return (
    <>
      {isRunning ? <Timer /> : <TaskList />}
      <ResultModal />
      <AddTaskModal />
    </>
  );
}

export default App;
