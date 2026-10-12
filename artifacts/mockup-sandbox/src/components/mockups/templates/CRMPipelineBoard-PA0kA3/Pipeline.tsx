import React, { useState, useRef, useEffect } from 'react';
import {
  LayoutDashboard,
  KanbanSquare,
  Users,
  Building2,
  BarChart3,
  Settings,
  Search,
  Filter,
  Plus,
  MoreHorizontal,
  ChevronRight,
  Clock,
  MessageSquare,
  Phone,
  Mail,
  Calendar,
  ArrowRight,
  X,
  GripVertical
} from 'lucide-react';
import { cn } from './lib/utils';

// --- DATA ---
type Stage = 'lead' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost';

interface Deal {
  id: string;
  title: string;
  company: string;
  contact: string;
  value: number;
  stage: Stage;
  probability: number;
  closeDate: string;
  lastActivity: string;
}

const INITIAL_DEALS: Deal[] = [
  { id: '1', title: 'Enterprise SSO Integration', company: 'Acme Corp', contact: 'Sarah Jenkins', value: 120000, stage: 'qualified', probability: 40, closeDate: '2023-11-15', lastActivity: '2 hours ago' },
  { id: '2', title: 'Data Migration Services', company: 'TechFlow', contact: 'Mike Ross', value: 45000, stage: 'lead', probability: 10, closeDate: '2023-12-01', lastActivity: '1 day ago' },
  { id: '3', title: 'Q4 Cloud Expansion', company: 'CloudScale', contact: 'Elena Rodriguez', value: 250000, stage: 'proposal', probability: 60, closeDate: '2023-10-30', lastActivity: '4 hours ago' },
  { id: '4', title: 'Security Audit', company: 'DefendIt', contact: 'James Chen', value: 85000, stage: 'negotiation', probability: 80, closeDate: '2023-10-20', lastActivity: '1 hour ago' },
  { id: '5', title: 'Managed Services Contract', company: 'GlobalNet', contact: 'Anna Kim', value: 180000, stage: 'won', probability: 100, closeDate: '2023-10-10', lastActivity: '3 days ago' },
  { id: '6', title: 'Analytics Dashboard', company: 'DataViz Inc', contact: 'Tom Baker', value: 65000, stage: 'lead', probability: 20, closeDate: '2023-12-15', lastActivity: '5 hours ago' },
  { id: '7', title: 'Mobile App Development', company: 'AppWorks', contact: 'Rachel Green', value: 150000, stage: 'qualified', probability: 30, closeDate: '2023-11-20', lastActivity: '2 days ago' },
];

const STAGES: { id: Stage; label: string; color: string }[] = [
  { id: 'lead', label: 'Lead', color: 'bg-zinc-800 text-zinc-300' },
  { id: 'qualified', label: 'Qualified', color: 'bg-blue-900/30 text-blue-400' },
  { id: 'proposal', label: 'Proposal', color: 'bg-amber-900/30 text-amber-400' },
  { id: 'negotiation', label: 'Negotiation', color: 'bg-purple-900/30 text-purple-400' },
  { id: 'won', label: 'Closed Won', color: 'bg-emerald-900/30 text-emerald-400' },
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
};

