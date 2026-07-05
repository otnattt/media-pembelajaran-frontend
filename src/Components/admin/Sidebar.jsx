import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Video,
  ClipboardList,
  GraduationCap,
  Settings,
  LogOut,
  Tv,
  User,
} from "lucide-react";

const mainMenu = [
  { title: "Dashboard", to: "/admin", icon: LayoutDashboard, end: true },
  { title: "Manajemen Video", to: "/admin/video", icon: Video },
  { title: "Manajemen Kuis", to: "/admin/kuis", icon: ClipboardList },
  { title: "Hasil Penilaian", to: "/admin/hasil", icon: GraduationCap },
];

const account = [
  { title: "Profil", to: "/admin/profil", icon: User },
];

export default function Sidebar({ open }) {
  return (
    <aside
      className={`${
        open ? "w-64" : "w-0 md:w-16"
      } shrink-0 transition-all overflow-hidden bg-sidebar text-sidebar-foreground`}
    >
      <div className="flex items-center gap-3 p-4 border-b border-sidebar-accent">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600/20 text-brand-500">
          <Tv className="h-5 w-5" />
        </div>

        {open && (
          <div className="overflow-hidden">
            <div className="font-bold text-base truncate">
              Media Pembelajaran
            </div>
            <div className="text-[11px] text-slate-400 truncate">
              SDN Tambahrejo 02
            </div>
          </div>
        )}
      </div>

      <nav className="p-2 space-y-6 mt-2">
        <Section title="Main Menu" items={mainMenu} open={open} />

        <Section title="Account" items={account} open={open}>
          <button className="w-full mt-1 flex items-center gap-3 px-3 h-11 rounded-lg text-slate-300 hover:bg-sidebar-accent hover:text-white transition">
            <LogOut className="h-5 w-5" />
            {open && (
              <span className="text-sm font-medium">
                Logout
              </span>
            )}
          </button>
        </Section>
      </nav>
    </aside>
  );
}

function Section({ title, items, open, children }) {
  return (
    <div>
      {open && (
        <div className="px-3 mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          {title}
        </div>
      )}

      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 h-11 rounded-lg transition ${
                  isActive
                    ? "bg-sidebar-active text-white shadow-md"
                    : "text-slate-300 hover:bg-sidebar-accent hover:text-white"
                }`
              }
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {open && (
                <span className="text-sm font-medium">
                  {item.title}
                </span>
              )}
            </NavLink>
          </li>
        ))}
      </ul>

      {children}
    </div>
  );
}