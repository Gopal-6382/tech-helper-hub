export interface Category {
  id: string;
  name: string;
  slug?: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
  icon?: string | null;
}

export interface CategoryFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: {
    id: string;
    name: string;
    slug: string;
    icon?: string | null;
  } | null;
}

export interface FormValues {
  name: string;
  slug: string;
  icon?: string;
}

export interface SelectedCategory {
  id: string;
  name: string;
  slug: string;
  icon?: string | null;
}
