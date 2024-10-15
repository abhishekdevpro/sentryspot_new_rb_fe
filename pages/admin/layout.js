export default function AdminLayout({ children }) {
    return (
      <div>
        <header>
          <nav>
            {/* Dashboard-specific navigation */}
            <a href="/admin/profile">Profile</a>
            <a href="/admin/settings">Settings</a>
          </nav>
        </header>
        <main>
        
          {children}
        </main>
      </div>
    );
  }
  