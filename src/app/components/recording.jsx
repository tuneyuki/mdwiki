import React, { useState, useEffect, useContext } from "react";
import { IconMicrophone, IconMicrophoneOff } from "@tabler/icons-react";
import Context from "../context";

export const Recording = () => {
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [result, setResult] = useState();
  const { current, setCurrent, overwriteCurrent } = useContext(Context);

  // This array will hold the audio data
  let chunks = [];

  // This useEffect hook sets up the media recorder when the component mounts
  useEffect(() => {
    if (typeof window !== "undefined") {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          const newMediaRecorder = new MediaRecorder(stream);
          newMediaRecorder.onstart = () => {
            chunks = [];
          };
          newMediaRecorder.ondataavailable = (e) => {
            chunks.push(e.data);
          };
          newMediaRecorder.onstop = async () => {
            const audioBlob = new Blob(chunks, { type: "audio/webm" });
            const audioUrl = URL.createObjectURL(audioBlob);
            const audio = new Audio(audioUrl);
            audio.onerror = function (err) {
              console.error("Error playing audio:", err);
            };
            // audio.play();
            try {
              const reader = new FileReader();
              reader.readAsDataURL(audioBlob);
              reader.onloadend = async function () {
                const base64Audio = reader.result.split(",")[1]; // Remove the data URL prefix
                const response = await fetch("/api/speechToText", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ audio: base64Audio }),
                });
                const data = await response.json();
                if (response.status !== 200) {
                  throw (
                    data.error ||
                    new Error(`Request failed with status ${response.status}`)
                  );
                }
                setResult(data.result);
              };
            } catch (error) {
              console.error(error);
              alert(error.message);
            }
          };
          setMediaRecorder(newMediaRecorder);
        })
        .catch((err) => console.error("Error accessing microphone:", err));
    }
  }, []);

  useEffect(() => {
    if (result) {
      if (current.content !== "") {
        setCurrent({
          id: current?.id || "",
          title: current?.title || "",
          content: result || "",
        });
      }
      setCurrent({
        id: current?.id || "",
        title: current?.title || "",
        content: current.content + "\n" + result || "",
      });
      overwriteCurrent(current);
    }
  }, [result]);

  // Function to start recording
  const startRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.start();
      setRecording(true);
    }
  };
  // Function to stop recording
  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setRecording(false);
    }
  };

  function handleRecording() {
    if (!recording) {
      startRecording();
    } else {
      stopRecording();
    }
  }

  return (
    <button
      onClick={handleRecording}
      className="rounded-full p-2 border-2 mx-2 dark:bg-slate-600 dark:hover:bg-slate-500 dark:active:bg-slate-300 bg-slate-300 hover:bg-slate-400 active:bg-slate-500"
    >
      {recording && <IconMicrophoneOff size={80} />}
      {!recording && <IconMicrophone size={80} />}
    </button>
  );
};
