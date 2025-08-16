import { useState } from "react";
import { Shield, Globe, Settings, BarChart3, Power } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { VpnConnectButton } from "./VpnConnectButton";
import { ServerSelector } from "./ServerSelector";
import { ConnectionStats } from "./ConnectionStats";
import { VpnSettings } from "./VpnSettings";
import { AdminDashboard } from "./AdminDashboard";

export type VpnStatus = "disconnected" | "connecting" | "connected";
export type ViewMode = "client" | "settings" | "admin";

export function VpnDashboard() {
  const [vpnStatus, setVpnStatus] = useState<VpnStatus>("disconnected");
  const [selectedServer, setSelectedServer] = useState("us-east");
  const [currentView, setCurrentView] = useState<ViewMode>("client");

  const toggleConnection = () => {
    if (vpnStatus === "disconnected") {
      setVpnStatus("connecting");
      setTimeout(() => setVpnStatus("connected"), 2000);
    } else if (vpnStatus === "connected") {
      setVpnStatus("disconnected");
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case "settings":
        return <VpnSettings />;
      case "admin":
        return <AdminDashboard />;
      default:
        return (
          <div className="space-y-6">
            {/* Connection Status Card */}
            <Card className="bg-gradient-card border-border/50 shadow-card">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2 text-2xl">
                  <Shield className="h-6 w-6 text-vpn-secure" />
                  SecureFlow VPN
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col items-center space-y-4">
                  <VpnConnectButton
                    status={vpnStatus}
                    onToggle={toggleConnection}
                  />
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                      {vpnStatus === "connected" && "Protected & Encrypted"}
                      {vpnStatus === "connecting" && "Establishing Secure Connection..."}
                      {vpnStatus === "disconnected" && "Not Protected"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Server Selection */}
            <ServerSelector
              selectedServer={selectedServer}
              onServerChange={setSelectedServer}
              isConnected={vpnStatus === "connected"}
            />

            {/* Connection Stats */}
            <ConnectionStats status={vpnStatus} />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto p-4 max-w-4xl">
        {/* Navigation */}
        <div className="flex justify-center mb-6">
          <div className="flex gap-2 p-1 bg-card/50 rounded-full border border-border/50">
            <Button
              variant={currentView === "client" ? "default" : "ghost"}
              size="sm"
              onClick={() => setCurrentView("client")}
              className="rounded-full"
            >
              <Globe className="h-4 w-4 mr-2" />
              Client
            </Button>
            <Button
              variant={currentView === "settings" ? "default" : "ghost"}
              size="sm"
              onClick={() => setCurrentView("settings")}
              className="rounded-full"
            >
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button
              variant={currentView === "admin" ? "default" : "ghost"}
              size="sm"
              onClick={() => setCurrentView("admin")}
              className="rounded-full"
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Admin
            </Button>
          </div>
        </div>

        {renderContent()}
      </div>
    </div>
  );
}