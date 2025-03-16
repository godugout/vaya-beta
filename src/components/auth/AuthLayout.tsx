
import { ReactNode } from "react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MainLayout } from "@/components/layout/MainLayout";

interface AuthLayoutProps {
  children: ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <MainLayout>
      <div className="flex justify-center items-center min-h-[80vh]">
        <div className="w-full max-w-md">
          <Card className="border border-gray-300 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Welcome</CardTitle>
              <CardDescription className="text-center">
                Sign in to access your family space
              </CardDescription>
            </CardHeader>
            {children}
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};
