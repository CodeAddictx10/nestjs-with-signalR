import { CandlestickChart, RefreshCwIcon } from "lucide-react";
import { CryptoIcon } from "./CryptoIcon";
import { IData } from "../types";

type IProps = {
    prices: IData[];
    hasDisconnected?: boolean;
    isLoading: boolean;
};

export default function Prices({prices, hasDisconnected, isLoading}: IProps) {

    return (
        <div className="container mx-auto py-8">
            <div className="flex flex-col items-center justify-center mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <div className="bg-black p-3 rounded-full">
                        <CandlestickChart className="h-8 w-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-center">
                        Price Tracker
                    </h1>
                </div>
                <p className="text-muted-foreground text-center">
                    Real-time price updates
                </p>
            </div>

            {hasDisconnected === true ||
                (hasDisconnected === undefined && (
                    <div className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-2 rounded-md mb-6">
                        Server has{" "}
                        {hasDisconnected ? "disconnected" : "not connected"}
                    </div>
                ))}

            <div className="flex justify-between items-center mb-6">
                <p>
                    Last Updated: {prices.length > 0 ? prices[0].timestamp : ""}{" "}
                </p>
                <div className="flex items-center gap-2">
                    <RefreshCwIcon
                        className={`h-4 w-4 ${isLoading && "animate-spin"}`}
                    />
                    <span className="text-sm">Updates every 5 seconds</span>
                </div>
            </div>

            {prices.length > 0 && (
                <div className="bg-slate-300 rounded-md p-6 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 place-items-center">
                    {prices?.map(({ price, symbol, isIncremental }, index) => (
                        <div
                            className="flex items-start gap-2 w-[300px]"
                            key={index}>
                            <CryptoIcon currency={symbol} />
                            <div className="flex flex-col">
                                <p className={`transition-all ease-linear`}>
                                    {symbol}
                                </p>
                                <p
                                    className={`
                                  ${isIncremental === true && "text-green-600"} 
                                  ${
                                      isIncremental === false && "text-red-600"
                                  } transition-all ease-linear`}>
                                    ${price}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
