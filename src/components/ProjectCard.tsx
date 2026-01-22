import { Github, ExternalLink, ArrowRight } from 'lucide-react';
import type { ReactNode } from 'react';
import { ArchitectureDiagram } from './ArchitectureDiagram';
import { AcronymTooltip } from './AcronymTooltip';
import type { Project } from '../data/projects';
import { acronyms } from '../data/acronyms';

// Helper to render text with acronym tooltips
function renderWithAcronyms(text: string): ReactNode {
  // Build pattern from all known acronyms
  const acronymKeys = Object.keys(acronyms);
  // Sort by length descending to match longer acronyms first (e.g., "NIST 800-171" before "NIST")
  const sortedKeys = acronymKeys.sort((a, b) => b.length - a.length);
  const pattern = new RegExp(`\\b(${sortedKeys.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})\\b`, 'g');

  const parts = text.split(pattern);

  return parts.map((part, index) => {
    if (acronyms[part]) {
      return <AcronymTooltip key={index} acronym={part} />;
    }
    return part;
  });
}

// Sub-components
function ProjectBadge({ type }: { type: 'featured' | 'open-source' }) {
  if (type === 'featured') {
    return (
      <span className="px-3 py-1 bg-[#00d9ff]/10 border border-[#00d9ff]/30 text-[#00d9ff] text-xs uppercase tracking-wider">
        Featured
      </span>
    );
  }
  return (
    <span className="px-3 py-1 bg-[#00ff41]/10 border border-[#00ff41]/30 text-[#00ff41] text-xs uppercase tracking-wider">
      Open Source
    </span>
  );
}

function CategoryTags({ categories }: { categories: string[] }) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {categories.map((category) => (
        <span
          key={category}
          className="px-3 py-1 bg-[#0a0a0a] border border-[#00ff41]/30 text-[#00ff41] text-xs font-mono"
        >
          {category}
        </span>
      ))}
    </div>
  );
}

function HashtagList({ hashtags }: { hashtags: string[] }) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {hashtags.map((tag) => (
        <span key={tag} className="font-mono text-xs text-[#00d9ff]">
          {tag}
        </span>
      ))}
    </div>
  );
}

function ProjectActions({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap gap-4">
      {project.githubUrl && (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-6 py-3 bg-[#00d9ff]/10 border border-[#00d9ff] text-[#00d9ff] hover:bg-[#00d9ff] hover:text-black transition-all group/btn"
        >
          <Github className="w-4 h-4" />
          <span>View on GitHub</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      )}
      {project.learnMoreUrl && (
        <button className="flex items-center gap-2 px-6 py-3 bg-[#00d9ff]/10 border border-[#00d9ff] text-[#00d9ff] hover:bg-[#00d9ff] hover:text-black transition-all group/btn">
          <span>Learn More</span>
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </button>
      )}
    </div>
  );
}

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="border border-white/10 bg-[#1a1a1a]/30 overflow-hidden hover:border-[#00d9ff]/50 transition-all group">
      <div className="p-8 md:p-12">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-3xl md:text-4xl tracking-wide">{project.name}</h3>
            <ProjectBadge type={project.badge} />
          </div>
          <p className="text-xl text-gray-300 mb-4">{project.tagline}</p>
          <CategoryTags categories={project.categories} />
        </div>

        {/* Description with acronym tooltips */}
        <p className="text-gray-400 leading-relaxed mb-6">
          {renderWithAcronyms(project.description)}
        </p>

        {/* Hashtags */}
        <HashtagList hashtags={project.hashtags} />

        {/* Architecture diagram */}
        <div className="bg-[#0a0a0a] border border-[#00ff41]/20 p-6 mb-6">
          <ArchitectureDiagram
            title={project.diagram.title}
            nodes={project.diagram.nodes}
            connections={project.diagram.connections}
          />
          <p className="text-xs text-gray-500 mt-4 text-center font-mono">
            {project.diagramCaption}
          </p>
        </div>

        {/* Actions */}
        <ProjectActions project={project} />
      </div>
    </div>
  );
}
