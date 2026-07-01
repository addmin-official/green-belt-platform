import { useMemo } from 'react';

type MapProject = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  treesSupported: number;
  compostReceived: number;
  survivalRate: number;
};

type Props<T extends MapProject> = {
  projects: T[];
  activeProjectId: string;
  onSelect: (project: T) => void;
};

export default function GoogleProjectsMap<T extends MapProject>({
  projects,
  activeProjectId,
  onSelect,
}: Props<T>) {
  const activeProject = projects.find((project) => project.id === activeProjectId) ?? projects[0];

  const source = useMemo(() => {
    if (!activeProject) {
      return 'https://www.openstreetmap.org/export/embed.html?bbox=43.3%2C35.2%2C45.9%2C37.4&layer=mapnik';
    }

    const span = 0.35;
    const left = activeProject.lng - span;
    const bottom = activeProject.lat - span;
    const right = activeProject.lng + span;
    const top = activeProject.lat + span;

    return `https://www.openstreetmap.org/export/embed.html?bbox=${left}%2C${bottom}%2C${right}%2C${top}&layer=mapnik&marker=${activeProject.lat}%2C${activeProject.lng}`;
  }, [activeProject]);

  return (
    <section className="overflow-hidden rounded-2xl border border-emerald-500/20 bg-[#07180d]">
      <div className="flex flex-col gap-2 border-b border-emerald-500/15 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <strong className="block text-xs font-black text-emerald-200">
            نەخشەی ڕاستەقینەی شوێنەکانی پڕۆژە
          </strong>
          <span className="mt-1 block text-[10px] text-slate-500">
            OpenStreetMap — بەردەست بەبێ کلیلی تایبەت
          </span>
        </div>
        <span className="w-fit rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-[10px] font-black text-emerald-200">
          نەخشەی چالاک
        </span>
      </div>

      <iframe
        title="نەخشەی پڕۆژەکانی کەمەربەندی سەوز"
        src={source}
        className="h-[420px] w-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />

      <div className="grid gap-2 border-t border-emerald-500/15 p-3 sm:grid-cols-2 lg:grid-cols-4">
        {projects.map((project) => (
          <button
            key={project.id}
            type="button"
            onClick={() => onSelect(project)}
            className={project.id === activeProjectId
              ? 'rounded-xl border border-[#cca553]/45 bg-[#cca553]/10 px-3 py-2 text-right text-[10px] font-bold text-[#e5c66e]'
              : 'rounded-xl border border-emerald-500/15 bg-black/10 px-3 py-2 text-right text-[10px] font-bold text-slate-400 transition hover:border-emerald-400/35'}
          >
            {project.name}
          </button>
        ))}
      </div>
    </section>
  );
}
