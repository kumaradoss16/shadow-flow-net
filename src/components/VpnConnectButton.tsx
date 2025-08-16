import { Shield, Power, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VpnStatus } from "./VpnDashboard";
import { cn } from "@/lib/utils";

interface VpnConnectButtonProps {
  status: VpnStatus;
  onToggle: () => void;
}

export function VpnConnectButton({ status, onToggle }: VpnConnectButtonProps) {
  const getButtonStyles = () => {
    switch (status) {
      case "connected":
        return "bg-vpn-connected hover:bg-vpn-connected/90 text-white shadow-glow animate-pulse-glow";
      case "connecting":
        return "bg-vpn-connecting hover:bg-vpn-connecting/90 text-white";
      default:
        return "bg-secondary hover:bg-secondary/90 border-2 border-primary/20";
    }
  };

  const getIcon = () => {
    switch (status) {
      case "connected":
        return <Shield className="h-8 w-8" />;
      case "connecting":
        return <Loader2 className="h-8 w-8 animate-spin" />;
      default:
        return <Power className="h-8 w-8" />;
    }
  };

  const getButtonText = () => {
    switch (status) {
      case "connected":
        return "Disconnect";
      case "connecting":
        return "Connecting...";
      default:
        return "Connect";
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <Button
        onClick={onToggle}
        disabled={status === "connecting"}
        className={cn(
          "h-32 w-32 rounded-full text-lg font-semibold transition-all duration-300",
          getButtonStyles()
        )}
      >
        <div className="flex flex-col items-center space-y-2">
          {getIcon()}
          <span className="text-sm">{getButtonText()}</span>
        </div>
      </Button>
      
      {status === "connected" && (
        <div className="flex items-center space-x-2 text-vpn-connected">
          <div className="h-2 w-2 bg-vpn-connected rounded-full animate-pulse" />
          <span className="text-sm font-medium">Secure Connection Active</span>
        </div>
      )}
    </div>
  );
}