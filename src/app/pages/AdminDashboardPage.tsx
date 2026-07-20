import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { LogOut, Download, Loader2, Save, ChevronDown, ChevronUp, Trash2, AlertTriangle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';

import CMSCoaches from '../components/cms/CMSCoaches';
import CMSProgramPages from '../components/cms/CMSProgramPages';
import CMSPrograms from '../components/cms/CMSPrograms';
import CMSSponsors from '../components/cms/CMSSponsors';
import CMSTestimonials from '../components/cms/CMSTestimonials';
import CMSTermClasses from '../components/cms/CMSTermClasses';
import CMSSiteContent from '../components/cms/CMSSiteContent';

type MainTab = 'registrations' | 'programs' | 'program-pages' | 'coaches' | 'sponsors' | 'testimonials' | 'term-classes' | 'site-content';
type FilterTab = string;

interface Booking {
  id: string;
  parent_first_name: string;
  parent_last_name: string;
  parent_email: string;
  parent_phone: string;
  player_name: string;
  class_id: string;
  class_label: string;
  class_price: number;
  addon_45min: boolean;
  addon_60min: boolean;
  addon_total: number;
  total_paid: number;
  payment_status: string;
  created_at: string;
  registration_id: string;
  registrations?: {
    id: string;
    player_first_name: string;
    player_last_name: string;
    player_birthday: string;
    player_gender: string;
    medical_conditions: string;
    player_experience: string;
    photo_permission: boolean;
    emergency_first_name: string;
    emergency_last_name: string;
    emergency_relationship: string;
    additional_info: string;
  } | null;
}

interface ClassSpots {
  id: string;
  label: string;
  title?: string;
  subtitle?: string;
  spots_remaining: number;
  max_capacity: number;
}

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const [mainTab, setMainTab] = useState<MainTab>('registrations');
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [classes, setClasses] = useState<ClassSpots[]>([]);
  const [filter, setFilter] = useState<FilterTab>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [editingSpots, setEditingSpots] = useState<Record<string, number>>({});
  const [savingSpots, setSavingSpots] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    checkAuth();
    fetchData();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) navigate('/admin');
  };

  const fetchData = async () => {
    setLoading(true);
    const [bookingsRes, classesRes] = await Promise.all([
      supabase.from('bookings').select('*, registrations(*)').order('created_at', { ascending: false }),
      supabase.from('classes').select('*'),
    ]);
    if (bookingsRes.data) setBookings(bookingsRes.data);
    if (classesRes.data) {
      setClasses(classesRes.data);
      const map: Record<string, number> = {};
      classesRes.data.forEach(c => { map[c.id] = c.spots_remaining; });
      setEditingSpots(map);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin');
  };

  const handleSaveSpots = async (classId: string) => {
    setSavingSpots(true);
    await supabase.from('classes').update({ spots_remaining: editingSpots[classId], updated_at: new Date().toISOString() }).eq('id', classId);
    await fetchData();
    setSavingSpots(false);
  };

  const handleDelete = async (bookingId: string, registrationId: string | null) => {
    setDeleting(true);
    try {
      // 1. Delete booking first (FK constraint)
      await supabase.from('bookings').delete().eq('id', bookingId);
      // 2. Delete registration if it exists
      if (registrationId) {
        await supabase.from('registrations').delete().eq('id', registrationId);
      }
      // 3. Refresh and close
      await fetchData();
      setConfirmDeleteId(null);
      setExpandedId(null);
    } catch (err) {
      console.error('Delete failed:', err);
    } finally {
      setDeleting(false);
    }
  };

  const filtered = filter === 'all' ? bookings : bookings.filter(b => b.class_id === filter);

  const countByClass = (id: string) => bookings.filter(b => b.class_id === id && b.payment_status === 'paid').length;

  const buildExportData = () => filtered.map(b => ({
    'Date': new Date(b.created_at).toLocaleDateString('en-AU'),
    'Parent Name': `${b.parent_first_name} ${b.parent_last_name}`,
    'Parent Email': b.parent_email,
    'Parent Phone': b.parent_phone,
    'Player Name': b.player_name,
    'Class': b.class_label,
    'Base Price': `$${(b.class_price / 100).toFixed(0)}`,
    '45-min Private Session': b.addon_45min ? 'Yes' : 'No',
    '1-hr Private Session': b.addon_60min ? 'Yes' : 'No',
    'Add-on Total': `$${(b.addon_total / 100).toFixed(0)}`,
    'Total Paid': `$${(b.total_paid / 100).toFixed(0)}`,
    'Status': b.payment_status,
    'Player First Name': b.registrations?.player_first_name || '',
    'Player Last Name': b.registrations?.player_last_name || '',
    'Player Birthday': b.registrations?.player_birthday || '',
    'Player Gender': b.registrations?.player_gender || '',
    'Medical Conditions': b.registrations?.medical_conditions || '',
    'Player Experience': b.registrations?.player_experience || '',
    'Photo Permission': b.registrations?.photo_permission ? 'Yes' : 'No',
    'Emergency First Name': b.registrations?.emergency_first_name || '',
    'Emergency Last Name': b.registrations?.emergency_last_name || '',
    'Emergency Relationship': b.registrations?.emergency_relationship || '',
    'Additional Info': b.registrations?.additional_info || '',
  }));

  const triggerDownload = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const exportCSV = () => {
    const csv = Papa.unparse(buildExportData());
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    triggerDownload(blob, `technica-registrations-${new Date().toISOString().split('T')[0]}.csv`);
  };

  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(buildExportData());
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Registrations');
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    triggerDownload(blob, `technica-registrations-${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const tabs: { key: FilterTab; label: string }[] = [
    { key: 'all', label: 'All' },
    ...classes.map(c => ({ key: c.id, label: c.subtitle || c.title || c.label.split(' / ')[0] }))
  ];

  if (loading) return (
    <section className="min-h-[80vh] bg-[#f3f4f6] flex items-center justify-center">
      <Loader2 className="w-12 h-12 text-[#f0722b] animate-spin" />
    </section>
  );

  return (
    <section className="min-h-screen bg-[#f3f4f6] pb-64 md:pb-96">
      {/* Header */}
      <div className="bg-[#0A1F44] px-4 md:px-8 py-5 flex items-center justify-between">
        <h1 className="text-white font-barlow font-bold tracking-widest uppercase text-sm md:text-lg truncate">Technica Football — Admin</h1>
        <button onClick={handleLogout} className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm font-barlow tracking-widest uppercase">
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </div>

      <div className="bg-white border-b border-gray-200 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex overflow-x-auto hide-scrollbar">
          {([
            { key: 'registrations', label: 'Registrations' },
            { key: 'term-classes', label: 'Term Classes' },
            { key: 'site-content', label: 'Site Content' },
            { key: 'programs', label: 'Programs' },
            { key: 'program-pages', label: 'Program Pages' },
            { key: 'coaches', label: 'Coaches' },
            { key: 'sponsors', label: 'Sponsors' },
            { key: 'testimonials', label: 'Testimonials' },
          ] as { key: MainTab; label: string }[]).map(t => (
            <button key={t.key} onClick={() => setMainTab(t.key)}
              className={`shrink-0 px-5 py-4 text-xs font-barlow font-bold tracking-widest uppercase border-b-2 transition-colors ${
                mainTab === t.key ? 'border-[#f0722b] text-[#f0722b]' : 'border-transparent text-gray-400 hover:text-[#0A1F44]'
              }`}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-8 pb-40 space-y-6 md:space-y-8">
        {/* CMS Tabs */}
        {mainTab === 'term-classes' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="font-black text-[#0A1F44] text-lg mb-6">Term Classes & Schedule</h2>
            <CMSTermClasses />
          </div>
        )}
        {mainTab === 'site-content' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="font-black text-[#0A1F44] text-lg mb-6">Site Content — Homepage & Page Text</h2>
            <CMSSiteContent />
          </div>
        )}
        {mainTab === 'coaches' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="font-black text-[#0A1F44] text-lg mb-6">Coaches — Meet the Team</h2>
            <CMSCoaches />
          </div>
        )}
        {mainTab === 'sponsors' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="font-black text-[#0A1F44] text-lg mb-6">Partners & Sponsors</h2>
            <CMSSponsors />
          </div>
        )}
        {mainTab === 'testimonials' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="font-black text-[#0A1F44] text-lg mb-6">Testimonials</h2>
            <CMSTestimonials />
          </div>
        )}
        {mainTab === 'programs' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="font-black text-[#0A1F44] text-lg mb-6">Program Cards</h2>
            <CMSPrograms />
          </div>
        )}
        {mainTab === 'program-pages' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="font-black text-[#0A1F44] text-lg mb-6">Program Page Content</h2>
            <CMSProgramPages />
          </div>
        )}

        {mainTab === 'registrations' && (<>
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <SummaryCard label="Total Bookings" value={bookings.filter(b => b.payment_status === 'paid').length} />
          {classes.map(c => (
            <SummaryCard key={c.id} label={c.subtitle || c.title || c.label.split(' / ')[0]} value={countByClass(c.id)} />
          ))}
        </div>

        {/* Spots Management */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-black text-[#0A1F44] text-lg mb-4">Manage Spots</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {classes.map(c => (
              <div key={c.id} className="border border-gray-200 rounded-xl p-4">
                <p className="text-xs text-gray-400 font-barlow tracking-widest uppercase mb-2">{c.subtitle || c.title || c.label}</p>
                <div className="flex items-center gap-3">
                  <label className="text-sm text-gray-600 shrink-0">Spots:</label>
                  <input
                    type="number" min={0} max={c.max_capacity}
                    className="w-20 border border-gray-200 rounded-lg px-3 py-2 text-center text-[#0A1F44] font-bold text-sm focus:outline-none focus:ring-2 focus:ring-[#f0722b]/50"
                    value={editingSpots[c.id] ?? c.spots_remaining}
                    onChange={e => setEditingSpots({ ...editingSpots, [c.id]: parseInt(e.target.value) || 0 })}
                  />
                  <span className="text-xs text-gray-400">/ {c.max_capacity}</span>
                  <button onClick={() => handleSaveSpots(c.id)} disabled={savingSpots} className="ml-auto flex items-center gap-1 bg-[#0A1F44] text-white text-xs font-barlow tracking-widest uppercase px-3 py-2 rounded-lg hover:bg-[#f0722b] transition-colors disabled:opacity-50">
                    <Save className="w-3 h-3" /> Save
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filter + Export */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex gap-2 flex-wrap">
            {tabs.map(t => (
              <button key={t.key} onClick={() => setFilter(t.key)} className={`px-4 py-2 rounded-xl text-sm font-barlow font-bold tracking-widest uppercase transition-colors ${filter === t.key ? 'bg-[#0A1F44] text-white' : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50'}`}>
                {t.label}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button onClick={exportCSV} className="flex items-center gap-2 bg-white border border-gray-200 text-[#0A1F44] text-sm font-barlow font-bold tracking-widest uppercase px-4 py-2 rounded-xl hover:bg-gray-50 transition-colors">
              <Download className="w-4 h-4" /> CSV
            </button>
            <button onClick={exportExcel} className="flex items-center gap-2 bg-[#f0722b] text-white text-sm font-barlow font-bold tracking-widest uppercase px-4 py-2 rounded-xl hover:bg-[#0A1F44] transition-colors">
              <Download className="w-4 h-4" /> Excel
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white md:rounded-2xl shadow-sm border-y md:border border-gray-100 overflow-hidden -mx-4 md:mx-0">
          <div className="overflow-x-auto w-full">
            <table className="w-full text-sm min-w-[900px]">
              <thead>
                <tr className="bg-[#0A1F44] text-white text-left">
                  <th className="px-4 py-3 font-barlow tracking-widest uppercase text-xs">#</th>
                  <th className="px-4 py-3 font-barlow tracking-widest uppercase text-xs">Date</th>
                  <th className="px-4 py-3 font-barlow tracking-widest uppercase text-xs">Parent</th>
                  <th className="px-4 py-3 font-barlow tracking-widest uppercase text-xs">Player</th>
                  <th className="px-4 py-3 font-barlow tracking-widest uppercase text-xs">Class</th>
                  <th className="px-4 py-3 font-barlow tracking-widest uppercase text-xs">Add-ons</th>
                  <th className="px-4 py-3 font-barlow tracking-widest uppercase text-xs">Total</th>
                  <th className="px-4 py-3 font-barlow tracking-widest uppercase text-xs">Status</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 && (
                  <tr><td colSpan={9} className="px-4 py-12 text-center text-gray-400">No bookings found.</td></tr>
                )}
                {filtered.map((b, i) => (
                  <React.Fragment key={b.id}>
                    {/* ── Summary Row ── */}
                    <tr
                      key={b.id}
                      className="border-t border-gray-100 hover:bg-gray-50 cursor-pointer"
                      onClick={() => {
                        setExpandedId(expandedId === b.id ? null : b.id);
                        setConfirmDeleteId(null);
                      }}
                    >
                      <td className="px-4 py-3 text-gray-400">{i + 1}</td>
                      <td className="px-4 py-3 text-[#0A1F44]">{new Date(b.created_at).toLocaleDateString('en-AU')}</td>
                      <td className="px-4 py-3 text-[#0A1F44] font-medium">{b.parent_first_name} {b.parent_last_name}</td>
                      <td className="px-4 py-3 text-[#0A1F44]">{b.player_name}</td>
                      <td className="px-4 py-3 text-[#0A1F44] text-xs">{b.class_label}</td>
                      <td className="px-4 py-3 text-xs">
                        {b.addon_45min && <span className="bg-[#f0722b]/10 text-[#f0722b] px-2 py-0.5 rounded-full mr-1">45min</span>}
                        {b.addon_60min && <span className="bg-[#f0722b]/10 text-[#f0722b] px-2 py-0.5 rounded-full">1hr</span>}
                        {!b.addon_45min && !b.addon_60min && <span className="text-gray-300">—</span>}
                      </td>
                      <td className="px-4 py-3 text-[#0A1F44] font-bold">${(b.total_paid / 100).toFixed(0)}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${b.payment_status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                          {b.payment_status === 'paid' ? '✓ Paid' : b.payment_status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {expandedId === b.id ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                      </td>
                    </tr>

                    {/* ── Expanded Detail Row ── */}
                    {expandedId === b.id && (
                      <tr key={`${b.id}-detail`} className="bg-gray-50 border-t border-gray-100">
                        <td colSpan={9} className="px-8 py-6">

                          {/* Confirm Delete Prompt */}
                          {confirmDeleteId === b.id ? (
                            <div className="bg-red-50 border border-red-200 rounded-xl px-4 md:px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                              <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
                              <div className="flex-1">
                                <p className="text-red-800 font-bold text-sm">Are you sure you want to permanently delete this registration?</p>
                                <p className="text-red-600 text-xs mt-1">This will remove all player and booking data and cannot be undone.</p>
                              </div>
                              <div className="flex gap-3 shrink-0">
                                <button
                                  onClick={() => setConfirmDeleteId(null)}
                                  className="px-4 py-2 text-sm font-barlow font-bold tracking-widest uppercase text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                                >
                                  Cancel
                                </button>
                                <button
                                  onClick={() => handleDelete(b.id, b.registration_id || null)}
                                  disabled={deleting}
                                  className="px-4 py-2 text-sm font-barlow font-bold tracking-widest uppercase text-white bg-red-600 rounded-xl hover:bg-red-700 transition-colors flex items-center gap-2 disabled:opacity-50"
                                >
                                  {deleting ? <Loader2 className="w-3 h-3 animate-spin" /> : <Trash2 className="w-3 h-3" />}
                                  Confirm Delete
                                </button>
                              </div>
                            </div>
                          ) : (
                            <>
                              {/* Registration Detail Grid */}
                              {b.registrations ? (
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs mb-5">
                                  <Detail label="Parent Phone" value={b.parent_phone || '—'} />
                                  <Detail label="Parent Email" value={b.parent_email || '—'} />
                                  <Detail label="Player DOB" value={b.registrations.player_birthday} />
                                  <Detail label="Gender" value={b.registrations.player_gender} />
                                  <Detail label="Experience" value={b.registrations.player_experience || '—'} />
                                  <Detail label="Photo Permission" value={b.registrations.photo_permission ? 'Yes' : 'No'} />
                                  <Detail label="Medical" value={b.registrations.medical_conditions || 'None'} />
                                  <Detail label="Emergency Contact" value={`${b.registrations.emergency_first_name} ${b.registrations.emergency_last_name}`} />
                                  <Detail label="Relationship" value={b.registrations.emergency_relationship} />
                                  <Detail label="Additional Info" value={b.registrations.additional_info || '—'} />
                                </div>
                              ) : (
                                <p className="text-xs text-gray-400 italic mb-5">No registration details available.</p>
                              )}

                              {/* Delete Button */}
                              <div className="flex justify-end border-t border-gray-200 pt-4">
                                <button
                                  onClick={e => { e.stopPropagation(); setConfirmDeleteId(b.id); }}
                                  className="flex items-center gap-2 text-red-500 hover:text-red-700 hover:bg-red-50 border border-red-200 text-xs font-barlow font-bold tracking-widest uppercase px-4 py-2 rounded-xl transition-colors"
                                >
                                  <Trash2 className="w-3.5 h-3.5" /> Delete Registration
                                </button>
                              </div>
                            </>
                          )}
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
      )}
      </div>
    </section>
  );
}

function SummaryCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <p className="text-xs text-gray-400 font-barlow tracking-widest uppercase mb-2">{label}</p>
      <p className="text-3xl font-black text-[#0A1F44]">{value}</p>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-gray-400 font-barlow tracking-widest uppercase mb-0.5">{label}</p>
      <p className="text-[#0A1F44] font-medium">{value}</p>
    </div>
  );
}
