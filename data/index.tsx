import {
    LayoutDashboard,
    Package,
    FolderTree,
    Layers,
    ShoppingBag,
    Ticket,
    Image as ImageIcon,
    MessageSquareQuote,
    Mail,
    Settings,
    Users,
    Store,
} from 'lucide-react';

export const sideBarDashboardData = [
    { id: 1, title: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { id: 2, title: 'Orders', href: '/dashboard/orders', icon: ShoppingBag },
    { id: 3, title: 'Products', href: '/dashboard/products', icon: Package },
    { id: 4, title: 'Categories', href: '/dashboard/categories', icon: FolderTree },
    { id: 5, title: 'Sub Categories', href: '/dashboard/sub-categories', icon: Layers },
    { id: 6, title: 'Coupons', href: '/dashboard/coupons', icon: Ticket },
    { id: 7, title: 'Banners', href: '/dashboard/banners', icon: ImageIcon }, 
    { id: 8, title: 'Testimonials', href: '/dashboard/testimonials', icon: MessageSquareQuote },
    { id: 9, title: 'Contact', href: '/dashboard/contact', icon: Mail },
    { id: 10, title: 'Store Settings', href: '/dashboard/store-settings', icon: Store },
    { id: 11, title: 'Users', href: '/dashboard/users', icon: Users },
    { id: 12, title: 'Settings', href: '/dashboard/settings', icon: Settings },
];