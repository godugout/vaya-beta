
import { useState, useEffect } from 'react';
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, 
  Activity, 
  Users, 
  MessageSquare, 
  ArrowUpRight,
  FileText,
  Image,
  HardDrive,
  Headphones
} from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export default function Admin() {
  const [stats, setStats] = useState({
    users: 0,
    families: 0,
    stories: 0,
    photos: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      setLoading(true);
      try {
        // Get users count
        const { count: usersCount, error: usersError } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true });

        // Get families count
        const { count: familiesCount, error: familiesError } = await supabase
          .from('families')
          .select('*', { count: 'exact', head: true });

        // Get stories count
        const { count: storiesCount, error: storiesError } = await supabase
          .from('stories')
          .select('*', { count: 'exact', head: true });

        // Get photos count
        const { count: photosCount, error: photosError } = await supabase
          .from('photos')
          .select('*', { count: 'exact', head: true });

        if (usersError || familiesError || storiesError || photosError) {
          console.error("Error fetching stats", { usersError, familiesError, storiesError, photosError });
        } else {
          setStats({
            users: usersCount || 0,
            families: familiesCount || 0,
            stories: storiesCount || 0,
            photos: photosCount || 0
          });
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  return (
    <AdminLayout title="Admin Dashboard">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard 
          title="Total Users"
          value={loading ? "Loading..." : stats.users.toString()}
          description="Active user accounts"
          icon={Users}
          trend="+12% from last month"
          href="/admin/users"
        />
        <StatsCard 
          title="Total Families"
          value={loading ? "Loading..." : stats.families.toString()}
          description="Created family trees"
          icon={HardDrive}
          trend="+6% from last month"
          href="/admin/families"
        />
        <StatsCard 
          title="Stories"
          value={loading ? "Loading..." : stats.stories.toString()}
          description="Recorded stories"
          icon={FileText}
          trend="+18% from last month"
          href="/admin/stories"
        />
        <StatsCard 
          title="Photos"
          value={loading ? "Loading..." : stats.photos.toString()}
          description="Uploaded photos"
          icon={Image}
          trend="+24% from last month"
          href="/admin/media"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 mt-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Recent Activity</span>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardTitle>
            <CardDescription>User activity across the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="logins">Logins</TabsTrigger>
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="families">Families</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="pt-4">
                <ActivityList />
              </TabsContent>
              <TabsContent value="logins" className="pt-4">
                <ActivityList type="login" />
              </TabsContent>
              <TabsContent value="content" className="pt-4">
                <ActivityList type="content" />
              </TabsContent>
              <TabsContent value="families" className="pt-4">
                <ActivityList type="family" />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>System Usage</span>
              <BarChart className="h-4 w-4 text-muted-foreground" />
            </CardTitle>
            <CardDescription>Resource utilization overview</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="h-[300px] flex items-center justify-center">
                <div className="text-muted-foreground">Loading usage data...</div>
              </div>
            ) : (
              <div className="space-y-8">
                <UsageMetric 
                  label="Storage" 
                  current={stats.photos * 2.5} 
                  max={1000} 
                  unit="MB" 
                />
                <UsageMetric 
                  label="API Calls" 
                  current={2490} 
                  max={10000} 
                  unit="calls" 
                />
                <UsageMetric 
                  label="Bandwidth" 
                  current={4.2} 
                  max={10} 
                  unit="GB" 
                />
                <UsageMetric 
                  label="User Registrations" 
                  current={stats.users} 
                  max={100} 
                  unit="users" 
                />
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Content</CardTitle>
            <CardDescription>Latest uploads and entries</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ContentList />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>New Users</CardTitle>
            <CardDescription>Recently registered users</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <UserList />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Messages</CardTitle>
            <CardDescription>Alerts and notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <SystemMessagesList />
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}

function StatsCard({ title, value, description, icon: Icon, trend, href }: {
  title: string;
  value: string;
  description: string;
  icon: React.ElementType;
  trend?: string;
  href?: string;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
        {trend && (
          <div className="mt-2 flex items-center text-xs text-green-500">
            <ArrowUpRight className="mr-1 h-3 w-3" />
            {trend}
          </div>
        )}
        {href && (
          <Link 
            to={href}
            className="mt-3 text-xs text-blue-500 hover:underline flex items-center"
          >
            View details
            <ArrowUpRight className="ml-1 h-3 w-3" />
          </Link>
        )}
      </CardContent>
    </Card>
  );
}

function UsageMetric({ label, current, max, unit }: {
  label: string;
  current: number;
  max: number;
  unit: string;
}) {
  const percentage = Math.min(100, Math.round((current / max) * 100));
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-sm text-muted-foreground">
          {current} / {max} {unit}
        </span>
      </div>
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <div 
          className={`h-2 rounded-full ${
            percentage > 90 ? 'bg-red-500' : 
            percentage > 75 ? 'bg-amber-500' : 
            'bg-green-500'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

function ActivityList({ type }: { type?: 'login' | 'content' | 'family' }) {
  // Mock activity data
  const activities = [
    { id: 1, user: "John Smith", action: "logged in", timestamp: "2 minutes ago", type: 'login' },
    { id: 2, user: "Maria Garcia", action: "created a new family", timestamp: "15 minutes ago", type: 'family' },
    { id: 3, user: "Ahmed Khan", action: "uploaded 5 photos", timestamp: "1 hour ago", type: 'content' },
    { id: 4, user: "Sarah Johnson", action: "added a story", timestamp: "2 hours ago", type: 'content' },
    { id: 5, user: "Li Wei", action: "updated family tree", timestamp: "3 hours ago", type: 'family' },
    { id: 6, user: "Anna Kowalski", action: "logged in", timestamp: "4 hours ago", type: 'login' },
  ];

  const filteredActivities = type 
    ? activities.filter(activity => activity.type === type)
    : activities;

  if (filteredActivities.length === 0) {
    return <div className="text-muted-foreground text-sm">No recent activity</div>;
  }

  return (
    <div className="space-y-4">
      {filteredActivities.map((activity) => (
        <div key={activity.id} className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
              {activity.type === 'login' && <Users className="h-4 w-4 text-primary" />}
              {activity.type === 'content' && <FileText className="h-4 w-4 text-primary" />}
              {activity.type === 'family' && <HardDrive className="h-4 w-4 text-primary" />}
            </div>
            <div>
              <p className="text-sm font-medium">{activity.user}</p>
              <p className="text-xs text-muted-foreground">{activity.action}</p>
            </div>
          </div>
          <div className="text-xs text-muted-foreground">{activity.timestamp}</div>
        </div>
      ))}
    </div>
  );
}

function ContentList() {
  // Mock content data
  const content = [
    { id: 1, title: "Summer Vacation Photos", type: "Photo Album", user: "Emma Wilson", timestamp: "2 hours ago" },
    { id: 2, title: "Grandfather's Stories", type: "Audio Recording", user: "James Lee", timestamp: "Yesterday" },
    { id: 3, title: "Family Cookbook", type: "Document", user: "Sofia Martinez", timestamp: "2 days ago" },
    { id: 4, title: "Wedding Anniversary", type: "Video", user: "Daniel Brown", timestamp: "1 week ago" },
  ];

  return (
    <div className="space-y-4">
      {content.map((item) => (
        <div key={item.id} className="flex items-center">
          <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center mr-3">
            {item.type.includes("Photo") && <Image className="h-5 w-5 text-primary" />}
            {item.type.includes("Audio") && <Headphones className="h-5 w-5 text-primary" />}
            {item.type.includes("Document") && <FileText className="h-5 w-5 text-primary" />}
            {item.type.includes("Video") && <FileText className="h-5 w-5 text-primary" />}
          </div>
          <div>
            <p className="text-sm font-medium">{item.title}</p>
            <p className="text-xs text-muted-foreground">
              {item.type} · {item.user} · {item.timestamp}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function UserList() {
  // Mock user data
  const users = [
    { id: 1, name: "Alex Johnson", email: "alex.j@example.com", joined: "Today" },
    { id: 2, name: "Maya Patel", email: "maya.p@example.com", joined: "Yesterday" },
    { id: 3, name: "Carlos Rodriguez", email: "carlos.r@example.com", joined: "3 days ago" },
    { id: 4, name: "Zoe Williams", email: "zoe.w@example.com", joined: "1 week ago" },
  ];

  return (
    <div className="space-y-4">
      {users.map((user) => (
        <div key={user.id} className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
            <span className="text-primary font-medium">{user.name.charAt(0)}</span>
          </div>
          <div>
            <p className="text-sm font-medium">{user.name}</p>
            <p className="text-xs text-muted-foreground">
              {user.email} · Joined {user.joined}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function SystemMessagesList() {
  // Mock system message data
  const messages = [
    { id: 1, title: "System Update", description: "New features deployed successfully", timestamp: "1 hour ago", type: "success" },
    { id: 2, title: "Storage Alert", description: "Media storage approaching 75% capacity", timestamp: "5 hours ago", type: "warning" },
    { id: 3, title: "Backup Complete", description: "Weekly database backup completed", timestamp: "Yesterday", type: "info" },
    { id: 4, title: "API Rate Limiting", description: "Unusual number of API calls detected", timestamp: "2 days ago", type: "warning" },
  ];

  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <div key={message.id} className="flex items-start">
          <div className={`w-10 h-10 rounded flex items-center justify-center mr-3 ${
            message.type === 'success' ? 'bg-green-100 text-green-600' : 
            message.type === 'warning' ? 'bg-amber-100 text-amber-600' : 
            'bg-blue-100 text-blue-600'
          }`}>
            <MessageSquare className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-medium">{message.title}</p>
            <p className="text-xs">{message.description}</p>
            <p className="text-xs text-muted-foreground mt-1">{message.timestamp}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
