import KBar from '@/components/kbar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import AppSidebar from './app-sidebar';
import Header from './header';

const RootLayout = () => {
  const [defaultOpen, setDefaultOpen] = useState(false);

  // Check cookie for sidebar state on mount
  useEffect(() => {
    const sidebarState = Cookies.get('sidebar:state') === 'true';
    setDefaultOpen(sidebarState);
  }, []);

  return (
    <KBar>
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar />
        <SidebarInset>
          <Header />
          {/* page main content */}
          <Outlet />
          {/* page main content ends */}
        </SidebarInset>
      </SidebarProvider>
    </KBar>
  );
};

export default RootLayout;
