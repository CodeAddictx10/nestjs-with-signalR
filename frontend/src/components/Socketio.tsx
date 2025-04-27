import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import PriceContainer from "./PriceContainer";
import { IData } from "../types";

if (!import.meta.env.VITE_WEBSOCKET_SERVER_URL) {
    throw new Error(
        "Websocket sever url is missing in the environment vairable",
    );
}

export default function Socketio() {
    const [prices, setPrices] = useState<IData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [hasDisconnected, setHasDisconnected] = useState<boolean | undefined>(
        undefined,
    );

    useEffect(() => {
        const socket = io(import.meta.env.VITE_WEBSOCKET_SERVER_URL);
        socket.on("connect", () => {
            setHasDisconnected(false);
        });

        socket.on("disconnect", () => {
            setHasDisconnected(true);
        });

        socket.on("newprice", (data: unknown) => {
            setIsLoading(true);
            setPrices(data as IData[]);
            setTimeout(() => {
                setIsLoading(false);
            }, 2000);
        });

        return () => {
            socket.off("connect");
            socket.off("disconnected");
            socket.off("newprice");
        };
    }, []);

    return (
        <PriceContainer
            prices={prices}
            isLoading={isLoading}
            hasDisconnected={hasDisconnected}
        />
    );
}
