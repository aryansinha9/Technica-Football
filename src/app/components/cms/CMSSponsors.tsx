import { useState } from 'react';
import { Plus, Trash2, Save, AlertTriangle, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useSponsors, uploadImage, type Sponsor } from '../../lib/useSiteContent';

const empty: Omit<Sponsor, 'id' | 'sort_order'> = { name: '', logo_url: '', link: '' };

export default function CMSSponsors() {
  const { sponsors, setSponsors } = useSponsors();
  const [editId, setEditId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Omit<Sponsor, 'id' | 'sort_order'>>(empty);
  const [adding, setAdding] = useState(false);
  const [newData, setNewData] = useState<Omit<Sponsor, 'id' | 'sort_order'>>(empty);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const inputCls = 'w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm text-[#0A1F44] focus:outline-none focus:ring-2 focus:ring-[#f0722b]/40';
  const labelCls = 'block text-xs font-barlow font-bold tracking-widest uppercase text-gray-500 mb-1';

  const handleLogoUpload = async (file: File, target: 'edit' | 'new') => {
    setUploading(true);
    const url = await uploadImage(file, 'sponsors');
    if (url) target === 'edit' ? setEditData(d => ({ ...d, logo_url: url })) : setNewData(d => ({ ...d, logo_url: url }));
    setUploading(false);
  };

  const handleSaveEdit = async (id: string) => {
    setSaving(true);
    const { error } = await supabase.from('sponsors').update(editData).eq('id', id);
    if (!error) { setSponsors(prev => prev.map(s => s.id === id ? { ...s, ...editData } : s)); setEditId(null); }
    setSaving(false);
  };

  const handleAdd = async () => {
    if (!newData.name.trim() || !newData.logo_url.trim()) return;
    setSaving(true);
    const nextOrder = Math.max(0, ...sponsors.map(s => s.sort_order)) + 1;
    const { data, error } = await supabase.from('sponsors').insert({ ...newData, sort_order: nextOrder }).select().single();
    if (!error && data) { setSponsors(prev => [...prev, data]); setNewData(empty); setAdding(false); }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    setSaving(true);
    await supabase.from('sponsors').delete().eq('id', id);
    setSponsors(prev => prev.filter(s => s.id !== id));
    setConfirmDeleteId(null);
    setSaving(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">Sponsors sync to both the Contact page and Homepage automatically.</p>
        <button onClick={() => { setAdding(true); setNewData(empty); }} className="flex items-center gap-2 bg-[#0A1F44] text-white text-xs font-barlow font-bold tracking-widest uppercase px-4 py-2 rounded-xl hover:bg-[#f0722b] transition-colors">
          <Plus className="w-3 h-3" /> Add Sponsor
        </button>
      </div>

      {adding && (
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 space-y-4">
          <h4 className="font-black text-[#0A1F44] text-sm">New Sponsor</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label className={labelCls}>Name *</label><input className={inputCls} value={newData.name} onChange={e => setNewData(d => ({ ...d, name: e.target.value }))} placeholder="Company name" /></div>
            <div><label className={labelCls}>Website Link</label><input className={inputCls} value={newData.link} onChange={e => setNewData(d => ({ ...d, link: e.target.value }))} placeholder="https://..." /></div>
          </div>
          <div>
            <label className={labelCls}>Logo *</label>
            <input type="file" accept="image/*" onChange={e => e.target.files?.[0] && handleLogoUpload(e.target.files[0], 'new')} className="w-full text-xs text-gray-500 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-[#0A1F44] file:text-white file:text-xs file:font-bold file:cursor-pointer" />
            {uploading && <p className="text-xs text-gray-400 mt-1">Uploading...</p>}
            {newData.logo_url && <img src={newData.logo_url} alt="preview" className="mt-2 h-12 object-contain" />}
          </div>
          <div className="flex gap-3">
            <button onClick={handleAdd} disabled={saving || uploading} className="flex items-center gap-2 bg-[#0A1F44] text-white text-xs font-barlow font-bold tracking-widest uppercase px-4 py-2 rounded-xl hover:bg-[#f0722b] transition-colors disabled:opacity-50">
              {saving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />} Save
            </button>
            <button onClick={() => setAdding(false)} className="text-xs font-barlow font-bold tracking-widest uppercase text-gray-500 px-4 py-2">Cancel</button>
          </div>
        </div>
      )}

      {sponsors.map(s => (
        <div key={s.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {confirmDeleteId === s.id ? (
            <div className="bg-red-50 px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
              <p className="flex-1 text-red-800 font-bold text-sm">Delete {s.name}? This removes it from all pages.</p>
              <div className="flex gap-3">
                <button onClick={() => setConfirmDeleteId(null)} className="px-4 py-2 text-xs font-barlow font-bold tracking-widest uppercase text-gray-600 bg-white border border-gray-200 rounded-xl">Cancel</button>
                <button onClick={() => handleDelete(s.id)} disabled={saving} className="px-4 py-2 text-xs font-barlow font-bold tracking-widest uppercase text-white bg-red-600 rounded-xl flex items-center gap-2 disabled:opacity-50">
                  {saving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Trash2 className="w-3 h-3" />} Confirm
                </button>
              </div>
            </div>
          ) : editId === s.id ? (
            <div className="p-6 bg-amber-50 space-y-4">
              <h4 className="font-black text-[#0A1F44] text-sm">Editing: {s.name}</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className={labelCls}>Name</label><input className={inputCls} value={editData.name} onChange={e => setEditData(d => ({ ...d, name: e.target.value }))} /></div>
                <div><label className={labelCls}>Link</label><input className={inputCls} value={editData.link} onChange={e => setEditData(d => ({ ...d, link: e.target.value }))} /></div>
              </div>
              <div>
                <label className={labelCls}>Logo</label>
                {editData.logo_url && <img src={editData.logo_url} alt="current" className="h-12 object-contain mb-2" />}
                <input type="file" accept="image/*" onChange={e => e.target.files?.[0] && handleLogoUpload(e.target.files[0], 'edit')} className="w-full text-xs text-gray-500 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-[#0A1F44] file:text-white file:text-xs file:font-bold file:cursor-pointer" />
              </div>
              <div className="flex gap-3">
                <button onClick={() => handleSaveEdit(s.id)} disabled={saving || uploading} className="flex items-center gap-2 bg-[#0A1F44] text-white text-xs font-barlow font-bold tracking-widest uppercase px-4 py-2 rounded-xl hover:bg-[#f0722b] transition-colors disabled:opacity-50">
                  {saving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />} Save
                </button>
                <button onClick={() => setEditId(null)} className="text-xs font-barlow font-bold tracking-widest uppercase text-gray-500 px-4 py-2">Cancel</button>
              </div>
            </div>
          ) : (
            <div className="p-5 flex items-center gap-4">
              <div className="w-20 h-12 shrink-0 flex items-center justify-center bg-gray-50 rounded-lg border border-gray-100">
                <img src={s.logo_url} alt={s.name} className="max-h-10 max-w-[72px] object-contain" onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-black text-[#0A1F44] text-sm">{s.name}</p>
                <p className="text-xs text-gray-400 truncate">{s.link || 'No link set'}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => { setEditId(s.id); setEditData({ name: s.name, logo_url: s.logo_url, link: s.link }); }} className="text-xs font-barlow font-bold tracking-widest uppercase text-[#0A1F44] border border-gray-200 px-3 py-2 rounded-xl hover:bg-gray-50">Edit</button>
                <button onClick={() => setConfirmDeleteId(s.id)} className="text-xs font-barlow font-bold tracking-widest uppercase text-red-500 border border-red-200 px-3 py-2 rounded-xl hover:bg-red-50"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
