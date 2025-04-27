import SignalR from "./components/SignalR";
import Socketio from "./components/Socketio";

const REAL_TIME_MODE = import.meta.env.VITE_REAL_TIME_MODE;

export default function App() {
    if (!REAL_TIME_MODE) {
        throw new Error(
            "Real time mode vairable is not set in the environment",
        );
    }

    if (REAL_TIME_MODE === "socketio") return <Socketio />;
    if (REAL_TIME_MODE === "signalr") return <SignalR />;

    return <p className="text-center">The real time mode set in the env is invalid</p>;
}
