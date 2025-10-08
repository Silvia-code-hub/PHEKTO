export interface MenuItem {
  id: number;
  label: string;
  path: string;
  icon?: string;
}

export interface DropdownProps {
  items: MenuItem[];
  isOpen: boolean;
  onClose: () => void;
}