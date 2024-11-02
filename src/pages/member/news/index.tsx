import "./news.css";
import React from 'react';
import { IonPage, IonContent, IonGrid, IonRow, IonCol, IonAvatar, IonText, IonHeader, IonRefresher, IonRefresherContent, IonRouterOutlet, IonTitle, IonToolbar } from '@ionic/react';
import SideMenuBtn from "@/components/sideMenuBtn";
import { useHistory } from "react-router";
import { newsData, NewsType } from "@/data/news_placeholder";
import UserAvatar from "@/components/member/userAvatar";

interface NewsCardProps {
  news: NewsType;
}

const NewsCard: React.FC<NewsCardProps> = ({ news }) => {
  
  const history = useHistory();
  
  return (
  <div className="news-card">
    <IonGrid>
      <IonRow>
        {/* Date Section */}
        <IonCol size="2" className="ion-text-center">
          <IonText color="medium">
            <p>{news.date.monthDay}</p>
            <h1>{news.date.day}</h1>
          </IonText>
        </IonCol>

        {/* News Details */}
        <IonCol size="10" onClick={()=>{history.push(`/member/news/${news.id}`)}}>
          <IonText color="primary">
            <h6>{news.category.toUpperCase()}</h6>
          </IonText>
          <h2>{news.title}</h2>
          <p>{news.description}</p>
        </IonCol>
      </IonRow>
    </IonGrid>
  </div>
);
}

const MemberNews: React.FC = () => {
  const news: NewsType[] = newsData;

  // Handle pull-to-refresh news
  const handleRefresh = (news: CustomEvent) => {
    setTimeout(() => {
      news.detail.complete();
    }, 2000);
  };

  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>News</IonTitle>
            <UserAvatar/>
          </IonToolbar>
        </IonHeader>

        <IonContent>
          <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
            <IonRefresherContent />
          </IonRefresher>
          {/* Render news */}
          {news.map((news) => (
            <NewsCard key={news.id} news={news} />
          ))}
        </IonContent>
        <SideMenuBtn />
      </IonPage>
    </>
  );
};

export default MemberNews;
