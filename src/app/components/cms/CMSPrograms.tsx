import { useState } from 'react';
import { Trash2, Save, AlertTriangle, Loader2, Eye, EyeOff } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { usePrograms, type Program } from '../lib/useSiteContent';

export default function CMSPrograms() {
  const { programs, setPrograms } = usePrograms(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Program>>({});
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const inputCls = 'w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm text-[#0A1F44] focus:outline-none focus:ring-2 focus:ring-[#f0722b]/40';
  const labelCls = 'block text-xs font-barlow font-bold tracking-widest uppercase text-gray-500 mb-1';

  const handleSaveEdit = async (id: string) => {
    setSaving(true);
    const { error } = await supabase.from('programs').update(editData).eq('id', id);
    if (!error) { setPrograms(prev => prev.map(p => p.id === id ? { ...p, ...editData } as Program : p)); setEditId(null); }
    setSaving(false);
  };

  const handleToggleVisible = async (p: Program) => {
    setSaving(true);
    const { error } = await supabase.from('programs').update({ visible: !p.visible }).eq('id', p.id);
    if (!error) setPrograms(prev => prev.map(x => x.id === p.id ? { ...x, visible: !p.visible } : x));
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    setSaving(true);
    await supabase.from('programs').delete().eq('id', id);
    setPrograms(prev => prev.filter(p => p.id !== id));
    setConfirmDeleteId(null);
    setSaving(false);
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500">Edit program card content shown on the Homepage and Programs page. Use the eye icon to show/hide programs.</p>

      {programs.map(p => (
        <div key={p.id} className={`bg-white rounded-2xl border shadow-sm overflow-hidden ${p.visible ? 'border-gray-100' : 'border-gray-200 opacity-60'}`}>
          {confirmDeleteId === p.id ? (
            <div className="bg-red-50 px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
              <p className="flex-1 text-red-800 font-bold text-sm">Permanently delete "{p.title}"? This cannot be undone.</p>
              <div className="flex gap-3">
                <button onClick={() => setConfirmDeleteId(null)} className="px-4 py-2 text-xs font-barlow font-bold tracking-widest uppercase text-gray-600 bg-white border border-gray-200 rounded-xl">Cancel</button>
                <button onClick={() => handleDelete(p.id)} disabled={saving} className="px-4 py-2 text-xs font-barlow font-bold tracking-widest uppercase text-white bg-red-600 rounded-xl flex items-center gap-2 disabled:opacity-50">
                  {saving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Trash2 className="w-3 h-3" />} Confirm
                </button>
              </div>
            </div>
          ) : editId === p.id ? (
            <div className="p-6 bg-amber-50 space-y-4">
              <h4 className="font-black text-[#0A1F44] text-sm">Editing: {p.title}</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className={labelCls}>Title</label><input className={inputCls} value={editData.title ?? p.title} onChange={e => setEditData(d => ({ ...d, title: e.target.value }))} /></div>
                <div><label className={labelCls}>Label (badge)</label><input className={inputCls} value={editData.label ?? p.label} onChange={e => setEditData(d => ({ ...d, label: e.target.value }))} /></div>
                <div><label className={labelCls}>Age Range</label><input className={inputCls} value={editData.ages ?? p.ages} onChange={e => setEditData(d => ({ ...d, ages: e.target.value }))} /></div>
              </div>
              <div><label className={labelCls}>Description</label><textarea className={`${inputCls} min-h-[100px]`} value={editData.description ?? p.description} onChange={e => setEditData(d => ({ ...d, description: e.target.value }))} /></div>
              <div className="flex gap-3">
                <button onClick={() => handleSaveEdit(p.id)} disabled={saving} className="flex items-center gap-2 bg-[#0A1F44] text-white text-xs font-barlow font-bold tracking-widest uppercase px-4 py-2 rounded-xl hover:bg-[#f0722b] transition-colors disabled:opacity-50">
                  {saving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />} Save
                </button>
                <button onClick={() => setEditId(null)} className="text-xs font-barlow font-bold tracking-widest uppercase text-gray-500 px-4 py-2">Cancel</button>
              </div>
            </div>
          ) : (
            <div className="p-5 flex items-start gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-black text-[#0A1F44] text-sm">{p.title}</p>
                  <span className="bg-[#f0722b]/10 text-[#f0722b] text-xs font-bold px-2 py-0.5 rounded-full font-barlow tracking-widest uppercase">{p.label}</span>
                  <span className="text-gray-400 text-xs">{p.ages}</span>
                  {!p.visible && <span className="bg-gray-200 text-gray-500 text-xs px-2 py-0.5 rounded-full font-barlow font-bold tracking-widest uppercase">Hidden</span>}
                </div>
                <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{p.description}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => handleToggleVisible(p)} title={p.visible ? 'Hide program' : 'Show program'} disabled={saving} className="text-gray-400 hover:text-[#0A1F44] border border-gray-200 px-3 py-2 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50">
                  {p.visible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                </button>
                <button onClick={() => { setEditId(p.id); setEditData({}); }} className="text-xs font-barlow font-bold tracking-widest uppercase text-[#0A1F44] border border-gray-200 px-3 py-2 rounded-xl hover:bg-gray-50">Edit</button>
                <button onClick={() => setConfirmDeleteId(p.id)} className="text-xs font-barlow font-bold tracking-widest uppercase text-red-500 border border-red-200 px-3 py-2 rounded-xl hover:bg-red-50"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
