import { Link } from '@inertiajs/react';
import { Dices, LayoutDashboard, Clapperboard, Map, User, Wine, Wand, Sword, Cog, NotebookPen, Bot, RectangleEllipsis, PawPrint, Landmark } from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard, games, locations, scenes, characters, npcs, pcs, enemies, quests, items, spells, systems, general_notes } from '@/routes';
import type { NavItem } from '@/types';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutDashboard,
    },
    {
        title: 'Games',
        href: games(),
        icon: Dices,
    },
    {
        title: 'Locations',
        href: locations(),
        icon: Map,
    },
    {
        title: 'Scenes',
        href: scenes(),
        icon: Clapperboard,
    },
    {
        title: 'All Characters',
        href: characters(),
        icon: User,
    },
    {
        title: '- NPCs',
        href: npcs(),
        icon: Bot,
    },
    {
        title: '- PCs',
        href: pcs(),
        icon: User,
    },
    {
        title: '- Enemies',
        href: enemies(),
        icon: PawPrint,
    },
    {
        title: 'Quests',
        href: quests(),
        icon: Wine,
    },
    {
        title: 'Items',
        href: items(),
        icon: Sword,
    },
    {
        title: 'Spells',
        href: spells(),
        icon: Wand,
    },
    // {
    //     title: 'Systems',
    //     href: systems(),
    //     icon: Cog,
    // },
    {
        title: 'General Notes',
        href: general_notes(),
        icon: NotebookPen,
    },
    {
        title: 'Custom Fields',
        href: '/custom-fields',
        icon: RectangleEllipsis,
    },
    {
        title: 'Forums',
        href: '/forums',
        icon: Landmark,
    },
];

const footerNavItems: NavItem[] = [];
// const footerNavItems: NavItem[] = [
//     {
//         title: 'Repository',
//         href: 'https://github.com/laravel/react-starter-kit',
//         icon: FolderGit2,
//     },
//     {
//         title: 'Documentation',
//         href: 'https://laravel.com/docs/starter-kits#react',
//         icon: BookOpen,
//     },
// ];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
