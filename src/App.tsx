import { useStore } from './stores/useStore';
import { TaskList } from './components/TaskList';
import { Timer } from './components/Timer';
import { ResultModal } from './components/ResultModal';
import { AddTaskModal } from './components/AddTaskModal';
import ErrorBoundary from './components/ErrorBoundary';
import Toast from './components/Toast';

function App() {
  const isRunning = useStore((state) => state.isRunning);

  return (
    <ErrorBoundary>
      {isRunning ? <Timer /> : <TaskList />}
      <ResultModal />
      <AddTaskModal />
      <Toast />
    </ErrorBoundary>
  );
}

export default App;
