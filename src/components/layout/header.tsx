import { SidebarTrigger } from '@/components/ui/sidebar';
import { InternStarLogo } from '@/components/icons/logo';
import { Button } from '@/components/ui/button';
import { UserCircle } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 shadow-sm">
      <div className="md:hidden">
        <SidebarTrigger />
      </div>
      <div className="flex items-center gap-2">
        <InternStarLogo className="h-6 w-auto hidden md:block" />
      </div>
      <div className="ml-auto flex items-center gap-4">
        {/* Placeholder for theme toggle or other actions */}
        <Button variant="ghost" size="icon" className="rounded-full">
          <UserCircle className="h-5 w-5" />
          <span className="sr-only">User Profile</span>
        </Button>
      </div>
    </header>
  );
}