export default function Pipeline() {
  const [deals, setDeals] = useState<Deal[]>(INITIAL_DEALS);
  const [activeNav, setActiveNav] = useState('pipeline');
  const [activeTab, setActiveTab] = useState('board');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  
  const [selectedDealId, setSelectedDealId] = useState<string | null>(null);
  const [draggedDealId, setDraggedDealId] = useState<string | null>(null);
  const [dragOverStage, setDragOverStage] = useState<Stage | null>(null);

  // Computed
  const filteredDeals = deals.filter(deal => {
    const matchesSearch = deal.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          deal.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter ? deal.stage === activeFilter : true;
    return matchesSearch && matchesFilter;
  });

  const selectedDeal = deals.find(d => d.id === selectedDealId);

  // Handlers
  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedDealId(id);
    e.dataTransfer.effectAllowed = 'move';
    // Small delay to allow visual drag image to capture before hiding
    setTimeout(() => {
      const el = document.getElementById(`deal-${id}`);
      if (el) el.style.opacity = '0.4';
    }, 0);
  };

  const handleDragEnd = (e: React.DragEvent, id: string) => {
    setDraggedDealId(null);
    setDragOverStage(null);
    const el = document.getElementById(`deal-${id}`);
    if (el) el.style.opacity = '1';
  };

  const handleDragOver = (e: React.DragEvent, stage: Stage) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverStage !== stage) {
      setDragOverStage(stage);
    }
  };

  const updateDealStage = (dealId: string, stage: Stage) => {
    setDeals(prev => prev.map(deal => {
      if (deal.id === dealId) {
        let newProb = deal.probability;
        if (stage === 'lead') newProb = 10;
        if (stage === 'qualified') newProb = 40;
        if (stage === 'proposal') newProb = 60;
        if (stage === 'negotiation') newProb = 80;
        if (stage === 'won') newProb = 100;
        if (stage === 'lost') newProb = 0;
        return { ...deal, stage, probability: newProb };
      }
      return deal;
    }));
  };

  const handleDrop = (e: React.DragEvent, stage: Stage) => {
    e.preventDefault();
    setDragOverStage(null);
    if (!draggedDealId) return;

    setDeals(prev => prev.map(deal => {
      if (deal.id === draggedDealId) {
        // Adjust probability based on stage automatically
        let newProb = deal.probability;
        if (stage === 'lead') newProb = 10;
        if (stage === 'qualified') newProb = 40;
        if (stage === 'proposal') newProb = 60;
        if (stage === 'negotiation') newProb = 80;
        if (stage === 'won') newProb = 100;
        if (stage === 'lost') newProb = 0;
        return { ...deal, stage, probability: newProb };
      }
      return deal;
    }));
  };

  const handleAddDeal = (stage: Stage) => {
    const newDeal: Deal = {
      id: Math.random().toString(36).substring(7),
      title: 'New Deal ' + Math.floor(Math.random() * 1000),
      company: 'New Company',
      contact: 'Unknown Contact',
      value: 10000,
      stage: stage,
      probability: 10,
      closeDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      lastActivity: 'Just now'
    };
    setDeals([...deals, newDeal]);
  };

  const handleUpdateDeal = (id: string, updates: Partial<Deal>) => {
    setDeals(prev => prev.map(d => d.id === id ? { ...d, ...updates } : d));
  };

  return (
    <div className="w-full h-full bg-[#0A0A0B] text-zinc-200 font-sans overflow-hidden flex selection:bg-blue-500/30">
      {/* CSS overrides for scrollbars and custom selection */}
      <style dangerouslySetInnerHTML={{__html: `
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #27272A; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: #3F3F46; }
      `}} />

      {/* Sidebar */}
      <div className="w-[240px] border-r border-zinc-800/60 bg-[#0E0E11] flex flex-col flex-shrink-0 z-20">
        <div className="h-14 flex items-center px-4 border-b border-zinc-800/60">
          <div className="flex items-center gap-2 font-medium text-zinc-100">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-sm">
              <span className="text-xs font-bold">A</span>
            </div>
            Acme CRM
          </div>
        </div>

        <div className="p-3 flex-1 overflow-y-auto">
          <div className="space-y-1 mb-6">
            <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2 px-2">Menu</div>
            <NavItem icon={<LayoutDashboard size={16} />} label="Dashboard" active={activeNav === 'dashboard'} onClick={() => setActiveNav('dashboard')} />
            <NavItem icon={<KanbanSquare size={16} />} label="Pipeline" active={activeNav === 'pipeline'} onClick={() => setActiveNav('pipeline')} />
            <NavItem icon={<Users size={16} />} label="Contacts" active={activeNav === 'contacts'} onClick={() => setActiveNav('contacts')} />
            <NavItem icon={<Building2 size={16} />} label="Companies" active={activeNav === 'companies'} onClick={() => setActiveNav('companies')} />
            <NavItem icon={<BarChart3 size={16} />} label="Reports" active={activeNav === 'reports'} onClick={() => setActiveNav('reports')} />
          </div>

          <div className="space-y-1">
            <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2 px-2">Favorites</div>
            <NavItem label="Q4 Enterprise" active={false} isSub onClick={() => {}} />
            <NavItem label="EMEA Expansion" active={false} isSub onClick={() => {}} />
            <NavItem label="Lost Deals" active={false} isSub onClick={() => {}} />
          </div>
        </div>

        <div className="p-3 border-t border-zinc-800/60">
          <NavItem icon={<Settings size={16} />} label="Settings" active={activeNav === 'settings'} onClick={() => setActiveNav('settings')} />
          <div className="mt-2 flex items-center gap-3 px-2 py-2">
            <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center text-xs font-medium text-white">
              JV
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-zinc-200">Jonah Vega</span>
              <span className="text-xs text-zinc-500">Sales Rep</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#0A0A0B] relative z-10">
        {/* Topbar */}
        <div className="h-14 border-b border-zinc-800/60 flex items-center justify-between px-6 bg-[#0A0A0B]/80 backdrop-blur-md z-10">
          <div className="flex items-center gap-4">
            <div className="flex items-center text-sm text-zinc-400">
              <span className="hover:text-zinc-200 cursor-pointer transition-colors">Pipeline</span>
              <ChevronRight size={14} className="mx-1 text-zinc-600" />
              <span className="text-zinc-100 font-medium">Q4 Deals</span>
            </div>
            <div className="h-4 w-px bg-zinc-800 mx-2"></div>
            <div className="flex bg-zinc-900/50 p-0.5 rounded-md border border-zinc-800/60">
              <button 
                className={cn("px-3 py-1 text-xs font-medium rounded-sm transition-all duration-200", activeTab === 'board' ? 'bg-zinc-800 text-zinc-100 shadow-sm' : 'text-zinc-400 hover:text-zinc-200')}
                onClick={() => setActiveTab('board')}
              >
                Board
              </button>
              <button 
                className={cn("px-3 py-1 text-xs font-medium rounded-sm transition-all duration-200", activeTab === 'list' ? 'bg-zinc-800 text-zinc-100 shadow-sm' : 'text-zinc-400 hover:text-zinc-200')}
                onClick={() => setActiveTab('list')}
              >
                List
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input 
                type="text" 
                placeholder="Search deals..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 h-8 bg-zinc-900/50 border border-zinc-800/80 rounded-md pl-8 pr-3 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-zinc-700 focus:ring-1 focus:ring-zinc-700 transition-all"
              />
            </div>
            <button className="h-8 px-3 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700 rounded-md text-sm font-medium text-zinc-300 flex items-center gap-2 transition-colors">
              <Filter size={14} />
              Filter
            </button>
            <button 
              onClick={() => handleAddDeal('lead')}
              className="h-8 px-3 bg-zinc-100 hover:bg-white text-zinc-900 rounded-md text-sm font-medium flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Plus size={16} />
              New Deal
            </button>
          </div>
        </div>

        {/* Board View */}
        {activeTab === 'board' && (
          <div className="flex-1 overflow-x-auto overflow-y-hidden p-6 flex gap-6">
            {STAGES.map(stage => {
              const stageDeals = filteredDeals.filter(d => d.stage === stage.id);
              const totalValue = stageDeals.reduce((sum, d) => sum + d.value, 0);
              const isDragOver = dragOverStage === stage.id;
              
              return (
                <div 
                  key={stage.id} 
                  className="flex flex-col w-[280px] flex-shrink-0 max-h-full"
                  onDragOver={(e) => handleDragOver(e, stage.id)}
                  onDrop={(e) => handleDrop(e, stage.id)}
                >
                  <div className="flex items-center justify-between mb-3 px-1">
                    <div className="flex items-center gap-2">
                      <div className={cn("px-2 py-0.5 rounded text-xs font-semibold", stage.color)}>
                        {stage.label}
                      </div>
                      <span className="text-xs text-zinc-500 font-medium">{stageDeals.length}</span>
                    </div>
                    <span className="text-xs font-medium text-zinc-400">{formatCurrency(totalValue)}</span>
                  </div>
                  
                  <div className={cn(
                    "flex-1 overflow-y-auto overflow-x-hidden pb-4 space-y-3 rounded-lg transition-colors p-1 -mx-1",
                    isDragOver ? "bg-zinc-900/50 border border-zinc-800 border-dashed" : "border border-transparent"
                  )}>
                    {stageDeals.map(deal => (
                      <div 
                        key={deal.id}
                        id={`deal-${deal.id}`}
                        draggable
                        onDragStart={(e) => handleDragStart(e, deal.id)}
                        onDragEnd={(e) => handleDragEnd(e, deal.id)}
                        onClick={() => setSelectedDealId(deal.id)}
                        className={cn(
                          "bg-[#18181B] border border-zinc-800/80 hover:border-zinc-600 rounded-lg p-3 cursor-pointer group transition-all relative overflow-hidden",
                          selectedDealId === deal.id ? "ring-1 ring-zinc-500 border-zinc-500 shadow-sm shadow-black/50" : "shadow-sm shadow-black/20"
                        )}
                      >
                        <div className="absolute top-0 left-0 w-1 h-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center bg-zinc-800/50 cursor-grab active:cursor-grabbing">
                          <GripVertical size={12} className="text-zinc-500" />
                        </div>
                        
                        <div className="flex justify-between items-start mb-2 group-hover:pl-2 transition-all duration-200">
                          <h4 className="text-sm font-semibold text-zinc-100 leading-tight pr-4">{deal.title}</h4>
                          <button className="text-zinc-600 hover:text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity">
                            <MoreHorizontal size={14} />
                          </button>
                        </div>
                        
                        <div className="text-xs text-zinc-400 mb-3 group-hover:pl-2 transition-all duration-200 flex items-center gap-1.5">
                          <Building2 size={12} className="text-zinc-500" />
                          {deal.company}
                        </div>
                        
                        <div className="flex items-center justify-between mt-auto group-hover:pl-2 transition-all duration-200">
                          <div className="text-sm font-medium text-zinc-300">
                            {formatCurrency(deal.value)}
                          </div>
                          
                          {/* Probability indicator */}
                          <div className="flex items-center gap-1">
                            <div className="w-12 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                              <div 
                                className={cn("h-full rounded-full", 
                                  deal.probability >= 80 ? "bg-emerald-500" : 
                                  deal.probability >= 40 ? "bg-amber-500" : "bg-blue-500"
                                )} 
                                style={{ width: `${deal.probability}%` }} 
                              />
                            </div>
                            <span className="text-[10px] text-zinc-500 w-6 text-right">{deal.probability}%</span>
                          </div>
                        </div>
                        
                        {/* Days in stage indicator */}
                        <div className="mt-3 pt-2 border-t border-zinc-800/50 flex items-center text-[10px] text-zinc-500 group-hover:pl-2 transition-all duration-200">
                          <Clock size={10} className="mr-1" />
                          {deal.lastActivity}
                        </div>
                      </div>
                    ))}
                    
                    {/* Add Deal button at bottom of column */}
                    <button 
                      onClick={() => handleAddDeal(stage.id)}
                      className="w-full py-2.5 border border-dashed border-zinc-800 hover:border-zinc-600 hover:bg-zinc-900/50 rounded-lg text-xs font-medium text-zinc-500 hover:text-zinc-300 flex items-center justify-center transition-colors"
                    >
                      <Plus size={14} className="mr-1" /> Add Deal
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* List View (Placeholder) */}
        {activeTab === 'list' && (
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="bg-[#18181B] border border-zinc-800 rounded-lg overflow-hidden">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-zinc-500 uppercase bg-[#0E0E11] border-b border-zinc-800">
                  <tr>
                    <th className="px-4 py-3 font-medium">Deal Name</th>
                    <th className="px-4 py-3 font-medium">Company</th>
                    <th className="px-4 py-3 font-medium">Stage</th>
                    <th className="px-4 py-3 font-medium text-right">Value</th>
                    <th className="px-4 py-3 font-medium text-right">Probability</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDeals.map(deal => (
                    <tr 
                      key={deal.id} 
                      className="border-b border-zinc-800/50 hover:bg-zinc-900/50 cursor-pointer transition-colors"
                      onClick={() => setSelectedDealId(deal.id)}
                    >
                      <td className="px-4 py-3 font-medium text-zinc-200">{deal.title}</td>
                      <td className="px-4 py-3 text-zinc-400">{deal.company}</td>
                      <td className="px-4 py-3">
                        <span className={cn("px-2 py-0.5 rounded text-[10px] font-semibold", STAGES.find(s => s.id === deal.stage)?.color)}>
                          {STAGES.find(s => s.id === deal.stage)?.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right font-medium">{formatCurrency(deal.value)}</td>
                      <td className="px-4 py-3 text-right text-zinc-400">{deal.probability}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Deal Details Drawer */}
      <div 
        className={cn(
          "absolute inset-y-0 right-0 w-[440px] bg-[#121214] border-l border-zinc-800 shadow-2xl transform transition-transform duration-300 ease-in-out z-30 flex flex-col",
          selectedDeal ? "translate-x-0" : "translate-x-full"
        )}
      >
        {selectedDeal && (
          <>
            <div className="h-14 px-4 border-b border-zinc-800 flex items-center justify-between flex-shrink-0 bg-[#0E0E11]">
              <div className="flex items-center gap-2">
                <span className={cn("px-2 py-1 rounded text-xs font-semibold uppercase tracking-wider", STAGES.find(s => s.id === selectedDeal.stage)?.color)}>
                  {STAGES.find(s => s.id === selectedDeal.stage)?.label}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors">
                  <MoreHorizontal size={16} />
                </button>
                <button 
                  onClick={() => setSelectedDealId(null)}
                  className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {/* Header Info */}
              <div>
                <input 
                  type="text" 
                  value={selectedDeal.title}
                  onChange={(e) => handleUpdateDeal(selectedDeal.id, { title: e.target.value })}
                  className="text-2xl font-bold text-zinc-100 bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-zinc-700 rounded px-1 -mx-1 w-full mb-1"
                />
                <div className="text-zinc-400 text-sm flex items-center gap-2 px-1">
                  <Building2 size={14} />
                  <input 
                    type="text" 
                    value={selectedDeal.company}
                    onChange={(e) => handleUpdateDeal(selectedDeal.id, { company: e.target.value })}
                    className="bg-transparent border-none focus:outline-none hover:bg-zinc-800/50 focus:bg-zinc-800/50 rounded px-1 -ml-1 transition-colors"
                  />
                </div>
              </div>

              {/* Key Metrics Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-3">
                  <div className="text-xs text-zinc-500 mb-1">Deal Value</div>
                  <div className="text-lg font-semibold text-zinc-200">{formatCurrency(selectedDeal.value)}</div>
                </div>
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-3">
                  <div className="text-xs text-zinc-500 mb-1">Probability</div>
                  <div className="flex items-center gap-2">
                    <div className="text-lg font-semibold text-zinc-200">{selectedDeal.probability}%</div>
                    <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: `${selectedDeal.probability}%` }} />
                    </div>
                  </div>
                </div>
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-3">
                  <div className="text-xs text-zinc-500 mb-1">Expected Close</div>
                  <div className="text-sm font-medium text-zinc-200 flex items-center gap-1.5 mt-1">
                    <Calendar size={14} className="text-zinc-500" />
                    {selectedDeal.closeDate}
                  </div>
                </div>
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-3">
                  <div className="text-xs text-zinc-500 mb-1">Primary Contact</div>
                  <div className="text-sm font-medium text-zinc-200 flex items-center gap-1.5 mt-1">
                    <Users size={14} className="text-zinc-500" />
                    {selectedDeal.contact}
                  </div>
                </div>
              </div>

              {/* Stage Progression */}
              <div>
                <h3 className="text-sm font-semibold text-zinc-200 mb-3">Pipeline Stage</h3>
                <div className="flex flex-col gap-1">
                  {STAGES.map((stage, idx) => {
                    const currentStageIdx = STAGES.findIndex(s => s.id === selectedDeal.stage);
                    const isPassed = idx < currentStageIdx;
                    const isCurrent = idx === currentStageIdx;
                    
                    return (
                      <button
                        key={stage.id}
                        onClick={() => updateDealStage(selectedDeal.id, stage.id)}
                        className={cn(
                          "flex items-center gap-3 p-2 rounded-md transition-colors text-sm text-left",
                          isCurrent ? "bg-zinc-800 text-zinc-100" : "hover:bg-zinc-900 text-zinc-400"
                        )}
                      >
                        <div className={cn(
                          "w-4 h-4 rounded-full flex items-center justify-center border",
                          isCurrent ? "border-blue-500 bg-blue-500/20" : 
                          isPassed ? "border-zinc-500 bg-zinc-700" : "border-zinc-700 bg-transparent"
                        )}>
                          {isPassed && <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full" />}
                          {isCurrent && <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />}
                        </div>
                        {stage.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Activity */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-zinc-200">Activity</h3>
                  <div className="flex gap-1">
                    <button className="p-1.5 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 rounded text-zinc-400 transition-colors">
                      <MessageSquare size={14} />
                    </button>
                    <button className="p-1.5 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 rounded text-zinc-400 transition-colors">
                      <Phone size={14} />
                    </button>
                    <button className="p-1.5 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 rounded text-zinc-400 transition-colors">
                      <Mail size={14} />
                    </button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="relative pl-6 pb-4 border-l border-zinc-800 last:border-0 last:pb-0">
                    <div className="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full bg-blue-500 ring-4 ring-[#121214]" />
                    <div className="text-xs text-zinc-500 mb-1">Today, 10:45 AM</div>
                    <div className="text-sm text-zinc-300">Sent pricing proposal PDF to {selectedDeal.contact}</div>
                  </div>
                  <div className="relative pl-6 pb-4 border-l border-zinc-800 last:border-0 last:pb-0">
                    <div className="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full bg-zinc-700 ring-4 ring-[#121214]" />
                    <div className="text-xs text-zinc-500 mb-1">Yesterday, 2:30 PM</div>
                    <div className="text-sm text-zinc-300">Discovery call completed. Confirmed timeline for Q4.</div>
                  </div>
                  <div className="relative pl-6 pb-0 border-l border-zinc-800 last:border-0 last:pb-0">
                    <div className="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full bg-zinc-700 ring-4 ring-[#121214]" />
                    <div className="text-xs text-zinc-500 mb-1">Oct 12, 2023</div>
                    <div className="text-sm text-zinc-300">Deal created from inbound lead</div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      
      {/* Drawer Overlay */}
      {selectedDealId && (
        <div 
          className="absolute inset-0 bg-black/20 backdrop-blur-[1px] z-20 transition-opacity"
          onClick={() => setSelectedDealId(null)}
        />
      )}
    </div>
  );
}

function NavItem({ icon, label, active, isSub, onClick }: { icon?: React.ReactNode; label: string; active: boolean; isSub?: boolean; onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 text-sm font-medium",
        active 
          ? "bg-zinc-800/80 text-zinc-100 shadow-sm" 
          : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50",
        isSub && "pl-8 text-[13px] py-1.5"
      )}
    >
      {icon && <span className={cn(active ? "text-zinc-100" : "text-zinc-500")}>{icon}</span>}
      {label}
    </button>
  );
}
