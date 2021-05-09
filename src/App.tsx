import "./styles/global.scss";
import { TaskList } from "./components/TaskList";
import { Header } from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <TaskList />
    </>
  );
}

export default App;
