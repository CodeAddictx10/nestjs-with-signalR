import { useEffect, useState } from "react";
import PriceContainer from "./PriceContainer";
import { IData } from "../types";
import { io } from "socket.io-client";

if (!import.meta.env.VITE_BACKEND_SERVER_URL) {
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
        const socket = io(import.meta.env.VITE_BACKEND_SERVER_URL);
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

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch(
                `${import.meta.env.VITE_BACKEND_SERVER_URL}/api/prices`,
            );
            if (result.ok) {
                setPrices(await result.json());
            }
        };
        fetchData();
    }, []);

    return (
        <PriceContainer
            prices={prices}
            isLoading={isLoading}
            hasDisconnected={hasDisconnected}
        />
    );
}
