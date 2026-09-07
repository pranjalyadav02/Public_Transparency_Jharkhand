import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { DashboardHome } from './views/DashboardHome';
import { ExploreView } from './views/ExploreView';
import { DistrictsView } from './views/DistrictsView';
import { AccountabilityView } from './views/AccountabilityView';
import { ImpactView } from './views/ImpactView';
import { OpenDataView } from './views/OpenDataView';
import { AboutView } from './views/AboutView';
import { ProblemDetailModal } from './components/ProblemDetailModal';
import { DataLineageModal } from './components/DataLineageModal';
import { ReplicationModal } from './components/ReplicationModal';
import { SubscribeModal } from './components/SubscribeModal';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { PUBLIC_CHALLENGES, PUBLIC_SOLUTIONS, JHARKHAND_DISTRICTS } from './data/mockData';
import { PublicChallenge, PublicSolution, DistrictMetric, DataLineageDetails } from './types';
import { Language } from './data/translations';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('overview');
  const [language, setLanguage] = useState<Language>('en');
  const [highContrast, setHighContrast] = useState<boolean>(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large'>('normal');

  // Modal States
  const [selectedChallengeId, setSelectedChallengeId] = useState<string | null>(null);
  const [selectedSolution, setSelectedSolution] = useState<PublicSolution | null>(null);
  const [activeLineage, setActiveLineage] = useState<DataLineageDetails | null>(null);
  const [subscribeTopic, setSubscribeTopic] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  
  // District Selection State
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictMetric | null>(null);

  // Selected Challenge Object
  const selectedChallenge = PUBLIC_CHALLENGES.find(c => c.id === selectedChallengeId) || null;

  // Keyboard shortcut for search (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleOpenChallenge = (challengeId: string) => {
    setSelectedChallengeId(challengeId);
  };

  const handleOpenProject = (projectId: string) => {
    // Navigate to projects explorer or show related challenge
    setCurrentTab('explore');
  };

  const handleSelectDistrict = (district: DistrictMetric) => {
    setSelectedDistrict(district);
    setCurrentTab('districts');
  };

  return (
    <div className={`h-screen flex flex-col font-sans transition-colors overflow-hidden ${
      highContrast 
        ? 'bg-black text-white' 
        : 'bg-[#F8FAFC] text-[#1E293B]'
    } ${fontSize === 'large' ? 'text-sm' : 'text-xs'}`}>
      
      {/* Navigation Bar */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        language={language}
        onToggleLanguage={() => setLanguage(prev => prev === 'en' ? 'hi' : 'en')}
        highContrast={highContrast}
        onToggleHighContrast={() => setHighContrast(prev => !prev)}
        fontSize={fontSize}
        onToggleFontSize={() => setFontSize(prev => prev === 'normal' ? 'large' : 'normal')}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 flex flex-col overflow-y-auto">
        {currentTab === 'overview' && (
          <DashboardHome
            onOpenChallenge={handleOpenChallenge}
            onOpenProject={handleOpenProject}
            onSelectDistrict={handleSelectDistrict}
            onOpenLineage={setActiveLineage}
            onNavigateTab={setCurrentTab}
          />
        )}

        {currentTab === 'explore' && (
          <ExploreView
            onOpenChallenge={handleOpenChallenge}
            onOpenProject={handleOpenProject}
          />
        )}

        {currentTab === 'districts' && (
          <DistrictsView
            selectedDistrict={selectedDistrict}
            onSelectDistrict={setSelectedDistrict}
            onOpenChallenge={handleOpenChallenge}
            onOpenSubscribe={setSubscribeTopic}
          />
        )}

        {currentTab === 'accountability' && (
          <AccountabilityView />
        )}

        {currentTab === 'impact' && (
          <ImpactView
            onOpenReplication={setSelectedSolution}
            onOpenLineage={setActiveLineage}
          />
        )}

        {currentTab === 'open-data' && (
          <OpenDataView />
        )}

        {currentTab === 'about' && (
          <AboutView />
        )}
      </main>

      {/* Public Transparency Footer */}
      <Footer onSelectTab={setCurrentTab} />

      {/* Global Modals */}
      <ProblemDetailModal
        challenge={selectedChallenge}
        isOpen={!!selectedChallengeId}
        onClose={() => setSelectedChallengeId(null)}
        onOpenProject={handleOpenProject}
      />

      <DataLineageModal
        lineage={activeLineage}
        isOpen={!!activeLineage}
        onClose={() => setActiveLineage(null)}
      />

      <ReplicationModal
        solution={selectedSolution}
        isOpen={!!selectedSolution}
        onClose={() => setSelectedSolution(null)}
      />

      <SubscribeModal
        topicTitle={subscribeTopic || undefined}
        isOpen={!!subscribeTopic}
        onClose={() => setSubscribeTopic(null)}
      />

      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectChallenge={handleOpenChallenge}
        onSelectDistrict={(districtName) => {
          const found = JHARKHAND_DISTRICTS.find(d => d.name === districtName);
          if (found) {
            setSelectedDistrict(found);
            setCurrentTab('districts');
          }
        }}
      />

    </div>
  );
}
