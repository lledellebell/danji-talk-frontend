import "./styles/App.css";
import Header from "../src/layouts/Header";

function App() {
  return (
    <>
      <Header
        type="main"
        title="홈"
        hasBackButton={true}
        hasIcons={true}
        iconCount={1}
      />
    </>
  );
}

export default App;
