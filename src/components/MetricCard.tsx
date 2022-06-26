interface MetricCardProps {
  title: string;
  description: string;
  value: string;
  icon: string;
  gradient: string;
}

export function MetricCard({
  title,
  description,
  value,
  icon,
  gradient,
}: MetricCardProps) {
  return (
    <div className="metric-card bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 max-w-72 w-full">
      <div className="flex items-center text-gray-900 dark:text-gray-100">
        {title}
      </div>
    </div>
  );
}
