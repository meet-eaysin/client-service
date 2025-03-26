export type FilterOption = {
  value: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
};

export type FilterConfig = {
  key: string;
  label: string;
  type: 'multi-select' | 'single-select' | 'search';
  options?: FilterOption[];
  placeholder?: string;
};
