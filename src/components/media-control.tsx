import { useAppData } from "@/context/AppProvider";
import { Constants, useMeeting } from "@videosdk.live/react-sdk";
import { useMemo } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Mic, MicOff, Video, VideoOff } from "lucide-react";

const config = {
  // Layout Configuration
  layout: {
    type: "SPOTLIGHT", // "SPOTLIGHT" | "SIDEBAR",  Default : "GRID"
    priority: "SPEAKER", // "PIN", Default : "SPEAKER"
    gridSize: 4, // MAX : 25
  },

  // Theme of livestream
  theme: "DARK", //  "LIGHT" | "DEFAULT"

  // `mode` is used to either interactive livestream video & audio both or only audio.
  mode: "video-and-audio", // "audio", Default : "video-and-audio"

  // Quality of livestream and is only applicable to `video-and-audio` type mode.
  quality: "high", // "low" | "med",  Default : "med"

  // This mode refers to orientation of recording.
  // landscape : Livestream the meeting in horizontally
  // portrait : Livestream the meeting in vertically (Best for mobile view)
  orientation: "landscape", // "portrait",  Default : "landscape"
};

const MediaControl = () => {
  const { appData } = useAppData();

  const {
    toggleMic,
    toggleWebcam,
    startHls,
    stopHls,
    hlsState,
    localMicOn,
    localWebcamOn,
  } = useMeeting();

  const { isHlsStarted, isHlsStopped } = useMemo(
    () => ({
      isHlsStarted: hlsState === Constants.hlsEvents.HLS_STARTED,
      isHlsStopped: hlsState === Constants.hlsEvents.HLS_STOPPED,
      isHlsPlayable: hlsState === Constants.hlsEvents.HLS_PLAYABLE,
    }),
    [hlsState]
  );
  const _handleToggleHls = () => {
    if (isHlsStarted) {
      stopHls();
    } else if (isHlsStopped) {
      startHls(config);
    }
  };

  const handleToggleMic = () => {
    return toggleMic();
  };
  const handleToggleWebcam = () => {
    return toggleWebcam();
  };

  return (
    <div className="flex justify-between items-center p-2">
      <Badge>{appData.meetingId}</Badge>
      <div className="flex items-center gap-2">
        <Button onClick={handleToggleMic} size="icon">
          {localMicOn ? (
            <Mic className="w-4 h-4" />
          ) : (
            <MicOff className="w-4 h-4" />
          )}
        </Button>
        <Button onClick={handleToggleWebcam} size="icon">
          {localWebcamOn ? (
            <Video className="w-4 h-4" />
          ) : (
            <VideoOff className="w-4 h-4" />
          )}
        </Button>
        <Button onClick={_handleToggleHls}>
          {isHlsStarted ? "Stop Live" : "Go Live"}
        </Button>
      </div>
    </div>
  );
};

export default MediaControl;
