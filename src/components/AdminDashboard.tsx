import { useState } from "react";
import { BarChart3, Users, Server, Activity, Globe, Shield, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export function AdminDashboard() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("24h");

  const serverStats = [
    { name: "US East (NYC)", status: "online", load: 23, users: 1234, uptime: "99.9%" },
    { name: "US West (LA)", status: "online", load: 67, users: 2456, uptime: "99.8%" },
    { name: "UK (London)", status: "online", load: 45, users: 890, uptime: "100%" },
    { name: "Germany (Frankfurt)", status: "maintenance", load: 0, users: 0, uptime: "99.5%" },
    { name: "Japan (Tokyo)", status: "online", load: 78, users: 987, uptime: "99.7%" },
    { name: "Australia (Sydney)", status: "online", load: 56, users: 654, uptime: "99.9%" },
  ];

  const recentActivity = [
    { time: "2 min ago", event: "Server maintenance completed", server: "Germany (Frankfurt)", type: "info" },
    { time: "15 min ago", event: "High load detected", server: "Japan (Tokyo)", type: "warning" },
    { time: "1 hour ago", event: "New user registered", server: "Global", type: "success" },
    { time: "2 hours ago", event: "Security scan completed", server: "All servers", type: "info" },
    { time: "4 hours ago", event: "Server capacity increased", server: "US West (LA)", type: "success" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online": return "bg-vpn-connected";
      case "maintenance": return "bg-vpn-connecting";
      case "offline": return "bg-vpn-disconnected";
      default: return "bg-muted";
    }
  };

  const getLoadColor = (load: number) => {
    if (load < 40) return "text-vpn-connected";
    if (load < 70) return "text-vpn-connecting";
    return "text-vpn-disconnected";
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "warning": return <AlertCircle className="h-4 w-4 text-vpn-connecting" />;
      case "success": return <Shield className="h-4 w-4 text-vpn-connected" />;
      default: return <Activity className="h-4 w-4 text-primary" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-card border-border/50 shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Server className="h-4 w-4 text-primary" />
              Active Servers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5/6</div>
            <div className="text-sm text-muted-foreground">1 in maintenance</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border/50 shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              Connected Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6,221</div>
            <div className="text-sm text-vpn-connected">+5.2% from yesterday</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border/50 shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Globe className="h-4 w-4 text-primary" />
              Total Bandwidth
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.2TB</div>
            <div className="text-sm text-muted-foreground">Last 24 hours</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border/50 shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-primary" />
              Avg. Uptime
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99.8%</div>
            <div className="text-sm text-vpn-connected">Above target</div>
          </CardContent>
        </Card>
      </div>

      {/* Server Status */}
      <Card className="bg-gradient-card border-border/50 shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="h-5 w-5 text-primary" />
            Server Status & Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {serverStats.map((server) => (
              <div key={server.name} className="flex items-center justify-between p-3 rounded-lg border border-border/50">
                <div className="flex items-center gap-3">
                  <div className={`h-3 w-3 rounded-full ${getStatusColor(server.status)}`} />
                  <div>
                    <div className="font-medium">{server.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {server.users.toLocaleString()} users • {server.uptime} uptime
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className={`text-sm font-medium ${getLoadColor(server.load)}`}>
                      {server.load}% load
                    </div>
                    <Progress value={server.load} className="w-20 h-2 mt-1" />
                  </div>
                  <Badge variant={server.status === "online" ? "default" : "secondary"}>
                    {server.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Activity Feed & Quick Actions */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="bg-gradient-card border-border/50 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-2 rounded border border-border/30">
                  {getActivityIcon(activity.type)}
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium">{activity.event}</div>
                    <div className="text-xs text-muted-foreground">
                      {activity.server} • {activity.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border/50 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline">
              <Server className="h-4 w-4 mr-2" />
              Add New Server
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Users className="h-4 w-4 mr-2" />
              Manage User Sessions
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Shield className="h-4 w-4 mr-2" />
              Security Scan
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <BarChart3 className="h-4 w-4 mr-2" />
              Generate Reports
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Globe className="h-4 w-4 mr-2" />
              Update Global Config
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}