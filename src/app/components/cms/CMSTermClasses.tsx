import { useState } from 'react';
import { Trash2, Save, AlertTriangle, Loader2, Plus, GripVertical, ChevronDown, ChevronUp } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useTermClasses, type TermClass, type TermSession } from '../../lib/useSiteContent';

export default function CMSTermClasses() {
  const { classes, setClasses, loading } = useTermClasses();
  const [editId, setEditId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<TermClass>>({});
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const inputCls = 'w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm text-[#0A1F44] focus:outline-none focus:ring-2 focus:ring-[#f0722b]/40';
  const labelCls = 'block text-xs font-barlow font-bold tracking-widest uppercase text-gray-500 mb-1';

  const handleAddNew = async () => {
    setSaving(true);
    const newId = `class-${Date.now()}`;
    const newClass: Partial<TermClass> = {
      id: newId,
      slug: `new-class-${Date.now()}`,
      title: 'New Class',
      subtitle: 'Subtitle',
      location: 'Location',
      address: 'Address',
      fullAddress: 'Full Address',
      ageGroup: 'Ages',
      price: 150,
      startedDate: 'TBA',
      dateRange: 'TBA',
      sessionDuration: '1 Hour',
      totalSessions: 8,
      description: 'Class Description',
      sessions: [],
      spots_remaining: 15,
      max_capacity: 15
    };

    const { error } = await supabase.from('classes').insert({
      id: newId,
      slug: newClass.slug,
      title: newClass.title,
      subtitle: newClass.subtitle,
      location: newClass.location,
      address: newClass.address,
      full_address: newClass.fullAddress,
      age_group: newClass.ageGroup,
      price: newClass.price,
      started_date: newClass.startedDate,
      date_range: newClass.dateRange,
      session_duration: newClass.sessionDuration,
      total_sessions: newClass.totalSessions,
      description: newClass.description,
      sessions: newClass.sessions,
      spots_remaining: newClass.spots_remaining,
      max_capacity: newClass.max_capacity
    });

    if (!error) {
      setClasses([...classes, newClass as TermClass]);
      setEditId(newId);
      setEditData(newClass);
    } else {
      console.error(error);
      alert('Failed to create class');
    }
    setSaving(false);
  };

  const handleSaveEdit = async (id: string) => {
    setSaving(true);
    // map to snake_case for DB
    const dbUpdate: any = {};
    if ('slug' in editData) dbUpdate.slug = editData.slug;
    if ('title' in editData) dbUpdate.title = editData.title;
    if ('subtitle' in editData) dbUpdate.subtitle = editData.subtitle;
    if ('location' in editData) dbUpdate.location = editData.location;
    if ('address' in editData) dbUpdate.address = editData.address;
    if ('fullAddress' in editData) dbUpdate.full_address = editData.fullAddress;
    if ('ageGroup' in editData) dbUpdate.age_group = editData.ageGroup;
    if ('price' in editData) dbUpdate.price = editData.price;
    if ('startedDate' in editData) dbUpdate.started_date = editData.startedDate;
    if ('dateRange' in editData) dbUpdate.date_range = editData.dateRange;
    if ('sessionDuration' in editData) dbUpdate.session_duration = editData.sessionDuration;
    if ('totalSessions' in editData) dbUpdate.total_sessions = editData.totalSessions;
    if ('description' in editData) dbUpdate.description = editData.description;
    if ('sessions' in editData) dbUpdate.sessions = editData.sessions;
    if ('max_capacity' in editData) dbUpdate.max_capacity = editData.max_capacity;

    const { error } = await supabase.from('classes').update(dbUpdate).eq('id', id);
    if (!error) {
      setClasses(prev => prev.map(c => c.id === id ? { ...c, ...editData } as TermClass : c));
      setEditId(null);
    } else {
      console.error(error);
      alert('Failed to save edit');
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    setSaving(true);
    const { error } = await supabase.from('classes').delete().eq('id', id);
    if (!error) {
      setClasses(prev => prev.filter(c => c.id !== id));
    } else {
      console.error(error);
      alert('Failed to delete. Make sure there are no bookings associated with this class.');
    }
    setConfirmDeleteId(null);
    setSaving(false);
  };

  const handleUpdateSession = (index: number, field: keyof TermSession, value: string) => {
    const currentSessions = [...(editData.sessions || [])];
    currentSessions[index] = { ...currentSessions[index], [field]: value };
    setEditData(prev => ({ ...prev, sessions: currentSessions }));
  };

  const handleAddSession = () => {
    const currentSessions = [...(editData.sessions || [])];
    currentSessions.push({ date: '', time: '', duration: '', durationLabel: '', coach: '' });
    setEditData(prev => ({ ...prev, sessions: currentSessions }));
  };

  const handleRemoveSession = (index: number) => {
    const currentSessions = [...(editData.sessions || [])];
    currentSessions.splice(index, 1);
    setEditData(prev => ({ ...prev, sessions: currentSessions }));
  };

  if (loading) return <div className="p-8 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-[#f0722b]" /></div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">Manage term programs, their details, and 8-week session dates.</p>
      </div>

      {classes.map(c => (
        <div key={c.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {confirmDeleteId === c.id ? (
            <div className="bg-red-50 px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
              <p className="flex-1 text-red-800 font-bold text-sm">Permanently delete "{c.title}"? This will fail if there are any bookings attached.</p>
              <div className="flex gap-3">
                <button onClick={() => setConfirmDeleteId(null)} className="px-4 py-2 text-xs font-barlow font-bold tracking-widest uppercase text-gray-600 bg-white border border-gray-200 rounded-xl">Cancel</button>
                <button onClick={() => handleDelete(c.id)} disabled={saving} className="px-4 py-2 text-xs font-barlow font-bold tracking-widest uppercase text-white bg-red-600 rounded-xl flex items-center gap-2 disabled:opacity-50">
                  {saving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Trash2 className="w-3 h-3" />} Confirm
                </button>
              </div>
            </div>
          ) : editId === c.id ? (
            <div className="p-6 bg-amber-50 space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="font-black text-[#0A1F44] text-sm">Editing: {c.title}</h4>
                <div className="flex gap-3">
                  <button onClick={() => handleSaveEdit(c.id)} disabled={saving} className="flex items-center gap-2 bg-[#0A1F44] text-white text-xs font-barlow font-bold tracking-widest uppercase px-4 py-2 rounded-xl hover:bg-[#f0722b] transition-colors disabled:opacity-50">
                    {saving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />} Save
                  </button>
                  <button onClick={() => setEditId(null)} className="text-xs font-barlow font-bold tracking-widest uppercase text-gray-500 px-4 py-2">Cancel</button>
                </div>
              </div>

              {/* General Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div><label className={labelCls}>Title</label><input className={inputCls} value={editData.title ?? c.title} onChange={e => setEditData(d => ({ ...d, title: e.target.value }))} /></div>
                <div><label className={labelCls}>Subtitle</label><input className={inputCls} value={editData.subtitle ?? c.subtitle} onChange={e => setEditData(d => ({ ...d, subtitle: e.target.value }))} /></div>
                <div><label className={labelCls}>URL Slug</label><input className={inputCls} value={editData.slug ?? c.slug} onChange={e => setEditData(d => ({ ...d, slug: e.target.value }))} /></div>
                <div><label className={labelCls}>Location (Badge)</label><input className={inputCls} value={editData.location ?? c.location} onChange={e => setEditData(d => ({ ...d, location: e.target.value }))} /></div>
                <div><label className={labelCls}>Age Group</label><input className={inputCls} value={editData.ageGroup ?? c.ageGroup} onChange={e => setEditData(d => ({ ...d, ageGroup: e.target.value }))} /></div>
                <div><label className={labelCls}>Price ($)</label><input type="number" className={inputCls} value={editData.price ?? c.price} onChange={e => setEditData(d => ({ ...d, price: parseInt(e.target.value) || 0 }))} /></div>
                <div><label className={labelCls}>Started Date</label><input className={inputCls} value={editData.startedDate ?? c.startedDate} onChange={e => setEditData(d => ({ ...d, startedDate: e.target.value }))} /></div>
                <div><label className={labelCls}>Date Range</label><input className={inputCls} value={editData.dateRange ?? c.dateRange} onChange={e => setEditData(d => ({ ...d, dateRange: e.target.value }))} /></div>
                <div><label className={labelCls}>Max Capacity</label><input type="number" className={inputCls} value={editData.max_capacity ?? c.max_capacity} onChange={e => setEditData(d => ({ ...d, max_capacity: parseInt(e.target.value) || 0 }))} /></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className={labelCls}>Address (Short)</label><input className={inputCls} value={editData.address ?? c.address} onChange={e => setEditData(d => ({ ...d, address: e.target.value }))} /></div>
                <div><label className={labelCls}>Full Address</label><input className={inputCls} value={editData.fullAddress ?? c.fullAddress} onChange={e => setEditData(d => ({ ...d, fullAddress: e.target.value }))} /></div>
              </div>

              <div><label className={labelCls}>Description (Markdown allowed)</label><textarea className={`${inputCls} min-h-[150px]`} value={editData.description ?? c.description} onChange={e => setEditData(d => ({ ...d, description: e.target.value }))} /></div>

              {/* Sessions Array */}
              <div className="border-t border-amber-200 pt-6">
                <div className="flex items-center justify-between mb-4">
                  <label className={labelCls}>Individual Sessions (Dates)</label>
                  <button onClick={handleAddSession} className="text-[#f0722b] text-xs font-bold uppercase tracking-widest flex items-center gap-1"><Plus className="w-3 h-3" /> Add Session</button>
                </div>
                
                <div className="space-y-3">
                  {(editData.sessions || c.sessions || []).map((session, i) => (
                    <div key={i} className="flex flex-wrap md:flex-nowrap gap-2 items-center bg-white p-3 rounded-xl border border-amber-100">
                      <div className="w-full md:w-auto flex-1"><input placeholder="Date (e.g. Sunday 26 Apr)" className={inputCls} value={session.date} onChange={e => handleUpdateSession(i, 'date', e.target.value)} /></div>
                      <div className="w-1/2 md:w-24"><input placeholder="Time" className={inputCls} value={session.time} onChange={e => handleUpdateSession(i, 'time', e.target.value)} /></div>
                      <div className="w-1/2 md:w-24"><input placeholder="Dur (1 hr)" className={inputCls} value={session.duration} onChange={e => handleUpdateSession(i, 'duration', e.target.value)} /></div>
                      <div className="w-1/2 md:w-32"><input placeholder="Label (1 hour)" className={inputCls} value={session.durationLabel} onChange={e => handleUpdateSession(i, 'durationLabel', e.target.value)} /></div>
                      <div className="w-1/2 md:w-32"><input placeholder="Coach" className={inputCls} value={session.coach} onChange={e => handleUpdateSession(i, 'coach', e.target.value)} /></div>
                      <button onClick={() => handleRemoveSession(i)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  ))}
                  {!(editData.sessions || c.sessions || []).length && <p className="text-xs text-gray-500 italic">No sessions added.</p>}
                </div>
              </div>

            </div>
          ) : (
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-black text-[#0A1F44] text-lg">{c.title}</h3>
                    <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-0.5 rounded-full">{c.ageGroup}</span>
                    <span className="bg-[#f0722b]/10 text-[#f0722b] text-xs font-bold px-2 py-0.5 rounded-full">${c.price}</span>
                  </div>
                  <p className="text-sm text-gray-500">{c.subtitle} • {c.location}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setExpandedId(expandedId === c.id ? null : c.id)} className="text-gray-400 hover:text-[#0A1F44] border border-gray-200 px-3 py-2 rounded-xl hover:bg-gray-50 transition-colors">
                    {expandedId === c.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  <button onClick={() => { setEditId(c.id); setEditData({ sessions: c.sessions || [] }); }} className="text-xs font-barlow font-bold tracking-widest uppercase text-[#0A1F44] border border-gray-200 px-4 py-2 rounded-xl hover:bg-gray-50">Edit</button>
                  <button onClick={() => setConfirmDeleteId(c.id)} className="text-xs font-barlow font-bold tracking-widest uppercase text-red-500 border border-red-200 px-3 py-2 rounded-xl hover:bg-red-50"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>

              {expandedId === c.id && (
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div><p className={labelCls}>URL Slug</p><p className="text-sm text-[#0A1F44]">{c.slug}</p></div>
                    <div><p className={labelCls}>Capacity</p><p className="text-sm text-[#0A1F44]">{c.spots_remaining} / {c.max_capacity} spots</p></div>
                    <div><p className={labelCls}>Started Date</p><p className="text-sm text-[#0A1F44]">{c.startedDate}</p></div>
                    <div><p className={labelCls}>Date Range</p><p className="text-sm text-[#0A1F44]">{c.dateRange}</p></div>
                  </div>
                  
                  <div>
                    <p className={labelCls}>Sessions ({c.sessions?.length || 0})</p>
                    <div className="space-y-2 mt-2">
                      {c.sessions?.map((s, i) => (
                        <div key={i} className="flex gap-4 text-sm bg-gray-50 px-3 py-2 rounded-lg text-[#0A1F44]">
                          <span className="font-bold w-32">{s.date}</span>
                          <span className="w-20">{s.time}</span>
                          <span className="text-gray-500 flex-1">{s.coach}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
