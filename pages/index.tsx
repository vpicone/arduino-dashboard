import { useState } from "react";

type Command = {
  type: string;
  payload: string;
};

const Dashboard = () => {
  const [brightness, setBrightness] = useState(0);
  const sendCommand = async function (command: Command) {
    const { type, payload } = command;
    return (
      await fetch("/api/io", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type,
          payload,
        }),
      })
    ).json();
  };

  return (
    <div>
      <button
        onClick={async () => {
          const { brightness } = await sendCommand({
            type: "power",
            payload: "on",
          });
          setBrightness(brightness);
        }}
      >
        on
      </button>
      <button
        onClick={async () => {
          const { brightness } = await sendCommand({
            type: "power",
            payload: "off",
          });
          setBrightness(brightness);
        }}
      >
        off
      </button>
      <input
        onChange={(e) => {
          sendCommand({ type: "brightness", payload: e.currentTarget.value });
          setBrightness(Number(e.currentTarget.value));
        }}
        value={brightness}
        min={0}
        max={255}
        type="range"
      />
    </div>
  );
};

export default Dashboard;
