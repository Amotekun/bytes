"use client";

import { createIngress } from "@/action/ingress";
import { 
    Alert, 
    AlertDescription, 
    AlertTitle 
} from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { 
    Dialog, 
    DialogContent, 
    DialogHeader, 
    DialogTitle, 
    DialogTrigger, 
    DialogClose 
} from "@/components/ui/dialog";
import { 
    Select, 
    SelectTrigger, 
    SelectContent, 
    SelectItem, 
    SelectValue 
} from "@/components/ui/select";
import { IngressInput } from "livekit-server-sdk";
import { AlertTriangle } from "lucide-react";
import { 
    ElementRef, 
    useRef, 
    useState, 
    useTransition 
} from "react";
import { toast } from "sonner";

const RTMP = String(IngressInput.RTMP_INPUT);
const WHIP = String(IngressInput.WHIP_INPUT);

type IngressType = typeof RTMP | typeof WHIP;

export const ConnectModal = () => {
    const [isPending, startTransition] = useTransition();
    const closeRef = useRef<ElementRef<"button">>(null);
    const [ingressType, setIngressType] = useState<IngressType>(RTMP);

    const onSubmit = () => {
        startTransition(() => {
            createIngress(parseInt(ingressType))
                .then(() => {
                    toast.success("Ingress created");
                    closeRef?.current?.click();
                })
                .catch(() => toast.error("Something went wrong"))
        });
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    Generate connection
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Generate connection</DialogTitle>
                </DialogHeader>
                <Select
                    disabled={isPending}
                    value={ingressType}
                    onValueChange={(value) => setIngressType(value)}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Connect to a stream" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={RTMP}>
                            RTMP
                        </SelectItem>
                        <SelectItem value={WHIP}>
                            WHIP
                        </SelectItem>
                    </SelectContent>
                </Select>
                <Alert>
                    <AlertTriangle className="h-4 w-4"/>
                    <AlertTitle>Warning!</AlertTitle>
                    <AlertDescription>
                        You are about to generate a connection key. This will automatically terminate and reset all your streams 
                    </AlertDescription>
                </Alert>
                <div className="flex justify-between">
                    <DialogClose ref={closeRef} asChild>
                        <Button variant="ghost">
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button
                        disabled={isPending}
                        onClick={onSubmit}
                        variant="primary"
                    >
                        Generate
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}