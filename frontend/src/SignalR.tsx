import { useState, useEffect, useRef, useCallback } from "react";
import * as signalR from "@microsoft/signalr";
import { IData } from "./App";
import PriceContainer from "./components/PriceContainer";

export default function SignalR() {
    const [prices, setPrices] = useState<IData[]>([]);
    const [connected, setConnected] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const connectionRef = useRef<signalR.HubConnection | null>(null);

    // Create and start a SignalR connection
    const startConnection = useCallback(async () => {
        try {
            const hubUrl = import.meta.env.VITE_SIGNALR_SERVER_URL;
            if (!hubUrl) {
                throw new Error(
                    "Signalr sever url is missing in the environment vairable",
                );
            }
            const connection = new signalR.HubConnectionBuilder()
                .withUrl(hubUrl)
                .withAutomaticReconnect([5000, 10000, 60000, 600000])
                .configureLogging(signalR.LogLevel.Information)
                .build();

            // Set up connection event handlers
            connection.onreconnecting((error) => {
                console.log("SignalR connection lost, reconnecting:", error);
                setConnected(false);
            });

            connection.onreconnected((connectionId) => {
                console.log("SignalR reconnected with ID:", connectionId);
                setConnected(true);
            });

            connection.onclose((error) => {
                console.log("SignalR connection closed:", error);
                setConnected(false);
            });

            connection.on("newprice", (data: IData[]) => {
                setIsLoading(true);
                if (data) {
                    setPrices(data);
                }
                setTimeout(() => {
                    setIsLoading(false);
                }, 2000);
            });

            // Start the connection
            await connection.start();

            console.log("SignalR connection established");
            setConnected(true);

            // Store connection in ref for later use
            connectionRef.current = connection;
            return true;
        } catch (error) {
            console.error("Error establishing SignalR connection:", error);
            setConnected(false);
            return false;
        }
    }, []);

    // Stop the SignalR connection
    const stopConnection = useCallback(async () => {
        if (connectionRef.current) {
            try {
                await connectionRef.current.stop();
                console.log("SignalR connection stopped");
                connectionRef.current = null;
                setConnected(false);
            } catch (error) {
                console.error("Error stopping SignalR connection:", error);
            }
        }
    }, []);

    useEffect(() => {
        startConnection();

        return () => {
            stopConnection();
        };
    }, [startConnection, stopConnection]);

    return (
        <PriceContainer
            prices={prices}
            isLoading={isLoading}
            hasDisconnected={!connected}
        />
    );
}
