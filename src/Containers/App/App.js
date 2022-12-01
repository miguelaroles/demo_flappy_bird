import GameContainer from "./Containers/GameContainer";
import AuthProvider from "./Contexts/AuthContext";

const App = () => {
  return (
    <div className="App">
        <AuthProvider>
            <GameContainer />
        </AuthProvider>
    </div>
  );
};

export default App;
