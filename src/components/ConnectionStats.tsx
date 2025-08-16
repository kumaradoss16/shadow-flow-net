import { useState, useEffect } from "react";
import { Activity, Download, Upload, Globe, Clock, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { VpnStatus } from "./VpnDashboard";

interface ConnectionStatsProps {
  status: VpnStatus;
}

export function ConnectionStats({ status }: ConnectionStatsProps) {
  const [stats, setStats] = useState({
    downloadSpeed: 0,
    uploadSpeed: 0,
    totalDownload: 0,
    totalUpload: 0,
    currentIP: "192.168.1.100",
    vpnIP: "185.46.212.34",
    sessionTime: 0,
  });

  useEffect(() => {
    if (status === "connected") {
      const interval = setInterval(() => {
        setStats(prev => ({
          ...prev,
          downloadSpeed: Math.random() * 50 + 10,
          uploadSpeed: Math.random() * 20 + 5,
          totalDownload: prev.totalDownload + Math.random() * 0.5,
          totalUpload: prev.totalUpload + Math.random() * 0.2,
          sessionTime: prev.sessionTime + 1,
        }));
      }, 1000);

      return () => clearInterval(interval);
    } else {
      setStats(prev => ({
        ...prev,
        downloadSpeed: 0,
        uploadSpeed: 0,
        sessionTime: 0,
      }));
    }
  }, [status]);

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentDisplayIP = status === "connected" ? stats.vpnIP : stats.currentIP;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {/* Current IP */}
      <Card className="bg-gradient-card border-border/50 shadow-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <Globe className="h-4 w-4 text-primary" />
            IP Address
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-mono">{currentDisplayIP}</div>
          <div className="text-sm text-muted-foreground mt-1">
            {status === "connected" ? (
              <span className="text-vpn-connected flex items-center gap-1">
                <Shield className="h-3 w-3" />
                Protected
              </span>
            ) : (
              <span className="text-vpn-disconnected">Exposed</span>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Session Time */}
      <Card className="bg-gradient-card border-border/50 shadow-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            Session Time
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-mono">{formatTime(stats.sessionTime)}</div>
          <div className="text-sm text-muted-foreground mt-1">
            {status === "connected" ? "Active session" : "Not connected"}
          </div>
        </CardContent>
      </Card>

      {/* Real-time Speed */}
      <Card className="bg-gradient-card border-border/50 shadow-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <Activity className="h-4 w-4 text-primary" />
            Speed
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-sm">
                <Download className="h-3 w-3 text-vpn-connected" />
                Down
              </div>
              <span className="font-mono text-sm">
                {stats.downloadSpeed.toFixed(1)} Mbps
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-sm">
                <Upload className="h-3 w-3 text-vpn-secure" />
                Up
              </div>
              <span className="font-mono text-sm">
                {stats.uploadSpeed.toFixed(1)} Mbps
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Total Data */}
      <Card className="bg-gradient-card border-border/50 shadow-card md:col-span-2 lg:col-span-3">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <Activity className="h-4 w-4 text-primary" />
            Data Usage (This Session)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-8">
            <div className="text-center">
              <div className="text-2xl font-mono text-vpn-connected">
                {formatBytes(stats.totalDownload * 1024 * 1024)}
              </div>
              <div className="text-sm text-muted-foreground">Downloaded</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-mono text-vpn-secure">
                {formatBytes(stats.totalUpload * 1024 * 1024)}
              </div>
              <div className="text-sm text-muted-foreground">Uploaded</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}