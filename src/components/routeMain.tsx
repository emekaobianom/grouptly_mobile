
import Choose from "@/pages/main/choose";
import CreateUser from "@/pages/main/create_user";
import Intro from "@/pages/main/intro";
import IntroTerms from "@/pages/main/intro_terms";
import MainJoin from "@/pages/main/join";
import MainJoinCreate from "@/pages/main/join/create";
import MainJoinRequest from "@/pages/main/join/request";
import { IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route, Redirect } from "react-router";


const RouteMain: React.FC = () => {
  
    return (
        <>
          <IonRouterOutlet >
            {/* main */}
            <Route path="/main/intro" component={Intro} exact />
            <Route path="/main/intro-terms" component={IntroTerms} exact />
            <Route path="/main/choose" component={Choose} exact />
            <Route path="/main/create_user" component={CreateUser} exact />
            <Route path="/main/join" component={MainJoin} exact />
            <Route path="/main/join/create" component={MainJoinCreate} exact />
            <Route path="/main/join/request/:id" component={MainJoinRequest} exact />
            
            </IonRouterOutlet>
        </>
    );
  };
  
  export default RouteMain;
  