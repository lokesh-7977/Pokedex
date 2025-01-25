export const InfoCard: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({
    title,
    children,
    className,
  }) => (
    <div className={`bg-white shadow rounded-lg p-4 ${className}`}>
      <h2 className="text-xl font-semibold text-gray-700 mb-2">{title}</h2>
      {children}
    </div>
  )