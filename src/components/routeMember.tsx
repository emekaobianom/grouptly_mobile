


import MemberDashboard from "@/pages/member/dashboard";
import MemberDonationsSupport from "@/pages/member/donations_support";
import MemberInbox from "@/pages/member/inbox";
import MemberInboxDetail from "@/pages/member/inbox/detail";
import MemberMembers from "@/pages/member/members";
import MemberNews from "@/pages/member/news";
import { IonRouterOutlet } from "@ionic/react";
import { Route, Redirect } from "react-router";
import SideMenuMember from "./sideMenuMember";
import MemberPayments from "@/pages/member/payments";
import MemberAbout from "@/pages/member/about";
import MemberCalendar from "@/pages/member/calendar";
import MemberMembersDetail from "@/pages/member/members/detail";
import MemberPaymentsHistory from "@/pages/member/payments/history";
import MemberPaymentsHistoryDetail from "@/pages/member/payments/history_detail";
import MemberDonationsSupportDetail from "@/pages/member/donations_support/detail";
import MemberMeetingsEventsDetail from "@/pages/member/meetings_events/detail";
import MemberMeetingsEventsAttendance from "@/pages/member/meetings_events/attendance";
import MemberMeetingsEventsPayments from "@/pages/member/meetings_events/payments";
import MemberNewsDetail from "@/pages/member/news/detail";
import MemberMeetingsEvents from "@/pages/member/meetings_events";


const RouteMember: React.FC = () => {

  return (
    <>
      <SideMenuMember />
      <IonRouterOutlet id="member"  >
        {/* member */}
        <Route path="/member/dashboard" component={MemberDashboard} exact />

        <Route path="/member/inbox" component={MemberInbox} exact />
        <Route path={`/member/inbox/:id`} component={MemberInboxDetail} />

        <Route path="/member/payments" component={MemberPayments} exact />
        <Route exact={true} path={`/member/payments/history`} component={MemberPaymentsHistory} />
        <Route path={`/member/payments/history/:id`} component={MemberPaymentsHistoryDetail} exact={true} />

        <Route path="/member/meetings-events" component={MemberMeetingsEvents} exact />
        <Route path={`/member/meetings-events/detail/:id`} component={MemberMeetingsEventsDetail} exact={true} />
        <Route path={`/member/meetings-events/attendance/:id`} component={MemberMeetingsEventsAttendance} exact={true} />
        <Route path={`/member/meetings-events/payments/:id`} component={MemberMeetingsEventsPayments} exact={true} />

        <Route path="/member/donations-support" component={MemberDonationsSupport} exact />
        <Route path={`/member/donations-support/detail/:id`} component={MemberDonationsSupportDetail} exact={true} />


        <Route path="/member/news" component={MemberNews} exact />
        <Route path={`/member/news/:id`} component={MemberNewsDetail} exact={true} />

        <Route path="/member/calendar" component={MemberCalendar} exact />
        <Route path="/member/members" component={MemberMembers} exact />
        <Route path={`/member/members/:id`} component={MemberMembersDetail} />

        <Route path="/member/about-us" component={MemberAbout} exact />

      </IonRouterOutlet>
    </>
  );
};

export default RouteMember;
