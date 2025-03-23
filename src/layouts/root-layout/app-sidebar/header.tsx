import { GalleryVerticalEnd } from "lucide-react";

// Default company object
const company = {
  name: "Sync WordBench",
  logo: GalleryVerticalEnd,
  plan: "Enterprise",
};

const Header = () => {
  return (
    <div className="flex gap-2 py-2 text-sidebar-accent-foreground">
      <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
        <company.logo className="size-4" />
      </div>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-semibold">{company.name}</span>
        <span className="truncate text-xs">{company.plan}</span>
      </div>
    </div>
  );
};

export default Header;
