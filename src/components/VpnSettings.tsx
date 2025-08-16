import { useState } from "react";
import { Settings, Shield, Zap, AlertTriangle, Network, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function VpnSettings() {
  const [settings, setSettings] = useState({
    autoConnect: false,
    killSwitch: true,
    dnsLeakProtection: true,
    noLogging: true,
    protocol: "wireguard",
    encryption: "aes256",
    autoReconnect: true,
    lanAccess: false,
  });

  const updateSetting = (key: string, value: boolean | string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-card border-border/50 shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-primary" />
            VPN Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Connection Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Network className="h-4 w-4 text-primary" />
              Connection
            </h3>
            
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-connect">Auto-connect on startup</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically connect when the app starts
                  </p>
                </div>
                <Switch
                  id="auto-connect"
                  checked={settings.autoConnect}
                  onCheckedChange={(checked) => updateSetting("autoConnect", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-reconnect">Auto-reconnect</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically reconnect if connection is lost
                  </p>
                </div>
                <Switch
                  id="auto-reconnect"
                  checked={settings.autoReconnect}
                  onCheckedChange={(checked) => updateSetting("autoReconnect", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="lan-access">Allow LAN access</Label>
                  <p className="text-sm text-muted-foreground">
                    Access local network devices while connected
                  </p>
                </div>
                <Switch
                  id="lan-access"
                  checked={settings.lanAccess}
                  onCheckedChange={(checked) => updateSetting("lanAccess", checked)}
                />
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Shield className="h-4 w-4 text-vpn-secure" />
              Security
            </h3>
            
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="kill-switch" className="flex items-center gap-2">
                    Kill Switch
                    <Badge variant="default" className="bg-vpn-connected text-xs">
                      Recommended
                    </Badge>
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Block internet if VPN disconnects unexpectedly
                  </p>
                </div>
                <Switch
                  id="kill-switch"
                  checked={settings.killSwitch}
                  onCheckedChange={(checked) => updateSetting("killSwitch", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="dns-protection">DNS Leak Protection</Label>
                  <p className="text-sm text-muted-foreground">
                    Prevent DNS requests from bypassing the VPN
                  </p>
                </div>
                <Switch
                  id="dns-protection"
                  checked={settings.dnsLeakProtection}
                  onCheckedChange={(checked) => updateSetting("dnsLeakProtection", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="no-logging" className="flex items-center gap-2">
                    No-log Policy
                    <Badge variant="default" className="bg-vpn-connected text-xs">
                      Active
                    </Badge>
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    No connection logs or activity tracking
                  </p>
                </div>
                <Switch
                  id="no-logging"
                  checked={settings.noLogging}
                  onCheckedChange={(checked) => updateSetting("noLogging", checked)}
                />
              </div>
            </div>
          </div>

          {/* Protocol Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Zap className="h-4 w-4 text-vpn-connecting" />
              Protocol & Encryption
            </h3>
            
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label>VPN Protocol</Label>
                <Select value={settings.protocol} onValueChange={(value) => updateSetting("protocol", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="wireguard">
                      <div className="flex items-center gap-2">
                        WireGuard
                        <Badge variant="secondary" className="text-xs">Fastest</Badge>
                      </div>
                    </SelectItem>
                    <SelectItem value="openvpn-udp">OpenVPN (UDP)</SelectItem>
                    <SelectItem value="openvpn-tcp">OpenVPN (TCP)</SelectItem>
                    <SelectItem value="ikev2">IKEv2</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  WireGuard offers the best balance of speed and security
                </p>
              </div>

              <div className="space-y-2">
                <Label>Encryption Level</Label>
                <Select value={settings.encryption} onValueChange={(value) => updateSetting("encryption", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="aes256">
                      <div className="flex items-center gap-2">
                        AES-256
                        <Badge variant="secondary" className="text-xs">Military Grade</Badge>
                      </div>
                    </SelectItem>
                    <SelectItem value="aes128">AES-128</SelectItem>
                    <SelectItem value="chacha20">ChaCha20</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Advanced Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-vpn-connecting" />
              Advanced
            </h3>
            
            <div className="p-4 bg-secondary/50 rounded-lg border border-border/50">
              <div className="flex items-start gap-3">
                <Eye className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div className="space-y-2">
                  <h4 className="font-medium">Privacy Mode</h4>
                  <p className="text-sm text-muted-foreground">
                    All privacy features are enabled by default. This includes no-log policy, 
                    DNS leak protection, and secure encryption protocols.
                  </p>
                  <Button variant="outline" size="sm">
                    View Privacy Policy
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}