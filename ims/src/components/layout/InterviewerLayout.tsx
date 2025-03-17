
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  ClipboardCheck,
  FileText, 
  Menu, 
  X,
  Home, 
  MessageSquare, 
  BriefcaseBusiness,
  Users,
  Settings,
  LogOut,
  Palette
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
import { useAuth } from "../../context/AuthContext";
import { useState } from 'react';
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { useIsMobile } from "@/hooks/use-mobile";

interface InterviewerLayoutProps {
  children: React.ReactNode;
}

const InterviewerLayoutContent = ({ children }: InterviewerLayoutProps) => {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const isMobile = useIsMobile();
  
  const navigation = [
    { name: 'Dashboard', href: '/interviewer/dashboard', icon: Home, current: location.pathname === '/interviewer/dashboard' },
    { name: 'My Schedule', href: '/interviewer/schedule', icon: Calendar, current: location.pathname.includes('/interviewer/schedule') },
    { name: 'Candidates', href: '/interviewer/candidates', icon: Users, current: location.pathname.includes('/interviewer/candidates') },
    { name: 'Feedback Forms', href: '/interviewer/feedback', icon: ClipboardCheck, current: location.pathname.includes('/interviewer/feedback') },
    { name: 'Settings', href: '/interviewer/settings', icon: Settings, current: location.pathname.includes('/interviewer/settings') },
  ];

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow pt-5 overflow-y-auto border-r border-border bg-card">
          <div className="flex items-center flex-shrink-0 px-4">
            <Link to="/" className="flex items-center">
              <BriefcaseBusiness className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold">Interviewer Portal</span>
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
                      ? 'bg-accent text-accent-foreground'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  <item.icon
                    className={`mr-3 flex-shrink-0 h-5 w-5 ${
                      item.current
                        ? 'text-accent-foreground'
                        : 'text-muted-foreground group-hover:text-foreground'
                    }`}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-border p-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center w-full text-left">
                  <Avatar className="h-8 w-8 mr-3">
                    <AvatarImage src={user?.avatarUrl} />
                    <AvatarFallback>{user?.name.charAt(0) || 'I'}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{user?.name}</span>
                    <span className="text-xs text-muted-foreground">Interviewer</span>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to="/interviewer/profile" className="flex w-full">
                    <ClipboardCheck className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/interviewer/settings" className="flex w-full">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
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
              <span className="ml-2 text-xl font-bold">Interviewer Portal</span>
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
                    ? 'bg-accent text-accent-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
                onClick={() => setOpen(false)}
              >
                <item.icon
                  className={`mr-3 flex-shrink-0 h-5 w-5 ${
                    item.current
                      ? 'text-accent-foreground'
                      : 'text-muted-foreground group-hover:text-foreground'
                  }`}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="flex-shrink-0 flex border-t border-border p-4">
            <div className="flex items-center">
              <Avatar className="h-8 w-8 mr-3">
                <AvatarImage src={user?.avatarUrl} />
                <AvatarFallback>{user?.name.charAt(0) || 'I'}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{user?.name}</span>
                <span className="text-xs text-muted-foreground">Interviewer</span>
              </div>
              <Button variant="ghost" size="icon" className="ml-auto" onClick={logout}>
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Content area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="w-full">
          <div className="relative z-10 flex-shrink-0 h-16 bg-card border-b border-border flex">
            <div className="flex-1 flex justify-between px-4 md:px-8">
              <div className="flex items-center md:hidden">
                {/* Mobile logo placeholder for spacing */}
                <div className="h-8 w-8"></div>
              </div>
              <div className="ml-auto flex items-center md:ml-6">
                <Button variant="outline" size="sm" className="hidden md:flex">
                  <ClipboardCheck className="mr-2 h-4 w-4" />
                  Interviewer Mode
                </Button>
                <Link to="/interviewer/settings">
                  <Button variant="ghost" size="icon" className="ml-2">
                    <Palette className="h-5 w-5" />
                  </Button>
                </Link>
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

// Wrap with ThemeProvider
const InterviewerLayout = ({ children }: InterviewerLayoutProps) => {
  return (
    <ThemeProvider>
      <InterviewerLayoutContent>{children}</InterviewerLayoutContent>
    </ThemeProvider>
  );
};

export default InterviewerLayout;
