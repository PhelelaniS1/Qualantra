import { useEffect, useRef, useState } from 'react';
import {
  Stage,
  LocalStageStream,
  SubscribeType,
  StageEvents,
  StreamType,
  ConnectionState,
} from 'amazon-ivs-web-broadcast';

type ParticipantVideo = {
  id: string;
  name: string;
  videoTrack: MediaStreamTrack | null;
  audioTrack: MediaStreamTrack | null;
};

const LiveClassroomPage = () => {
  const [connectionState, setConnectionState] = useState('Not connected');
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [participants, setParticipants] = useState<ParticipantVideo[]>([]);

  const stageRef = useRef<any>(null);
  const localCameraRef = useRef<MediaStream | null>(null);
  const localMicRef = useRef<MediaStream | null>(null);
  const localVideoElementRef = useRef<HTMLVideoElement | null>(null);
  const participantElementsRef = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    return () => {
      stageRef.current?.leave();

      localCameraRef.current?.getTracks().forEach((track) => track.stop());
      localMicRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  const joinClassroom = async () => {
    try {
      setConnectionState('Requesting camera and microphone...');

      const camera = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });

      const microphone = await navigator.mediaDevices.getUserMedia({
        video: false,
        audio: true,
      });

      localCameraRef.current = camera;
      localMicRef.current = microphone;

      if (localVideoElementRef.current) {
        localVideoElementRef.current.srcObject = camera;
      }

      const cameraTrack = camera.getVideoTracks()[0];
      const microphoneTrack = microphone.getAudioTracks()[0];

      const cameraStageStream = new LocalStageStream(cameraTrack);
      const microphoneStageStream = new LocalStageStream(microphoneTrack);

      /*
       * The token will come from our secure QUALANTRA backend.
       * We deliberately do not hard-code an IVS participant token here.
       */
      const tokenResponse = await fetch('/api/ivs/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: `qualantra-user-${Date.now()}`,
        }),
      });

      if (!tokenResponse.ok) {
        throw new Error('Unable to obtain classroom access token.');
      }

      const { token } = await tokenResponse.json();

      const strategy = {
        stageStreamsToPublish() {
          return [cameraStageStream, microphoneStageStream];
        },

        shouldPublishParticipant() {
          return true;
        },

        shouldSubscribeToParticipant() {
          return SubscribeType.AUDIO_VIDEO;
        },
      };

      const stage = new Stage(token, strategy);

      stageRef.current = stage;

      stage.on(
        StageEvents.STAGE_CONNECTION_STATE_CHANGED,
        (state) => {
          setConnectionState(state);
        }
      );

      stage.on(
        StageEvents.STAGE_PARTICIPANT_JOINED,
        (participant) => {
          setParticipants((current) => {
            if (current.some((item) => item.id === participant.id)) {
              return current;
            }

            return [
              ...current,
              {
                id: participant.id,
                name: participant.userId || 'Learner',
                videoTrack: null,
                audioTrack: null,
              },
            ];
          });
        }
      );

      stage.on(
        StageEvents.STAGE_PARTICIPANT_LEFT,
        (participant) => {
          setParticipants((current) =>
            current.filter((item) => item.id !== participant.id)
          );
        }
      );

      stage.on(
        StageEvents.STAGE_PARTICIPANT_STREAMS_ADDED,
        (participant, streams) => {
          let videoTrack: MediaStreamTrack | null = null;
          let audioTrack: MediaStreamTrack | null = null;

          streams.forEach((stream) => {
            if (stream.streamType === StreamType.VIDEO) {
              videoTrack = stream.mediaStreamTrack;
            }

            if (stream.streamType === StreamType.AUDIO) {
              audioTrack = stream.mediaStreamTrack;
            }
          });

          setParticipants((current) =>
            current.map((item) =>
              item.id === participant.id
                ? {
                    ...item,
                    videoTrack,
                    audioTrack,
                  }
                : item
            )
          );
        }
      );

      await stage.join();

      setConnectionState('Connected');
    } catch (error) {
      console.error('QUALANTRA classroom error:', error);
      setConnectionState(
        error instanceof Error
          ? error.message
          : 'Unable to join classroom.'
      );
    }
  };

  const leaveClassroom = () => {
    stageRef.current?.leave();
    stageRef.current = null;

    localCameraRef.current?.getTracks().forEach((track) => track.stop());
    localMicRef.current?.getTracks().forEach((track) => track.stop());

    localCameraRef.current = null;
    localMicRef.current = null;

    setParticipants([]);
    setConnectionState('Not connected');
  };

  const toggleMute = () => {
    const audioTrack = localMicRef.current?.getAudioTracks()[0];

    if (!audioTrack) return;

    audioTrack.enabled = !audioTrack.enabled;
    setIsMuted(!audioTrack.enabled);
  };

  const toggleCamera = () => {
    const videoTrack = localCameraRef.current?.getVideoTracks()[0];

    if (!videoTrack) return;

    videoTrack.enabled = !videoTrack.enabled;
    setIsCameraOff(!videoTrack.enabled);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-blue-400">
              QUALANTRA LIVE CLASSROOM
            </p>

            <h1 className="mt-1 text-2xl font-semibold">
              Grade 7 Mathematics
            </h1>

            <p className="mt-1 text-sm text-slate-400">
              Teacher-led live learning environment
            </p>
          </div>

          <div className="rounded-full border border-slate-700 px-4 py-2 text-sm">
            {connectionState}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <main className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
            <div className="relative aspect-video overflow-hidden rounded-xl bg-black">
              <video
                ref={localVideoElementRef}
                autoPlay
                muted
                playsInline
                className={`h-full w-full object-cover ${
                  isCameraOff ? 'opacity-0' : 'opacity-100'
                }`}
              />

              {isCameraOff && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-slate-800 text-2xl">
                      PS
                    </div>
                    <p className="text-sm text-slate-400">
                      Camera off
                    </p>
                  </div>
                </div>
              )}

              {connectionState === 'Not connected' && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-950/90">
                  <div className="text-center">
                    <h2 className="text-xl font-semibold">
                      Ready for class
                    </h2>

                    <p className="mt-2 text-sm text-slate-400">
                      Allow camera and microphone access to join.
                    </p>

                    <button
                      onClick={joinClassroom}
                      className="mt-6 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-slate-900"
                    >
                      Join classroom
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4 flex items-center justify-center gap-3">
              <button
                onClick={toggleMute}
                disabled={connectionState !== 'Connected'}
                className="rounded-lg border border-slate-700 px-4 py-3 text-sm disabled:opacity-40"
              >
                {isMuted ? 'Unmute' : 'Mute'}
              </button>

              <button
                onClick={toggleCamera}
                disabled={connectionState !== 'Connected'}
                className="rounded-lg border border-slate-700 px-4 py-3 text-sm disabled:opacity-40"
              >
                {isCameraOff ? 'Turn camera on' : 'Turn camera off'}
              </button>

              <button
                onClick={leaveClassroom}
                disabled={connectionState === 'Not connected'}
                className="rounded-lg bg-red-600 px-4 py-3 text-sm font-medium disabled:opacity-40"
              >
                Leave classroom
              </button>
            </div>
          </main>

          <aside className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">Participants</h2>

              <span className="text-sm text-slate-400">
                {participants.length + 1}
              </span>
            </div>

            <div className="mt-5 space-y-3">
              <div className="rounded-lg border border-slate-800 p-3">
                <p className="text-sm font-medium">
                  You
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Teacher
                </p>
              </div>

              {participants.map((participant) => (
                <div
                  key={participant.id}
                  ref={(element) => {
                    participantElementsRef.current[participant.id] =
                      element;
                  }}
                  className="rounded-lg border border-slate-800 p-3"
                >
                  <p className="text-sm font-medium">
                    {participant.name}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Connected
                  </p>
                </div>
              ))}

              {participants.length === 0 && (
                <p className="text-sm text-slate-500">
                  Waiting for other participants...
                </p>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default LiveClassroomPage;