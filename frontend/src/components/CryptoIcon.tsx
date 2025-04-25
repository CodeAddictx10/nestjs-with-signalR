import {
  Bitcoin,
  CircleDollarSign,
  Coins,
  Droplets,
  Orbit,
  SunDim,
  Waves,
} from "lucide-react";

const iconMap = {
    BTCUSD: <Bitcoin size={24} className="text-orange-500" />,
    ETHUSD: <Droplets size={24} className="text-purple-500" />,
    XRPUSD: <Waves size={24} className="text-blue-500" />,
    LTCUSD: <Waves size={24} className="text-blue-500" />,
    BNBUSD: <CircleDollarSign size={24} className="text-blue-400" />,
    ADAUSD: <CircleDollarSign size={24} className="text-blue-400" />,
    SOLUSD: <SunDim size={24} className="text-green-500" />,
    DOTUSD: <Orbit size={24} className="text-pink-500" />,
    DOGEUSD: <Orbit size={24} className="text-pink-500" />,
};
export function CryptoIcon({currency}:{currency: string}) {
    return (
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800">
            {iconMap[currency as keyof typeof iconMap] || (
                <Coins size={24} className="text-gray-500" />
            )}
        </div>
    );
}
