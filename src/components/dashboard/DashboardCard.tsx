
import React from 'react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const cardVariants = cva(
  "rounded-lg transition-all duration-200 overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-white border border-gray-100 shadow-subtle",
        glass: "glass-card backdrop-blur-md border-0",
        colored: "bg-primary/10 border border-primary/20",
      },
      size: {
        default: "p-6",
        sm: "p-4",
        lg: "p-8",
      },
      hover: {
        default: "",
        lift: "hover:shadow-card hover:-translate-y-1",
        glow: "hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      hover: "default"
    }
  }
);

interface DashboardCardProps 
  extends React.HTMLAttributes<HTMLDivElement>, 
    VariantProps<typeof cardVariants> {
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  footer?: React.ReactNode;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  className,
  children,
  variant,
  size,
  hover,
  title,
  subtitle,
  icon,
  footer,
  ...props
}) => {
  return (
    <div 
      className={cn(cardVariants({ variant, size, hover }), className)} 
      {...props}
    >
      {(title || icon) && (
        <div className="flex items-start justify-between mb-4">
          <div>
            {title && <h3 className="text-lg font-medium text-gray-900">{title}</h3>}
            {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
          </div>
          {icon && (
            <div className="p-2 rounded-md bg-gray-50">
              {icon}
            </div>
          )}
        </div>
      )}
      
      <div>
        {children}
      </div>
      
      {footer && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          {footer}
        </div>
      )}
    </div>
  );
};

export default DashboardCard;
