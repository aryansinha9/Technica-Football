import { useEffect, useState } from 'react';
import { Save, Loader2, ChevronDown, ChevronUp, RotateCcw } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { FALLBACK_SITE_CONTENT, type SiteContentMap } from '../../lib/useSiteContent';

// Defines which text fields admins can edit for each section of the site.
// Only copy is editable — layout, colours, icons and imagery are fixed so
// edits can never break the design.

interface FieldDef {
  key: string;
  label: string;
  multiline?: boolean;
  hint?: string;
}

interface SectionDef {
  id: string;
  title: string;
  description: string;
  fields: FieldDef[];
}

const SECTIONS: SectionDef[] = [
  {
    id: 'home_leading',
    title: 'Homepage — Leading The Development',
    description: 'The light grey section directly under the hero.',
    fields: [
      { key: 'heading', label: 'Heading', multiline: true },
      { key: 'body', label: 'Paragraph', multiline: true },
    ],
  },
  {
    id: 'home_new_section',
    title: 'Homepage — New Section (below Our Programs)',
    description: 'The light grey section between Our Programs and Player Pathway.',
    fields: [
      { key: 'heading', label: 'Heading', multiline: true },
      { key: 'body', label: 'Paragraph', multiline: true },
    ],
  },
  {
    id: 'home_highlight',
    title: 'Homepage — Highlight Bar',
    description: 'The white strip with the award and Active Kids logos.',
    fields: [
      { key: 'award_text', label: 'Award Text' },
      { key: 'vouchers_text', label: 'Vouchers Text' },
    ],
  },
  {
    id: 'home_programs',
    title: 'Homepage — Our Programs',
    description: 'Section heading only. The program cards themselves are edited under the Programs tab.',
    fields: [{ key: 'heading', label: 'Heading' }],
  },
  {
    id: 'home_pathway',
    title: 'Homepage — Player Pathway',
    description: 'Headings and goal text. The three pathway cards are part of the design.',
    fields: [
      { key: 'eyebrow', label: 'Small Heading (above title)' },
      { key: 'heading', label: 'Title' },
      { key: 'tagline', label: 'Tagline' },
      { key: 'goal_heading', label: 'Goal Box — Heading' },
      { key: 'goal_text', label: 'Goal Box — Text', multiline: true },
    ],
  },
  {
    id: 'home_testimonials',
    title: 'Homepage — Testimonials',
    description: 'Section heading only. The testimonials themselves are edited under the Testimonials tab.',
    fields: [{ key: 'heading', label: 'Heading' }],
  },
  {
    id: 'home_core_focus',
    title: 'Homepage — Core Focus & Supporting Factors',
    description: 'The dark navy section. Icons are fixed; titles and descriptions are editable.',
    fields: [
      { key: 'heading', label: 'Core Focus Heading' },
      { key: 'card1_title', label: 'Card 1 — Title' },
      { key: 'card1_text', label: 'Card 1 — Text', multiline: true },
      { key: 'card2_title', label: 'Card 2 — Title' },
      { key: 'card2_text', label: 'Card 2 — Text', multiline: true },
      { key: 'card3_title', label: 'Card 3 — Title' },
      { key: 'card3_text', label: 'Card 3 — Text', multiline: true },
      { key: 'supporting_heading', label: 'Supporting Factors Heading' },
      { key: 'sup1_title', label: 'Factor 1 — Title' },
      { key: 'sup1_text', label: 'Factor 1 — Text', multiline: true },
      { key: 'sup2_title', label: 'Factor 2 — Title' },
      { key: 'sup2_text', label: 'Factor 2 — Text', multiline: true },
      { key: 'sup3_title', label: 'Factor 3 — Title' },
      { key: 'sup3_text', label: 'Factor 3 — Text', multiline: true },
      { key: 'sup4_title', label: 'Factor 4 — Title' },
      { key: 'sup4_text', label: 'Factor 4 — Text', multiline: true },
    ],
  },
  {
    id: 'home_kit',
    title: 'Homepage — Official Training Kit',
    description: 'The heading is split into a white part and an orange part.',
    fields: [
      { key: 'heading_white', label: 'Heading (white part)' },
      { key: 'heading_orange', label: 'Heading (orange part)' },
      { key: 'button_label', label: 'Button Label' },
    ],
  },
  {
    id: 'home_partners',
    title: 'Homepage — Our Partners',
    description: 'Section heading only. The partner logos are edited under the Sponsors tab.',
    fields: [{ key: 'heading', label: 'Heading' }],
  },
  {
    id: 'term_program_page',
    title: 'Term Program Page — Schedule Heading',
    description: 'Leave blank to generate automatically from the current classes (e.g. "TERM 3 PROGRAM SCHEDULE").',
    fields: [{ key: 'schedule_heading', label: 'Schedule Heading', hint: 'Blank = automatic from class names' }],
  },
];

