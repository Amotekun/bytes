import { Hint } from "@/components/hint"
import { Maximize, Minimize } from "lucide-react"

interface FullscreenControllerProps {
    isFullscreen: boolean;
    onToggle: () => void;
}
export const FullscreenController: React.FC<FullscreenControllerProps> = ({
    isFullscreen,
    onToggle,
}) => {
    const Icon = isFullscreen ? Minimize : Maximize;
    const label = isFullscreen ? "Exit" : "Fullscreen";

    return (
        <div className="flex items-center justify-center gap-4">
            <Hint label={label} asChild>
                <button
                    onClick = {onToggle}
                    className="text-white p-1.5 hover:bg-white/10 rounded-lg"
                >
                    <Icon className="h-5 w-5"/>
                </button>
            </Hint>
        </div>
    )
}