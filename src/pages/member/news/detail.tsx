import React, { useEffect, useState } from 'react';
import {
  IonButtons,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonPage,
  IonText,
  IonAvatar,
  IonGrid,
  IonCol,
  IonRow,
  IonBackButton,
  IonButton,
  IonIcon,
} from '@ionic/react';
import { RouteComponentProps } from 'react-router-dom';
import { NewsType, newsData } from '@/data/news_placeholder';

interface MemberNewsDetailProps
  extends RouteComponentProps<{
    id: string;
  }> { }

const MemberNewsDetail: React.FC<MemberNewsDetailProps> = ({ match }) => {
  const [news, setNews] = useState<NewsType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const foundNews = newsData.find((data) => data.id === match.params.id);
    setNews(foundNews || null);
    setIsLoading(false);

    return () => {
      setNews(null);
    };
  }, [match.params.id]);

  return (
    <IonPage>
      <IonHeader>
      <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref='/member/news' /> {/* Reuse the back button */}
          </IonButtons>
          <IonTitle>{news ? news.title : 'Member'}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {!news ? (
          <IonText color="danger">News not found</IonText>
        ) : (
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
                <IonCol size="10">
                  <IonText color="primary">
                    <h6>{news.category.toUpperCase()}</h6>
                  </IonText>
                  <h2>{news.title}</h2>
                  <p>{news.description}</p>
                </IonCol>
              </IonRow>
            </IonGrid>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default MemberNewsDetail;
