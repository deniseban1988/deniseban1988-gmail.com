import React from 'react';
import { 
  Bus, 
  Hotel, 
  Tv, 
  Headphones, 
  Wallet, 
  ChevronRight, 
  Heart,
  Tag,
  Gift,
  CreditCard,
  HelpCircle,
  MapPin
} from 'lucide-react';
import { motion } from 'motion/react';

interface SuperAppLandingProps {
  onExploreTab: (tab: 'transport' | 'hotels' | 'vision' | 'iptv') => void;
  onOpenTicketsWallet: () => void;
}

export const SuperAppLanding: React.FC<SuperAppLandingProps> = ({
  onExploreTab,
  onOpenTicketsWallet
}) => {
  return (
    <div className="flex flex-col space-y-6 pb-24 bg-[#F8FAFC]">
      
      {/* 1. HERO BANNER - SLIDER STYLE */}
      <section className="px-4 pt-4">
        <div className="relative w-full h-56 sm:h-64 rounded-[32px] overflow-hidden bg-[#0A1A2F] border border-white/10 shadow-xl">
          {/* Background Illustration / Image */}
          <div className="absolute inset-0 opacity-80">
            <img 
              src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80" 
              alt="Autocar Moderne" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A1A2F] via-[#0A1A2F]/60 to-transparent" />
          </div>

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col justify-center px-6 sm:px-10 space-y-3">
            <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight max-w-[200px] sm:max-w-xs">
              Votre destination, <br />
              <span className="text-[#F5821F]">Notre priorité</span>
            </h2>
            <p className="text-[11px] sm:text-xs text-slate-200 max-w-[180px] sm:max-w-xs leading-relaxed">
              Réservez vos voyages en toute sécurité avec IVOIReXpress
            </p>
            <button 
              onClick={() => onExploreTab('transport')}
              className="w-fit px-5 py-2.5 rounded-[14px] bg-[#F5821F] hover:bg-[#e07317] text-white text-xs font-bold shadow-lg shadow-black/30 transition-transform active:scale-95"
            >
              Réserver un voyage
            </button>
          </div>

          {/* Pagination Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-1.5">
            <div className="w-2 h-2 rounded-full bg-[#F5821F]" />
            <div className="w-2 h-2 rounded-full bg-white/40" />
            <div className="w-2 h-2 rounded-full bg-white/40" />
            <div className="w-2 h-2 rounded-full bg-white/40" />
          </div>
        </div>
      </section>

      {/* 2. QUICK ACTIONS ICON BAR */}
      <section className="px-4">
        <div className="flex items-start justify-between">
          <QuickActionItem icon={Bus} label="Réserver un voyage" color="text-orange-500" onClick={() => onExploreTab('transport')} />
          <QuickActionItem icon={Hotel} label="Réserver un hôtel" color="text-blue-500" onClick={() => onExploreTab('hotels')} />
          <QuickActionItem icon={Tv} label="TV / IPTV à bord" color="text-indigo-500" onClick={() => onExploreTab('iptv')} />
          <QuickActionItem icon={Headphones} label="Assistance 24/7" color="text-purple-500" onClick={() => {}} />
          <QuickActionItem icon={Wallet} label="Porte-monnaie (Paiement)" color="text-slate-700" onClick={() => onOpenTicketsWallet()} />
        </div>
      </section>

      {/* 3. NOS SERVICES SECTION */}
      <section className="px-4 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-black text-[#1F2937]">Nos services</h3>
          <button className="text-[13px] font-bold text-[#F5821F] hover:underline">Voir tout</button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <ServiceGridCard 
            title="Transport & Voyages" 
            desc="Réservez vos billets pour toutes les destinations" 
            icon={Bus} 
            color="orange"
            onClick={() => onExploreTab('transport')}
          />
          <ServiceGridCard 
            title="Hôtels" 
            desc="Réservez vos chambres dans les meilleurs hôtels" 
            icon={Hotel} 
            color="green"
            onClick={() => onExploreTab('hotels')}
          />
          <ServiceGridCard 
            title="TV / IPTV à bord" 
            desc="Profitez de vos chaînes préférées pendant le trajet" 
            icon={Tv} 
            color="blue"
            onClick={() => onExploreTab('iptv')}
          />
          <ServiceGridCard 
            title="Assistance" 
            desc="Besoin d'aide ? Nous sommes là" 
            icon={Headphones} 
            color="purple"
            onClick={() => {}}
          />
          <ServiceGridCard 
            title="Paiements" 
            desc="Paiements sécurisés et multiples" 
            icon={CreditCard} 
            color="yellow"
            onClick={() => onOpenTicketsWallet()}
          />
          <ServiceGridCard 
            title="Offres & Promotions" 
            desc="Découvrez nos offres exclusives" 
            icon={Gift} 
            color="pink"
            onClick={() => {}}
          />
        </div>
      </section>

      {/* 4. PROMO BANNER 2 */}
      <section className="px-4">
        <div className="relative w-full h-44 rounded-[28px] overflow-hidden bg-[#0F2D52] p-6 flex items-center justify-between">
          <div className="space-y-2 z-10 max-w-[60%]">
            <h4 className="text-base sm:text-lg font-black text-white leading-tight">
              Voyagez plus, dépensez moins !
            </h4>
            <p className="text-[11px] text-orange-200">
              Profitez de réductions jusqu'à <span className="font-black text-[#F5821F] text-sm">-30%</span> sur vos prochains voyages
            </p>
            <button className="px-4 py-1.5 rounded-[12px] bg-[#F5821F] hover:bg-[#e07317] text-white text-[11px] font-bold shadow-lg transition-transform active:scale-95">
              Découvrir les offres
            </button>
          </div>
          
          <div className="absolute right-0 top-0 bottom-0 w-1/2 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=400&q=80" 
              alt="Promo Bus" 
              className="w-full h-full object-cover scale-125 translate-x-4"
            />
          </div>

          {/* Dots Indicator */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-1">
            <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#F5821F]" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
          </div>
        </div>
      </section>

      {/* 5. VOYAGES POPULAIRES */}
      <section className="px-4 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-black text-[#1F2937]">Voyages populaires</h3>
          <button className="text-[13px] font-bold text-[#F5821F] hover:underline">Voir tout</button>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
          <PopularTripCard city="Yamoussoukro" img="https://images.unsplash.com/photo-1590603740183-980e7f6920eb?auto=format&fit=crop&w=300&q=80" />
          <PopularTripCard city="San Pédro" img="https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=300&q=80" />
          <PopularTripCard city="Bouaké" img="https://images.unsplash.com/photo-1566438480900-0609be27a4be?auto=format&fit=crop&w=300&q=80" />
        </div>
      </section>

    </div>
  );
};

// Internal Components
const QuickActionItem = ({ icon: Icon, label, color, onClick }: any) => (
  <button onClick={onClick} className="flex flex-col items-center space-y-2 w-[72px] group">
    <div className={`w-14 h-14 rounded-[20px] bg-white shadow-[0_4px_12px_rgba(0,0,0,0.06)] border border-slate-100 flex items-center justify-center transition-all group-hover:scale-105 group-hover:shadow-md active:scale-95`}>
      <Icon className={`w-6 h-6 ${color}`} />
    </div>
    <span className="text-[10px] font-bold text-[#1F2937] leading-tight text-center max-w-full">
      {label}
    </span>
  </button>
);

const ServiceGridCard = ({ title, desc, icon: Icon, color, onClick }: any) => {
  const colorMap: any = {
    orange: { bg: 'bg-[#FFF7ED]', iconBg: 'bg-orange-100', icon: 'text-[#F5821F]' },
    green: { bg: 'bg-[#F0FDF4]', iconBg: 'bg-green-100', icon: 'text-[#22C55E]' },
    blue: { bg: 'bg-[#EFF6FF]', iconBg: 'bg-blue-100', icon: 'text-[#3B82F6]' },
    purple: { bg: 'bg-[#F5F3FF]', iconBg: 'bg-purple-100', icon: 'text-[#8B5CF6]' },
    yellow: { bg: 'bg-[#FFFBEB]', iconBg: 'bg-yellow-100', icon: 'text-[#EAB308]' },
    pink: { bg: 'bg-[#FDF2F8]', iconBg: 'bg-pink-100', icon: 'text-[#EC4899]' }
  };

  const scheme = colorMap[color];

  return (
    <div 
      onClick={onClick}
      className={`relative p-4 rounded-[24px] ${scheme.bg} border border-slate-100 flex flex-col space-y-2 shadow-sm cursor-pointer hover:shadow-md transition-all active:scale-[0.98]`}
    >
      <div className={`w-10 h-10 rounded-full ${scheme.iconBg} flex items-center justify-center`}>
        <Icon className={`w-5 h-5 ${scheme.icon}`} />
      </div>
      <div>
        <h4 className="text-[13px] font-black text-[#1F2937] leading-tight">{title}</h4>
        <p className="text-[10px] text-slate-500 mt-1 leading-tight">{desc}</p>
      </div>
      <div className="absolute bottom-4 right-4 w-6 h-6 rounded-full bg-[#F5821F] flex items-center justify-center shadow-md">
        <ChevronRight className="w-3.5 h-3.5 text-white" />
      </div>
    </div>
  );
};

const PopularTripCard = ({ city, img }: any) => (
  <div className="relative shrink-0 w-44 h-28 rounded-[24px] overflow-hidden group cursor-pointer shadow-md">
    <img src={img} alt={city} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
    <div className="absolute bottom-3 left-4">
      <p className="text-white text-xs font-bold">{city}</p>
    </div>
    <button className="absolute top-3 right-3 p-1.5 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/40">
      <Heart className="w-3.5 h-3.5" />
    </button>
  </div>
);
