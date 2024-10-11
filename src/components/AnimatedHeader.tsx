import React from 'react';
import { IonHeader, IonToolbar, IonTitle, IonImg } from '@ionic/react';
import './css/AnimatedHeader.css';  // Optional for additional styling

interface AnimatedHeaderProps {
  isScrolled: boolean;
  title: string;
  children?: React.ReactNode;  // Slot to pass custom content from pages
}

const AnimatedHeader: React.FC<AnimatedHeaderProps> = ({ isScrolled, title, children }) => {

    const profileImageUrl="https://c8.alamy.com/comp/PG95YW/young-african-american-man-holding-canadian-passport-doing-ok-sign-with-fingers-excellent-symbol-PG95YW.jpg";

  return (
    <>
      {/* Fixed right Header */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 1000,
          padding: '1rem',
          background: 'transparent',
          display: 'flex',
          flexDirection: 'row-reverse',
          alignItems:"center",
        }}
      >
        {profileImageUrl && (
          <span style={{ width: 30, height: 30 }} className="circle-image-container">
            <IonImg src={profileImageUrl} alt="Profile" className="circle-image" />
          </span>
        )}
        {/* Slot for custom content */}
        {children}
      </div>

      {/* Header with title */}
      <IonHeader className={isScrolled ? 'small-header' : 'large-header'}>
        <IonToolbar className="custom-toolbar">
          <IonTitle className={isScrolled ? 'small-title' : 'large-title'}>{title}</IonTitle>
        </IonToolbar>
      </IonHeader>
    </>
  );
};

export default AnimatedHeader;
