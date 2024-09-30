


import MemberAbout from "@/pages/member/about";
import MemberCalendar from "@/pages/member/calendar";
import MemberDashboard from "@/pages/member/dashboard";
import MemberDonationsSupport from "@/pages/member/donations_support";
import MemberExecutives from "@/pages/member/executives";
import MemberInbox from "@/pages/member/inbox";
import MemberInboxDetail from "@/pages/member/inbox/detail";
import MemberMeetingsEvents from "@/pages/member/meetings_events";
import MemberMembers from "@/pages/member/members";
import MemberNews from "@/pages/member/news";
import MemberPayments from "@/pages/member/payments";
import { IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route, Redirect } from "react-router";
import SideMenuMember from "./sideMenuMember";

const RouteMember: React.FC = () => {
  
    return (
        <>
          <SideMenuMember/>
          <IonRouterOutlet id="member"  >        
            {/* member */}
            <Route path="/member/dashboard" component={MemberDashboard} exact />
            <Route path="/member/inbox" component={MemberInbox} exact />
            <Route path={`/member/inbox/:id`} component={MemberInboxDetail} exact />
            <Route path="/member/payments" component={MemberPayments} exact />
            <Route path="/member/meetings-events" component={MemberMeetingsEvents} exact />
            <Route path="/member/donations-support" component={MemberDonationsSupport} exact />
            <Route path="/member/news" component={MemberNews} exact />
            <Route path="/member/calendar" component={MemberCalendar} exact />
            <Route path="/member/members" component={MemberMembers} exact />
            <Route path="/member/executives" component={MemberExecutives} exact />
            <Route path="/member/about-us" component={MemberAbout} exact />
        
            </IonRouterOutlet>
        </>
    );
  };
  
  export default RouteMember;
  