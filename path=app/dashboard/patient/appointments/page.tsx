import React, { useState, useMemo, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Calendar as CalendarIcon,
  Filter as FilterIcon,
  Plus,
  Search,
  LayoutGrid,
  X,
  UserCircle,
  CalendarDays,
  Clock,
  CheckCircle,
  XCircle,
  ChevronRight,
  ChevronLeft,
  Bell,
  Calendar,
  FileText,
  Video,
  MapPin,
  AlertCircle
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

// --- Mock/Placeholder Components for Appointments ---
interface Appointment {
  id: string;
  patientName: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  status: 'upcoming' | 'past' | 'cancelled';
  reason?: string;
  notes?: string;
  type?: 'in-person' | 'video' | 'phone';
  location?: string;
  duration?: string;
}

const mockAppointments: Appointment[] = [
  // ... your mock appointments ...
];

// Helper function to get status colors
const getStatusConfig = (status: 'upcoming' | 'past' | 'cancelled'): { variant: string; icon: JSX.Element | null; color: string } => {
  switch(status) {
    case 'upcoming':
      return { 
        variant: 'default', 
        icon: <CheckCircle className="w-3 h-3 mr-1" />,
        color: 'text-green-500'
      };
    case 'past':
      return { 
        variant: 'secondary', 
        icon: <CheckCircle className="w-3 h-3 mr-1" />,
        color: 'text-blue-500'
      };
    case 'cancelled':
      return { 
        variant: 'destructive', 
        icon: <XCircle className="w-3 h-3 mr-1" />,
        color: 'text-red-500'
      };
    default:
      return { 
        variant: 'outline', 
        icon: null,
        color: 'text-muted-foreground'
      };
  }
};

// Helper function to get appointment type icon
const getAppointmentTypeIcon = (type: 'in-person' | 'video' | 'phone'): JSX.Element => {
  switch(type) {
    case 'video':
      return <Video className="w-4 h-4 text-blue-500" />;
    case 'phone':
      return <Bell className="w-4 h-4 text-purple-500" />;
    case 'in-person':
    default:
      return <MapPin className="w-4 h-4 text-emerald-500" />;
  }
};

// Empty state component
const EmptyState = ({ type, query = "" }: { type: 'search' | 'empty'; query?: string }) => (
  <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
    <div className="bg-muted/50 rounded-full p-4 mb-4">
      {type === 'search' ? 
        <Search className="w-8 h-8 text-muted-foreground" /> : 
        <Calendar className="w-8 h-8 text-muted-foreground" />
      }
    </div>
    <h3 className="text-lg font-medium mb-1">
      {type === 'search' ? `No results found${query ? ` for "${query}"` : ''}` : 'No appointments yet'}
    </h3>
    <p className="text-muted-foreground text-sm max-w-sm">
      {type === 'search' 
        ? 'Try adjusting your search or filters to find what you\'re looking for.' 
        : 'Your appointments will appear here once they are scheduled.'}
    </p>
    {type !== 'search' && (
      <Button className="mt-4" size="sm">
        <Plus className="mr-1 h-4 w-4" /> Schedule New Appointment
      </Button>
    )}
  </div>
);

interface AppointmentListProps {
  status: 'upcoming' | 'past' | 'cancelled';
  onAppointmentSelect: (appointmentId: string) => void;
  searchQuery: string;
  activeFilters?: Record<string, any>;
}

const AppointmentList = ({ status, onAppointmentSelect, searchQuery, activeFilters = {} }: AppointmentListProps) => {
  const filteredAppointments = useMemo(() =>
    mockAppointments.filter(apt =>
      apt.status === status &&
      (searchQuery === "" ||
       apt.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
       apt.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
       (apt.reason && apt.reason.toLowerCase().includes(searchQuery.toLowerCase())))
    ), [status, searchQuery, activeFilters]);

  if (filteredAppointments.length === 0) {
    return <EmptyState type={searchQuery ? 'search' : 'empty'} query={searchQuery} />;
  }
  
  return (
    <div className="space-y-3">
      {status === 'upcoming' && filteredAppointments.length > 0 && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg p-4 mb-6 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-sm text-blue-700 dark:text-blue-300">Your next appointment</h4>
            <p className="text-sm text-blue-600 dark:text-blue-400">
              {filteredAppointments[0].doctorName} • {new Date(filteredAppointments[0].date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} at {filteredAppointments[0].time}
            </p>
          </div>
        </div>
      )}
      
      {filteredAppointments.map(apt => (
        <Card 
          key={apt.id} 
          className="hover:shadow-md dark:hover:shadow-primary/10 transition-all cursor-pointer bg-card border-muted/30 hover:border-primary/30"
          onClick={() => onAppointmentSelect(apt.id)}
        >
          <CardContent className="p-4">
            <div className="flex items-start gap-4">
              <div className="hidden sm:flex h-10 w-10 rounded-full bg-primary/10 items-center justify-center flex-shrink-0">
                {getAppointmentTypeIcon(apt.type)}
              </div>
              
              <div className="flex-grow">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                  <div>
                    <h3 className="font-medium text-base">{apt.doctorName}</h3>
                    <p className="text-sm text-muted-foreground">{apt.specialty}</p>
                  </div>
                  
                  <Badge 
                    variant={getStatusConfig(apt.status).variant}
                    className="capitalize text-xs w-fit flex items-center h-5"
                  >
                    {getStatusConfig(apt.status).icon} {apt.status}
                  </Badge>
                </div>
                
                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs">
                  <div className="flex items-center text-muted-foreground">
                    <CalendarDays className="w-3 h-3 mr-1 flex-shrink-0" />
                    {new Date(apt.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Clock className="w-3 h-3 mr-1 flex-shrink-0" />
                    {apt.time} • {apt.duration}
                  </div>
                  {apt.location && (
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
                      {apt.location}
                    </div>
                  )}
                </div>
                
                {apt.reason && status !== 'past' && (
                  <p className="text-xs text-muted-foreground mt-2 line-clamp-1">
                    <span className="font-medium">Reason:</span> {apt.reason}
                  </p>
                )}
              </div>
              
              <div className="hidden sm:flex items-center self-center">
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

interface AppointmentCalendarProps {
  status: 'upcoming' | 'past' | 'cancelled';
  onAppointmentSelect: (appointmentId: string) => void;
  searchQuery: string;
}

const AppointmentCalendar = ({ status, onAppointmentSelect, searchQuery }: AppointmentCalendarProps) => {
  const filteredAppointments = useMemo(() =>
    mockAppointments.filter(apt =>
      apt.status === status &&
      (searchQuery === "" ||
      apt.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.specialty.toLowerCase().includes(searchQuery.toLowerCase()))
    ), [status, searchQuery]);

  // Group appointments by date
  const appointmentsByDate: Record<string, Appointment[]> = useMemo(() => {
    const grouped: Record<string, Appointment[]> = {};
    filteredAppointments.forEach(apt => {
      const date = apt.date;
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(apt);
    });
    return grouped;
  }, [filteredAppointments]);

  if (filteredAppointments.length === 0) {
    return <EmptyState type={searchQuery ? 'search' : 'empty'} query={searchQuery} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium">{status.charAt(0).toUpperCase() + status.slice(1)} Appointments</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="h-8 w-8">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium">May 2025</span>
          <Button variant="outline" size="icon" className="h-8 w-8">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {Object.keys(appointmentsByDate).map(date => (
        <div key={date} className="space-y-2">
          <div className="sticky top-0 bg-slate-50/90 dark:bg-slate-900/90 backdrop-blur-sm z-10 py-2">
            <h3 className="font-medium">
              {new Date(date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </h3>
            <Separator className="mt-2" />
          </div>
          
          <div className="space-y-2 pl-1">
            {appointmentsByDate[date].map(apt => (
              <div 
                key={apt.id}
                onClick={() => onAppointmentSelect(apt.id)}
                className="p-3 pl-4 border-l-4 rounded-r-md hover:bg-muted/50 cursor-pointer transition-colors relative"
                style={{ borderLeftColor: apt.status === 'upcoming' ? '#22c55e' : apt.status === 'past' ? '#6b7280' : '#ef4444' }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{apt.time}</span>
                      <Badge variant="outline" className="text-xs flex items-center gap-1 h-5 font-normal">
                        {getAppointmentTypeIcon(apt.type)}
                        <span className="capitalize">{apt.type}</span>
                      </Badge>
                    </div>
                    <p className="text-sm">{apt.doctorName} • {apt.specialty}</p>
                    {apt.location && (
                      <p className="text-xs text-muted-foreground mt-1 flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {apt.location}
                      </p>
                    )}
                  </div>
                  <Badge 
                    variant={getStatusConfig(apt.status).variant}
                    className="capitalize text-xs"
                  >
                    {apt.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

interface AppointmentDetailProps {
  appointmentId: string;
  onClose: () => void;
}

const AppointmentDetail = ({ appointmentId, onClose }: AppointmentDetailProps) => {
  const apt = mockAppointments.find(a => a.id === appointmentId);

  if (!apt) return (
    <Card className="sticky top-0 lg:top-4 h-full lg:h-auto shadow-none lg:shadow-xl border-0 lg:border rounded-none lg:rounded-lg flex flex-col bg-card">
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle>Not Found</CardTitle>
        <Button variant="ghost" size="icon" onClick={onClose}><X className="w-4 h-4" /></Button>
      </CardHeader>
      <CardContent className="py-6 flex-grow">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
          <p>Appointment details could not be loaded.</p>
        </div>
      </CardContent>
    </Card>
  );

  const statusConfig = getStatusConfig(apt.status);

  return (
    <Card className="sticky top-0 lg:top-0 h-full lg:h-auto shadow-none lg:shadow-xl border-0 lg:border rounded-none lg:rounded-lg flex flex-col bg-card">
      <CardHeader className="border-b pb-4">
        <div className="flex justify-between items-start">
          <div>
            <Badge 
              variant={statusConfig.variant}
              className="capitalize text-xs mb-2"
            >
              {apt.status}
            </Badge>
            <CardTitle className="text-xl mb-1">Appointment Details</CardTitle>
            <CardDescription>
              {apt.status === 'upcoming' 
                ? 'Your upcoming appointment information' 
                : apt.status === 'past'
                ? 'Details from your past visit'
                : 'This appointment was cancelled'
              }
            </CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      
      <ScrollArea className="flex-grow">
        <CardContent className="p-4 space-y-6">
          {/* Doctor Information */}
          <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
            <Avatar className="h-14 w-14 border-2 border-primary/10">
              <AvatarFallback className="bg-primary/10 text-primary font-medium">
                {apt.doctorName.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg">{apt.doctorName}</h3>
              <p className="text-sm text-muted-foreground">{apt.specialty}</p>
              {apt.status === 'upcoming' && (
                <Button variant="link" className="p-0 h-auto text-xs text-primary mt-1">
                  View Provider Profile
                </Button>
              )}
            </div>
          </div>
          
          {/* Appointment Details */}
          <div>
            <h4 className="text-sm font-medium mb-3">Appointment Information</h4>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div className="bg-muted/30 p-3 rounded-md">
                <div className="flex items-center gap-2 mb-1 text-muted-foreground">
                  <CalendarDays className="w-4 h-4" />
                  <span className="font-medium">Date & Time</span>
                </div>
                <p>{new Date(apt.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
                <p>{apt.time} ({apt.duration})</p>
              </div>
              
              <div className="bg-muted/30 p-3 rounded-md">
                <div className="flex items-center gap-2 mb-1 text-muted-foreground">
                  {getAppointmentTypeIcon(apt.type)}
                  <span className="font-medium">Appointment Type</span>
                </div>
                <p className="capitalize">{apt.type}</p>
                {apt.location && <p className="text-sm mt-1">{apt.location}</p>}
              </div>
            </div>
          </div>
          
          {/* Reason for Visit */}
          {apt.reason && (
            <div>
              <h4 className="text-sm font-medium mb-2">Reason for Visit</h4>
              <div className="bg-muted/30 p-3 rounded-md">
                <p className="text-sm whitespace-pre-wrap">{apt.reason}</p>
              </div>
            </div>
          )}
          
          {/* Doctor's Notes (for past appointments) */}
          {apt.notes && (
            <div>
              <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                <FileText className="w-4 h-4 text-muted-foreground" />
                Doctor's Notes
              </h4>
              <div className="bg-muted/30 p-3 rounded-md">
                <p className="text-sm whitespace-pre-wrap">{apt.notes}</p>
              </div>
            </div>
          )}
          
          {/* Supporting info for upcoming */}
          {apt.status === 'upcoming' && (
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Before Your Visit</h4>
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-md p-3 text-sm">
                <p className="font-medium text-blue-700 dark:text-blue-300 mb-1">Preparation Instructions</p>
                <ul className="list-disc pl-5 text-blue-600 dark:text-blue-400 space-y-1">
                  <li>Please arrive 15 minutes before your appointment time</li>
                  <li>Bring a list of current medications</li>
                  <li>Bring your insurance card and ID</li>
                </ul>
              </div>
            </div>
          )}
        </CardContent>
      </ScrollArea>
      
      <CardFooter className="border-t p-4 dark:border-slate-700">
        {apt.status === 'upcoming' && (
          <div className="flex gap-2 w-full">
            <Button variant="outline" className="flex-1">
              Reschedule
            </Button>
            <Button variant="destructive" className="flex-1">
              Cancel
            </Button>
          </div>
        )}
        {apt.status === 'past' && (
          <div className="flex flex-col sm:flex-row gap-2 w-full">
            <Button variant="default" className="flex-1">
              Book Follow-up
            </Button>
            <Button variant="outline" className="flex-1">
              Download Records
            </Button>
          </div>
        )}
        {apt.status === 'cancelled' && (
          <Button variant="default" className="w-full">
            Book New Appointment
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

const AppointmentFilters = ({ onClose, onApply }: { onClose: () => void, onApply: () => void }) => {
  const specialties = Array.from(new Set(mockAppointments.map(apt => apt.specialty)));
  const appointmentTypes = ['in-person', 'video', 'phone'];
  
  return (
    <Card className="border-none shadow-none bg-transparent">
      <CardHeader className="pt-2 pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base">Filter Appointments</CardTitle>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <CardDescription className="text-xs">Refine your appointment list</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4 pb-3">
        <div>
          <label htmlFor="dateRange" className="block text-xs font-medium mb-1.5">Date Range</label>
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input type="date" id="dateStart" className="pl-9 text-sm h-9" />
            </div>
            <span className="text-muted-foreground">to</span>
            <div className="relative flex-1">
              <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input type="date" id="dateEnd" className="pl-9 text-sm h-9" />
            </div>
          </div>
        </div>
        
        <div>
          <label htmlFor="doctor" className="block text-xs font-medium mb-1.5">Healthcare Provider</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input type="text" id="doctor" placeholder="Search by name" className="pl-9 text-sm h-9" />
          </div>
        </div>
        
        <div>
          <label className="block text-xs font-medium mb-1.5">Specialty</label>
          <div className="grid grid-cols-2 gap-2">
            {specialties.map(specialty => (
              <div key={specialty} className="flex items-center">
                <input 
                  type="checkbox" 
                  id={`specialty-${specialty}`} 
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <label htmlFor={`specialty-${specialty}`} className="ml-2 text-sm">
                  {specialty}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <label className="block text-xs font-medium mb-1.5">Appointment Type</label>
          <div className="flex flex-wrap gap-2">
            {appointmentTypes.map(type => (
              <Badge 
                key={type} 
                variant="outline" 
                className="py-1.5 px-3 cursor-pointer hover:bg-muted"
              >
                {getAppointmentTypeIcon(type)}
                <span className="ml-1.5 capitalize">{type}</span>
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-end gap-2 pb-2">
        <Button variant="ghost" size="sm" onClick={onClose}>Clear All</Button>
        <Button size="sm" onClick={onApply}>Apply Filters</Button>
      </CardFooter>
    </Card>
  );
};

export default function AppointmentsPage() {
  const [view, setView] = useState<"list" | "calendar">("list");
  const [selectedAppointment, setSelectedAppointment] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState<"upcoming" | "past" | "cancelled">("upcoming");
  const [isMobileView, setIsMobileView] = useState(false);
  const [activeFilters, setActiveFilters] = useState({});

  useEffect(() => {
    const checkMobileView = () => {
      setIsMobileView(window.innerWidth < 1024);
    };
    checkMobileView();
    window.addEventListener('resize', checkMobileView);
    return () => window.removeEventListener('resize', checkMobileView);
  }, []);

  const handleAppointmentSelect = (appointmentId: string) => {
    setSelectedAppointment(appointmentId);
    if (isMobileView) {
      document.body.style.overflow = 'hidden';
    }
  };

  const handleCloseDetail = () => {
    setSelectedAppointment(null);
    if (isMobileView) {
      document.body.style.overflow = '';
    }
  };

  const toggleFilters = () => setShowFilters(!showFilters);
  
  const applyFilters = () => {
    // Mock filter application
    setShowFilters(false);
    // Notify user that filters have been applied
  };

  const appointmentCounts = useMemo(() => {
    const counts = {
      upcoming: 0,
      past: 0,
      cancelled: 0
    };
    
    mockAppointments.forEach(apt => {
      counts[apt.status]++;
    });
    
    return counts;
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 text-foreground w-full">
      {/* Header Section */}
      <header className="px-4 md:px-6 py-4 bg-card border-b dark:border-slate-700 shadow-sm sticky top-0 z-30 w-full">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl md:text-2xl font-bold">Appointments</h1>
            <p className="text-muted-foreground text-sm mt-0.5">
              View and manage your medical appointments
            </p>
          </div>
          <Button size="sm" className="flex items-center gap-1.5 h-9">
            <Plus className="h-3.5 w-3.5" /> Schedule New
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 items-center w-full">
          <div className="relative flex-grow w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by doctor, specialty, reason..."
              className="w-full pl-9 pr-4 py-2 h-10 text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button
              variant={showFilters ? "secondary" : "outline"}
              size="sm"
              className="flex-1 sm:flex-none h-10 text-xs px-3"
              onClick={toggleFilters}
            >
              <FilterIcon className="h-3.5 w-3.5 mr-1.5" />
              Filters
              {Object.keys(activeFilters).length > 0 && (
                <span className="ml-1 bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded-full">
                  {Object.keys(activeFilters).length}
                </span>
              )}
            </Button>
            <div className="bg-muted rounded-md p-0.5 flex items-center">
              <Button
                variant={view === "list" ? "default" : "ghost"}
                size="sm"
                className="rounded-sm h-9 px-3"
                onClick={() => setView("list")}
              >
                <LayoutGrid className="h-3.5 w-3.5 mr-1.5" /> List
              </Button>
              <Button
                variant={view === "calendar" ? "default" : "ghost"}
                size="sm"
                className="rounded-sm h-9 px-3"
                onClick={() => setView("calendar")}
              >
                <CalendarIcon className="h-3.5 w-3.5 mr-1.5" /> Calendar
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Collapsible Filters Section */}
      {showFilters && (
        <div className="px-4 md:px-6 py-2 bg-card border-b dark:border-slate-700 shadow-sm sticky z-20 w-full">
          <AppointmentFilters onClose={() => setShowFilters(false)} onApply={applyFilters} />
        </div>
      )}

      {/* Tabs Section */}
      <Tabs
        value={activeTab}
        onValueChange={(value) => {
          setActiveTab(value as "upcoming" | "past" | "cancelled");
          setSelectedAppointment(null);
        }}
        className="flex-1 flex flex-col overflow-hidden w-full"
      >
        <div className="px-4 md:px-6 bg-card border-b dark:border-slate-700 w-full">
          <TabsList className="h-12 w-full justify-start gap-4">
            <TabsTrigger value="upcoming" className="relative text-sm data-[state=active]:bg-transparent">
              Upcoming
              {appointmentCounts.upcoming > 0 && (
                <span className="ml-1.5 bg-primary/10 text-primary text-xs px-1.5 py-0.5 rounded-full">
                  {appointmentCounts.upcoming}
                </span>
              )}
              <div className="absolute -bottom-px left-0 right-0 h-0.5 bg-primary rounded-t-full data-[state=inactive]:opacity-0"></div>
            </TabsTrigger>
            <TabsTrigger value="past" className="relative text-sm data-[state=active]:bg-transparent">
              Past
              {appointmentCounts.past > 0 && (
                <span className="ml-1.5 bg-primary/10 text-primary text-xs px-1.5 py-0.5 rounded-full">
                  {appointmentCounts.past}
                </span>
              )}
              <div className="absolute -bottom-px left-0 right-0 h-0.5 bg-primary rounded-t-full data-[state=inactive]:opacity-0"></div>
            </TabsTrigger>
            <TabsTrigger value="cancelled" className="relative text-sm data-[state=active]:bg-transparent">
              Cancelled
              {appointmentCounts.cancelled > 0 && (
                <span className="ml-1.5 bg-primary/10 text-primary text-xs px-1.5 py-0.5 rounded-full">
                  {appointmentCounts.cancelled}
                </span>
              )}
              <div className="absolute -bottom-px left-0 right-0 h-0.5 bg-primary rounded-t-full data-[state=inactive]:opacity-0"></div>
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 flex overflow-hidden w-full">
          <div className="flex-1 overflow-auto p-4 md:p-6">
            <TabsContent value="upcoming" className="mt-0 data-[state=active]:h-full">
              {view === "list" ? (
                <AppointmentList 
                  status="upcoming" 
                  onAppointmentSelect={handleAppointmentSelect} 
                  searchQuery={searchQuery}
                  activeFilters={activeFilters}
                />
              ) : (
                <AppointmentCalendar 
                  status="upcoming" 
                  onAppointmentSelect={handleAppointmentSelect}
                  searchQuery={searchQuery}
                />
              )}
            </TabsContent>
            <TabsContent value="past" className="mt-0 data-[state=active]:h-full">
              {view === "list" ? (
                <AppointmentList 
                  status="past" 
                  onAppointmentSelect={handleAppointmentSelect} 
                  searchQuery={searchQuery}
                  activeFilters={activeFilters}
                />
              ) : (
                <AppointmentCalendar 
                  status="past" 
                  onAppointmentSelect={handleAppointmentSelect}
                  searchQuery={searchQuery}
                />
              )}
            </TabsContent>
            <TabsContent value="cancelled" className="mt-0 data-[state=active]:h-full">
              {view === "list" ? (
                <AppointmentList 
                  status="cancelled" 
                  onAppointmentSelect={handleAppointmentSelect} 
                  searchQuery={searchQuery}
                  activeFilters={activeFilters}
                />
              ) : (
                <AppointmentCalendar 
                  status="cancelled" 
                  onAppointmentSelect={handleAppointmentSelect}
                  searchQuery={searchQuery}
                />
              )}
            </TabsContent>
          </div>

          {selectedAppointment && !isMobileView && (
            <div className="hidden lg:block lg:w-1/3 xl:w-1/3 border-l dark:border-slate-700 bg-card/60 dark:bg-slate-800/30 overflow-auto">
              <AppointmentDetail appointmentId={selectedAppointment} onClose={handleCloseDetail} />
            </div>
          )}
        </div>
      </Tabs>

      {/* Mobile Detail View */}
      {selectedAppointment && isMobileView && (
        <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 lg:hidden overflow-auto">
          <AppointmentDetail appointmentId={selectedAppointment} onClose={handleCloseDetail} />
        </div>
      )}
    </div>
  );
} 