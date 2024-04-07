import { Hint } from "@/components/hint";
import { Volume1, Volume2, VolumeX } from "lucide-react";
import { Slider } from "../ui/slider";

interface VolumeControlProps {
    value: number;
    onChange: (value: number) => void;
    onToggle: () => void
}
export const VolumeControl:React.FC<VolumeControlProps> = ({
    value,
    onChange,
    onToggle,
}) => {
    const isMuted = value === 0;
    const isAbovHalf = value > 50;

    let Icon = Volume1;

    if (isMuted) {
        Icon = VolumeX;
    } else if (isAbovHalf) {
        Icon = Volume2;
    };

    const label = isMuted ? "Unmute" : "Mute";

    const handleChange = (value: number[]) => {
        onChange(value[0]);
    };

    return (
        <div className="flex items-center gap-2">
            <Hint label={label} asChild>
                <button
                    onClick={onToggle}
                    className="text-white hover:bg-white/10 p-1.5 rounded-lg"
                >
                    <Icon className="h-6 w-6"/>
                </button>
            </Hint>
            <Slider 
                className="w-[8rem] cursor-pointer"
                onValueChange={handleChange}
                value={[value]}
                max={100}
                step={1}
            />
        </div>
    )
}