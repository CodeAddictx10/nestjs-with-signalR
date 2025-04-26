import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import PriceContainer from "./components/PriceContainer";

export type IData = {
    symbol: string;
    price: number;
    isIncremental?: boolean;
    timestamp?: string;
};

if (!import.meta.env.VITE_WEBSOCKET_SERVER_URL) {
    throw new Error(
        "Websocket sever url is missing in the environment vairable",
    );
}

const socket = io(import.meta.env.VITE_WEBSOCKET_SERVER_URL);

export default function App() {
    const [prices, setPrices] = useState<IData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [hasDisconnected, setHasDisconnected] = useState<boolean | undefined>(
        undefined,
    );

    useEffect(() => {
        socket.on("connect", () => {
            setHasDisconnected(false);
        });

        socket.on("disconnect", () => {
            setHasDisconnected(true);
        });

        socket.on("new-price", (data: unknown) => {
            setIsLoading(true);
            setPrices(data as IData[]);
            setTimeout(() => {
                setIsLoading(false);
            }, 2000);
        });

        return () => {
            socket.off("connect");
            socket.off("disconnected");
            socket.off("new-price");
        };
    });

    return (
        <PriceContainer
            prices={prices}
            isLoading={isLoading}
            hasDisconnected={hasDisconnected}
        />
    );
}
