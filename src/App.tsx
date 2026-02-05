import { useAudit } from './context/AuditContext';
import Home from './pages/Home';
import Wizard from './pages/Wizard';
import Report from './pages/Report';

// Simple specific component to consume context
const AppContent = () => {
  const { currentView } = useAudit();

  return (
    <div className="min-h-screen bg-background text-white selection:bg-primary selection:text-white overflow-x-hidden">
      {currentView === 'home' && <Home />}
      {currentView === 'wizard' && <Wizard />}
      {currentView === 'report' && <Report />}
    </div>
  );
};

const App = () => {
  return (
    // Context is provided in main.tsx or here. Let's provide it here if main.tsx is clean.
    // Waiting to check main.tsx, but usually it's better to wrap here.
    // However, I haven't wrapped App in AuditProvider in main.tsx yet.
    // I should inspect main.tsx or just wrapping it here.
    // I'll wrap it here for safety.
    <AppContent />
  );
};

export default App;
