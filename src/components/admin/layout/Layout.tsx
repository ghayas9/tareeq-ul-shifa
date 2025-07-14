// import type { ReactNode } from 'react';
// import Sidebar from './SideBar';
// import Header from './Header';
// import { useAppSelector } from '@/redux/store/store';

// interface LayoutProps {
//   children: ReactNode;
// }

// export default function Layout({ children }: LayoutProps) {
//   return (
//     <div className="flex h-screen">
//       {/* Sidebar ends first */}
//       <Sidebar />
//       <div className="flex flex-col flex-1 w-full min-w-0">
//         {/* Header starts after Sidebar */}
//         <Header />
//         <main className="flex-1 overflow-auto custom-scrollbar">{children}</main>
//       </div>
//     </div>
//   );
// }


// import { useState } from 'react';
// import type { ReactNode } from 'react';
// import Sidebar from './SideBar';
// import Header from './Header';
// import { useAppSelector } from '@/redux/store/store';

// interface LayoutProps {
//   children: ReactNode;
// }

// export default function Layout({ children }: LayoutProps) {
//   const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

//   const toggleMobileSidebar = () => {
//     setIsMobileSidebarOpen(!isMobileSidebarOpen);
//   };

//   return (
//     <div className="flex h-screen">
//       {/* Sidebar */}
//       <Sidebar 
//         isMobileOpen={isMobileSidebarOpen}
//         setIsMobileOpen={setIsMobileSidebarOpen}
//       />
      
//       <div className="flex flex-col flex-1 w-full min-w-0">
//         {/* Header with hamburger menu */}
//         <Header toggleMobileSidebar={toggleMobileSidebar} />
        
//         {/* Main content */}
//         <main className="flex-1 overflow-auto custom-scrollbar">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import Sidebar from './SideBar';
import Header from './Header';
import { useAppSelector } from '@/redux/store/store';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Handle body scroll lock when mobile sidebar is open
  useEffect(() => {
    if (isMobileSidebarOpen) {
      // Lock the body scroll when sidebar is open
      document.body.style.overflow = 'hidden';
    } else {
      // Restore scrolling when sidebar is closed
      document.body.style.overflow = 'auto';
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileSidebarOpen]);

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar 
        isMobileOpen={isMobileSidebarOpen}
        setIsMobileOpen={setIsMobileSidebarOpen}
      />
      
      <div className="flex flex-col flex-1 w-full min-w-0">
        {/* Header with hamburger menu */}
        <Header toggleMobileSidebar={toggleMobileSidebar} />
        
        {/* Main content */}
        <main className="flex-1 overflow-auto custom-scrollbar">
          {children}
        </main>
      </div>
    </div>
  );
}