import { useState } from 'react';
import { Plus, Trash2, Save, AlertTriangle, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useTestimonials, type Testimonial } from '../lib/useSiteContent';

const empty: Omit<Testimonial, 'id' | 'sort_order'> = { quote: '', name: '', location: 'NSW' };

export default function CMSTestimonials() {
  const { testimonials, setTestimonials } = useTestimonials();
  const [editId, setEditId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Omit<Testimonial, 'id' | 'sort_order'>>(empty);
  const [adding, setAdding] = useState(false);
  const [newData, setNewData] = useState<Omit<Testimonial, 'id' | 'sort_order'>>(empty);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const inputCls = 'w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm text-[#0A1F44] focus:outline-none focus:ring-2 focus:ring-[#f0722b]/40';
  const labelCls = 'block text-xs font-barlow font-bold tracking-widest uppercase text-gray-500 mb-1';

  const handleSaveEdit = async (id: string) => {
    setSaving(true);
    const { error } = await supabase.from('testimonials').update(editData).eq('id', id);
    if (!error) { setTestimonials(prev => prev.map(t => t.id === id ? { ...t, ...editData } : t)); setEditId(null); }
    setSaving(false);
  };

  const handleAdd = async () => {
    if (!newData.quote.trim() || !newData.name.trim()) return;
    setSaving(true);
    const nextOrder = Math.max(0, ...testimonials.map(t => t.sort_order)) + 1;
    const { data, error } = await supabase.from('testimonials').insert({ ...newData, sort_order: nextOrder }).select().single();
    if (!error && data) { setTestimonials(prev => [...prev, data]); setNewData(empty); setAdding(false); }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    setSaving(true);
    await supabase.from('testimonials').delete().eq('id', id);
    setTestimonials(prev => prev.filter(t => t.id !== id));
    setConfirmDeleteId(null);
    setSaving(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">Testimonials appear in the carousel on the Homepage.</p>
        <button onClick={() => { setAdding(true); setNewData(empty); }} className="flex items-center gap-2 bg-[#0A1F44] text-white text-xs font-barlow font-bold tracking-widest uppercase px-4 py-2 rounded-xl hover:bg-[#f0722b] transition-colors">
          <Plus className="w-3 h-3" /> Add Testimonial
        </button>
      </div>

      {adding && (
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 space-y-4">
          <h4 className="font-black text-[#0A1F44] text-sm">New Testimonial</h4>
          <div><label className={labelCls}>Quote *</label><textarea className={`${inputCls} min-h-[100px]`} value={newData.quote} onChange={e => setNewData(d => ({ ...d, quote: e.target.value }))} placeholder="The testimonial text..." /></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label className={labelCls}>Name *</label><input className={inputCls} value={newData.name} onChange={e => setNewData(d => ({ ...d, name: e.target.value }))} placeholder="e.g. Sarah" /></div>
            <div><label className={labelCls}>Location</label><input className={inputCls} value={newData.location} onChange={e => setNewData(d => ({ ...d, location: e.target.value }))} placeholder="e.g. NSW" /></div>
          </div>
          <div className="flex gap-3">
            <button onClick={handleAdd} disabled={saving} className="flex items-center gap-2 bg-[#0A1F44] text-white text-xs font-barlow font-bold tracking-widest uppercase px-4 py-2 rounded-xl hover:bg-[#f0722b] transition-colors disabled:opacity-50">
              {saving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />} Save
            </button>
            <button onClick={() => setAdding(false)} className="text-xs font-barlow font-bold tracking-widest uppercase text-gray-500 px-4 py-2">Cancel</button>
          </div>
        </div>
      )}

      {testimonials.map(t => (
        <div key={t.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {confirmDeleteId === t.id ? (
            <div className="bg-red-50 px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
              <p className="flex-1 text-red-800 font-bold text-sm">Delete testimonial from {t.name}?</p>
              <div className="flex gap-3">
                <button onClick={() => setConfirmDeleteId(null)} className="px-4 py-2 text-xs font-barlow font-bold tracking-widest uppercase text-gray-600 bg-white border border-gray-200 rounded-xl">Cancel</button>
                <button onClick={() => handleDelete(t.id)} disabled={saving} className="px-4 py-2 text-xs font-barlow font-bold tracking-widest uppercase text-white bg-red-600 rounded-xl flex items-center gap-2 disabled:opacity-50">
                  {saving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Trash2 className="w-3 h-3" />} Confirm
                </button>
              </div>
            </div>
          ) : editId === t.id ? (
            <div className="p-6 bg-amber-50 space-y-4">
              <h4 className="font-black text-[#0A1F44] text-sm">Editing: {t.name}</h4>
              <div><label className={labelCls}>Quote</label><textarea className={`${inputCls} min-h-[100px]`} value={editData.quote} onChange={e => setEditData(d => ({ ...d, quote: e.target.value }))} /></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className={labelCls}>Name</label><input className={inputCls} value={editData.name} onChange={e => setEditData(d => ({ ...d, name: e.target.value }))} /></div>
                <div><label className={labelCls}>Location</label><input className={inputCls} value={editData.location} onChange={e => setEditData(d => ({ ...d, location: e.target.value }))} /></div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => handleSaveEdit(t.id)} disabled={saving} className="flex items-center gap-2 bg-[#0A1F44] text-white text-xs font-barlow font-bold tracking-widest uppercase px-4 py-2 rounded-xl hover:bg-[#f0722b] transition-colors disabled:opacity-50">
                  {saving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />} Save
                </button>
                <button onClick={() => setEditId(null)} className="text-xs font-barlow font-bold tracking-widest uppercase text-gray-500 px-4 py-2">Cancel</button>
              </div>
            </div>
          ) : (
            <div className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <p className="text-[#0A1F44] text-sm italic leading-relaxed mb-2">"{t.quote.length > 120 ? t.quote.slice(0, 120) + '...' : t.quote}"</p>
                  <p className="font-black text-[#0A1F44] text-xs">{t.name} <span className="text-gray-400 font-normal">— {t.location}</span></p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => { setEditId(t.id); setEditData({ quote: t.quote, name: t.name, location: t.location }); }} className="text-xs font-barlow font-bold tracking-widest uppercase text-[#0A1F44] border border-gray-200 px-3 py-2 rounded-xl hover:bg-gray-50">Edit</button>
                  <button onClick={() => setConfirmDeleteId(t.id)} className="text-xs font-barlow font-bold tracking-widest uppercase text-red-500 border border-red-200 px-3 py-2 rounded-xl hover:bg-red-50"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
