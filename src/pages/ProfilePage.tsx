
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, UserRound, Settings, LogOut } from 'lucide-react';

export const ProfilePage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Link to="/" className="mr-2">
          <Button variant="ghost" size="icon">
            <ArrowLeft size={20} />
          </Button>
        </Link>
        <h1 className="text-xl font-bold">My Profile</h1>
      </div>
      
      <div className="flex flex-col items-center mb-6">
        <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-4">
          <UserRound size={48} className="text-gray-400" />
        </div>
        <h2 className="text-xl font-medium">John Smith</h2>
        <p className="text-gray-500">john.smith@example.com</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>My Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-3 border border-gray-200 rounded-md">
              <div className="text-2xl font-bold">12</div>
              <div className="text-sm text-gray-500">Stories Recorded</div>
            </div>
            <div className="p-3 border border-gray-200 rounded-md">
              <div className="text-2xl font-bold">8</div>
              <div className="text-sm text-gray-500">Family Members</div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="space-y-2">
        <Button variant="outline" className="w-full justify-start">
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </Button>
        <Button variant="outline" className="w-full justify-start">
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>
      
      <div className="pt-6 text-center text-sm text-gray-500">
        <p>Vaya v1.0.0</p>
        <p>© 2023 Vaya Family Stories</p>
      </div>
    </div>
  );
};
