/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  Briefcase,
  Layers,
  Phone,
  MapPin,
  Check,
  Search,
  User,
  Shield,
  Activity,
  Plus,
  Trash2,
  Edit,
  Lock,
  MessageSquare,
  LogOut,
  ChevronRight,
  Sparkles,
  DollarSign,
  AlertCircle,
  QrCode,
  ArrowRight,
  TrendingUp,
  Store,
  Scissors,
  ShoppingBag,
  Package,
  Settings,
  Instagram,
  Smartphone,
  Download,
  X,
  Share2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import NotificationToast, { ToastMessage } from './components/NotificationToast';
import PixPaymentModal from './components/PixPaymentModal';
import { Usuario, Loja, Profissional, Servico, Agendamento, Produto } from './types';

export default function App() {
  // Navigation / Views state: only single active store detail and dashboard
  const [currentView, setCurrentView] = useState<'store-detail' | 'dashboard'>('store-detail');
  
  // Interactive 3D Tilt and Parallax Scroll states for Gsap-styled Mirror Cards
  const [scrollY, setScrollY] = useState(0);
  const [tiltX, setTiltX] = useState(0);
  const [tiltY, setTiltY] = useState(0);
  const [shineX, setShineX] = useState(50);
  const [shineY, setShineY] = useState(50);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    
    // Smooth responsive rotation (-8 to 8 deg)
    const rotateX = (yc - y) / (rect.height / 16);
    const rotateY = (x - xc) / (rect.width / 16);
    
    setTiltX(rotateX);
    setTiltY(rotateY);
    
    // Shine reflection coordinates
    setShineX(Math.round((x / rect.width) * 100));
    setShineY(Math.round((y / rect.height) * 100));
    setIsHovered(true);
  };

  const handleHeroMouseLeave = () => {
    setTiltX(0);
    setTiltY(0);
    setIsHovered(false);
  };
  const [selectedLojaDetail, setSelectedLojaDetail] = useState<{ loja: Loja; servicos: Servico[]; profissionais: Profissional[] } | null>(null);
  const [storeProducts, setStoreProducts] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(false);

  // Retail products state
  const [dashboardProdutos, setDashboardProdutos] = useState<Produto[]>([]);
  const [newProductForm, setNewProductForm] = useState({ nome: '', preco: '', estoque: '10', categoria: 'Cílios', imagem: '' });
  
  // Custom split shifts state
  const [storeHours, setStoreHours] = useState({
    inicio: '08:00',
    fim: '18:00',
    intervalo_inicio: '11:40',
    intervalo_fim: '13:40',
    split_shift_enabled: true
  });

  // Active Tab in Super Admin Dashboard
  const [activeAdminTab, setActiveAdminTab] = useState<'agenda' | 'servicos' | 'produtos' | 'horario'>('agenda');

  // Hero Slider State
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Núcleo de Autoestima",
      headline: "A mudança que você quer está aqui!!",
      desc: "Um espaço de beleza e bem-estar em Contagem, preparado para renovar seu olhar e suas mãos de forma segura e exclusiva.",
      cta: "Conheça nossos serviços abaixo e garanta seu agendamento!",
      image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=1200",
      pill: "BEM-VINDO AO NOVO CONCEITO"
    },
    {
      title: "Laura Fernanda Lash",
      headline: "Extensão de Cílios de Luxo & Lash Design",
      desc: "Tratamentos especializados conduzidos por @laurafernanda_lash. Técnicas de altíssima precisão e materiais esterilizados para realçar a beleza natural do seu olhar.",
      cta: "Selecione o procedimento de Cílios para reservar!",
      image: "https://images.unsplash.com/photo-1583001809276-850bacbdee1a?auto=format&fit=crop&q=80&w=1200",
      pill: "ESPECIALISTA @LAURAFERNANDA_LASH"
    },
    {
      title: "Studio Grazi Sabrina",
      headline: "Design de Sobrancelhas, Nails & Estética",
      desc: "Alongamento em Fibra de Vidros, unhas de altíssima durabilidade e cuidados impecáveis de micropigmentação e estética dirigidos por @studio_grazisabrina1.",
      cta: "Confira nossas opções de Unhas ou Sobrancelha abaixo!",
      image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=1200",
      pill: "PROJETADO POR @STUDIO_GRAZISABRINA1"
    }
  ];

  // Auto transition slides every 10 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  // Global Mouse Position Tracking for Custom Cursor Aura & Salon Particle Sparks
  const [globalMouse, setGlobalMouse] = useState({ x: -100, y: -100 });
  const [hasMouseMoved, setHasMouseMoved] = useState(false);

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      setGlobalMouse({ x: e.clientX, y: e.clientY });
      if (!hasMouseMoved) setHasMouseMoved(true);
    };
    window.addEventListener('mousemove', handleGlobalMouseMove);
    return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
  }, [hasMouseMoved]);

  // Dynamic PWA / Web App Installation Prompt State & Platform Detection
  const [deviceOS, setDeviceOS] = useState<'ios' | 'android' | 'desktop'>('desktop');
  const [showPwaPrompt, setShowPwaPrompt] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    let detectedOS: 'ios' | 'android' | 'desktop' = 'desktop';
    if (/iphone|ipad|ipod/.test(ua)) {
      detectedOS = 'ios';
    } else if (/android/.test(ua)) {
      detectedOS = 'android';
    }
    setDeviceOS(detectedOS);

    // Detect if already installed / standalone
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches 
      || (navigator as any).standalone 
      || document.referrer.includes('android-app://');

    if (!isStandalone) {
      const timer = setTimeout(() => {
        const isDismissed = localStorage.getItem('dismiss_pwa_install_v2');
        if (!isDismissed) {
          setShowPwaPrompt(true);
        }
      }, 4000); // Delay so the luxury introduction load isn't interrupted
      return () => clearTimeout(timer);
    }
  }, []);

  // Authentication
  const [currentUser, setCurrentUser] = useState<Usuario | null>(() => {
    const saved = localStorage.getItem('agendei_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Authentication Fields
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [emailField, setEmailField] = useState('');
  const [senhaField, setSenhaField] = useState('');
  const [nomeField, setNomeField] = useState('');
  const [roleField, setRoleField] = useState<'dono' | 'profissional' | 'cliente'>('cliente');
  const [authError, setAuthError] = useState('');
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Booking Flow State (for client booking a service inside store details)
  const [bookingService, setBookingService] = useState<Servico | null>(null);
  const [bookingProfissional, setBookingProfissional] = useState<Profissional | null>(null);
  const [bookingDate, setBookingDate] = useState<string>(''); // YYYY-MM-DD
  const [bookingTime, setBookingTime] = useState<string>(''); // HH:mm
  const [existingBookingsForProf, setExistingBookingsForProf] = useState<Agendamento[]>([]);
  const [bookingSuccessModal, setBookingSuccessModal] = useState(false);

  // Pix payment integrations
  const [showPixModal, setShowPixModal] = useState(false);

  // Dashboards States
  const [dashboardAgendamentos, setDashboardAgendamentos] = useState<any[]>([]);
  const [dashboardServicos, setDashboardServicos] = useState<Servico[]>([]);
  const [dashboardProfissionais, setDashboardProfissionais] = useState<Profissional[]>([]);

  // Owner Panel Forms
  const [newServiceForm, setNewServiceForm] = useState({ nome: '', preco: '', duracao: '30', categoria: 'Unhas', imagem: '' });
  const [newProfForm, setNewProfForm] = useState({ nome: '', especialidade: '', foto: '' });

  // Catalog search and filter
  const [serviceSearch, setServiceSearch] = useState('');
  const [serviceCategory, setServiceCategory] = useState('Todos');
  const [editingService, setEditingService] = useState<any | null>(null);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (title: string, message: string, type: 'success' | 'whatsapp') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 6000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // On mount: load standard single premium store
  useEffect(() => {
    loadStoreData();
  }, []);

  const loadStoreData = async () => {
    setLoading(true);
    try {
      const resp = await fetch('/api/lojas/nucleo-autoestima');
      if (resp.ok) {
        const data = await resp.json();
        setSelectedLojaDetail(data);
      }
      const pResp = await fetch('/api/produtos?loja_id=loja-1');
      if (pResp.ok) {
        setStoreProducts(await pResp.json());
      }
    } catch (e) {
      console.error("Erro ao ler dados da loja exclusiva:", e);
    } finally {
      setLoading(false);
    }
  };

  // Auth Submit Handlers
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    try {
      const resp = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailField, senha: senhaField })
      });
      const data = await resp.json();
      if (!resp.ok) {
        setAuthError(data.error || 'Erro ao fazer login');
        return;
      }
      localStorage.setItem('agendei_user', JSON.stringify(data.user));
      setCurrentUser(data.user);
      setShowAuthModal(false);
      addToast('Acesso Autorizado', `Bem-vinda(o) de volta, ${data.user.nome}!`, 'success');
      setCurrentView('store-detail');
      setEmailField('');
      setSenhaField('');
    } catch (err) {
      setAuthError('Erro de conexão com o servidor de autenticação');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    try {
      const resp = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: nomeField,
          email: emailField,
          senha: senhaField,
          tipo: roleField,
          loja_id: 'loja-1' // Associa automaticamente à única loja do sistema
        })
      });
      const data = await resp.json();
      if (!resp.ok) {
        setAuthError(data.error || 'Erro no cadastro');
        return;
      }
      localStorage.setItem('agendei_user', JSON.stringify(data.user));
      setCurrentUser(data.user);
      setShowAuthModal(false);
      addToast('Cadastro Efetuado', 'Sua conta de atendimento foi criada com sucesso.', 'success');
      setCurrentView('store-detail');
      setNomeField('');
      setEmailField('');
      setSenhaField('');
    } catch (err) {
      setAuthError('Erro na comunicação do servidor.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('agendei_user');
    setCurrentUser(null);
    setCurrentView('store-detail');
    addToast('Até breve!', 'Você se desconectou com segurança.', 'success');
  };

  // Auto login shortcuts for demonstration
  const handleQuietLogin = async (email: string, pass: string) => {
    try {
      const resp = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha: pass })
      });
      if (resp.ok) {
        const data = await resp.json();
        localStorage.setItem('agendei_user', JSON.stringify(data.user));
        setCurrentUser(data.user);
        addToast('Conectado de Forma Rápida', `Bem-vindo: ${data.user.nome} (${data.user.tipo})`, 'success');
        setCurrentView('dashboard');
        setShowAuthModal(false);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Fetch contextual statistics for the active user's dashboard view
  useEffect(() => {
    if (currentUser) {
      loadDashboardData();
    }
  }, [currentUser, currentView]);

  const loadDashboardData = async () => {
    if (!currentUser) return;

    try {
      const lojaId = 'loja-1';

      if (currentUser.tipo === 'dono' || currentUser.tipo === 'admin' || currentUser.tipo === 'super_admin') {
        const sResp = await fetch(`/api/servicos?loja_id=${lojaId}`);
        const pResp = await fetch(`/api/profissionais?loja_id=${lojaId}`);
        const aResp = await fetch(`/api/agendamentos?loja_id=${lojaId}`);
        const prResp = await fetch(`/api/produtos?loja_id=${lojaId}`);

        if (sResp.ok) setDashboardServicos(await sResp.json());
        if (pResp.ok) setDashboardProfissionais(await pResp.json());
        if (aResp.ok) setDashboardAgendamentos(await aResp.json());
        if (prResp.ok) setDashboardProdutos(await prResp.json());

        // Also sync business hours
        const storeResp = await fetch(`/api/lojas/${lojaId}`);
        if (storeResp.ok) {
          const storeInfo = await storeResp.json();
          if (storeInfo && storeInfo.loja) {
            setStoreHours({
              inicio: storeInfo.loja.horario_funcionamento.inicio || "08:00",
              fim: storeInfo.loja.horario_funcionamento.fim || "18:00",
              intervalo_inicio: storeInfo.loja.horario_funcionamento.intervalo_inicio || "11:40",
              intervalo_fim: storeInfo.loja.horario_funcionamento.intervalo_fim || "13:40",
              split_shift_enabled: storeInfo.loja.horario_funcionamento.split_shift_enabled !== false
            });
          }
        }
      }

      if (currentUser.tipo === 'profissional') {
        const profId = currentUser.profissional_id || 'prof-1';
        const aResp = await fetch(`/api/agendamentos?profissional_id=${profId}`);
        if (aResp.ok) setDashboardAgendamentos(await aResp.json());
      }

      if (currentUser.tipo === 'cliente') {
        const aResp = await fetch(`/api/agendamentos?cliente_id=${currentUser.id}`);
        if (aResp.ok) setDashboardAgendamentos(await aResp.json());
      }
    } catch (err) {
      console.error("Erro ao carregar dados do painel:", err);
    }
  };

  // Management Add Actions (Dono de espaço)
  const handleAddService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    try {
      const resp = await fetch('/api/servicos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newServiceForm,
          id: editingService ? editingService.id : undefined,
          loja_id: 'loja-1',
          preco: parseFloat(newServiceForm.preco)
        })
      });

      if (resp.ok) {
        if (editingService) {
          addToast('Serviço atualizado', 'O procedimento foi atualizado com sucesso.', 'success');
          setEditingService(null);
        } else {
          addToast('Serviço adicionado', 'O catálogo de beleza foi atualizado com sucesso', 'success');
        }
        setNewServiceForm({ nome: '', preco: '', duracao: '30', categoria: 'Unhas', imagem: '' });
        loadStoreData(); // Refresh consumer view
        loadDashboardData();
      } else {
        const err = await resp.json();
        alert(err.error || "Erro ao salvar");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteService = async (id: string) => {
    if (!confirm("Tem certeza que deseja remover este serviço permanentemente?")) return;
    try {
      const resp = await fetch(`/api/servicos/${id}`, { method: 'DELETE' });
      if (resp.ok) {
        addToast('Serviço removido', 'O item foi deletado com sucesso do Studio.', 'success');
        if (editingService && editingService.id === id) {
          setEditingService(null);
          setNewServiceForm({ nome: '', preco: '', duracao: '30', categoria: 'Unhas', imagem: '' });
        }
        loadStoreData(); // Refresh consumer view
        loadDashboardData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleStartEditService = (serv: Servico) => {
    setEditingService(serv);
    setNewServiceForm({
      nome: serv.nome,
      preco: serv.preco.toString(),
      duracao: serv.duracao.toString(),
      categoria: serv.categoria,
      imagem: serv.imagem || ''
    });
  };

  const handleCancelEditService = () => {
    setEditingService(null);
    setNewServiceForm({ nome: '', preco: '', duracao: '30', categoria: 'Unhas', imagem: '' });
  };

  const handleAddProf = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    try {
      const resp = await fetch('/api/profissionais', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newProfForm,
          loja_id: 'loja-1'
        })
      });

      if (resp.ok) {
        addToast('Profissional adicionada(o)', 'Nova colaboradora especializada catalogada com sucesso.', 'success');
        setNewProfForm({ nome: '', especialidade: '', foto: '' });
        loadStoreData(); // Refresh consumer view
        loadDashboardData();
      } else {
        const err = await resp.json();
        alert(err.error || "Erro ao adicionar");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteProf = async (id: string) => {
    if (!confirm("Tem certeza que deseja desvincular este profissional do Studio?")) return;
    try {
      const resp = await fetch(`/api/profissionais/${id}`, { method: 'DELETE' });
      if (resp.ok) {
        addToast('Profissional removido', 'O profissional foi desvinculado do espaço.', 'success');
        loadStoreData(); // Refresh consumer view
        loadDashboardData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Create booking process
  const triggerOpenBooking = (service: Servico) => {
    if (!currentUser) {
      setAuthMode('login');
      setShowAuthModal(true);
      addToast('Autenticação Pendente', 'Por favor, acesse sua conta de cliente para reservar seu horário.', 'success');
      return;
    }
    setBookingService(service);
    
    // Auto select first professional matching specialty as default backup
    const matchingProfs = selectedLojaDetail?.profissionais.filter(prof => {
      const category = (service.categoria || '').toLowerCase();
      const spec = (prof.especialidade || '').toLowerCase();
      
      if (category.includes('unha') || category.includes('manicure') || category.includes('pedicure')) {
        return spec.includes('unha') || spec.includes('manicure') || spec.includes('pedicure') || spec.includes('gel');
      }
      if (category.includes('cílio') || category.includes('cilio') || category.includes('lash')) {
        return spec.includes('cílio') || spec.includes('cilio') || spec.includes('lash') || spec.includes('lifting');
      }
      if (category.includes('sobrancelha') || category.includes('brow') || category.includes('design')) {
        return spec.includes('sobrancelha') || spec.includes('brow') || spec.includes('design') || spec.includes('lamination');
      }
      if (category.includes('cabelo') || category.includes('escova') || category.includes('corte') || category.includes('color')) {
        return spec.includes('cabelo') || spec.includes('cabeleireira') || spec.includes('color') || spec.includes('corte') || spec.includes('escova');
      }
      if (category.includes('estética') || category.includes('estetica') || category.includes('spa') || category.includes('dermo')) {
        return spec.includes('estética') || spec.includes('estetica') || spec.includes('spa') || spec.includes('dermo') || spec.includes('fisioterapeuta') || spec.includes('masso');
      }
      const words = category.split(/[\s/]+/);
      return words.some(word => word.length > 2 && spec.includes(word)) || spec.includes(category) || category.includes(spec);
    }) || [];

    const defaultProf = matchingProfs[0] || null;
    setBookingProfissional(defaultProf);
    
    // Select default date of tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().substring(0, 10);
    setBookingDate(tomorrowStr);
    setBookingTime('');
    
    // Pull active bookings
    fetchExistingBookingsAndSelect(defaultProf?.id || '');
  };

  const handleSelectBookingProfessional = (prof: Profissional) => {
    setBookingProfissional(prof);
    fetchExistingBookingsAndSelect(prof.id);
  };

  const fetchExistingBookingsAndSelect = async (profId: string) => {
    if (!profId) return;
    try {
      const resp = await fetch(`/api/agendamentos?profissional_id=${profId}`);
      if (resp.ok) {
        const list = await resp.json();
        setExistingBookingsForProf(list);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Generate valid 15-minute time slots in store operating hours (respecting split lunch shifts)
  const generateAvailableSlots = () => {
    if (!selectedLojaDetail || !bookingService || !bookingDate) return [];

    const { inicio, fim, intervalo_inicio, intervalo_fim, split_shift_enabled } = selectedLojaDetail.loja.horario_funcionamento;
    const startMin = parseInt(inicio.split(':')[0]) * 60 + parseInt(inicio.split(':')[1]);
    const endMin = parseInt(fim.split(':')[0]) * 60 + parseInt(fim.split(':')[1]);

    const breakStart = intervalo_inicio || "11:40";
    const breakEnd = intervalo_fim || "13:40";

    const breakStartMin = parseInt(breakStart.split(':')[0]) * 60 + parseInt(breakStart.split(':')[1]);
    const breakEndMin = parseInt(breakEnd.split(':')[0]) * 60 + parseInt(breakEnd.split(':')[1]);

    const slots: string[] = [];

    // Intervals of 15 minutes
    for (let time = startMin; time < endMin; time += 15) {
      const hh = Math.floor(time / 60).toString().padStart(2, '0');
      const mm = (time % 60).toString().padStart(2, '0');
      const timeStr = `${hh}:${mm}`;

      const servDuration = bookingService.duracao;
      const proposedStart = time;
      const proposedEnd = time + servDuration;

      // Limit slots according to split shifts (Turn 1 or Turn 2 only)
      if (split_shift_enabled) {
        const inTurn1 = (proposedStart >= startMin && proposedEnd <= breakStartMin);
        const inTurn2 = (proposedStart >= breakEndMin && proposedEnd <= endMin);
        if (!inTurn1 && !inTurn2) {
          continue; // Falls inside the lunch rest or overlaps into it
        }
      }

      const keyDateTime = `${bookingDate} ${timeStr}`;
      const proposedStartDateObj = new Date(`${bookingDate}T${timeStr}`);
      const proposedEndDateObj = new Date(proposedStartDateObj.getTime() + servDuration * 60 * 1000);

      let isOccupied = false;

      for (const booking of existingBookingsForProf) {
        if (booking.status === 'cancelado') continue;

        const bookingStart = new Date(booking.data_hora.replace(' ', 'T'));
        const bookingDur = booking.servico_duracao || 30;
        const bookingEnd = new Date(bookingStart.getTime() + bookingDur * 60 * 1000);

        const bookingDateOnly = booking.data_hora.split(' ')[0];
        if (bookingDateOnly === bookingDate) {
          if (proposedStartDateObj < bookingEnd && proposedEndDateObj > bookingStart) {
            isOccupied = true;
            break;
          }
        }
      }

      if (!isOccupied) {
        slots.push(timeStr);
      }
    }

    return slots;
  };

  // Finish scheduling checkout flow
  const handleCheckoutIntent = () => {
    if (!bookingService || !bookingProfissional || !bookingDate || !bookingTime || !selectedLojaDetail) {
      alert("Por favor selecione profissional, data e hora.");
      return;
    }
    setShowPixModal(true);
  };

  const handleConfirmBooking = async () => {
    if (!currentUser || !bookingService || !bookingProfissional || !bookingDate || !bookingTime || !selectedLojaDetail) {
      return;
    }

    const payload = {
      cliente_id: currentUser.id,
      profissional_id: bookingProfissional.id,
      servico_id: bookingService.id,
      loja_id: 'loja-1',
      data_hora: `${bookingDate} ${bookingTime}`
    };

    try {
      const resp = await fetch('/api/agendamentos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await resp.json();

      if (resp.ok) {
        setShowPixModal(false);
        setBookingSuccessModal(true);

        addToast(
          'Agendamento Confirmado',
          `Seu horário para ${bookingService.nome} foi agendado de forma segura!`,
          'success'
        );

        // Simulando envio de mensagem via WhatsApp com layout rosa-preto
        setTimeout(() => {
          addToast(
            'Lembrete WhatsApp',
            `Olá ${currentUser.nome}, seu horário no Núcleo de Autoestima de ${bookingService.nome} está agendado e confirmado para ${bookingDate} às ${bookingTime}!`,
            'whatsapp'
          );
        }, 3200);

        // Reset details state
        setBookingService(null);
        setBookingProfissional(null);
        setBookingDate('');
        setBookingTime('');
      } else {
        alert(data.error || "Erro ao agendar.");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleCancelBooking = async (id: string) => {
    if (!confirm("Deseja realmente cancelar este agendamento?")) return;
    try {
      const resp = await fetch(`/api/agendamentos/${id}/status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'cancelado' })
      });
      if (resp.ok) {
        addToast('Agendamento Cancelado', 'A reserva foi cancelada e o horário foi liberado.', 'success');
        loadDashboardData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Product & Schedule management handlers
  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const resp = await fetch('/api/produtos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: editingProduct ? editingProduct.id : undefined,
          loja_id: 'loja-1',
          nome: newProductForm.nome,
          preco: parseFloat(newProductForm.preco) || 0,
          estoque: parseInt(newProductForm.estoque) || 0,
          categoria: newProductForm.categoria,
          imagem: newProductForm.imagem
        })
      });
      if (resp.ok) {
        if (editingProduct) {
          addToast('Produto Atualizado', 'O item da Boutique foi atualizado com sucesso!', 'success');
          setEditingProduct(null);
        } else {
          addToast('Produto Adicionado', 'O novo item da Boutique foi cadastrado com sucesso!', 'success');
        }
        setNewProductForm({ nome: '', preco: '', estoque: '10', categoria: 'Cílios', imagem: '' });
        loadDashboardData();
        loadStoreData(); // update client view too
      } else {
        const err = await resp.json();
        alert(err.error || "Erro ao salvar produto");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Tem certeza que deseja apagar este produto da Boutique?")) return;
    try {
      const resp = await fetch(`/api/produtos/${id}`, { method: 'DELETE' });
      if (resp.ok) {
        addToast('Produto Removido', 'O item foi retirado do catálogo com sucesso.', 'success');
        if (editingProduct && editingProduct.id === id) {
          setEditingProduct(null);
          setNewProductForm({ nome: '', preco: '', estoque: '10', categoria: 'Cílios', imagem: '' });
        }
        loadDashboardData();
        loadStoreData(); // update client view too
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleStartEditProduct = (prod: any) => {
    setEditingProduct(prod);
    setNewProductForm({
      nome: prod.nome,
      preco: prod.preco.toString(),
      estoque: prod.estoque.toString(),
      categoria: prod.categoria,
      imagem: prod.imagem || ''
    });
  };

  const handleCancelEditProduct = () => {
    setEditingProduct(null);
    setNewProductForm({ nome: '', preco: '', estoque: '10', categoria: 'Cílios', imagem: '' });
  };

  const handleUpdateStoreSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const resp = await fetch('/api/lojas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: 'loja-1',
          nome: selectedLojaDetail?.loja?.nome || 'Núcleo de Autoestima',
          endereco: selectedLojaDetail?.loja?.endereco || 'Rua Rio Tibre, 291 - Novo Riacho, Contagem - MG',
          telefone: selectedLojaDetail?.loja?.telefone || '(31) 99296-5461 / (31) 98693-9893',
          slug: 'nucleo-autoestima',
          horario_funcionamento: {
            inicio: storeHours.inicio,
            fim: storeHours.fim,
            intervalo_inicio: storeHours.intervalo_inicio,
            intervalo_fim: storeHours.intervalo_fim,
            split_shift_enabled: storeHours.split_shift_enabled
          }
        })
      });
      if (resp.ok) {
        addToast('Horário do Studio Atualizado', 'A agenda de turnos foi reconfigurada com sucesso!', 'success');
        loadStoreData();
        loadDashboardData();
      } else {
        const err = await resp.json();
        alert(err.error || "Erro ao atualizar horário");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-neutral-900 flex flex-col font-sans selection:bg-pink-150 selection:text-pink-900 overflow-x-hidden">
      
      {/* Simulation Premium Banner (Black with Pink highlights) */}
      <header className="bg-black text-white text-[10px] sm:text-xs py-2 px-3 sm:px-4 flex justify-between items-center z-10 font-mono border-b border-pink-700/30">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="inline-block w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-pink-500 animate-ping shrink-0"></span>
          <span className="truncate">ESTADO: <b className="text-pink-400">Atendimento Exclusivo</b> • Em Tempo Real</span>
        </div>
        <div className="hidden md:flex gap-3 items-center">
          <span>Acesso Atual: <b>{currentUser ? `${currentUser.nome} (${currentUser.tipo.toUpperCase()})` : 'Visitante'}</b></span>
        </div>
      </header>

      {/* Primary Portal Navigation Menu - Pink, Black and White */}
      <nav className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-pink-100 py-2.5 sm:py-3.5 px-3 sm:px-6 flex justify-between items-center z-40 shadow-xs gap-2">
        <div
          onClick={() => setCurrentView('store-detail')}
          className="flex items-center gap-1.5 sm:gap-2.5 cursor-pointer hover:opacity-90 select-none animate-fade-in shrink-0"
        >
          <div className="bg-black text-pink-400 p-1.5 sm:p-2 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg shadow-pink-500/10 border border-neutral-800 shrink-0">
            <Scissors className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div>
            <span className="font-extrabold text-sm sm:text-base md:text-lg tracking-tight text-neutral-950 flex items-center gap-1 sm:gap-1.5 whitespace-nowrap">
              Núcleo de <span className="text-pink-600">Autoestima</span>
            </span>
            <p className="hidden xs:block text-[8px] sm:text-[9px] text-zinc-500 -mt-0.5 font-bold uppercase tracking-wider">A mudança que você quer está aqui!!</p>
          </div>
        </div>

        {/* Action Panel and Shortcut options */}
        <div className="flex items-center gap-2 sm:gap-4 leading-none select-none">
          <button
            onClick={() => setCurrentView('store-detail')}
            className={`text-xs sm:text-sm font-semibold transition-colors hover:text-pink-650 cursor-pointer whitespace-nowrap ${
              currentView === 'store-detail' ? 'text-pink-600 font-bold' : 'text-neutral-500'
            }`}
          >
            <span className="xs:hidden">Agendar</span>
            <span className="hidden xs:inline">Agendar Horário</span>
          </button>

          {currentUser && (
            <button
              onClick={() => setCurrentView('dashboard')}
              className={`text-xs sm:text-sm font-semibold transition-colors hover:text-pink-650 cursor-pointer flex items-center gap-1 whitespace-nowrap ${
                currentView === 'dashboard' ? 'text-pink-600 font-bold' : 'text-neutral-500'
              }`}
            >
              <Activity className="w-3.5 h-3.5 text-pink-500 hidden sm:inline shrink-0" />
              <span className="xs:hidden">Painel</span>
              <span className="hidden xs:inline">Meu Painel</span>
            </button>
          )}

          {currentUser ? (
            <div className="flex items-center gap-1.5 sm:gap-2 pl-1.5 sm:pl-2 border-l border-neutral-200 shrink-0">
              <span className="hidden lg:inline-block text-xs font-bold text-neutral-800 bg-pink-50/50 py-1 px-2.5 rounded-lg border border-pink-100/40 truncate max-w-[100px]">
                Olá, {currentUser.nome.split(' ')[0]}
              </span>
              <a
                href="https://instagram.com/layon.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 px-2 py-1.5 sm:px-3 sm:py-1.5 bg-gradient-to-r from-pink-500 via-pink-600 to-purple-600 hover:scale-102 hover:opacity-95 text-white text-[10px] sm:text-xs font-bold rounded-lg sm:rounded-xl transition-all shadow-sm shrink-0"
                title="Siga @layon.dev no Instagram"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">@layon.dev</span>
              </a>
              <button
                onClick={handleLogout}
                className="p-1 sm:p-2 text-neutral-400 hover:text-red-500 hover:bg-neutral-100 rounded-lg sm:rounded-xl transition-all cursor-pointer shrink-0"
                title="Desconectar"
              >
                <LogOut className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 sm:gap-2 pl-1.5 sm:pl-2 border-l border-neutral-200 shrink-0">
              <a
                href="https://instagram.com/layon.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 px-2 py-1.5 sm:px-3 sm:py-2 bg-gradient-to-r from-pink-500 via-pink-600 to-purple-600 hover:scale-102 hover:opacity-95 text-white text-[10px] sm:text-xs font-bold rounded-lg sm:rounded-xl transition-all shadow-sm text-center shrink-0"
                title="Siga @layon.dev no Instagram"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">@layon.dev</span>
              </a>
              <button
                onClick={() => {
                  setAuthMode('login');
                  setShowAuthModal(true);
                }}
                className="px-2.5 py-1.5 sm:px-4 sm:py-2 bg-black hover:bg-neutral-900 border border-neutral-800 text-pink-400 text-[10px] sm:text-xs font-extrabold rounded-lg sm:rounded-xl transition-all shadow-md cursor-pointer flex items-center gap-1 shrink-0"
              >
                <User className="w-3.5 h-3.5 text-pink-400" />
                <span className="hidden xs:inline">Entrar</span>
              </button>
            </div>
          )}
        </div>
      </nav>

      <main className="flex-1 pb-16">
        
        {/* COMPACT FLOATING ACCESSIBILITY TEST PANEL (Saves precious assessment clicks!) */}
        <div className="bg-white border-y border-pink-100 py-3 px-6 shadow-sm">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
            <span className="text-[10px] font-bold text-black uppercase tracking-widest flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-pink-500" /> Atalho para Teste de Perfis (Apenas 1 clique):
            </span>
            <div className="flex flex-wrap gap-2 justify-center">
              <button
                onClick={() => handleQuietLogin('dona@glamour.com', 'glamour')}
                className="px-3 py-1 bg-black text-pink-400 text-xs font-bold rounded-lg border border-neutral-800 hover:bg-neutral-900 transition-all cursor-pointer"
              >
                🔑 Entrar como Dona Carla (Gestão)
              </button>
              <button
                onClick={() => handleQuietLogin('ana@glamour.com', 'ana')}
                className="px-3 py-1 bg-white text-neutral-800 text-xs font-semibold rounded-lg border border-neutral-200 hover:bg-neutral-50 transition-all cursor-pointer"
              >
                👩‍🦰 Profissional (Ana)
              </button>
              <button
                onClick={() => handleQuietLogin('mari@cliente.com', 'mari')}
                className="px-3 py-1 bg-pink-50 text-pink-700 text-xs font-semibold rounded-lg border border-pink-150 hover:bg-pink-100 transition-all cursor-pointer"
              >
                👤 Cliente Mariana
              </button>
            </div>
          </div>
        </div>

        {/* LOADING INDICATOR */}
        {loading && !selectedLojaDetail && (
          <div className="py-24 text-center">
            <div className="w-8 h-8 rounded-full border-2 border-pink-600 border-t-transparent animate-spin mx-auto mb-4"></div>
            <p className="text-sm text-neutral-500">Iniciando o Núcleo de Autoestima...</p>
          </div>
        )}

        {/* EXCLUSIVE STORE DETAIL VIEW (The beautiful single homepage of the boutique salon) */}
        {currentView === 'store-detail' && selectedLojaDetail && (
          <div className="max-w-6xl mx-auto px-4 mt-6 relative">
            
            {/* Elegant Parallax Floating Blur Particles (Luxury high-end feel) */}
            <div 
              className="absolute -top-12 -left-20 w-80 h-80 bg-pink-400/10 rounded-full blur-[110px] pointer-events-none z-0 transition-transform duration-200 ease-out" 
              style={{ transform: `translateY(${scrollY * 0.15}px) translateZ(0)` }}
            />
            <div 
              className="absolute top-72 -right-20 w-96 h-96 bg-purple-400/10 rounded-full blur-[130px] pointer-events-none z-0 transition-transform duration-200 ease-out" 
              style={{ transform: `translateY(${-scrollY * 0.1}px) translateZ(0)` }}
            />

            {/* Premium Header/Intro Grid: Ultra-professional split layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative z-10">
              
              {/* Left Column: High-End Editorial Brand-Identity Showcase */}
              <div className="lg:col-span-6 flex flex-col justify-between py-2.5">
                <div className="space-y-5">
                  
                  {/* Luxury Authenticity Badge */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] bg-black text-pink-400 font-extrabold tracking-widest px-3 py-1.5 rounded-lg border border-neutral-900 shadow-xs uppercase flex items-center gap-1.5 animate-pulse">
                      <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                      <span>Studio Glamour • Conceito Premium</span>
                    </span>
                    <span className="text-[10px] bg-pink-50 text-pink-700 font-bold tracking-wider px-2.5 py-1 rounded-md border border-pink-100 flex items-center gap-1">
                      <Check className="w-3 h-3 text-pink-600" />
                      <span>Atendimento Exclusivo</span>
                    </span>
                  </div>

                  {/* Sophisticated Editorial Headline */}
                  <div className="space-y-3">
                    <h1 className="text-4xl md:text-[3.2rem] font-black tracking-tight text-neutral-950 leading-tight">
                      O Templo do <br className="hidden md:inline" />
                      <span className="bg-gradient-to-r from-pink-600 via-pink-700 to-purple-600 bg-clip-text text-transparent">
                        Autocuidado e Elegância
                      </span>
                    </h1>
                    <p className="text-sm text-neutral-600 leading-relaxed font-sans max-w-xl">
                      Muito mais do que um espaço de beleza: um santuário de autoestima. Unimos as técnicas mais avançadas, profissionais especialistas de elite e protocolos personalizados para esculpir a sua melhor versão.
                    </p>
                  </div>

                  {/* High Conversion Real-Time Status Counters */}
                  <div className="grid grid-cols-3 gap-3 border-y border-neutral-150 py-4 max-w-lg">
                    <div className="text-left">
                      <span className="block text-xl font-black text-neutral-900 tracking-tight">★ 4.9</span>
                      <span className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider font-mono">1.2k+ Avaliações</span>
                    </div>
                    <div className="text-left border-l border-neutral-100 pl-4">
                      <span className="block text-xl font-black text-neutral-900 tracking-tight">4 Vagas</span>
                      <span className="block text-[10px] font-bold text-pink-600 uppercase tracking-wider font-mono">Restantes Hoje</span>
                    </div>
                    <div className="text-left border-l border-neutral-100 pl-4">
                      <span className="block text-xl font-black text-neutral-900 tracking-tight">100%</span>
                      <span className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider font-mono">Materiais Estéreis</span>
                    </div>
                  </div>

                  {/* Interactive Persuasive Navigation Bar & Quick Action */}
                  <div className="bg-gradient-to-tr from-neutral-50 to-[#fafafa] border border-neutral-200/60 rounded-2xl p-4 max-w-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl bg-pink-100 text-pink-700 flex items-center justify-center font-bold text-sm shrink-0">
                        ✨
                      </div>
                      <div>
                        <h4 className="text-xs font-extrabold text-neutral-900">Agenda Pronta para Você</h4>
                        <p className="text-[11px] text-neutral-500 mt-0.5">Selecione um de nossos rituais premium abaixo para iniciar seu agendamento instantâneo com confirmação em tempo real.</p>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Inline boutique hours and lunch interval chips */}
                <div className="flex flex-col sm:flex-row gap-2 mt-6 justify-start items-start sm:items-center text-[11px] text-neutral-500">
                  <span className="flex items-center gap-1.5 bg-neutral-100 text-neutral-700 px-3 py-1.5 rounded-lg border border-neutral-200/50 font-medium">
                    <Clock className="w-3.5 h-3.5 text-pink-600" />
                    Manhã: <b>{selectedLojaDetail.loja.horario_funcionamento.inicio} - {selectedLojaDetail.loja.horario_funcionamento.intervalo_inicio || "11:40"}</b>
                  </span>
                  <span className="hidden sm:inline text-neutral-300">/</span>
                  <span className="flex items-center gap-1.5 bg-neutral-100 text-neutral-700 px-3 py-1.5 rounded-lg border border-neutral-200/50 font-medium font-sans">
                    <Clock className="w-3.5 h-3.5 text-pink-600" />
                    Tarde: <b>{selectedLojaDetail.loja.horario_funcionamento.intervalo_fim || "13:40"} - {selectedLojaDetail.loja.horario_funcionamento.fim || "18:00"}</b>
                  </span>
                  <span className="flex items-center gap-1 bg-pink-50 text-pink-800 border border-pink-100 px-3 py-1.5 rounded-lg font-bold">
                    <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping shrink-0" />
                    Almoço: {selectedLojaDetail.loja.horario_funcionamento.intervalo_inicio || "11:40"} às {selectedLojaDetail.loja.horario_funcionamento.intervalo_fim || "13:40"}
                  </span>
                </div>

              </div>

              {/* Right Column: 3D-Tilting Mirror Slide with Rich Aesthetic Effects */}
              <div className="lg:col-span-6 flex flex-col justify-center relative">
                <div className="perspective-1000">
                  <motion.div
                    style={{
                      rotateX: tiltX,
                      rotateY: tiltY,
                      transformStyle: 'preserve-3d',
                    }}
                    onMouseMove={handleHeroMouseMove}
                    onMouseLeave={handleHeroMouseLeave}
                    className="bg-black text-white border border-neutral-800/80 rounded-[2.5rem] shadow-2xl overflow-hidden relative transition-all duration-300 ease-out cursor-pointer group"
                  >
                    
                    {/* Glossy Reflective overlay mimicking fine high-end glass mirror reflection (cards espelhados) */}
                    <div 
                      className="absolute inset-0 pointer-events-none z-20 transition-opacity duration-300"
                      style={{
                        background: isHovered 
                          ? `radial-gradient(circle 380px at ${shineX}% ${shineY}%, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 80%), linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 60%)`
                          : 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 50%)',
                        mixBlendMode: 'overlay'
                      }}
                    />

                    {/* Image/Slider content viewport with high-contrast depths */}
                    <div className="h-[390px] md:h-[430px] relative flex flex-col justify-between p-6 md:p-8 transition-all duration-1000 ease-in-out">
                      
                      {/* Background Image with luxury dark lighting */}
                      <div 
                        className="absolute inset-0 bg-cover bg-center transition-all duration-700 pointer-events-none z-0" 
                        style={{ 
                          backgroundImage: `url('${slides[currentSlide].image}')`,
                          filter: 'brightness(0.24) contrast(1.1) saturate(1.15)' 
                        }}
                      />

                      {/* Luxurious Dark Vignette Plate */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent z-0 pointer-events-none" />
                      
                      {/* Top slide badge banner (3D Translation Layer) */}
                      <div 
                        style={{ transform: 'translateZ(30px)' }}
                        className="relative z-10 flex justify-between items-center"
                      >
                        <span className="text-[10px] bg-pink-600/90 backdrop-blur-md text-white font-black tracking-widest px-3.5 py-1.5 rounded-full uppercase border border-pink-500/55 shadow-lg flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-white animate-spin" style={{ animationDuration: '6s' }} />
                          <span>{slides[currentSlide].pill}</span>
                        </span>
                        <span className="text-[10px] bg-black/60 backdrop-blur-md text-pink-400 font-bold px-3 py-1.5 rounded-lg border border-pink-700/35 uppercase font-mono tracking-wider">
                          Agenda Aberta ☑
                        </span>
                      </div>

                      {/* Main Center Title & Persuasion Headlines (3D depth text) */}
                      <div 
                        style={{ transform: 'translateZ(50px)' }} 
                        className="relative z-10 max-w-xl my-auto pt-4 flex flex-col justify-center text-left"
                      >
                        <motion.div
                          key={currentSlide}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.55 }}
                        >
                          <p className="text-pink-500 text-[10px] font-black uppercase tracking-widest mb-1 font-mono">Destaque do Mês</p>
                          <h2 className="text-2xl md:text-[2.2rem] font-black tracking-tight leading-10 text-white drop-shadow-md">
                            {slides[currentSlide].title}
                          </h2>
                          <p className="text-xs md:text-sm text-pink-100/90 font-medium mt-1.5 leading-snug font-sans">
                            {slides[currentSlide].headline}
                          </p>
                          <p className="text-[11px] text-neutral-400 mt-2 leading-relaxed max-w-md hidden sm:block">
                            {slides[currentSlide].desc}
                          </p>
                          
                          {/* Persuasive Callout inside Slider */}
                          <div className="mt-4">
                            <div className="bg-pink-950/40 backdrop-blur-xs border border-pink-500/20 p-2.5 rounded-xl flex items-center gap-2 max-w-sm">
                              <span className="w-4 h-4 rounded-full bg-pink-500/20 flex items-center justify-center shrink-0">
                                <Check className="w-2.5 h-2.5 text-pink-400" />
                              </span>
                              <span className="text-[10px] text-pink-200 font-semibold">
                                {slides[currentSlide].cta}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      </div>

                      {/* Navigation Dots & Carousel Indicator controls */}
                      <div 
                        style={{ transform: 'translateZ(25px)' }}
                        className="relative z-10 flex justify-between items-center border-t border-white/10 pt-4"
                      >
                        <div className="flex gap-1.5">
                          {slides.map((_, idx) => (
                            <button
                              key={idx}
                              onClick={() => setCurrentSlide(idx)}
                              className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                                currentSlide === idx 
                                  ? 'bg-pink-500 w-5' 
                                  : 'bg-white/40 hover:bg-white/70'
                              }`}
                              title={`Slide ${idx + 1}`}
                            />
                          ))}
                        </div>
                        <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest bg-white/5 border border-white/5 px-2.5 py-1 rounded-md">
                          SG0{currentSlide + 1} / SG03
                        </span>
                      </div>

                    </div>
                  </motion.div>
                </div>

                {/* Elegant subtle Address Line directly floating below 3D card */}
                <div className="flex items-center justify-between px-4 mt-3 text-xs text-neutral-400 font-medium select-none">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-pink-600 shrink-0" />
                    <span>{selectedLojaDetail.loja.endereco}</span>
                  </span>
                  <span>Tel: {selectedLojaDetail.loja.telefone}</span>
                </div>

              </div>

            </div>

            {/* Core Columns */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-10">
              
              {/* Left Column: Salon Menu of services featuring large high-fidelity beauty cards */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                <div className="bg-[#fafafa]-50 border-0 rounded-3xl p-0">
                  <div className="flex flex-col mb-6">
                    <span className="text-[10px] font-bold text-pink-700 tracking-widest uppercase bg-pink-50 border border-pink-100/60 px-3 py-1 rounded-full w-max flex items-center gap-1 mb-2">
                      <Sparkles className="w-3.5 h-3.5 text-pink-600 animate-pulse" />
                      <span>Catálogo de Cuidados Exclusivos</span>
                    </span>
                    <h3 className="font-black text-2xl text-neutral-900 leading-tight">
                      Nossos Rituais Premium
                    </h3>
                    <p className="text-xs text-neutral-500 mt-1">
                      Toque no serviço desejado para visualizar as profissionais disponíveis e reservar o seu momento de beleza.
                    </p>
                  </div>

                  {/* Search and Category Filter Section */}
                  <div className="bg-white border border-neutral-150 p-4 rounded-3xl shadow-xs flex flex-col gap-3 mb-6">
                    <div className="relative">
                      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                      <input
                        type="text"
                        placeholder="Buscar por procedimento ou categoria (ex: Cílios, Unhas, Design...)"
                        value={serviceSearch}
                        onChange={(e) => setServiceSearch(e.target.value)}
                        className="w-full text-xs pl-10 pr-4 py-2.5 border border-neutral-150 rounded-2xl bg-[#fafafa] focus:ring-1 focus:ring-pink-500 outline-hidden font-medium"
                      />
                      {serviceSearch && (
                        <button
                          onClick={() => setServiceSearch('')}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-neutral-400 hover:text-neutral-700 cursor-pointer"
                        >
                          Limpar
                        </button>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar -mx-1 px-1">
                      {["Todos", "Unhas", "Cílios", "Sobrancelha", "Cabelo", "Estética"].map((cat) => {
                        const isActive = serviceCategory === cat;
                        return (
                          <button
                            key={cat}
                            onClick={() => setServiceCategory(cat)}
                            className={`px-3.5 py-1.5 rounded-xl font-bold text-[10px] uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap border ${
                              isActive
                                ? 'bg-black border-black text-pink-400 font-extrabold shadow-sm'
                                : 'bg-neutral-50 hover:bg-neutral-100 border-neutral-200 text-neutral-500'
                            }`}
                          >
                            {cat}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {(() => {
                    const filtered = selectedLojaDetail.servicos.filter(service => {
                      const matchesSearch = service.nome.toLowerCase().includes(serviceSearch.toLowerCase()) ||
                                            service.categoria.toLowerCase().includes(serviceSearch.toLowerCase());
                      const matchesCategory = serviceCategory === 'Todos' || service.categoria === serviceCategory;
                      return matchesSearch && matchesCategory;
                    });

                    if (filtered.length === 0) {
                      return (
                        <div className="py-12 bg-white/50 border border-neutral-150 border-dashed rounded-3xl text-center text-neutral-500 text-xs">
                          {serviceSearch || serviceCategory !== 'Todos' 
                            ? "Nenhum procedimento encontrado com os filtros aplicados." 
                            : "Nenhum serviço disponível no momento para esta loja."}
                        </div>
                      );
                    }

                    return (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {filtered.map((service, idx) => {
                          // Custom professional beauty taglines dynamically assigned for maximum trigger desire
                          let beautyTagline = "✦ Acabamento Exclusivo Elite";
                          let beautySpecList = "";
                          if (service.categoria === "Unhas") {
                            beautyTagline = "💅 Alinhamento em Gel & Fibra Portuguesa";
                            beautySpecList = "Gel Vòlia • Alongamento Ultrafino • 100% Higienizado • Cabine UV Selada";
                          } else if (service.categoria === "Cílios") {
                            beautyTagline = "✨ Isolamento Fio a Fio com Retenção Máxima";
                            beautySpecList = "Adesivo Elite • Espessura Premium Matte • Curvatura Soft • Zero Peso nos Olhos";
                          } else if (service.categoria === "Sobrancelha") {
                            beautyTagline = "📐 Design Geométrico & Harmonia Facial";
                            beautySpecList = "Mapeamento Dourado • Henna Importada • Epilação de Precisão • Acabamento Glow";
                          } else if (service.categoria === "Cabelo") {
                            beautyTagline = "💇‍♀️ Reconstrução Capilar Termo-Ativa";
                            beautySpecList = "Therapy Nutrição • Brilho Gloss Radiante • Secagem Modelada Sênior";
                          } else if (service.categoria === "Estética" || service.categoria === "Estética / Spa") {
                            beautyTagline = "🌸 Revitalização & Drenagem Dermo-Ativa";
                            beautySpecList = "Ativos Orgânicos • Alinhamento Linfático • Toque Relaxante Terapêutico";
                          }

                          const cardIsSelected = bookingService?.id === service.id;

                          return (
                            <motion.div
                              key={service.id}
                              initial={{ opacity: 0, y: 30 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true, margin: "-50px" }}
                              transition={{ duration: 0.5, delay: idx * 0.05, ease: "easeOut" }}
                              whileHover={{ y: -6, scale: 1.015 }}
                              onClick={() => {
                                triggerOpenBooking(service);
                                // Smooth scroll to scheduling Lounge on mobile device
                                const target = document.getElementById('booking-lounge');
                                if (target) {
                                  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                }
                              }}
                              className={`group relative overflow-hidden bg-white rounded-3xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                                cardIsSelected 
                                  ? 'border-pink-500 ring-2 ring-pink-500/20 shadow-pink-100 shadow-xl' 
                                  : 'border-neutral-150 shadow-md hover:shadow-xl hover:border-pink-300'
                              }`}
                            >
                              
                              {/* Decorative shiny reflective gradient bar on hover */}
                              <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-pink-400 via-pink-600 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

                              {/* Upper Half: Grand Visual Photo with elegant overlay */}
                              <div className="relative h-44 overflow-hidden bg-neutral-100 shrink-0">
                                <img
                                  src={service.imagem || "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=400"}
                                  alt={service.nome}
                                  className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
                                  referrerPolicy="no-referrer"
                                />
                                
                                {/* Dark subtle gradient overlay to support text reading */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />

                                {/* Price Badge over Image */}
                                <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md text-white px-3.5 py-1.5 rounded-2xl border border-white/10 font-black text-sm shadow-md">
                                  R$ {service.preco.toFixed(2)}
                                </div>

                                {/* Category Pill over Image */}
                                <div className="absolute top-3 left-3 flex gap-1.5 items-center">
                                  <span className="text-[9px] font-black uppercase tracking-widest bg-pink-600 text-white px-3 py-1 rounded-md border border-pink-500/35 shadow-sm">
                                    {service.categoria}
                                  </span>
                                </div>
                              </div>

                              {/* Lower Half: Copy persuasive descriptive section with high salon detail */}
                              <div className="p-5 flex-1 flex flex-col justify-between">
                                <div>
                                  <h4 className="font-extrabold text-base text-neutral-950 leading-snug group-hover:text-pink-700 transition-colors">
                                    {service.nome}
                                  </h4>
                                  
                                  <p className="text-[11px] text-pink-700 font-bold mt-1.5">
                                    {beautyTagline}
                                  </p>
                                  
                                  <p className="text-[10px] text-neutral-400 mt-1 font-mono tracking-tight leading-relaxed">
                                    {beautySpecList}
                                  </p>
                                </div>

                                {/* Duration / Action block */}
                                <div className="border-t border-neutral-100 mt-4 pt-3 flex items-center justify-between">
                                  <span className="flex items-center gap-1 font-bold text-neutral-500 bg-neutral-100 px-2 py-1 rounded-lg text-[10px]">
                                    <Clock className="w-3.5 h-3.5 text-neutral-400" />
                                    {service.duracao} minutos
                                  </span>

                                  <span className={`text-xs font-black transition-all flex items-center gap-1 ${
                                    cardIsSelected ? 'text-pink-600 font-extrabold' : 'text-black group-hover:text-pink-600'
                                  }`}>
                                    <span>{cardIsSelected ? 'Selecionado ✨' : 'Reservar Vaga'}</span>
                                    <ChevronRight className={`w-3.5 h-3.5 transition-transform ${cardIsSelected ? 'translate-x-1 text-pink-500' : 'group-hover:translate-x-1'}`} />
                                  </span>
                                </div>
                              </div>

                            </motion.div>
                          );
                        })}
                      </div>
                    );
                  })()}
                </div>

                {/* Visual Boutique Home Care Retail Corner */}
                <div className="bg-[#fafafa] border border-neutral-150 rounded-2xl p-5 shadow-xs">
                  <div className="flex justify-between items-center border-b border-neutral-100 pb-3 mb-4">
                    <h3 className="font-extrabold text-base text-neutral-900 flex items-center gap-2">
                      <ShoppingBag className="w-5 h-5 text-pink-500" />
                      <span>Boutique Home Care & Manutenção</span>
                    </h3>
                    <span className="text-[9px] bg-pink-50 border border-pink-100 text-pink-700 font-bold px-2 py-0.5 rounded-full uppercase">
                      SG Exclusivos
                    </span>
                  </div>
                  
                  <p className="text-xs text-neutral-500 mb-4 leading-relaxed">
                    Preserve a durabilidade da sua Extensão de Cílios, Unhas ou revitalização capilar com a nossa linha selecionada de manutenção em casa. Disponível para aquisição presencial no Studio:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {storeProducts.map((prod) => (
                      <div key={prod.id} className="border border-neutral-150 rounded-xl p-3 flex gap-3 hover:border-pink-200 transition-all bg-white relative">
                        <img 
                          src={prod.imagem || "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80&w=200"}
                          alt={prod.nome}
                          className="w-16 h-16 object-cover rounded-lg shrink-0 border border-neutral-200"
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div>
                            <span className="text-[8px] bg-neutral-100 text-neutral-500 font-bold uppercase px-1.5 py-0.2 rounded">
                              {prod.categoria}
                            </span>
                            <h4 className="font-bold text-xs text-neutral-950 truncate mt-0.5">{prod.nome}</h4>
                            <span className="text-[10px] text-neutral-400 block -mt-0.5 font-medium">Estoque: {prod.estoque} un</span>
                          </div>
                          <div className="flex items-center justify-between gap-1 mt-1">
                            <span className="font-extrabold text-neutral-900 text-xs">R$ {prod.preco.toFixed(2)}</span>
                            <button
                              onClick={() => {
                                addToast(
                                  "Produto Reservado",
                                  `O item "${prod.nome}" foi reservado e estará separado para retirada na sua próxima visita ao Studio Glamour!`,
                                  "success"
                                );
                              }}
                              className="px-2 py-1 bg-black text-pink-400 hover:bg-neutral-900 text-[10px] font-extrabold rounded-lg border border-neutral-850 transition-all cursor-pointer flex items-center gap-0.5"
                            >
                              <span>Reservar</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right Column: Live Booking System Wizard with custom ID for automatic smooth scroll navigation */}
              <div id="booking-lounge" className="lg:col-span-5 scroll-mt-24">
                <div className="sticky top-20 bg-white border border-neutral-150 rounded-2xl p-5 shadow-xs">
                  <h3 className="font-extrabold text-lg text-neutral-900 flex items-center gap-2 border-b border-neutral-100 pb-3">
                    <Calendar className="w-5 h-5 text-pink-500" />
                    <span>Reserva de Horário</span>
                  </h3>

                  {!bookingService ? (
                    <div className="py-12 text-center text-neutral-500">
                      <Sparkles className="w-10 h-10 text-pink-500/30 mx-auto mb-3 animate-pulse" />
                      <p className="font-bold text-sm text-neutral-800">Pronto para reservar?</p>
                      <p className="text-xs text-neutral-400 max-w-xs mx-auto mt-2 leading-relaxed">
                        Selecione ao lado qual de nossos procedimentos premium deseja desfrutar para habilitar a reserva.
                      </p>
                    </div>
                  ) : (
                    <div className="mt-4 flex flex-col gap-4">
                      
                      {/* Selected Service Recap */}
                      <div className="bg-pink-50/50 border border-pink-100 p-3 rounded-2xl flex items-center justify-between">
                        <div>
                          <span className="text-[9px] uppercase font-bold text-pink-700">Procedimento</span>
                          <span className="block font-bold text-neutral-950 text-sm">{bookingService.nome}</span>
                        </div>
                        <div className="text-right">
                          <span className="block font-extrabold text-pink-700 text-sm">R$ {bookingService.preco.toFixed(2)}</span>
                          <span className="block text-[10px] text-neutral-400">{bookingService.duracao} min de cuidado</span>
                        </div>
                      </div>

                      {/* Step 1: Select Professional */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-neutral-450 uppercase tracking-widest block text-neutral-500">
                            1. SELECIONE A PROFISSIONAL
                          </span>
                          <span className="text-[10px] bg-pink-50 text-pink-700 border border-pink-100 px-2 py-0.5 rounded-md font-extrabold flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-pink-500 animate-pulse" />
                            {bookingService.categoria}
                          </span>
                        </div>
                        {selectedLojaDetail.profissionais.filter(prof => {
                          const category = (bookingService.categoria || '').toLowerCase();
                          const spec = (prof.especialidade || '').toLowerCase();
                          
                          if (category.includes('unha') || category.includes('manicure') || category.includes('pedicure')) {
                            return spec.includes('unha') || spec.includes('manicure') || spec.includes('pedicure') || spec.includes('gel');
                          }
                          if (category.includes('cílio') || category.includes('cilio') || category.includes('lash')) {
                            return spec.includes('cílio') || spec.includes('cilio') || spec.includes('lash') || spec.includes('lifting');
                          }
                          if (category.includes('sobrancelha') || category.includes('brow') || category.includes('design')) {
                            return spec.includes('sobrancelha') || spec.includes('brow') || spec.includes('design') || spec.includes('lamination');
                          }
                          if (category.includes('cabelo') || category.includes('escova') || category.includes('corte') || category.includes('color')) {
                            return spec.includes('cabelo') || spec.includes('cabeleireira') || spec.includes('color') || spec.includes('corte') || spec.includes('escova');
                          }
                          if (category.includes('estética') || category.includes('estetica') || category.includes('spa') || category.includes('dermo')) {
                            return spec.includes('estética') || spec.includes('estetica') || spec.includes('spa') || spec.includes('dermo') || spec.includes('fisioterapeuta') || spec.includes('masso');
                          }
                          const words = category.split(/[\s/]+/);
                          return words.some(word => word.length > 2 && spec.includes(word)) || spec.includes(category) || category.includes(spec);
                        }).length === 0 ? (
                          <div className="text-xs text-neutral-500 italic py-3 bg-neutral-50 rounded-xl px-4 border border-dashed text-center">
                            Nenhuma designer especialista em {bookingService.categoria} disponível no momento.
                          </div>
                        ) : (
                          <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-1">
                            {selectedLojaDetail.profissionais.filter(prof => {
                              const category = (bookingService.categoria || '').toLowerCase();
                              const spec = (prof.especialidade || '').toLowerCase();
                              
                              if (category.includes('unha') || category.includes('manicure') || category.includes('pedicure')) {
                                return spec.includes('unha') || spec.includes('manicure') || spec.includes('pedicure') || spec.includes('gel');
                              }
                              if (category.includes('cílio') || category.includes('cilio') || category.includes('lash')) {
                                return spec.includes('cílio') || spec.includes('cilio') || spec.includes('lash') || spec.includes('lifting');
                              }
                              if (category.includes('sobrancelha') || category.includes('brow') || category.includes('design')) {
                                return spec.includes('sobrancelha') || spec.includes('brow') || spec.includes('design') || spec.includes('lamination');
                              }
                              if (category.includes('cabelo') || category.includes('escova') || category.includes('corte') || category.includes('color')) {
                                return spec.includes('cabelo') || spec.includes('cabeleireira') || spec.includes('color') || spec.includes('corte') || spec.includes('escova');
                              }
                              if (category.includes('estética') || category.includes('estetica') || category.includes('spa') || category.includes('dermo')) {
                                return spec.includes('estética') || spec.includes('estetica') || spec.includes('spa') || spec.includes('dermo') || spec.includes('fisioterapeuta') || spec.includes('masso');
                              }
                              const words = category.split(/[\s/]+/);
                              return words.some(word => word.length > 2 && spec.includes(word)) || spec.includes(category) || category.includes(spec);
                            }).map((prof) => (
                              <div
                                key={prof.id}
                                onClick={() => handleSelectBookingProfessional(prof)}
                                className={`p-2.5 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                                  bookingProfissional?.id === prof.id
                                    ? 'bg-pink-50/30 border-pink-350 ring-1 ring-pink-500'
                                    : 'bg-neutral-50 border-neutral-150 hover:bg-neutral-100'
                                }`}
                              >
                                <img
                                  src={prof.foto || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"}
                                  alt={prof.nome}
                                  className="w-10 h-10 object-cover rounded-xl shrink-0"
                                />
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-bold text-neutral-850 text-xs truncate leading-tight">{prof.nome}</h4>
                                  <span className="text-[10px] text-neutral-400 truncate block mt-0.5">{prof.especialidade}</span>
                                </div>
                                {bookingProfissional?.id === prof.id && (
                                  <span className="p-1 bg-black text-pink-400 rounded-lg flex items-center justify-center">
                                    <Check className="w-3.5 h-3.5" />
                                  </span>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Step 2: Select Date */}
                      {bookingProfissional && (
                        <div>
                          <span className="text-xs font-bold text-neutral-500 uppercase tracking-widest block mb-2">
                            2. SELECIONE A DATA
                          </span>
                          <input
                            type="date"
                            min={new Date().toISOString().substring(0, 10)}
                            value={bookingDate}
                            onChange={(e) => {
                              setBookingDate(e.target.value);
                              setBookingTime(''); 
                            }}
                            className="w-full px-3 py-2 border border-neutral-150 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-pink-500 font-medium"
                          />
                        </div>
                      )}

                      {/* Step 3: Select Time Slot */}
                      {bookingProfissional && bookingDate && (
                        <div>
                          <span className="text-xs font-bold text-neutral-500 uppercase tracking-widest block mb-1">
                            3. HORÁRIOS EXCLUSIVOS DISPONÍVEIS
                          </span>
                          <span className="text-[9px] text-gray-400 block mb-2">
                            *Agenda inteligente anti-choque de horários para o Studio.
                          </span>
                          
                          {generateAvailableSlots().length === 0 ? (
                            <div className="p-3 bg-red-50 text-red-700 rounded-xl text-xs flex items-center gap-1.5 font-medium border border-red-150">
                              <AlertCircle className="w-4 h-4 shrink-0" />
                              <span>Sem horários livres no dia. Altere o dia ou escolha outra profissional acima.</span>
                            </div>
                          ) : (
                            <div className="grid grid-cols-4 gap-1.5 max-h-40 overflow-y-auto p-1.5 bg-[#fcfcfc] rounded-xl border border-neutral-150">
                              {generateAvailableSlots().map((slotTime) => (
                                <button
                                  key={slotTime}
                                  onClick={() => setBookingTime(slotTime)}
                                  className={`py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                                    bookingTime === slotTime
                                      ? 'bg-black text-pink-400 shadow-md scale-102 border border-black'
                                      : 'bg-white border border-neutral-150 hover:bg-neutral-100 text-neutral-700'
                                  }`}
                                >
                                  {slotTime}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Scheduling Checkout Button */}
                      {bookingProfissional && bookingDate && bookingTime && (
                        <div className="pt-4 border-t border-neutral-100 mt-2">
                          <button
                            onClick={handleCheckoutIntent}
                            className="w-full py-3 bg-black hover:bg-neutral-900 border border-neutral-800 text-pink-400 text-xs font-bold uppercase rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                          >
                            <span>Efetuar Reserva Garantida</span>
                            <ArrowRight className="w-4 h-4 text-pink-400" />
                          </button>
                          <p className="text-[9px] text-center text-neutral-400 uppercase tracking-wider font-bold mt-2.5">
                            🔒 Conexão Criptografada Direta com o Studio Glamour
                          </p>
                        </div>
                      )}

                    </div>
                  )}

                </div>
              </div>

            </div>

          </div>
        )}

        {/* DASHBOARD SYSTEM PORTALS */}
        {currentView === 'dashboard' && currentUser && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-8 text-neutral-800">
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <span className="text-xs font-bold text-pink-700 tracking-wider bg-pink-50 border border-pink-100 px-3 py-1.5 rounded-full uppercase">
                  PAINEL EXCLUSIVO DO ESPAÇO • {currentUser.tipo.toUpperCase()}
                </span>
                <h1 className="text-3xl font-black tracking-tight text-neutral-950 mt-2.5">
                  Olá, {currentUser.nome}
                </h1>
                <p className="text-xs text-neutral-500 mt-1">
                  Verifique e administre os atendimentos e a carteira de horários do Núcleo de Autoestima.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="text-xs font-bold text-neutral-800 bg-white border border-neutral-150 inline-flex items-center gap-1.5 py-2 px-3.5 rounded-xl shadow-xs">
                  <Store className="w-4 h-4 text-pink-500" />
                  <span>Espelho da Agenda Ativa</span>
                </span>
                <button
                  onClick={loadDashboardData}
                  className="px-3.5 py-2 bg-pink-50 hover:bg-pink-100 text-pink-700 border border-pink-150 text-xs font-bold rounded-xl transition-all cursor-pointer"
                >
                  Sincronizar Dados
                </button>
              </div>
            </div>

            {/* ——————————————————————————————————————————————— */}
            {/* PORTAL VIEW: CLIENT PANEL */}
            {/* ——————————————————————————————————————————————— */}
            {currentUser.tipo === 'cliente' && (
              <div className="grid grid-cols-1 gap-6 animate-fade-in">
                <div className="bg-white border border-neutral-150 p-6 rounded-2xl shadow-xs">
                  <h3 className="font-extrabold text-lg text-neutral-950 flex items-center gap-2 border-b border-neutral-100 pb-4 mb-4">
                    <Calendar className="w-5 h-5 text-pink-500" />
                    <span>Minhas Próximas Visitas ao Studio</span>
                  </h3>

                  {dashboardAgendamentos.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-neutral-500 font-medium mb-4">Você ainda não tem nenhum horário reservado no Studio.</p>
                      <button
                        onClick={() => setCurrentView('store-detail')}
                        className="px-5 py-2.5 bg-pink-600 hover:bg-pink-700 text-white text-xs font-bold rounded-xl transition-all shadow-md cursor-pointer"
                      >
                        Agendar agora minha primeira sessão 
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {dashboardAgendamentos.map((appt, idx) => (
                        <motion.div
                          key={appt.id}
                          initial={{ opacity: 0, x: -16 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.35, delay: idx * 0.04, ease: "easeOut" }}
                          whileHover={{ y: -3 }}
                          className={`p-4 border rounded-xl flex items-start justify-between gap-3 shadow-xs hover:shadow-md transition-all duration-300 ${
                            appt.status === 'cancelado' ? 'bg-neutral-50 border-neutral-100 opacity-60 shadow-none hover:shadow-none' : 'bg-white border-neutral-150 border-pink-100/30'
                          }`}
                        >
                          <div>
                            <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                              appt.status === 'confirmado' ? 'bg-pink-50 border border-pink-100 text-pink-800' : 'bg-red-55 bg-red-50 text-red-700 border border-red-100'
                            }`}>
                              {appt.status === 'confirmado' ? 'Confirmado' : 'Cancelado'}
                            </span>
                            <h4 className="font-bold text-neutral-950 text-sm mt-2">{appt.servico_nome}</h4>
                            <p className="text-xs text-neutral-500 mt-1 flex items-center gap-1">
                              <Store className="w-3.5 h-3.5 text-pink-500 shrink-0" />
                              <span>{appt.loja_nome}</span>
                            </p>
                            <p className="text-xs text-neutral-500 mt-1 flex items-center gap-1">
                              <User className="w-3.5 h-3.5 text-pink-500 shrink-0" />
                              <span>Atendimento por: <b>{appt.profissional_nome}</b></span>
                            </p>
                            <div className="flex gap-4 text-xs font-bold text-neutral-700 mt-3 bg-neutral-50 p-2 rounded-lg border border-neutral-150 inline-flex">
                              <span className="flex items-center gap-1 font-mono text-[11px]">
                                <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                                {appt.data_hora.split(' ')[0]}
                              </span>
                              <span className="flex items-center gap-1 font-mono text-[11px]">
                                <Clock className="w-3.5 h-3.5 text-neutral-400" />
                                {appt.data_hora.split(' ')[1]}h
                              </span>
                            </div>
                          </div>

                          {appt.status === 'confirmado' && (
                            <button
                              onClick={() => handleCancelBooking(appt.id)}
                              className="px-2.5 py-1.5 text-[10px] font-bold text-red-650 text-red-600 hover:bg-red-50 hover:text-red-700 border border-neutral-155 rounded-lg transition-all cursor-pointer shrink-0"
                            >
                              Cancelar
                            </button>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ——————————————————————————————————————————————— */}
            {/* PORTAL VIEW: PROFESSIONAL PANEL */}
            {/* ——————————————————————————————————————————————— */}
            {currentUser.tipo === 'profissional' && (
              <div className="grid grid-cols-1 gap-6 animate-fade-in">
                <div className="bg-white border border-neutral-150 p-6 rounded-2xl shadow-xs">
                  <h3 className="font-extrabold text-lg text-neutral-950 flex items-center gap-2 border-b border-neutral-100 pb-4 mb-4">
                    <Clock className="w-5 h-5 text-pink-500" />
                    <span>Minha Carteira de Clientes no Glamour</span>
                  </h3>

                  {dashboardAgendamentos.length === 0 ? (
                    <div className="text-center py-12 text-neutral-500">
                      Você não possui compromissos de agenda catalogados para os próximos dias.
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm text-neutral-700">
                        <thead className="text-[10px] uppercase tracking-wider font-bold text-neutral-400 bg-neutral-50 border-b border-neutral-100 rounded-lg">
                          <tr>
                            <th className="p-3">Data e Hora</th>
                            <th className="p-3">Cliente</th>
                            <th className="p-3">Procedimento</th>
                            <th className="p-3">Duração</th>
                            <th className="p-3">Valor Estimado</th>
                            <th className="p-3">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100 font-medium">
                          {dashboardAgendamentos.map((appt) => (
                            <tr key={appt.id} className="hover:bg-[#fafafa] transition-colors">
                              <td className="p-3 font-bold text-neutral-900 font-mono text-xs">{appt.data_hora}</td>
                              <td className="p-3 text-neutral-800">{appt.cliente_nome}</td>
                              <td className="p-3 font-semibold text-neutral-900">{appt.servico_nome}</td>
                              <td className="p-3 text-xs text-neutral-500">{appt.servico_duracao} minutos</td>
                              <td className="p-3 font-extrabold text-pink-700 text-xs">R$ {appt.servico_preco.toFixed(2)}</td>
                              <td className="p-3">
                                <span className={`inline-block text-[9px] font-extrabold px-2.5 py-0.5 rounded-full ${
                                  appt.status === 'confirmado' ? 'bg-pink-50 border border-pink-100 text-pink-800' : 'bg-red-55 bg-red-50 text-red-700 text-xs'
                                }`}>
                                  {appt.status.toUpperCase()}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}

            {(currentUser.tipo === 'dono' || currentUser.tipo === 'admin' || currentUser.tipo === 'super_admin') && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 animate-fade-in pb-12">
                
                {/* Stats Summary Bento strip */}
                <div className="md:col-span-12 grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white border border-neutral-150 p-4.5 rounded-2xl shadow-xs">
                    <span className="text-[10px] uppercase font-bold text-neutral-400">Serviços Catalogados</span>
                    <span className="block text-3xl font-black text-neutral-950 mt-1">{dashboardServicos.length}</span>
                  </div>
                  <div className="bg-white border border-neutral-150 p-4.5 rounded-2xl shadow-xs">
                    <span className="text-[10px] uppercase font-bold text-neutral-400">Profissionais sob Contrato</span>
                    <span className="block text-3xl font-black text-neutral-950 mt-1">{dashboardProfissionais.length}</span>
                  </div>
                  <div className="bg-white border border-neutral-150 p-4.5 rounded-2xl shadow-xs">
                    <span className="text-[10px] uppercase font-bold text-neutral-400">Total de Agendamentos</span>
                    <span className="block text-3xl font-black text-neutral-950 mt-1">{dashboardAgendamentos.length}</span>
                  </div>
                  <div className="bg-black text-white border border-neutral-800 p-4.5 rounded-2xl shadow-lg relative overflow-hidden">
                    <div className="absolute right-2 bottom-2 text-pink-500/10 pointer-events-none">
                      <BadgeIcon />
                    </div>
                    <span className="text-[10px] uppercase font-bold text-pink-400">Receita Bruta Estimada</span>
                    <span className="block text-3xl font-black text-white mt-1">
                      R$ {dashboardAgendamentos
                        .filter(a => a.status === 'confirmado')
                        .reduce((acc, current) => acc + (current.servico_preco || 0), 0)
                        .toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Modern Dashboard Navigation Tabs bar */}
                <div className="md:col-span-12 flex gap-1 border-b border-neutral-150 pb-0.5 mb-2 overflow-x-auto select-none">
                  <button
                    onClick={() => setActiveAdminTab('agenda')}
                    className={`px-5 py-3 text-xs font-bold transition-all border-b-2 cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                      activeAdminTab === 'agenda' 
                        ? 'border-pink-600 text-pink-600 font-extrabold' 
                        : 'border-transparent text-neutral-400 hover:text-neutral-700'
                    }`}
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Próximos Atendimentos</span>
                  </button>
                  <button
                    onClick={() => setActiveAdminTab('servicos')}
                    className={`px-5 py-3 text-xs font-bold transition-all border-b-2 cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                      activeAdminTab === 'servicos' 
                        ? 'border-pink-600 text-pink-600 font-extrabold' 
                        : 'border-transparent text-neutral-400 hover:text-neutral-700'
                    }`}
                  >
                    <Layers className="w-4 h-4" />
                    <span>Procedimentos & Equipe</span>
                  </button>
                  <button
                    onClick={() => setActiveAdminTab('produtos')}
                    className={`px-5 py-3 text-xs font-bold transition-all border-b-2 cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                      activeAdminTab === 'produtos' 
                        ? 'border-pink-600 text-pink-600 font-extrabold' 
                        : 'border-transparent text-neutral-400 hover:text-neutral-700'
                    }`}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Boutique Home Care</span>
                  </button>
                  <button
                    onClick={() => setActiveAdminTab('horario')}
                    className={`px-5 py-3 text-xs font-bold transition-all border-b-2 cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                      activeAdminTab === 'horario' 
                        ? 'border-pink-600 text-pink-600 font-extrabold' 
                        : 'border-transparent text-neutral-400 hover:text-neutral-700'
                    }`}
                  >
                    <Settings className="w-4 h-4" />
                    <span>Configurar Turnos de Agenda</span>
                  </button>
                </div>

                {/* ——————————————————————————————————————————————— */}
                {/* TAB CONTENT: AGENDA CHRONOLOGICAL LIST */}
                {/* ——————————————————————————————————————————————— */}
                {activeAdminTab === 'agenda' && (
                  <div className="md:col-span-12 bg-white border border-neutral-150 p-6 rounded-3xl shadow-xs">
                    <h3 className="font-extrabold text-base text-neutral-950 flex items-center gap-2 border-b border-neutral-100 pb-3 mb-4">
                      <Calendar className="w-5 h-5 text-pink-500" />
                      <span>Agenda Cronológica de Atendimentos</span>
                    </h3>

                    {dashboardAgendamentos.length === 0 ? (
                      <p className="text-xs text-neutral-400 italic py-6 text-center">Nenhum atendimento realizado ou agendado no momento.</p>
                    ) : (
                      <div className="overflow-x-auto text-xs pr-1">
                        <table className="w-full text-left text-neutral-605">
                          <thead className="text-neutral-400 bg-[#fafafa] border-b border-neutral-100 rounded-lg uppercase text-[9px] font-bold tracking-wider">
                            <tr>
                              <th className="p-3">Data/Hora de Reserva</th>
                              <th className="p-3">Cliente</th>
                              <th className="p-3 font-semibold">Designer / Profissional</th>
                              <th className="p-3">Procedimento</th>
                              <th className="p-3">Preço Cobrado</th>
                              <th className="p-3">Ação / Status</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-neutral-100 font-medium text-neutral-700">
                            {dashboardAgendamentos.map((appt) => (
                              <tr key={appt.id} className="hover:bg-neutral-50/50">
                                <td className="p-3 font-bold text-neutral-900 font-mono text-[11px] whitespace-nowrap">{appt.data_hora}</td>
                                <td className="p-3 text-neutral-900 font-bold">{appt.cliente_nome}</td>
                                <td className="p-3 text-neutral-800">{appt.profissional_nome}</td>
                                <td className="p-3 font-bold">{appt.servico_nome}</td>
                                <td className="p-3 font-extrabold text-[#111]">R$ {appt.servico_preco.toFixed(2)}</td>
                                <td className="p-3">
                                  <div className="flex items-center gap-2">
                                    <span className={`inline-block text-[9px] font-extrabold px-2 py-0.5 rounded-md ${
                                      appt.status === 'confirmado' ? 'bg-pink-50 border border-pink-100 text-pink-800' : 'bg-red-50 text-red-700'
                                    }`}>
                                      {appt.status.toUpperCase()}
                                    </span>
                                    {appt.status === 'confirmado' && (
                                      <button
                                        onClick={() => handleCancelBooking(appt.id)}
                                        className="text-[10px] text-red-600 hover:underline cursor-pointer font-bold"
                                      >
                                        Cancelar
                                      </button>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}

                {/* ——————————————————————————————————————————————— */}
                {/* TAB CONTENT: SERVICES & STAFF ACTIONS */}
                {/* ——————————————————————————————————————————————— */}
                {activeAdminTab === 'servicos' && (
                  <>
                    {/* Left Panel: Catalog CRUD Management */}
                    <div className="md:col-span-8 flex flex-col gap-6">
                      
                      {/* Service list CRUD manager */}
                      <div className="bg-white border border-neutral-150 p-6 rounded-3xl shadow-xs">
                        <h3 className="font-extrabold text-base text-neutral-950 flex items-center gap-2 border-b border-neutral-100 pb-3 mb-4">
                          <Layers className="w-5 h-5 text-pink-500" />
                          <span>{editingService ? `Editar: ${editingService.nome}` : 'Gerenciar Catálogo de Procedimentos'}</span>
                        </h3>

                        <form onSubmit={handleAddService} className="grid grid-cols-1 md:grid-cols-12 gap-3 border-b border-neutral-100 pb-5 mb-5 items-end">
                          <div className="md:col-span-6">
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1 font-sans">Nome do Procedimento</label>
                            <input
                              type="text"
                              required
                              placeholder="Ex: Brown Lamination"
                              value={newServiceForm.nome}
                              onChange={e => setNewServiceForm({...newServiceForm, nome: e.target.value})}
                              className="w-full text-xs px-3 py-2 border border-neutral-150 rounded-lg bg-[#fafafa] focus:ring-1 focus:ring-pink-500 outline-hidden"
                            />
                          </div>
                          <div className="md:col-span-3">
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1 font-sans">Categoria de Beleza</label>
                            <select
                              value={newServiceForm.categoria}
                              onChange={e => setNewServiceForm({...newServiceForm, categoria: e.target.value})}
                              className="w-full text-xs px-3 py-2.5 border border-neutral-150 rounded-lg bg-[#fafafa] outline-hidden"
                            >
                              <option value="Unhas">Unhas</option>
                              <option value="Cílios">Cílios</option>
                              <option value="Cabelo">Cabelo</option>
                              <option value="Sobrancelha">Sobrancelha</option>
                              <option value="Estética">Estética / Spa</option>
                            </select>
                          </div>
                          <div className="md:col-span-3">
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">Preço Cobrado (R$)</label>
                            <input
                              type="number"
                              required
                              placeholder="Ex: 110"
                              value={newServiceForm.preco}
                              onChange={e => setNewServiceForm({...newServiceForm, preco: e.target.value})}
                              className="w-full text-xs px-3 py-2 border border-neutral-150 rounded-lg bg-[#fafafa] focus:ring-1 focus:ring-pink-500 outline-hidden"
                            />
                          </div>
                          <div className="md:col-span-3">
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">Duração Média</label>
                            <select
                              value={newServiceForm.duracao}
                              onChange={e => setNewServiceForm({...newServiceForm, duracao: e.target.value})}
                              className="w-full text-xs px-3 py-2.5 border border-neutral-150 rounded-lg bg-[#fafafa] outline-hidden"
                            >
                              <option value="15">15 minutos</option>
                              <option value="30">30 minutos</option>
                              <option value="45">45 minutos</option>
                              <option value="60">60 minutos (1h)</option>
                              <option value="90">90 minutos (1h 30m)</option>
                              <option value="120">120 minutos (2h)</option>
                            </select>
                          </div>
                          <div className="md:col-span-6">
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1 font-sans">URL da Foto do Serviço (Opcional)</label>
                            <input
                              type="url"
                              placeholder="Copiar link da foto de cílios, cabelo, unhas..."
                              value={newServiceForm.imagem}
                              onChange={e => setNewServiceForm({...newServiceForm, imagem: e.target.value})}
                              className="w-full text-xs px-3 py-2 border border-neutral-150 rounded-lg bg-[#fafafa] focus:ring-1 focus:ring-pink-500 outline-hidden"
                            />
                          </div>
                          <div className="md:col-span-3">
                            {editingService ? (
                              <div className="flex gap-2">
                                <button
                                  type="submit"
                                  className="flex-1 py-1.5 bg-pink-600 hover:bg-pink-700 text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer"
                                >
                                  <Check className="w-3.5 h-3.5" />
                                  <span>Salvar</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={handleCancelEditService}
                                  className="py-1.5 px-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-600 rounded-xl transition-all flex items-center justify-center cursor-pointer"
                                  title="Cancelar Edição"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            ) : (
                              <button
                                type="submit"
                                className="w-full py-2 bg-black hover:bg-neutral-900 border border-neutral-800 text-pink-400 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer"
                              >
                                <Plus className="w-4 h-4 text-pink-400" />
                                <span>Adicionar</span>
                              </button>
                            )}
                          </div>
                        </form>

                        {dashboardServicos.length === 0 ? (
                          <p className="text-xs text-neutral-400 italic">Sem procedimentos programados.</p>
                        ) : (
                          <div className="divide-y divide-neutral-100 max-h-96 overflow-y-auto pr-1">
                            {dashboardServicos.map((serv) => (
                              <div key={serv.id} className="py-3 flex items-center justify-between text-sm group">
                                <div className="flex items-center gap-3 min-w-0">
                                  <img
                                    src={serv.imagem || "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=120"}
                                    alt={serv.nome}
                                    className="w-10 h-10 object-cover rounded-lg border border-neutral-150 shrink-0"
                                    referrerPolicy="no-referrer"
                                  />
                                  <div className="min-w-0">
                                    <span className="text-[9px] font-extrabold bg-pink-50 border border-pink-100 text-pink-700 py-0.5 px-2 rounded-full mr-2">
                                      {serv.categoria}
                                    </span>
                                    <span className="font-bold text-neutral-900 text-xs">{serv.nome}</span>
                                    <span className="text-xs text-neutral-400 block sm:inline sm:ml-3">({serv.duracao} m • R$ {serv.preco.toFixed(2)})</span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-1">
                                  <button
                                    onClick={() => handleStartEditService(serv)}
                                    className="p-1.5 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer opacity-70 group-hover:opacity-100 shrink-0"
                                    title="Editar Procedimento"
                                  >
                                    <Edit className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteService(serv.id)}
                                    className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer opacity-70 group-hover:opacity-100 shrink-0"
                                    title="Remover Procedimento"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                    </div>

                    {/* Right Panel: Professionals CRUD Manager */}
                    <div className="md:col-span-4 flex flex-col gap-6">
                      <div className="bg-white border border-neutral-150 p-6 rounded-3xl shadow-xs">
                        <h3 className="font-extrabold text-base text-neutral-950 flex items-center gap-2 border-b border-neutral-100 pb-3 mb-4">
                          <User className="w-5 h-5 text-pink-500" />
                          <span>Profissionais do Studio</span>
                        </h3>

                        <form onSubmit={handleAddProf} className="flex flex-col gap-3 mb-5 p-4 bg-neutral-50 border border-neutral-150 rounded-2xl">
                          <div>
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1 font-sans">Nome Completo</label>
                            <input
                              type="text"
                              required
                              placeholder="Ex: Amanda Silva"
                              value={newProfForm.nome}
                              onChange={e => setNewProfForm({...newProfForm, nome: e.target.value})}
                              className="w-full text-xs px-3 py-2 border border-neutral-150 rounded-lg bg-white outline-hidden focus:ring-1 focus:ring-pink-500"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">Cargo / Especialidade</label>
                            <input
                              type="text"
                              required
                              placeholder="Ex: Lash Designer & Cílios"
                              value={newProfForm.especialidade}
                              onChange={e => setNewProfForm({...newProfForm, especialidade: e.target.value})}
                              className="w-full text-xs px-3 py-2 border border-neutral-150 rounded-lg bg-white outline-hidden focus:ring-1 focus:ring-pink-500"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">URL da Foto (Opcional)</label>
                            <input
                              type="url"
                              placeholder="Copiar link da foto..."
                              value={newProfForm.foto}
                              onChange={e => setNewProfForm({...newProfForm, foto: e.target.value})}
                              className="w-full text-xs px-3 py-2 border border-neutral-150 rounded-lg bg-white outline-hidden"
                            />
                          </div>
                          <button
                            type="submit"
                            className="w-full py-2 bg-pink-600 hover:bg-pink-700 text-white text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <Plus className="w-4 h-4" />
                            <span>Adicionar Designer</span>
                          </button>
                        </form>

                        {dashboardProfissionais.length === 0 ? (
                          <p className="text-xs text-neutral-400 italic">Nenhum profissional listado.</p>
                        ) : (
                          <div className="flex flex-col gap-3">
                            {dashboardProfissionais.map((prof) => (
                              <div key={prof.id} className="flex items-center justify-between gap-3 p-2.5 bg-neutral-50 rounded-xl border border-neutral-150">
                                <div className="flex items-center gap-2.5 min-w-0">
                                  <img
                                    src={prof.foto || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150"}
                                    alt={prof.nome}
                                    className="w-9 h-9 object-cover rounded-lg shrink-0 border border-neutral-200"
                                    referrerPolicy="no-referrer"
                                  />
                                  <div className="min-w-0">
                                    <h4 className="font-bold text-neutral-900 text-xs truncate leading-tight">{prof.nome}</h4>
                                    <span className="text-[9px] text-neutral-400 block truncate mt-0.5">{prof.especialidade}</span>
                                  </div>
                                </div>
                                <button
                                  onClick={() => handleDeleteProf(prof.id)}
                                  className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer shrink-0"
                                  title="Remover Profissional"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}

                {/* ——————————————————————————————————————————————— */}
                {/* TAB CONTENT: BOUTIQUE PRODUCTS INVENTORY */}
                {/* ——————————————————————————————————————————————— */}
                {activeAdminTab === 'produtos' && (
                  <div className="md:col-span-12 grid grid-cols-1 md:grid-cols-12 gap-6 pb-2">
                    
                    {/* Add products form */}
                    <div className="md:col-span-4 bg-white border border-neutral-150 p-6 rounded-3xl shadow-xs">
                      <h4 className="font-extrabold text-sm text-neutral-950 flex items-center gap-2 border-b border-neutral-100 pb-3 mb-4">
                        <Package className="w-4 h-4 text-pink-500" />
                        <span>{editingProduct ? `Editar: ${editingProduct.nome}` : 'Cadastrar Item Home Care'}</span>
                      </h4>
                      
                      <form onSubmit={handleAddProduct} className="flex flex-col gap-3.5">
                        <div>
                          <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">Nome do Produto</label>
                          <input
                            type="text"
                            required
                            placeholder="Ex: Sérum Nutritivo Pro Lash"
                            value={newProductForm.nome}
                            onChange={e => setNewProductForm({...newProductForm, nome: e.target.value})}
                            className="w-full text-xs px-3 py-2 border border-neutral-150 rounded-lg bg-gray-50 focus:ring-1 focus:ring-pink-500 outline-hidden"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">Preço (R$)</label>
                            <input
                              type="number"
                              step="0.01"
                              required
                              placeholder="Ex: 89.90"
                              value={newProductForm.preco}
                              onChange={e => setNewProductForm({...newProductForm, preco: e.target.value})}
                              className="w-full text-xs px-3 py-2 border border-neutral-150 rounded-lg bg-gray-50 focus:ring-1 focus:ring-pink-500 outline-hidden"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">Estoque</label>
                            <input
                              type="number"
                              required
                              placeholder="Ex: 15"
                              value={newProductForm.estoque}
                              onChange={e => setNewProductForm({...newProductForm, estoque: e.target.value})}
                              className="w-full text-xs px-3 py-2 border border-neutral-150 rounded-lg bg-gray-50 outline-hidden focus:ring-1 focus:ring-pink-500"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">Categoria</label>
                          <select
                            value={newProductForm.categoria}
                            onChange={e => setNewProductForm({...newProductForm, categoria: e.target.value})}
                            className="w-full text-xs px-3 py-2.5 border border-neutral-150 rounded-lg bg-[#fafafa] outline-hidden"
                          >
                            <option value="Cílios">Cílios</option>
                            <option value="Unhas">Unhas</option>
                            <option value="Cabelo">Cabelo</option>
                            <option value="Sobrancelha">Sobrancelha</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">URL da Imagem (Opcional)</label>
                          <input
                            type="url"
                            placeholder="Link do Unsplash ou foto..."
                            value={newProductForm.imagem}
                            onChange={e => setNewProductForm({...newProductForm, imagem: e.target.value})}
                            className="w-full text-xs px-3 py-2 border border-neutral-150 rounded-lg bg-gray-50 outline-hidden"
                          />
                        </div>

                        {editingProduct ? (
                          <div className="flex gap-2">
                            <button
                              type="submit"
                              className="flex-1 py-2 bg-pink-600 hover:bg-pink-700 text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer"
                            >
                              <Check className="w-4 h-4" />
                              <span>Salvar Alterações</span>
                            </button>
                            <button
                              type="button"
                              onClick={handleCancelEditProduct}
                              className="py-2 px-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-600 rounded-xl transition-all flex items-center justify-center cursor-pointer"
                              title="Cancelar Edição"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <button
                            type="submit"
                            className="w-full py-2 bg-black hover:bg-neutral-900 border border-neutral-800 text-pink-400 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <Plus className="w-4.5 h-4.5 text-pink-400" />
                            <span>Adicionar à Boutique</span>
                          </button>
                        )}
                      </form>
                    </div>

                    {/* Inventory list */}
                    <div className="md:col-span-8 bg-white border border-neutral-150 p-6 rounded-3xl shadow-xs">
                      <h4 className="font-extrabold text-sm text-neutral-950 flex items-center gap-2 border-b border-neutral-100 pb-3 mb-4">
                        <ShoppingBag className="w-4 h-4 text-pink-500" />
                        <span>Inventário de Produtos Cadastrados ({dashboardProdutos.length})</span>
                      </h4>

                      {dashboardProdutos.length === 0 ? (
                        <p className="text-xs text-neutral-400 italic py-6 text-center">Nenhum produto cadastrado no catálogo.</p>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[420px] overflow-y-auto pr-1">
                          {dashboardProdutos.map((prod) => (
                            <div key={prod.id} className="p-3 border border-neutral-150 rounded-xl flex gap-3 items-center justify-between bg-[#fcfcfc] group">
                              <div className="flex items-center gap-2.5 min-w-0">
                                <img
                                  src={prod.imagem || "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80&w=200"}
                                  alt={prod.nome}
                                  className="w-11 h-11 object-cover rounded-lg shrink-0 border border-neutral-200"
                                  referrerPolicy="no-referrer"
                                />
                                <div className="min-w-0">
                                  <span className="text-[8px] bg-neutral-250 text-neutral-600 font-bold px-1.5 py-0.2 rounded uppercase">{prod.categoria}</span>
                                  <h5 className="font-bold text-neutral-900 text-xs truncate mt-0.5">{prod.nome}</h5>
                                  <p className="text-[10px] text-neutral-500 mt-0.2">Disponível: <b className="text-neutral-750 font-bold">{prod.estoque} un</b></p>
                                </div>
                              </div>
                              <div className="text-right flex items-center gap-3">
                                <span className="font-extrabold text-neutral-900 text-xs shrink-0">R$ {prod.preco.toFixed(2)}</span>
                                <div className="flex items-center gap-1 shrink-0">
                                  <button
                                    onClick={() => handleStartEditProduct(prod)}
                                    className="p-1.5 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer opacity-70 group-hover:opacity-100"
                                    title="Editar Item"
                                  >
                                    <Edit className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteProduct(prod.id)}
                                    className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer opacity-70 group-hover:opacity-100"
                                    title="Remover Item"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                  </div>
                )}

                {/* ——————————————————————————————————————————————— */}
                {/* TAB CONTENT: SHIFT OPERATIONAL WORK HOURS EDIT */}
                {/* ——————————————————————————————————————————————— */}
                {activeAdminTab === 'horario' && (
                  <div className="md:col-span-12 bg-white border border-neutral-150 p-6 rounded-3xl shadow-xs">
                    <div className="flex items-center gap-3 border-b border-neutral-100 pb-3 mb-5">
                      <Settings className="w-5 h-5 text-pink-500" />
                      <div>
                        <h3 className="font-extrabold text-base text-neutral-950">Configurar Horários Especializados</h3>
                        <p className="text-xs text-neutral-400 mt-0.5">Defina turnos contínuos ou divididos (com repouso de almoço) calculados automaticamente.</p>
                      </div>
                    </div>

                    <form onSubmit={handleUpdateStoreSchedule} className="grid grid-cols-1 md:grid-cols-12 gap-6">
                      
                      {/* Interactive Time fields */}
                      <div className="md:col-span-7 flex flex-col gap-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="text-[10px] font-bold text-neutral-500 uppercase block mb-1">Início do Expediente Geral (Turno 1)</label>
                            <input
                              type="text"
                              required
                              placeholder="Ex: 08:00"
                              value={storeHours.inicio}
                              onChange={e => setStoreHours({...storeHours, inicio: e.target.value})}
                              className="w-full text-xs px-3 py-2 border border-neutral-150 rounded-lg bg-gray-50 focus:ring-1 focus:ring-pink-500 font-mono outline-hidden"
                            />
                            <span className="text-[10px] text-neutral-400 mt-1 block">Abertura do Espaço (Ex: 08:00).</span>
                          </div>

                          <div>
                            <label className="text-[10px] font-bold text-neutral-500 uppercase block mb-1">Encerramento Geral (Turno 2)</label>
                            <input
                              type="text"
                              required
                              placeholder="Ex: 18:00"
                              value={storeHours.fim}
                              onChange={e => setStoreHours({...storeHours, fim: e.target.value})}
                              className="w-full text-xs px-3 py-2 border border-neutral-150 rounded-lg bg-gray-50 focus:ring-1 focus:ring-pink-500 font-mono outline-hidden"
                            />
                            <span className="text-[10px] text-neutral-400 mt-1 block">Fechamento do Espaço (Ex: 18:00).</span>
                          </div>
                        </div>

                        <div className="p-4 bg-pink-50/20 border border-pink-100 rounded-2xl flex flex-col gap-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-neutral-800 flex items-center gap-1.5">
                              <span className="inline-block w-2 h-2 rounded-full bg-pink-500 animate-pulse"></span>
                              Enforce Split Shifting (Downtime Lunch Break)
                            </span>
                            <input
                              type="checkbox"
                              checked={storeHours.split_shift_enabled}
                              onChange={e => setStoreHours({...storeHours, split_shift_enabled: e.target.checked})}
                              className="w-4 h-4 accent-pink-600 rounded cursor-pointer"
                            />
                          </div>

                          {storeHours.split_shift_enabled && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                              <div>
                                <label className="text-[10px] font-bold text-neutral-500 block mb-1">Início da Pausa (Almoço)</label>
                                <input
                                  type="text"
                                  placeholder="Ex: 11:40"
                                  value={storeHours.intervalo_inicio}
                                  onChange={e => setStoreHours({...storeHours, intervalo_inicio: e.target.value})}
                                  className="w-full text-xs px-3 py-2.5 border border-neutral-150 rounded-lg bg-white font-mono outline-hidden focus:ring-1 focus:ring-pink-500"
                                />
                                <span className="text-[9px] text-neutral-450 block mt-1">Nenhum agendamento começará ou cruzará esse divisor.</span>
                              </div>
                              <div>
                                <label className="text-[10px] font-bold text-neutral-500 block mb-1">Retorno da Pausa (Almoço)</label>
                                <input
                                  type="text"
                                  placeholder="Ex: 13:40"
                                  value={storeHours.intervalo_fim}
                                  onChange={e => setStoreHours({...storeHours, intervalo_fim: e.target.value})}
                                  className="w-full text-xs px-3 py-2.5 border border-neutral-150 rounded-lg bg-white font-mono outline-hidden focus:ring-1 focus:ring-pink-500"
                                />
                                <span className="text-[9px] text-neutral-450 block mt-1">Horário em que os atendimentos são autorizados novamente.</span>
                              </div>
                            </div>
                          )}
                        </div>

                        <div>
                          <button
                            type="submit"
                            className="px-5 py-2.5 bg-black hover:bg-neutral-900 border border-neutral-800 text-pink-400 text-xs font-bold rounded-xl transition-all cursor-pointer shadow-md"
                          >
                            Salvar Mudanças de Expediente
                          </button>
                        </div>
                      </div>

                      {/* Info side cards */}
                      <div className="md:col-span-5 flex flex-col gap-3">
                        <div className="bg-neutral-50 border border-neutral-150 p-4.5 rounded-2xl text-[11px] text-neutral-500 space-y-2 leading-relaxed">
                          <h5 className="font-extrabold text-xs text-neutral-900 flex items-center gap-1.5 mb-2 uppercase tracking-wide">
                            <Check className="w-4 h-4 text-pink-500" />
                            <span>Vantagens do Split-Shift</span>
                          </h5>
                          <p><b>1. Turno da Manhã (Turno 1)</b>: Atendimento das {storeHours.inicio} até as {storeHours.intervalo_inicio}.</p>
                          <p><b>2. Intervalo Livre</b>: Bloqueio estrito de {storeHours.intervalo_inicio} às {storeHours.intervalo_fim}.</p>
                          <p><b>3. Turno da Tarde (Turno 2)</b>: {storeHours.intervalo_fim} até as {storeHours.fim}.</p>
                          <p className="border-t border-neutral-200 pt-2 font-semibold">Os clientes no exterior finalizam suas reservas sabendo os turnos e sem transtornos.</p>
                        </div>
                      </div>

                    </form>
                  </div>
                )}

              </div>
            )}
          </div>
        )}

      </main>

      {/* FOOTER - Sophisticated Pink & Black */}
      <footer className="bg-black text-neutral-400 border-t border-pink-700/20 py-10 px-6 mt-auto text-xs font-sans">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left space-y-1">
            <span className="font-extrabold text-white tracking-tight text-sm">
              Núcleo de <span className="text-pink-500">Autoestima</span>
            </span>
            <p className="mt-1 text-[11px] text-neutral-400">© 2026 Núcleo de Autoestima. Gestão de agendamentos e bem-estar.</p>
            <div className="bg-neutral-900/60 border border-neutral-800/80 p-3.5 rounded-2xl max-w-sm mt-3 text-left">
              <p className="text-[10px] text-neutral-350 font-bold uppercase tracking-wider mb-1 flex items-center gap-1 text-pink-400">
                <Sparkles className="w-3.5 h-3.5 text-pink-500" />
                <span>Desenvolvimento Elite</span>
              </p>
              <p className="text-[11px] text-neutral-200">
                Criado e assinado por <b className="text-white">João Layon</b>, desenvolvedor fullstack e CEO da <span className="text-pink-400">DS Company</span>.
              </p>
              <a
                href="https://instagram.com/layon.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[10px] text-pink-400 hover:text-pink-300 font-extrabold mt-1.5 transition-colors"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>@layon.dev</span>
              </a>
            </div>
          </div>
          <div className="flex flex-col md:items-end gap-3 text-[11px] font-semibold text-center md:text-right">
            <div className="flex items-center gap-4 justify-center md:justify-end">
              <span className="hover:text-pink-400 cursor-pointer transition-colors">Políticas de Privacidade</span>
              <span className="text-neutral-700">•</span>
              <span className="hover:text-pink-400 cursor-pointer transition-colors">Termos do Espaço</span>
            </div>
            <p className="text-[10px] text-neutral-500">DS Company • Soluções Digitais de Alta Performance</p>
          </div>
        </div>
      </footer>

      {/* AUTHENTICATION POPUP MODAL */}
      <AnimatePresence>
        {showAuthModal && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl relative text-gray-800 border border-pink-100"
            >
              <button
                onClick={() => setShowAuthModal(false)}
                className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-600 bg-[#fafafa] p-1.5 rounded-full cursor-pointer font-bold text-xs"
              >
                ✕
              </button>

              <div className="text-center mb-6">
                <span className="font-black text-neutral-950 text-xl tracking-tight">
                  Núcleo de <span className="text-pink-600">Autoestima</span>
                </span>
                <p className="text-xs text-neutral-400 mt-1">
                  {authMode === 'login' ? 'Conecte-se para reservar seu horário' : 'Crie sua conta para agendar'}
                </p>
              </div>

              {authError && (
                <div className="mb-4 p-2.5 bg-red-50 text-red-700 rounded-xl text-xs flex items-center gap-1.5 font-medium border border-red-100">
                  <AlertCircle className="w-4.5 h-4.5 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <form onSubmit={authMode === 'login' ? handleLogin : handleRegister} className="flex flex-col gap-3">
                {authMode === 'register' && (
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Nome Completo</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Amanda Santos"
                      value={nomeField}
                      onChange={(e) => setNomeField(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-neutral-150 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-pink-500 bg-[#fafafa]"
                    />
                  </div>
                )}

                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Seu E-mail</label>
                  <input
                    type="email"
                    required
                    placeholder="Ex: mari@cliente.com"
                    value={emailField}
                    onChange={(e) => setEmailField(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-neutral-150 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-pink-500 bg-[#fafafa]"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Sua Senha</label>
                  <input
                    type="password"
                    required
                    placeholder="Sua senha..."
                    value={senhaField}
                    onChange={(e) => setSenhaField(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-neutral-150 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-pink-500 bg-[#fafafa]"
                  />
                </div>

                {authMode === 'register' && (
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Tipo de Perfil</label>
                    <div className="grid grid-cols-2 gap-1 bg-neutral-100 p-1 rounded-xl border border-neutral-150">
                      <button
                        type="button"
                        onClick={() => setRoleField('cliente')}
                        className={`py-1 rounded-lg text-[10px] font-bold uppercase transition-all cursor-pointer ${
                          roleField === 'cliente' ? 'bg-black text-pink-400 shadow-sm' : 'text-neutral-500'
                        }`}
                      >
                        Sou Cliente
                      </button>
                      <button
                        type="button"
                        onClick={() => setRoleField('dono')}
                        className={`py-1 rounded-lg text-[10px] font-bold uppercase transition-all cursor-pointer ${
                          roleField === 'dono' ? 'bg-black text-pink-400 shadow-sm' : 'text-neutral-500'
                        }`}
                      >
                        Sou Dona/Dono
                      </button>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-2.5 bg-black hover:bg-neutral-900 text-pink-400 font-bold text-xs rounded-xl shadow-md cursor-pointer mt-2 border border-neutral-800"
                >
                  {authMode === 'login' ? 'Agendar / Entrar' : 'Criar minha conta'}
                </button>
              </form>

              <div className="mt-4 pt-4 border-t border-neutral-100 text-center">
                <button
                  onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
                  className="text-xs text-pink-600 hover:text-pink-700 font-bold cursor-pointer"
                >
                  {authMode === 'login' ? 'Não tem conta? Cadastre-se' : 'Já possui uma conta? Faça login'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* PIX GATEWAY SECURE CHECKOUT MODAL */}
      {selectedLojaDetail && bookingService && (
        <PixPaymentModal
          isOpen={showPixModal}
          onClose={() => setShowPixModal(false)}
          onPaymentConfirmed={handleConfirmBooking}
          amount={bookingService.preco}
          serviceName={bookingService.nome}
          storeName={selectedLojaDetail.loja.nome}
        />
      )}

      {/* BOOKING SUCCESS DIALOG */}
      <AnimatePresence>
        {bookingSuccessModal && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl text-center text-gray-800 border border-pink-100"
            >
              <div className="w-16 h-16 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-pink-100 animate-bounce">
                <Check className="w-8 h-8 text-pink-650 text-pink-600" />
              </div>

              <h3 className="font-extrabold text-lg text-neutral-950 leading-snug">
                Sessão Reservada com Sucesso!
              </h3>
              <p className="text-xs text-neutral-500 mt-2 leading-relaxed">
                Tudo pronto para sua dose de autocuidado! O Núcleo de Autoestima e a profissional designada já receberam sua reserva.
              </p>

              <div className="mt-5 p-3.5 bg-neutral-50 rounded-2xl border border-neutral-150 text-left">
                <span className="text-[9px] font-bold text-pink-700 bg-pink-50 px-2 py-0.5 rounded-md border border-pink-100/40 uppercase tracking-widest block mb-1.5 w-max">
                  Mensagem WhatsApp Ativada
                </span>
                <p className="text-[11px] text-neutral-700 leading-relaxed font-semibold">
                  💬 "Seu horário no Núcleo de Autoestima está confirmado para amanhã! Aguardamos você para seu momento exclusivo de beleza."
                </p>
              </div>

              <button
                onClick={() => {
                  setBookingSuccessModal(false);
                  setCurrentView('dashboard'); 
                }}
                className="w-full mt-6 py-2.5 bg-black hover:bg-neutral-900 text-pink-400 border border-neutral-800 font-bold text-xs rounded-xl shadow-md cursor-pointer"
              >
                Visualizar minhas reservas no Painel
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* EXCLUSIVE PWA INSTALLATION TUTORIAL NOTIFICATION BOX */}
      <AnimatePresence>
        {showPwaPrompt && (
          <div className="fixed bottom-4 right-4 max-w-sm w-[calc(100vw-32px)] bg-white/95 backdrop-blur-md rounded-2xl border border-pink-100 shadow-2xl z-40 p-4 font-sans text-neutral-800 flex flex-col gap-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 bg-pink-50 rounded-xl border border-pink-100 flex items-center justify-center text-pink-600">
                  <Smartphone className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h4 className="font-extrabold text-xs tracking-tight text-neutral-900 flex items-center gap-1">
                    Instalar Aplicativo (Web App)
                  </h4>
                  <p className="text-[10px] text-neutral-500 font-medium">Use como aplicativo no seu celular!</p>
                </div>
              </div>
              <button
                onClick={() => {
                  localStorage.setItem('dismiss_pwa_install_v2', 'true');
                  setShowPwaPrompt(false);
                }}
                className="p-1 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-50 rounded-lg cursor-pointer transition-colors"
                title="Fechar"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-gradient-to-tr from-pink-50/10 to-purple-50/30 border border-pink-55 p-3 rounded-xl">
              <span className="text-[9px] font-bold text-pink-700 bg-pink-100 px-2 py-0.5 rounded-md uppercase tracking-wider block w-max mb-1.5 font-mono">
                {deviceOS === 'ios' && 'Dispositivo iOS Detectado (Safari)'}
                {deviceOS === 'android' && 'Dispositivo Android Detectado (Chrome)'}
                {deviceOS === 'desktop' && 'Dispositivo Desktop Detectado'}
              </span>

              {deviceOS === 'ios' && (
                <div className="space-y-1.5 text-[11px] text-neutral-600 font-sans">
                  <p className="font-semibold text-neutral-800">Siga estes passos simples no Safari:</p>
                  <ol className="list-decimal list-inside pl-1 space-y-1">
                    <li>Toque em <b className="text-pink-600">Compartilhar</b> (quadrado com seta <Share2 className="w-3.5 h-3.5 inline text-neutral-700 mx-0.5" /> no menu inferior).</li>
                    <li>Role as opções e toque em <b className="text-pink-600">"Adicionar à Tela de Início"</b>.</li>
                    <li>Configure o nome e toque em <b className="text-pink-600">"Adicionar"</b> no canto superior.</li>
                  </ol>
                </div>
              )}

              {deviceOS === 'android' && (
                <div className="space-y-1.5 text-[11px] text-neutral-600 font-sans">
                  <p className="font-semibold text-neutral-800">Siga estes passos simples no Chrome:</p>
                  <ol className="list-decimal list-inside pl-1 space-y-1">
                    <li>Toque nas <b className="text-pink-600">Opções</b> (três pontinhos verticais no topo direito).</li>
                    <li>Toque em <b className="text-pink-600">"Instalar aplicativo"</b> ou <b className="text-pink-600">"Adicionar à tela inicial"</b>.</li>
                    <li>Confirme em <b className="text-pink-600">"Instalar"</b> para fixar o Web App.</li>
                  </ol>
                </div>
              )}

              {deviceOS === 'desktop' && (
                <div className="space-y-1.5 text-[11px] text-neutral-600 font-sans">
                  <p className="font-semibold text-neutral-800">Instalação facilitada no PC:</p>
                  <ol className="list-decimal list-inside pl-1 space-y-1">
                    <li>Selecione o ícone de <b className="text-pink-600">Download</b> (<Download className="w-3 h-3 inline text-pink-600 mx-0.5" /> na barra de endereços).</li>
                    <li>Ou abra as opções do seu navegador e clique em <b className="text-pink-600">"Instalar Núcleo de Autoestima"</b>.</li>
                  </ol>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between border-t border-neutral-100 pt-2 text-[9px] text-neutral-400 font-medium">
              <span>DS Company • Desenvolvido por João Layon</span>
              <button
                onClick={() => {
                  localStorage.setItem('dismiss_pwa_install_v2', 'true');
                  setShowPwaPrompt(false);
                }}
                className="text-pink-600 hover:underline font-bold"
              >
                Esconder aviso
              </button>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* NOTIFICATION TOAST OVERLAY */}
      <NotificationToast toasts={toasts} onClose={removeToast} />

      {/* Dynamic Cursor Companion Aura for premium luxury salon feel */}
      {hasMouseMoved && (
        <div 
          className="pointer-events-none fixed w-10 h-10 rounded-full border border-pink-500/20 bg-gradient-to-tr from-pink-500/10 to-purple-500/10 backdrop-blur-[1px] z-50 transition-all duration-75 flex items-center justify-center -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none invisible md:visible"
          style={{ 
            left: `${globalMouse.x}px`, 
            top: `${globalMouse.y}px`,
            boxShadow: '0 0 25px rgba(236, 72, 153, 0.45), inset 0 0 10px rgba(236, 72, 153, 0.25)'
          }}
        >
          {/* Subtly rotates and pulses */}
          <Sparkles className="w-4 h-4 text-pink-500 animate-spin animate-duration-3000" />
        </div>
      )}

    </div>
  );
}

// Decorative SVGs to add premium layout accent
function BadgeIcon() {
  return (
    <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
    </svg>
  );
}