export default function CMSSiteContent() {
  const [content, setContent] = useState<SiteContentMap>(FALLBACK_SITE_CONTENT);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [savedId, setSavedId] = useState<string | null>(null);
  const [dirty, setDirty] = useState<Record<string, boolean>>({});

  const inputCls = 'w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm text-[#0A1F44] focus:outline-none focus:ring-2 focus:ring-[#f0722b]/40';
  const labelCls = 'block text-xs font-barlow font-bold tracking-widest uppercase text-gray-500 mb-1';

  useEffect(() => {
    supabase.from('site_content').select('id, value').then(({ data }) => {
      if (data && data.length > 0) {
        setContent(prev => {
          const merged = { ...prev };
          data.forEach((row: { id: string; value: Record<string, string> }) => {
            merged[row.id] = { ...FALLBACK_SITE_CONTENT[row.id], ...(row.value || {}) };
          });
          return merged;
        });
      }
      setLoading(false);
    });
  }, []);

  const handleField = (sectionId: string, key: string, value: string) => {
    setContent(prev => ({ ...prev, [sectionId]: { ...prev[sectionId], [key]: value } }));
    setDirty(prev => ({ ...prev, [sectionId]: true }));
    setSavedId(null);
  };

  const handleReset = (sectionId: string) => {
    setContent(prev => ({ ...prev, [sectionId]: { ...FALLBACK_SITE_CONTENT[sectionId] } }));
    setDirty(prev => ({ ...prev, [sectionId]: true }));
  };

  const handleSave = async (sectionId: string) => {
    setSavingId(sectionId);
    const { error } = await supabase.from('site_content').upsert({
      id: sectionId,
      value: content[sectionId],
      updated_at: new Date().toISOString(),
    });
    if (error) {
      console.error(error);
      alert('Failed to save. If this keeps happening, make sure the site_content table has been created (run the migration SQL in Supabase).');
    } else {
      setDirty(prev => ({ ...prev, [sectionId]: false }));
      setSavedId(sectionId);
    }
    setSavingId(null);
  };

  if (loading) return <div className="p-8 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-[#f0722b]" /></div>;

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500">
        Edit the wording of each section below. Layout, colours and icons stay exactly the same — only the text changes. Saved changes appear on the live site immediately.
      </p>

      {SECTIONS.map(section => {
        const open = openId === section.id;
        return (
          <div key={section.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <button
              onClick={() => setOpenId(open ? null : section.id)}
              className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors"
            >
              <div>
                <h3 className="font-black text-[#0A1F44] text-sm">{section.title}{dirty[section.id] && <span className="text-[#f0722b]"> •</span>}</h3>
                <p className="text-xs text-gray-400 mt-0.5">{section.description}</p>
              </div>
              {open ? <ChevronUp className="w-4 h-4 text-gray-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />}
            </button>

            {open && (
              <div className="px-6 pb-6 pt-2 space-y-4 border-t border-gray-100 bg-amber-50/40">
                {section.fields.map(field => (
                  <div key={field.key}>
                    <label className={labelCls}>{field.label}</label>
                    {field.multiline ? (
                      <textarea
                        className={`${inputCls} min-h-[90px]`}
                        value={content[section.id]?.[field.key] ?? ''}
                        onChange={e => handleField(section.id, field.key, e.target.value)}
                      />
                    ) : (
                      <input
                        className={inputCls}
                        value={content[section.id]?.[field.key] ?? ''}
                        onChange={e => handleField(section.id, field.key, e.target.value)}
                      />
                    )}
                    {field.hint && <p className="text-xs text-gray-400 mt-1">{field.hint}</p>}
                  </div>
                ))}

                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => handleSave(section.id)}
                    disabled={savingId === section.id}
                    className="flex items-center gap-2 bg-[#0A1F44] text-white text-xs font-barlow font-bold tracking-widest uppercase px-4 py-2 rounded-xl hover:bg-[#f0722b] transition-colors disabled:opacity-50"
                  >
                    {savingId === section.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />} Save
                  </button>
                  <button
                    onClick={() => handleReset(section.id)}
                    className="flex items-center gap-2 text-xs font-barlow font-bold tracking-widest uppercase text-gray-500 px-3 py-2 hover:text-[#0A1F44] transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" /> Reset to default
                  </button>
                  {savedId === section.id && !dirty[section.id] && (
                    <span className="text-xs text-green-600 font-bold">Saved ✓</span>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
