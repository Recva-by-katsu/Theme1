import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;
const base = (props: P) => ({
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.9,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  ...props,
});

export const Icon = {
  Dashboard: (p: P) => (
    <svg {...base(p)}><rect x="3" y="3" width="7" height="9" rx="1.5" /><rect x="14" y="3" width="7" height="5" rx="1.5" /><rect x="14" y="12" width="7" height="9" rx="1.5" /><rect x="3" y="16" width="7" height="5" rx="1.5" /></svg>
  ),
  Server: (p: P) => (
    <svg {...base(p)}><rect x="3" y="4" width="18" height="7" rx="2" /><rect x="3" y="13" width="18" height="7" rx="2" /><path d="M7 7.5h.01M7 16.5h.01" /></svg>
  ),
  Console: (p: P) => (
    <svg {...base(p)}><rect x="3" y="4" width="18" height="16" rx="2.5" /><path d="M7 9l3 3-3 3M13 15h4" /></svg>
  ),
  Files: (p: P) => (
    <svg {...base(p)}><path d="M4 7a2 2 0 0 1 2-2h4l2 2h6a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" /></svg>
  ),
  Database: (p: P) => (
    <svg {...base(p)}><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v6c0 1.66 3.58 3 8 3s8-1.34 8-3V5M4 11v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" /></svg>
  ),
  Clock: (p: P) => (
    <svg {...base(p)}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
  ),
  Backup: (p: P) => (
    <svg {...base(p)}><path d="M12 3v12m0 0l-4-4m4 4l4-4" /><path d="M4 15v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" /></svg>
  ),
  Network: (p: P) => (
    <svg {...base(p)}><circle cx="12" cy="5" r="2.4" /><circle cx="5" cy="19" r="2.4" /><circle cx="19" cy="19" r="2.4" /><path d="M12 7.4v4M12 11.4l-6 5.2M12 11.4l6 5.2" /></svg>
  ),
  Rocket: (p: P) => (
    <svg {...base(p)}><path d="M5 15c-1 1-1.5 4-1.5 4s3-.5 4-1.5" /><path d="M9 15l-3-3c1-5 5-9 12-9 0 7-4 11-9 12l-3-3z" /><circle cx="14" cy="10" r="1.6" /></svg>
  ),
  Settings: (p: P) => (
    <svg {...base(p)}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-2.9 1.2 2 2 0 1 1-4 0 1.7 1.7 0 0 0-2.9-1.2l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.7 1.7 0 0 0 3.5 15a2 2 0 1 1 0-4 1.7 1.7 0 0 0 1-2.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A1.7 1.7 0 0 0 11 4.5a2 2 0 1 1 4 0 1.7 1.7 0 0 0 2.9 1l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1A1.7 1.7 0 0 0 22.5 11a2 2 0 1 1 0 4 1.7 1.7 0 0 0-3.1 0z" /></svg>
  ),
  User: (p: P) => (
    <svg {...base(p)}><circle cx="12" cy="8" r="4" /><path d="M4 20c0-3.5 3.6-6 8-6s8 2.5 8 6" /></svg>
  ),
  Users: (p: P) => (
    <svg {...base(p)}><circle cx="9" cy="8" r="3.2" /><path d="M3 19c0-3 2.7-5 6-5s6 2 6 5" /><path d="M16 5.5a3 3 0 0 1 0 6M21 19c0-2.5-1.6-4.2-4-4.8" /></svg>
  ),
  Key: (p: P) => (
    <svg {...base(p)}><circle cx="8" cy="15" r="4" /><path d="M11 12l8-8m-3 0l3 3m-6 0l2 2" /></svg>
  ),
  Shield: (p: P) => (
    <svg {...base(p)}><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z" /><path d="M9 12l2 2 4-4" /></svg>
  ),
  Bell: (p: P) => (
    <svg {...base(p)}><path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.7 21a2 2 0 0 1-3.4 0" /></svg>
  ),
  Search: (p: P) => (
    <svg {...base(p)}><circle cx="11" cy="11" r="7" /><path d="M21 21l-4-4" /></svg>
  ),
  Sun: (p: P) => (
    <svg {...base(p)}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
  ),
  Moon: (p: P) => (
    <svg {...base(p)}><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>
  ),
  Menu: (p: P) => (
    <svg {...base(p)}><path d="M4 7h16M4 12h16M4 17h16" /></svg>
  ),
  Close: (p: P) => (
    <svg {...base(p)}><path d="M6 6l12 12M18 6L6 18" /></svg>
  ),
  Chevron: (p: P) => (
    <svg {...base(p)}><path d="M9 6l6 6-6 6" /></svg>
  ),
  ChevronDown: (p: P) => (
    <svg {...base(p)}><path d="M6 9l6 6 6-6" /></svg>
  ),
  Play: (p: P) => (
    <svg {...base(p)}><path d="M7 5l12 7-12 7z" /></svg>
  ),
  Stop: (p: P) => (
    <svg {...base(p)}><rect x="6" y="6" width="12" height="12" rx="2" /></svg>
  ),
  Restart: (p: P) => (
    <svg {...base(p)}><path d="M20 11a8 8 0 1 0-.5 4" /><path d="M20 4v5h-5" /></svg>
  ),
  Cpu: (p: P) => (
    <svg {...base(p)}><rect x="6" y="6" width="12" height="12" rx="2" /><rect x="9" y="9" width="6" height="6" rx="1" /><path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2" /></svg>
  ),
  Ram: (p: P) => (
    <svg {...base(p)}><rect x="2" y="7" width="20" height="10" rx="2" /><path d="M6 17v2M10 17v2M14 17v2M18 17v2M7 11h2M15 11h2" /></svg>
  ),
  Disk: (p: P) => (
    <svg {...base(p)}><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="2.5" /><path d="M12 3v4M12 17v4" /></svg>
  ),
  Plus: (p: P) => (
    <svg {...base(p)}><path d="M12 5v14M5 12h14" /></svg>
  ),
  Trash: (p: P) => (
    <svg {...base(p)}><path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M6 7l1 13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-13" /></svg>
  ),
  Edit: (p: P) => (
    <svg {...base(p)}><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" /></svg>
  ),
  Download: (p: P) => (
    <svg {...base(p)}><path d="M12 3v12m0 0l-4-4m4 4l4-4M4 21h16" /></svg>
  ),
  Upload: (p: P) => (
    <svg {...base(p)}><path d="M12 21V9m0 0l-4 4m4-4l4 4M4 3h16" /></svg>
  ),
  Folder: (p: P) => (
    <svg {...base(p)}><path d="M4 7a2 2 0 0 1 2-2h4l2 2h6a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" /></svg>
  ),
  File: (p: P) => (
    <svg {...base(p)}><path d="M6 3h8l4 4v14a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" /><path d="M14 3v4h4" /></svg>
  ),
  Logout: (p: P) => (
    <svg {...base(p)}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><path d="M16 17l5-5-5-5M21 12H9" /></svg>
  ),
  Eye: (p: P) => (
    <svg {...base(p)}><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="3" /></svg>
  ),
  EyeOff: (p: P) => (
    <svg {...base(p)}><path d="M3 3l18 18M10.6 10.6a3 3 0 0 0 4.2 4.2M9.4 5.2A9.8 9.8 0 0 1 12 5c6.5 0 10 7 10 7a17 17 0 0 1-3.3 4.1M6.6 6.6A17 17 0 0 0 2 12s3.5 7 10 7a9.6 9.6 0 0 0 3-.5" /></svg>
  ),
  Check: (p: P) => (
    <svg {...base(p)}><path d="M20 6L9 17l-5-5" /></svg>
  ),
  Copy: (p: P) => (
    <svg {...base(p)}><rect x="9" y="9" width="12" height="12" rx="2" /><path d="M5 15V5a2 2 0 0 1 2-2h8" /></svg>
  ),
  Location: (p: P) => (
    <svg {...base(p)}><path d="M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>
  ),
  Egg: (p: P) => (
    <svg {...base(p)}><path d="M12 3c3.5 0 6 5 6 9a6 6 0 0 1-12 0c0-4 2.5-9 6-9z" /></svg>
  ),
  Refresh: (p: P) => (
    <svg {...base(p)}><path d="M4 12a8 8 0 0 1 14-5.3L20 8" /><path d="M20 4v4h-4" /><path d="M20 12a8 8 0 0 1-14 5.3L4 16" /><path d="M4 20v-4h4" /></svg>
  ),
  Dots: (p: P) => (
    <svg {...base(p)}><circle cx="5" cy="12" r="1.6" /><circle cx="12" cy="12" r="1.6" /><circle cx="19" cy="12" r="1.6" /></svg>
  ),
  Warning: (p: P) => (
    <svg {...base(p)}><path d="M10.3 3.9L2.4 18a2 2 0 0 0 1.7 3h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" /><path d="M12 9v4M12 17h.01" /></svg>
  ),
  Info: (p: P) => (
    <svg {...base(p)}><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" /></svg>
  ),
  Lock: (p: P) => (
    <svg {...base(p)}><rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></svg>
  ),
  Terminal: (p: P) => (
    <svg {...base(p)}><path d="M4 17l6-5-6-5M12 19h8" /></svg>
  ),
  Grid: (p: P) => (
    <svg {...base(p)}><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></svg>
  ),
  List: (p: P) => (
    <svg {...base(p)}><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" /></svg>
  ),
  Home: (p: P) => (
    <svg {...base(p)}><path d="M3 11l9-8 9 8" /><path d="M5 10v10h14V10" /></svg>
  ),
};

export type IconName = keyof typeof Icon;
