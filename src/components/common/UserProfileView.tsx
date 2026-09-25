import React from 'react';
import { UserAccount, UserRole } from '../../types';
import { User, Mail, Shield, Calendar, MapPin, Phone, LogOut, Settings, Bell, CreditCard, Clock } from 'lucide-react';
import { IxBadge, IxButton } from './IvoirexpressUIKit';

interface UserProfileViewProps {
  user: UserAccount;
  role: UserRole;
  onLogout: () => void;
}

export const UserProfileView: React.FC<UserProfileViewProps> = ({ user, role, onLogout }) => {
  const roleLabels: Record<UserRole, string> = {
    VOYAGEUR: 'Voyageur Standard',
    ADMIN_AGENCE: 'Administrateur Agence',
    ADMIN_HOTEL: 'Gestionnaire Hôtel',
    SUPER_ADMIN: 'Super Administrateur National'
  };

  const roleColors: Record<UserRole, 'amber' | 'blue' | 'purple' | 'emerald'> = {
    VOYAGEUR: 'amber',
    ADMIN_AGENCE: 'blue',
    ADMIN_HOTEL: 'purple',
    SUPER_ADMIN: 'emerald'
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header Profile Card */}
      <div className="bg-white rounded-[24px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-[#0F4C81] to-[#F5821F]/80 relative">
          <div className="absolute -bottom-12 left-8 p-1 bg-white rounded-full">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80" 
                alt={user.fullName}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        
        <div className="pt-16 pb-8 px-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-2xl font-black text-[#1F2937]">{user.fullName}</h1>
            <div className="flex items-center space-x-3">
              <IxBadge variant={roleColors[role]}>{roleLabels[role]}</IxBadge>
              <span className="text-xs text-slate-400 font-medium flex items-center">
                <Clock className="w-3.5 h-3.5 mr-1" />
                Membre depuis 2024
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <IxButton variant="outline" size="sm" icon={Settings}>Modifier</IxButton>
            <IxButton variant="danger" size="sm" icon={LogOut} onClick={onLogout}>Déconnexion</IxButton>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Contact Info */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-[24px] border border-slate-100 shadow-sm p-6 space-y-6">
            <h2 className="text-sm font-bold text-[#1F2937] flex items-center">
              <User className="w-4 h-4 mr-2 text-[#0F4C81]" />
              Informations Personnelles
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Email Officiel</label>
                <div className="flex items-center text-sm font-medium text-[#1F2937]">
                  <Mail className="w-4 h-4 mr-2 text-slate-400" />
                  {user.email}
                </div>
              </div>
              
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Téléphone</label>
                <div className="flex items-center text-sm font-medium text-[#1F2937]">
                  <Phone className="w-4 h-4 mr-2 text-slate-400" />
                  +225 07 00 00 00 00
                </div>
              </div>
              
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Localisation</label>
                <div className="flex items-center text-sm font-medium text-[#1F2937]">
                  <MapPin className="w-4 h-4 mr-2 text-slate-400" />
                  Abidjan, Côte d'Ivoire
                </div>
              </div>
              
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">ID Compte</label>
                <div className="flex items-center text-xs font-mono text-slate-500">
                  <Shield className="w-4 h-4 mr-2 text-slate-400" />
                  {user.id.substring(0, 12)}...
                </div>
              </div>
            </div>
          </div>

          {/* Activity/History Summary */}
          <div className="bg-white rounded-[24px] border border-slate-100 shadow-sm p-6">
            <h2 className="text-sm font-bold text-[#1F2937] mb-6 flex items-center">
              <Clock className="w-4 h-4 mr-2 text-[#0F4C81]" />
              Activité Récente
            </h2>
            
            <div className="space-y-4">
              {[
                { label: 'Réservation Bus', desc: 'Abidjan ➔ Yamoussoukro', date: 'Il y a 2 jours', status: 'Terminé' },
                { label: 'Achat Crédit', desc: 'Rechargement Portefeuille 5000 FCFA', date: 'Il y a 5 jours', status: 'Succès' },
                { label: 'Connexion', desc: 'Nouvel appareil détecté : iPhone 15', date: 'Hier à 18:45', status: 'Sécurisé' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start justify-between p-3 rounded-[16px] hover:bg-slate-50 transition-colors">
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-[#1F2937]">{item.label}</p>
                    <p className="text-[11px] text-slate-500">{item.desc}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-slate-400 mb-1">{item.date}</p>
                    <span className="text-[9px] font-black uppercase px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded-full">{item.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Cards */}
        <div className="space-y-6">
          <div className="bg-slate-900 rounded-[24px] p-6 text-white space-y-4">
            <div className="flex items-center justify-between">
              <CreditCard className="w-5 h-5 text-[#F5821F]" />
              <IxBadge variant="amber">Actif</IxBadge>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Portefeuille Mobile</p>
              <p className="text-2xl font-black">24,500 FCFA</p>
            </div>
            <button className="w-full py-2 bg-white/10 hover:bg-white/20 rounded-[12px] text-xs font-bold transition-all">
              Recharger
            </button>
          </div>

          <div className="bg-white rounded-[24px] border border-slate-100 shadow-sm p-5 space-y-3">
            <h3 className="text-xs font-bold text-[#1F2937]">Paramètres Rapides</h3>
            <div className="space-y-1">
              <button className="w-full flex items-center justify-between p-2 rounded-[12px] hover:bg-slate-50 text-xs font-medium text-[#4B5563]">
                <div className="flex items-center">
                  <Bell className="w-4 h-4 mr-2 text-slate-400" />
                  Notifications
                </div>
                <div className="w-8 h-4 bg-emerald-500 rounded-full relative">
                  <div className="absolute right-0.5 top-0.5 w-3 h-3 bg-white rounded-full shadow-sm" />
                </div>
              </button>
              <button className="w-full flex items-center justify-between p-2 rounded-[12px] hover:bg-slate-50 text-xs font-medium text-[#4B5563]">
                <div className="flex items-center">
                  <Shield className="w-4 h-4 mr-2 text-slate-400" />
                  Sécurité 2FA
                </div>
                <div className="w-8 h-4 bg-slate-200 rounded-full relative">
                  <div className="absolute left-0.5 top-0.5 w-3 h-3 bg-white rounded-full shadow-sm" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
