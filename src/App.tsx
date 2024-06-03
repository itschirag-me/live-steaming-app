import { Constants } from "@videosdk.live/react-sdk";
import Welcome from "@/components/screens/welcome";
import { useAppData } from "@/context/AppProvider";
import SpeakerScreen from "@/components/screens/speaker-screen";
import ViewerScreen from "@/components/screens/viewer-screen";

const App = () => {
  const { appData } = useAppData();
  return (
    <div className="w-screen min-h-screen">
      {appData.meetingId ? (
        appData.mode === Constants.modes.CONFERENCE ? (
          <SpeakerScreen />
        ) : (
          <ViewerScreen />
        )
      ) : (
        <Welcome />
      )}
    </div>
  );
};

export default App;
