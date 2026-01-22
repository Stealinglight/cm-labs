import { projects } from '../data/projects';
import { ProjectCard } from './ProjectCard';

export function ProjectsSection() {
  return (
    <section id="projects" className="py-24 px-6 bg-[#0a0a0a] relative">
      <div className="max-w-6xl mx-auto">
        <div className="font-mono text-[#00ff41] text-sm mb-8">
          <span className="opacity-50">03.</span> $ ls projects/
        </div>

        <h2 className="text-3xl md:text-4xl mb-16 tracking-wide uppercase">Featured Work</h2>

        <div className="space-y-16">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
