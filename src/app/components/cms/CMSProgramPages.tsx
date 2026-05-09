import { useState, useEffect } from 'react';
import { Save, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { type ProgramPage } from '../lib/useSiteContent';

const PROGRAM_SLUGS = [
  { id: 'term-program', label: 'Term Program' },
  { id: 'individual-sessions', label: 'Individual Sessions' },
  { id: 'holiday-clinic', label: 'Holiday Clinic' },
  { id: 'vacation-care', label: 'Vacation Care' },
  { id: 'club-technica-training', label: 'Club Technica Training' },
  { id: 'academy-development-squad', label: 'Academy Development Squad' },
];

export default function CMSProgramPages() {
  const [selectedSlug, setSelectedSlug] = useState<string>(PROGRAM_SLUGS[0].id);
  const [page, setPage] = useState<ProgramPage | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setLoading(true);
    setPage(null);
    supabase.from('program_pages').select('*').eq('id', selectedSlug).single().then(({ data }) => {
      if (data) setPage(data);
      setLoading(false);
    });
  }, [selectedSlug]);

  const handleSave = async () => {
    if (!page) return;
    setSaving(true);
    await supabase.from('program_pages').update({
      about_text: page.about_text,
      card1_title: page.card1_title,
      card1_text: page.card1_text,
      card2_title: page.card2_title,
      card2_text: page.card2_text,
      info_sections: page.info_sections,
      updated_at: new Date().toISOString(),
    }).eq('id', selectedSlug);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const updateInfoSection = (i: number, field: 'label' | 'value', val: string) => {
    if (!page) return;
    const sections = [...page.info_sections];
    sections[i] = { ...sections[i], [field]: val };
    setPage({ ...page, info_sections: sections });
  };

  const inputCls = 'w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm text-[#0A1F44] focus:outline-none focus:ring-2 focus:ring-[#f0722b]/40';
  const labelCls = 'block text-xs font-barlow font-bold tracking-widest uppercase text-gray-500 mb-1';

  return (
    <div className="space-y-6">
      <div>
        <label className={labelCls}>Select Program Page to Edit</label>
        <div className="flex flex-wrap gap-2">
          {PROGRAM_SLUGS.map(s => (
            <button key={s.id} onClick={() => setSelectedSlug(s.id)}
              className={`px-4 py-2 rounded-xl text-xs font-barlow font-bold tracking-widest uppercase transition-colors ${selectedSlug === s.id ? 'bg-[#0A1F44] text-white' : 'bg-white border border-gray-200 text-gray-500 hover:bg-gray-50'}`}>
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {loading && <div className="flex items-center justify-center py-12"><Loader2 className="w-8 h-8 text-[#f0722b] animate-spin" /></div>}

      {!loading && page && (
        <div className="space-y-6">
          {/* About Text */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h4 className="font-black text-[#0A1F44] text-sm mb-4">"About the Program" Text</h4>
            <textarea className={`${inputCls} min-h-[120px]`} value={page.about_text} onChange={e => setPage({ ...page, about_text: e.target.value })} />
          </div>

          {/* Feature Cards */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h4 className="font-black text-[#0A1F44] text-sm mb-4">Feature Cards (Orange Cards)</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3 bg-orange-50 rounded-xl p-4">
                <p className="text-xs font-barlow font-bold tracking-widest uppercase text-[#f0722b]">Card 1</p>
                <div><label className={labelCls}>Title</label><input className={inputCls} value={page.card1_title} onChange={e => setPage({ ...page, card1_title: e.target.value })} /></div>
                <div><label className={labelCls}>Description</label><textarea className={`${inputCls} min-h-[80px]`} value={page.card1_text} onChange={e => setPage({ ...page, card1_text: e.target.value })} /></div>
              </div>
              <div className="space-y-3 bg-orange-50 rounded-xl p-4">
                <p className="text-xs font-barlow font-bold tracking-widest uppercase text-[#f0722b]">Card 2</p>
                <div><label className={labelCls}>Title</label><input className={inputCls} value={page.card2_title} onChange={e => setPage({ ...page, card2_title: e.target.value })} /></div>
                <div><label className={labelCls}>Description</label><textarea className={`${inputCls} min-h-[80px]`} value={page.card2_text} onChange={e => setPage({ ...page, card2_text: e.target.value })} /></div>
              </div>
            </div>
          </div>

          {/* Info Sections */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h4 className="font-black text-[#0A1F44] text-sm mb-4">Program Information Section</h4>
            <div className="space-y-4">
              {page.info_sections.map((section, i) => (
                <div key={i} className="bg-gray-50 rounded-xl p-4 space-y-3">
                  <p className="text-xs font-barlow font-bold tracking-widest uppercase text-gray-400">Item {i + 1}</p>
                  <div><label className={labelCls}>Label</label><input className={inputCls} value={section.label} onChange={e => updateInfoSection(i, 'label', e.target.value)} /></div>
                  <div><label className={labelCls}>Value</label><textarea className={`${inputCls} min-h-[60px]`} value={section.value} onChange={e => updateInfoSection(i, 'value', e.target.value)} /></div>
                </div>
              ))}
            </div>
          </div>

          {/* Save Button */}
          <div className="flex items-center gap-4">
            <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 bg-[#f0722b] text-white font-barlow font-bold tracking-widest uppercase px-8 py-3 rounded-xl hover:bg-[#0A1F44] transition-colors disabled:opacity-50 text-sm">
              {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</> : <><Save className="w-4 h-4" /> Save Changes</>}
            </button>
            {saved && <span className="text-green-600 text-sm font-bold">✓ Saved successfully</span>}
          </div>
        </div>
      )}
    </div>
  );
}
