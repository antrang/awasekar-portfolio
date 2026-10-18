import MainContainer from "./components/MainContainer";
import { LoadingProvider } from "./context/LoadingProvider";
import "./App.css";

const App = () => {
  return (
    <LoadingProvider>
      <MainContainer />
    </LoadingProvider>
  );
};

export default App;
