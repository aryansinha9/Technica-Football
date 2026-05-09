import { useState } from 'react';
import { Plus, Trash2, Save, AlertTriangle, Loader2, Camera } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useCoaches, uploadImage, type Coach } from '../../lib/useSiteContent';

const empty: Omit<Coach, 'id' | 'sort_order'> = { name: '', role: '', bio: '', team: '', image_url: null };

export default function CMSCoaches() {
  const { coaches, setCoaches } = useCoaches();
  const [editId, setEditId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Omit<Coach, 'id' | 'sort_order'>>(empty);
  const [adding, setAdding] = useState(false);
  const [newData, setNewData] = useState<Omit<Coach, 'id' | 'sort_order'>>(empty);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const inputCls = 'w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm text-[#0A1F44] focus:outline-none focus:ring-2 focus:ring-[#f0722b]/40';
  const labelCls = 'block text-xs font-barlow font-bold tracking-widest uppercase text-gray-500 mb-1';

  const handleImageUpload = async (file: File, target: 'edit' | 'new') => {
    setUploading(true);
    const url = await uploadImage(file, 'coaches');
    if (url) {
      if (target === 'edit') setEditData(d => ({ ...d, image_url: url }));
      else setNewData(d => ({ ...d, image_url: url }));
    }
    setUploading(false);
  };

  const handleSaveEdit = async (id: string) => {
    setSaving(true);
    const { error } = await supabase.from('coaches').update(editData).eq('id', id);
    if (!error) {
      setCoaches(prev => prev.map(c => c.id === id ? { ...c, ...editData } : c));
      setEditId(null);
    }
    setSaving(false);
  };

  const handleAdd = async () => {
    if (!newData.name.trim()) return;
    setSaving(true);
    const nextOrder = Math.max(0, ...coaches.map(c => c.sort_order)) + 1;
    const { data, error } = await supabase.from('coaches').insert({ ...newData, sort_order: nextOrder }).select().single();
    if (!error && data) {
      setCoaches(prev => [...prev, data]);
      setNewData(empty);
      setAdding(false);
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    setSaving(true);
    const { error } = await supabase.from('coaches').delete().eq('id', id);
    if (!error) setCoaches(prev => prev.filter(c => c.id !== id));
    setConfirmDeleteId(null);
    setSaving(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">Manage coach profiles shown on the About page.</p>
        <button onClick={() => { setAdding(true); setNewData(empty); }} className="flex items-center gap-2 bg-[#0A1F44] text-white text-xs font-barlow font-bold tracking-widest uppercase px-4 py-2 rounded-xl hover:bg-[#f0722b] transition-colors">
          <Plus className="w-3 h-3" /> Add Coach
        </button>
      </div>

      {/* Add Form */}
      {adding && (
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 space-y-4">
          <h4 className="font-black text-[#0A1F44] text-sm">New Coach</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label className={labelCls}>Name *</label><input className={inputCls} value={newData.name} onChange={e => setNewData(d => ({ ...d, name: e.target.value }))} placeholder="Full name" /></div>
            <div><label className={labelCls}>Role *</label><input className={inputCls} value={newData.role} onChange={e => setNewData(d => ({ ...d, role: e.target.value }))} placeholder="e.g. Assistant Coach" /></div>
            <div><label className={labelCls}>Favourite Team</label><input className={inputCls} value={newData.team} onChange={e => setNewData(d => ({ ...d, team: e.target.value }))} placeholder="e.g. Arsenal" /></div>
            <div>
              <label className={labelCls}>Photo</label>
              <input type="file" accept="image/*" onChange={e => e.target.files?.[0] && handleImageUpload(e.target.files[0], 'new')} className="w-full text-xs text-gray-500 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-[#0A1F44] file:text-white file:text-xs file:font-bold file:cursor-pointer" />
              {uploading && <p className="text-xs text-gray-400 mt-1">Uploading...</p>}
              {newData.image_url && <img src={newData.image_url} alt="preview" className="mt-2 h-16 rounded-lg object-cover" />}
            </div>
          </div>
          <div><label className={labelCls}>Bio *</label><textarea className={`${inputCls} min-h-[80px]`} value={newData.bio} onChange={e => setNewData(d => ({ ...d, bio: e.target.value }))} placeholder="Coach biography" /></div>
          <div className="flex gap-3">
            <button onClick={handleAdd} disabled={saving || uploading} className="flex items-center gap-2 bg-[#0A1F44] text-white text-xs font-barlow font-bold tracking-widest uppercase px-4 py-2 rounded-xl hover:bg-[#f0722b] transition-colors disabled:opacity-50">
              {saving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />} Save Coach
            </button>
            <button onClick={() => setAdding(false)} className="text-xs font-barlow font-bold tracking-widest uppercase text-gray-500 hover:text-[#0A1F44] px-4 py-2">Cancel</button>
          </div>
        </div>
      )}

      {/* Coach List */}
      {coaches.map(coach => (
        <div key={coach.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
          {confirmDeleteId === coach.id ? (
            <div className="bg-red-50 border border-red-200 rounded-2xl px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
              <div className="flex-1">
                <p className="text-red-800 font-bold text-sm">Delete {coach.name}?</p>
                <p className="text-red-600 text-xs mt-1">This will permanently remove this coach profile.</p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setConfirmDeleteId(null)} className="px-4 py-2 text-xs font-barlow font-bold tracking-widest uppercase text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50">Cancel</button>
                <button onClick={() => handleDelete(coach.id)} disabled={saving} className="px-4 py-2 text-xs font-barlow font-bold tracking-widest uppercase text-white bg-red-600 rounded-xl hover:bg-red-700 disabled:opacity-50 flex items-center gap-2">
                  {saving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Trash2 className="w-3 h-3" />} Confirm Delete
                </button>
              </div>
            </div>
          ) : editId === coach.id ? (
            <div className="p-6 space-y-4 bg-amber-50">
              <h4 className="font-black text-[#0A1F44] text-sm">Editing: {coach.name}</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className={labelCls}>Name</label><input className={inputCls} value={editData.name} onChange={e => setEditData(d => ({ ...d, name: e.target.value }))} /></div>
                <div><label className={labelCls}>Role</label><input className={inputCls} value={editData.role} onChange={e => setEditData(d => ({ ...d, role: e.target.value }))} /></div>
                <div><label className={labelCls}>Favourite Team</label><input className={inputCls} value={editData.team} onChange={e => setEditData(d => ({ ...d, team: e.target.value }))} /></div>
                <div>
                  <label className={labelCls}>Photo</label>
                  {editData.image_url && <img src={editData.image_url} alt="current" className="h-14 rounded-lg object-cover mb-2" />}
                  <input type="file" accept="image/*" onChange={e => e.target.files?.[0] && handleImageUpload(e.target.files[0], 'edit')} className="w-full text-xs text-gray-500 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-[#0A1F44] file:text-white file:text-xs file:font-bold file:cursor-pointer" />
                  {uploading && <p className="text-xs text-gray-400 mt-1">Uploading...</p>}
                </div>
              </div>
              <div><label className={labelCls}>Bio</label><textarea className={`${inputCls} min-h-[80px]`} value={editData.bio} onChange={e => setEditData(d => ({ ...d, bio: e.target.value }))} /></div>
              <div className="flex gap-3">
                <button onClick={() => handleSaveEdit(coach.id)} disabled={saving || uploading} className="flex items-center gap-2 bg-[#0A1F44] text-white text-xs font-barlow font-bold tracking-widest uppercase px-4 py-2 rounded-xl hover:bg-[#f0722b] transition-colors disabled:opacity-50">
                  {saving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />} Save Changes
                </button>
                <button onClick={() => setEditId(null)} className="text-xs font-barlow font-bold tracking-widest uppercase text-gray-500 hover:text-[#0A1F44] px-4 py-2">Cancel</button>
              </div>
            </div>
          ) : (
            <div className="p-5 flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-gray-100 flex items-center justify-center">
                {coach.image_url ? <img src={coach.image_url} alt={coach.name} className="w-full h-full object-cover" /> : <Camera className="w-6 h-6 text-gray-300" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-black text-[#0A1F44] text-sm">{coach.name}</p>
                <p className="text-xs text-[#f0722b] font-barlow font-bold tracking-widest uppercase">{coach.role}</p>
                <p className="text-xs text-gray-400 truncate mt-0.5">{coach.bio}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => { setEditId(coach.id); setEditData({ name: coach.name, role: coach.role, bio: coach.bio, team: coach.team, image_url: coach.image_url }); }} className="text-xs font-barlow font-bold tracking-widest uppercase text-[#0A1F44] border border-gray-200 px-3 py-2 rounded-xl hover:bg-gray-50 transition-colors">Edit</button>
                <button onClick={() => setConfirmDeleteId(coach.id)} className="text-xs font-barlow font-bold tracking-widest uppercase text-red-500 border border-red-200 px-3 py-2 rounded-xl hover:bg-red-50 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
