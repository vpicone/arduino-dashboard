import SerialPort from "serialport";
import type { NextApiRequest, NextApiResponse } from "next";
// import debounce from "lodash.debounce";

const ARDUINO_COM_PORT = "/dev/cu.usbmodem141301";

const arduinoSerialPort = new SerialPort(ARDUINO_COM_PORT, {
  baudRate: 9600,
});

const setBrightness = (brightness: string) => {
  arduinoSerialPort.write(`${brightness}!`);
};

// const debouncedSetBrightness = debounce(setBrightness, 250);

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { type, payload } = req.body;
  if (type === "power") {
    if (payload === "on") {
      arduinoSerialPort.write("on!");
      return res.json({ brightness: 255 });
    }
    if (payload === "off") {
      arduinoSerialPort.write("off!");
      return res.send({ brightness: 0 });
    }
    res.status(400).send("Error: incorrect request payload");
  }

  if (type === "brightness") {
    setBrightness(payload);
    return res.send({ brightness: payload });
  }

  res.status(400).send("Error: incorrect request type");
}
