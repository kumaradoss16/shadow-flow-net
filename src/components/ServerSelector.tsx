import { useState } from "react";
import { MapPin, Wifi, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Server {
  id: string;
  name: string;
  country: string;
  city: string;
  flag: string;
  load: number;
  ping: number;
  users: number;
}

const servers: Server[] = [
  { id: "us-east", name: "US East", country: "United States", city: "New York", flag: "🇺🇸", load: 23, ping: 45, users: 1234 },
  { id: "us-west", name: "US West", country: "United States", city: "Los Angeles", flag: "🇺🇸", load: 67, ping: 32, users: 2456 },
  { id: "uk", name: "United Kingdom", country: "United Kingdom", city: "London", flag: "🇬🇧", load: 45, ping: 78, users: 890 },
  { id: "germany", name: "Germany", country: "Germany", city: "Frankfurt", flag: "🇩🇪", load: 34, ping: 56, users: 1567 },
  { id: "japan", name: "Japan", country: "Japan", city: "Tokyo", flag: "🇯🇵", load: 78, ping: 123, users: 987 },
  { id: "australia", name: "Australia", country: "Australia", city: "Sydney", flag: "🇦🇺", load: 56, ping: 167, users: 654 },
];

interface ServerSelectorProps {
  selectedServer: string;
  onServerChange: (serverId: string) => void;
  isConnected: boolean;
}

export function ServerSelector({ selectedServer, onServerChange, isConnected }: ServerSelectorProps) {
  const [showAll, setShowAll] = useState(false);
  
  const displayedServers = showAll ? servers : servers.slice(0, 3);
  const selectedServerData = servers.find(s => s.id === selectedServer);

  const getLoadColor = (load: number) => {
    if (load < 40) return "text-vpn-connected";
    if (load < 70) return "text-vpn-connecting";
    return "text-vpn-disconnected";
  };

  const getLoadBadgeVariant = (load: number) => {
    if (load < 40) return "default";
    if (load < 70) return "secondary";
    return "destructive";
  };

  return (
    <Card className="bg-gradient-card border-border/50 shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          Server Locations
        </CardTitle>
        {selectedServerData && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="text-lg">{selectedServerData.flag}</span>
            <span>Connected to {selectedServerData.name}</span>
            {isConnected && <Badge variant="default" className="bg-vpn-connected">Active</Badge>}
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-3">
        {displayedServers.map((server) => (
          <div
            key={server.id}
            className={`flex items-center justify-between p-3 rounded-lg border transition-all cursor-pointer hover:bg-secondary/50 ${
              selectedServer === server.id 
                ? "border-primary bg-primary/10" 
                : "border-border/50"
            }`}
            onClick={() => onServerChange(server.id)}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{server.flag}</span>
              <div>
                <div className="font-medium">{server.name}</div>
                <div className="text-sm text-muted-foreground">{server.city}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Wifi className="h-4 w-4" />
                <span>{server.ping}ms</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{server.users}</span>
              </div>
              <Badge variant={getLoadBadgeVariant(server.load)}>
                {server.load}% load
              </Badge>
            </div>
          </div>
        ))}
        
        <Button
          variant="ghost"
          onClick={() => setShowAll(!showAll)}
          className="w-full mt-2"
        >
          {showAll ? "Show Less" : `Show All ${servers.length} Servers`}
        </Button>
      </CardContent>
    </Card>
  );
}