import { Tooltip, TooltipTrigger, TooltipContent } from './ui/tooltip';
import { acronyms } from '../data/acronyms';
import { cn } from './ui/utils';

interface AcronymTooltipProps {
  acronym: string;
  className?: string;
}

export function AcronymTooltip({ acronym, className }: AcronymTooltipProps) {
  const def = acronyms[acronym];

  if (!def) {
    return <span className={className}>{acronym}</span>;
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span
          className={cn(
            'cursor-help border-b border-dotted border-current',
            className
          )}
        >
          {acronym}
        </span>
      </TooltipTrigger>
      <TooltipContent
        className="bg-[#1a1a1a]/95 border border-[#00ff41]/30 text-gray-200 font-mono max-w-xs backdrop-blur-sm"
        sideOffset={4}
      >
        <div className="text-[#00ff41] font-bold">{def.fullName}</div>
        {def.description && (
          <div className="text-gray-400 text-xs mt-1">{def.description}</div>
        )}
      </TooltipContent>
    </Tooltip>
  );
}
