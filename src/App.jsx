import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Career from "./pages/Career";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Career />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
