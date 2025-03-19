import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
console.log("App Component Loaded");

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Dark Mode */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import Login from './pages/Login';
import Menu from './pages/Menu';
import Register from './pages/Register';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
      <Route exact path="/it35-lab" render={() => <Redirect to="/it35-lab/login" />} />
      <Route exact path="/it35-lab/login" component={Login} />
        <Route exact path="/it35-lab/signup" component={Register} /> 
        <Route path="/it35-lab/app" component={Menu} />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
