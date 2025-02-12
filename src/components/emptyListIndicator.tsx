import { IonIcon, IonText } from "@ionic/react";
import { mailOutline, walletSharp } from "ionicons/icons";

// SVG icon for the "groups" page type
const emptyGroupIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="64"
    height="64"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#ddd"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M16 16a4 4 0 0 0-8 0"></path>
    <line x1="12" y1="12" x2="12" y2="12"></line>
  </svg>
);

const pageType = [
  { name: "payment", icon: walletSharp, phrase: "No Payments yet" },
  { name: "inbox", icon: mailOutline, phrase: "No inbox yet" },
  { name: "groups", icon: emptyGroupIcon, phrase: "No Groups yet" },
];

// Props interface for the component
interface EmptyListIndicatorProps {
  pagename: string;
}

const EmptyListIndicator: React.FC<EmptyListIndicatorProps> = ({ pagename }) => {
  // Find the page type based on the provided pagename
  const thisPage = pageType.find((n) => n.name === pagename);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "80%",
      }}
    >
      {/* Render either IonIcon or the custom SVG */}
      {pagename === "groups" ? (
        thisPage?.icon
      ) : (
        <IonIcon icon={thisPage?.icon as string} style={{ fontSize: "64px", color: "#ddd" }} />
      )}
      <IonText color="medium">
        <p style={{ textAlign: "center", color: "#ddd" }}>{thisPage?.phrase}</p>
      </IonText>
    </div>
  );
};

export default EmptyListIndicator;
