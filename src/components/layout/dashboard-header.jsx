"use client";
import { usePathname, useRouter } from "next/navigation";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Button } from "../ui/button";
import { User, Settings as SettingsIcon, LogOut as LogOutIcon } from "lucide-react";
import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { authAPI } from "@/lib/api/auth";

const titles = new Map([
  ["/dashboard", "Dashboard"],
  ["/transactions", "Transactions"],
  ["/categories", "Categories"],
  ["/reports", "Reports"],
  ["/forecast", "AI Forecast"],
  ["/inventory-insights", "AI Inventory Insights"],
  ["/email-reports", "Email Reports"],
  ["/history", "History"],
  ["/settings", "Settings"],
]);

export function DashboardHeader() {
  const pathname = usePathname();
  const title = titles.get(pathname) || "Dashboard";
  return (
    <header className="flex items-center h-16 gap-2 px-4 border-b shrink-0">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="h-4 mr-2" />
      <div className="flex items-center gap-2">
        <h1 className="text-lg font-semibold">{title}</h1>
      </div>
      <AccountDropdownMenu />
    </header>
  );
}

function AccountDropdownMenu() {
  const router = useRouter();

  const handleLogout = async () => {
    await authAPI.logout();
    router.push("/login");
  };

  return (
    <div className="ml-auto">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <User className="mr-2 size-4" />
            Account
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link href="/settings">
            <DropdownMenuItem className="cursor-pointer">
              <SettingsIcon className="mr-2 size-4" />
              Settings
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
            <LogOutIcon className="mr-2 size-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default DashboardHeader;


