import AdminCalendar from "@/pages/admin/calendar";
import AdminDashboard from "@/pages/admin/dashboard";
import AdminDonationsSupport from "@/pages/admin/donations_support";
import AdminExecutives from "@/pages/admin/executives";
import AdminInboxDetail from "@/pages/admin/inbox/detail";
import AdminMeetingsEvents from "@/pages/admin/meetings_events";
import AdminMembers from "@/pages/admin/members";
import AdminNews from "@/pages/admin/news";
import AdminPayments from "@/pages/admin/payments";
import { IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route, Redirect } from "react-router";
import SideMenuAdmin from "./sideMenuAdmin";
import AdminInbox from "@/pages/admin/inbox";
import QuillEditorPage from "@/pages/admin/about";

const RouteAdmin: React.FC = () => {

  return (
    <>
      {/* <SideMenuAdmin /> */}
      <IonRouterOutlet id="admin">

        {/* admin */}
        <Route path="/admin/dashboard" component={AdminDashboard} exact />
        <Route path="/admin/inbox" component={AdminInbox} exact />
        <Route path={`/admin/inbox/:id`} component={AdminInboxDetail} exact />
        <Route path="/admin/payments" component={AdminPayments} exact />
        <Route path="/admin/meetings-events" component={AdminMeetingsEvents} exact />
        <Route path="/admin/donations-support" component={AdminDonationsSupport} exact />
        <Route path="/admin/news" component={AdminNews} exact />
        <Route path="/admin/calendar" component={AdminCalendar} exact />
        <Route path="/admin/members" component={AdminMembers} exact />
        <Route path="/admin/executives" component={AdminExecutives} exact />
        <Route path="/admin/about" component={QuillEditorPage} exact />
      </IonRouterOutlet>
    </>
  );
};

export default RouteAdmin;
