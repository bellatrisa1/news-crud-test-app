import { Provider } from "react-redux";
import { store } from "./app/store";
import { NewsList } from "./news/NewsList";

import "./App.scss";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>Новости</h1>
        <NewsList />
      </div>
    </Provider>
  );
}

export default App;
