import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Settings, 
  User, 
  Bell, 
  Lock, 
  Database, 
  Palette,
  Mail,
  Phone,
  Shield,
  Clock,
  Globe,
  Download,
  Upload,
  Trash2,
  Save,
  MessageSquare
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

export const SettingsView = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);

  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
    });
  };

  const handleSavePreferences = () => {
    toast({
      title: "Preferences Saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  const handleExportData = () => {
    toast({
      title: "Export Started",
      description: "Your data export is being prepared and will be available shortly.",
    });
  };

  const handleImportData = () => {
    toast({
      title: "Import Started",
      description: "Data import has been initiated. Please wait for completion.",
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account, preferences, and system configuration
          </p>
        </div>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="profile" className="gap-2">
            <User className="w-4 h-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="w-4 h-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Lock className="w-4 h-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="preferences" className="gap-2">
            <Palette className="w-4 h-4" />
            Preferences
          </TabsTrigger>
          <TabsTrigger value="integrations" className="gap-2">
            <Database className="w-4 h-4" />
            Integrations
          </TabsTrigger>
          <TabsTrigger value="data" className="gap-2">
            <Download className="w-4 h-4" />
            Data
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your personal and professional information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="w-20 h-20">
                  <AvatarImage src="" />
                  <AvatarFallback className="text-lg">SJ</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Button variant="outline">Change Avatar</Button>
                  <p className="text-sm text-muted-foreground">
                    Recommended: Square image, at least 400x400px
                  </p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue="Sarah" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="Johnson" />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" defaultValue="sarah.j@sswireless.com" />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" defaultValue="(214) 555-0123" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="role">Role</Label>
                  <Select defaultValue="owner">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="owner">Owner</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="employee">Employee</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea 
                  id="bio" 
                  placeholder="Tell us about yourself..."
                  defaultValue="Experienced retail manager with over 10 years in wireless telecommunications. Passionate about team development and customer service excellence."
                />
              </div>

              <Button onClick={handleSaveProfile}>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Configure how and when you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <span className="font-medium">Email Notifications</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Receive updates and alerts via email
                    </p>
                  </div>
                  <Switch 
                    checked={emailNotifications} 
                    onCheckedChange={setEmailNotifications}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span className="font-medium">SMS Notifications</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Receive critical alerts via text message
                    </p>
                  </div>
                  <Switch 
                    checked={smsNotifications} 
                    onCheckedChange={setSmsNotifications}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <Bell className="w-4 h-4" />
                      <span className="font-medium">Push Notifications</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Show notifications in your browser
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <h4 className="font-medium">Email Frequency</h4>
                <Select defaultValue="immediate">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediate">Immediate</SelectItem>
                    <SelectItem value="hourly">Hourly Digest</SelectItem>
                    <SelectItem value="daily">Daily Summary</SelectItem>
                    <SelectItem value="weekly">Weekly Report</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <h4 className="font-medium">Alert Types</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Inventory Alerts</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Revenue Anomalies</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">System Issues</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Employee Performance</span>
                    <Switch />
                  </div>
                </div>
              </div>

              <Button onClick={handleSavePreferences}>Save Preferences</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Manage your account security and access controls
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Change Password</h4>
                  <div className="space-y-3">
                    <div className="grid gap-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input id="currentPassword" type="password" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input id="newPassword" type="password" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input id="confirmPassword" type="password" />
                    </div>
                    <Button>Update Password</Button>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-4">Two-Factor Authentication</h4>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <Button variant="outline">Enable 2FA</Button>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-4">Active Sessions</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <div className="font-medium">Current Session</div>
                        <div className="text-sm text-muted-foreground">
                          Chrome on Windows • Dallas, TX
                        </div>
                      </div>
                      <Badge className="bg-green-500">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <div className="font-medium">Mobile App</div>
                        <div className="text-sm text-muted-foreground">
                          iPhone • 2 hours ago
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Revoke</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Display Preferences</CardTitle>
              <CardDescription>
                Customize the appearance and behavior of your dashboard
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <Palette className="w-4 h-4" />
                    <span className="font-medium">Dark Mode</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Switch to dark theme for better low-light viewing
                  </p>
                </div>
                <Switch 
                  checked={isDarkMode} 
                  onCheckedChange={setIsDarkMode}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span className="font-medium">Auto Refresh</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Automatically refresh dashboard data every 5 minutes
                  </p>
                </div>
                <Switch 
                  checked={autoRefresh} 
                  onCheckedChange={setAutoRefresh}
                />
              </div>

              <div className="space-y-2">
                <Label>Time Zone</Label>
                <Select defaultValue="america/chicago">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="america/chicago">Central Time (CT)</SelectItem>
                    <SelectItem value="america/new_york">Eastern Time (ET)</SelectItem>
                    <SelectItem value="america/denver">Mountain Time (MT)</SelectItem>
                    <SelectItem value="america/los_angeles">Pacific Time (PT)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Date Format</Label>
                <Select defaultValue="mm/dd/yyyy">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mm/dd/yyyy">MM/DD/YYYY</SelectItem>
                    <SelectItem value="dd/mm/yyyy">DD/MM/YYYY</SelectItem>
                    <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Currency</Label>
                <Select defaultValue="usd">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="usd">USD ($)</SelectItem>
                    <SelectItem value="eur">EUR (€)</SelectItem>
                    <SelectItem value="gbp">GBP (£)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={handleSavePreferences}>Save Preferences</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Integrations</CardTitle>
              <CardDescription>
                Manage connections to external systems and services
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded">
                  <div className="flex items-center gap-3">
                    <Database className="w-8 h-8" />
                    <div>
                      <div className="font-medium">RT-POS System</div>
                      <div className="text-sm text-muted-foreground">
                        Point of sale data synchronization
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">Offline</Badge>
                    <Button variant="outline">Configure</Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded">
                  <div className="flex items-center gap-3">
                    <Mail className="w-8 h-8" />
                    <div>
                      <div className="font-medium">Email Service</div>
                      <div className="text-sm text-muted-foreground">
                        SMTP configuration for notifications
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-500">Connected</Badge>
                    <Button variant="outline">Settings</Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="w-8 h-8" />
                    <div>
                      <div className="font-medium">Slack Integration</div>
                      <div className="text-sm text-muted-foreground">
                        Send alerts to Slack channels
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Not Connected</Badge>
                    <Button variant="outline">Connect</Button>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h4 className="font-medium mb-4">API Configuration</h4>
                <div className="space-y-3">
                  <div className="grid gap-2">
                    <Label htmlFor="apiKey">API Key</Label>
                    <div className="flex gap-2">
                      <Input id="apiKey" type="password" defaultValue="sk_live_..." />
                      <Button variant="outline">Regenerate</Button>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="webhook">Webhook URL</Label>
                    <Input id="webhook" defaultValue="https://api.sswireless.com/webhooks" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="data" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Data Management</CardTitle>
              <CardDescription>
                Export, import, and manage your data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-4">Export Data</h4>
                  <div className="space-y-3">
                    <Button variant="outline" onClick={handleExportData} className="w-full justify-start gap-2">
                      <Download className="w-4 h-4" />
                      Export All Data (CSV)
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <Download className="w-4 h-4" />
                      Export Sales Reports
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <Download className="w-4 h-4" />
                      Export Inventory Data
                    </Button>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-4">Import Data</h4>
                  <div className="space-y-3">
                    <Button variant="outline" onClick={handleImportData} className="w-full justify-start gap-2">
                      <Upload className="w-4 h-4" />
                      Import from CSV
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <Upload className="w-4 h-4" />
                      Import from Excel
                    </Button>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-4">Data Backup</h4>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Last backup: January 15, 2024 at 2:30 AM
                      </p>
                    </div>
                    <Button variant="outline">Backup Now</Button>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-4 text-red-600">Danger Zone</h4>
                  <div className="space-y-3">
                    <Button variant="destructive" className="w-full justify-start gap-2">
                      <Trash2 className="w-4 h-4" />
                      Clear All Data
                    </Button>
                    <Button variant="destructive" className="w-full justify-start gap-2">
                      <Trash2 className="w-4 h-4" />
                      Delete Account
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};