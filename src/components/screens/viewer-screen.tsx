import { useAppData } from "@/context/AppProvider";
import { authToken } from "@/services/http";
import {
  Constants,
  MeetingConsumer,
  MeetingProvider,
} from "@videosdk.live/react-sdk";
import HlsPlayer from "../hls-player";
import Dashboard from "../dashboard";

const ViewerScreen = () => {
  const { appData } = useAppData();
  return (
    <div>
      {appData.meetingId && (
        <MeetingProvider
          token={authToken}
          config={{
            meetingId: appData.meetingId,
            mode: "VIEWER",
            name: "Viewer",
            debugMode: true,
            micEnabled: false,
            webcamEnabled: false,
          }}
          joinWithoutUserInteraction
        >
          <MeetingConsumer>
            {({ hlsState }: { hlsState: string }) => {
              if (hlsState === Constants.hlsEvents.HLS_PLAYABLE) {
                return (
                  <div className="flex flex-col items-center justify-center">
                    <HlsPlayer />
                    <Dashboard />
                  </div>
                );
              } else {
                return <p>Waiting for host to start stream...</p>;
              }
            }}
          </MeetingConsumer>
        </MeetingProvider>
      )}
    </div>
  );
};

export default ViewerScreen;
