import { useAppData } from "@/context/AppProvider";
import { authToken } from "@/services/http";
import { MeetingProvider } from "@videosdk.live/react-sdk";
import MediaControl from "../media-control";
import Participant from "../participant";

const SpeakerScreen = () => {
  const { appData } = useAppData();
  return (
    <div>
      {appData.meetingId ? (
        <MeetingProvider
          config={{
            meetingId: appData.meetingId,
            mode: "CONFERENCE",
            name: "Dealer",
            micEnabled: true,
            webcamEnabled: true,
            debugMode: true,
          }}
          token={authToken}
          joinWithoutUserInteraction
        >
          <MediaControl />
          <Participant />
        </MeetingProvider>
      ) : null}
    </div>
  );
};

export default SpeakerScreen;
