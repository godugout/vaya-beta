
import { ReactNode } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { AdminSidebar } from "./AdminSidebar";

interface AdminLayoutProps {
  children: ReactNode;
  title?: string;
}

export function AdminLayout({ children, title }: AdminLayoutProps) {
  return (
    <MainLayout>
      <div className="flex min-h-[calc(100vh-64px)]">
        <AdminSidebar />
        <div className="flex-1 p-6">
          {title && (
            <h1 className="text-2xl font-bold mb-6">{title}</h1>
          )}
          {children}
        </div>
      </div>
    </MainLayout>
  );
}
