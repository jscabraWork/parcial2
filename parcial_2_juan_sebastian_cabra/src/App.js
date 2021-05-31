
import './App.css';
import DashboardPage from './pages/dashbord'
import PerfilPage from './pages/perfil-casa'
import { Switch, Route, Router } from "./util/router.js";
function App() {
  return (
    <div >
       <Router>
            <Switch>
              <Route exact path="/" component={DashboardPage} />

              <Route exact path="/espacios" component={DashboardPage} />

              <Route exact path="/espacios/:id" component={PerfilPage} />
            </Switch>

          </Router>
    </div>
  );
}

export default App;
