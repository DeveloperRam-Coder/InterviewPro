
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  Users, 
  FileText, 
  BarChart2, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Home, 
  MessageSquare, 
  BriefcaseBusiness 
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();
  
  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home, current: location.pathname === '/dashboard' },
    { name: 'Interviews', href: '/interviews', icon: Calendar, current: location.pathname.includes('/interviews') },
    { name: 'Candidates', href: '/candidates', icon: Users, current: location.pathname.includes('/candidates') },
    { name: 'Feedback', href: '/feedback', icon: MessageSquare, current: location.pathname.includes('/feedback') },
    { name: 'Offers', href: '/offers', icon: BriefcaseBusiness, current: location.pathname.includes('/offers') },
    { name: 'Reports', href: '/reports', icon: BarChart2, current: location.pathname.includes('/reports') },
  ];

  const userNavigation = [
    { name: 'Your Profile', href: '/profile' },
    { name: 'Settings', href: '/settings' },
    { name: 'Sign out', href: '/' },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Desktop sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow pt-5 overflow-y-auto border-r border-gray-200 bg-white">
          <div className="flex items-center flex-shrink-0 px-4">
            <Link to="/" className="flex items-center">
              <BriefcaseBusiness className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold">InterviewPro</span>
            </Link>
          </div>
          <div className="mt-5 flex-grow flex flex-col">
            <nav className="flex-1 px-2 pb-4 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    item.current
                      ? 'bg-gray-100 text-primary'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <item.icon
                    className={`mr-3 flex-shrink-0 h-5 w-5 ${
                      item.current
                        ? 'text-primary'
                        : 'text-gray-400 group-hover:text-gray-500'
                    }`}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center w-full text-left">
                  <Avatar className="h-8 w-8 mr-3">
                    <AvatarImage src="https://ui-avatars.com/api/?name=John+Doe" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-700">John Doe</span>
                    <span className="text-xs text-gray-500">HR Manager</span>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to="/profile" className="flex w-full">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/settings" className="flex w-full">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to="/" className="flex w-full">Sign out</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="outline" size="icon" className="fixed left-4 top-4 z-40">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 pt-12">
          <div className="flex items-center justify-between pb-4">
            <Link to="/" className="flex items-center" onClick={() => setOpen(false)}>
              <BriefcaseBusiness className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold">InterviewPro</span>
            </Link>
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)} className="absolute right-4 top-4">
              <X className="h-6 w-6" />
            </Button>
          </div>
          <nav className="flex-1 px-2 pb-4 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`group flex items-center px-2 py-3 text-sm font-medium rounded-md ${
                  item.current
                    ? 'bg-gray-100 text-primary'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
                onClick={() => setOpen(false)}
              >
                <item.icon
                  className={`mr-3 flex-shrink-0 h-5 w-5 ${
                    item.current
                      ? 'text-primary'
                      : 'text-gray-400 group-hover:text-gray-500'
                  }`}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <div className="flex items-center">
              <Avatar className="h-8 w-8 mr-3">
                <AvatarImage src="https://ui-avatars.com/api/?name=John+Doe" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-700">John Doe</span>
                <span className="text-xs text-gray-500">HR Manager</span>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Content area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="w-full">
          <div className="relative z-10 flex-shrink-0 h-16 bg-white border-b border-gray-200 flex">
            <div className="flex-1 flex justify-between px-4 md:px-8">
              <div className="flex items-center md:hidden">
                {/* Mobile logo placeholder for spacing */}
                <div className="h-8 w-8"></div>
              </div>
              <div className="ml-4 flex items-center md:ml-0">
                {/* Search */}
              </div>
              <div className="ml-4 flex items-center md:ml-6">
                {/* Profile dropdown */}
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
