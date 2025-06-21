import { ReactNode } from 'react';
import { clsx } from 'clsx';
import { AlertCircle, Info, CheckCircle, AlertTriangle } from 'lucide-react';

interface CalloutProps {
  children: ReactNode;
  type?: 'note' | 'warning' | 'error' | 'success';
}

const calloutConfig = {
  note: {
    icon: Info,
    classes: 'border-l-4 border-l-blue-500 bg-blue-50/30 text-blue-900 dark:border-l-blue-400 dark:bg-blue-950/20 dark:text-blue-100',
    iconClasses: 'text-blue-600 dark:text-blue-400'
  },
  warning: {
    icon: AlertTriangle,
    classes: 'border-l-4 border-l-amber-500 bg-amber-50/40 text-amber-900 dark:border-l-amber-400 dark:bg-amber-950/20 dark:text-amber-100',
    iconClasses: 'text-amber-600 dark:text-amber-400'
  },
  error: {
    icon: AlertCircle,
    classes: 'border-l-4 border-l-red-500 bg-red-50/40 text-red-900 dark:border-l-red-400 dark:bg-red-950/20 dark:text-red-100',
    iconClasses: 'text-red-600 dark:text-red-400'
  },
  success: {
    icon: CheckCircle,
    classes: 'border-l-4 border-l-emerald-500 bg-emerald-50/40 text-emerald-900 dark:border-l-emerald-400 dark:bg-emerald-950/20 dark:text-emerald-100',
    iconClasses: 'text-emerald-600 dark:text-emerald-400'
  }
};

export function Callout({ children, type = 'note' }: CalloutProps) {
  const config = calloutConfig[type];
  const Icon = config.icon;

  return (
    <aside className={clsx(
      'my-8 pl-6 pr-6 py-5 font-serif leading-relaxed rounded-none border-0',
      config.classes
    )}>
      <div className="flex gap-4">
        <div className="flex-shrink-0 mt-0.5">
          <Icon className={clsx('h-5 w-5', config.iconClasses)} />
        </div>
        <div className="flex-1">
          <div className="text-base leading-7 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&>p]:text-base [&>p]:leading-7">
            {children}
          </div>
        </div>
      </div>
    </aside>
  );
}