import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "./App.css";
import Layout from "./components/layout";
import store, { persistor } from "./store";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Toaster />
          <Layout />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
};

export default App;
