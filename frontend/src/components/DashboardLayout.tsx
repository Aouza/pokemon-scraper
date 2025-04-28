import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <Topbar />
        <main className="flex-1 w-full px-4 md:px-8 py-10 bg-gray-50 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
} 