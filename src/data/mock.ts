export type ServerStatus = "online" | "offline" | "starting" | "stopping";

export interface Server {
  id: string;
  name: string;
  icon: string;
  status: ServerStatus;
  game: string;
  node: string;
  ip: string;
  cpu: number; cpuMax: number;
  ram: number; ramMax: number;
  disk: number; diskMax: number;
  netIn: number; netOut: number;
  uptime: string;
  players?: string;
}

export const servers: Server[] = [
  { id: "a1b2c3", name: "Survival Realms", icon: "🌲", status: "online", game: "Minecraft Java", node: "Node EU-1", ip: "play.arena.gg:25565", cpu: 72, cpuMax: 200, ram: 4.2, ramMax: 6, disk: 12.4, diskMax: 25, netIn: 1.2, netOut: 3.4, uptime: "14d 6h", players: "38 / 60" },
  { id: "d4e5f6", name: "Rust Wasteland", icon: "🔩", status: "online", game: "Rust", node: "Node US-2", ip: "rust.arena.gg:28015", cpu: 118, cpuMax: 400, ram: 9.1, ramMax: 16, disk: 34, diskMax: 60, netIn: 5.6, netOut: 8.2, uptime: "3d 1h", players: "112 / 200" },
  { id: "g7h8i9", name: "Discord Bot", icon: "🤖", status: "online", game: "Node.js", node: "Node EU-1", ip: "10.0.0.14:3000", cpu: 6, cpuMax: 100, ram: 0.18, ramMax: 1, disk: 0.4, diskMax: 5, netIn: 0.1, netOut: 0.2, uptime: "62d 12h" },
  { id: "j1k2l3", name: "FiveM Roleplay", icon: "🚓", status: "offline", game: "GTA V FiveM", node: "Node US-1", ip: "fivem.arena.gg:30120", cpu: 0, cpuMax: 400, ram: 0, ramMax: 12, disk: 22, diskMax: 40, netIn: 0, netOut: 0, uptime: "—", players: "0 / 64" },
  { id: "m4n5o6", name: "ARK Island", icon: "🦖", status: "starting", game: "ARK: SE", node: "Node EU-2", ip: "ark.arena.gg:7777", cpu: 45, cpuMax: 400, ram: 6.5, ramMax: 16, disk: 48, diskMax: 80, netIn: 0.8, netOut: 1.1, uptime: "—", players: "0 / 70" },
  { id: "p7q8r9", name: "Terraria Adventure", icon: "🌳", status: "online", game: "Terraria", node: "Node EU-1", ip: "terraria.arena.gg:7777", cpu: 14, cpuMax: 100, ram: 0.9, ramMax: 2, disk: 1.2, diskMax: 5, netIn: 0.2, netOut: 0.3, uptime: "8d 4h", players: "6 / 16" },
];

export const consoleLines = [
  "[Server] Starting minecraft server version 1.20.4",
  "[Server] Loading properties",
  "[Server] Default game type: SURVIVAL",
  "[Server] Generating keypair",
  "[Server] Starting Minecraft server on *:25565",
  "[Server] Using default channel type",
  "[Server] Preparing level \"world\"",
  "[Server] Preparing start region for dimension minecraft:overworld",
  "[Server] Time elapsed: 4213 ms",
  "[Server] Done (6.842s)! For help, type \"help\"",
  "[INFO] Steve joined the game",
  "[INFO] Alex joined the game",
  "[INFO] <Steve> anyone want to build a base?",
  "[INFO] <Alex> yes! meet at spawn",
  "[Server] Saving the game (this may take a moment!)",
  "[Server] Saved the game",
];

export interface FileItem { name: string; type: "folder" | "file"; size: string; modified: string; ext?: string; }
export const files: FileItem[] = [
  { name: "plugins", type: "folder", size: "—", modified: "2 hours ago" },
  { name: "world", type: "folder", size: "—", modified: "1 min ago" },
  { name: "world_nether", type: "folder", size: "—", modified: "1 min ago" },
  { name: "logs", type: "folder", size: "—", modified: "5 min ago" },
  { name: "server.properties", type: "file", ext: "properties", size: "1.4 KB", modified: "3 days ago" },
  { name: "server.jar", type: "file", ext: "jar", size: "48.2 MB", modified: "1 week ago" },
  { name: "eula.txt", type: "file", ext: "txt", size: "184 B", modified: "1 week ago" },
  { name: "start.sh", type: "file", ext: "sh", size: "312 B", modified: "1 week ago" },
  { name: "whitelist.json", type: "file", ext: "json", size: "2.1 KB", modified: "yesterday" },
  { name: "ops.json", type: "file", ext: "json", size: "412 B", modified: "yesterday" },
];

export const databases = [
  { name: "s1_survival", host: "10.0.0.8", port: 3306, user: "u1_data", connections: 12, size: "142 MB" },
  { name: "s1_economy", host: "10.0.0.8", port: 3306, user: "u1_econ", connections: 4, size: "38 MB" },
];

export const schedules = [
  { name: "Nightly Restart", status: true, cron: "0 4 * * *", next: "in 6h 12m", last: "18h ago", tasks: 3 },
  { name: "Auto Backup", status: true, cron: "0 */6 * * *", next: "in 2h 40m", last: "3h ago", tasks: 2 },
  { name: "Weekly Cleanup", status: false, cron: "0 5 * * 0", next: "Paused", last: "6d ago", tasks: 4 },
];

export const backups = [
  { name: "pre-update-backup", size: "1.2 GB", date: "Today, 04:00", status: "complete", locked: true },
  { name: "auto-2026-05-30", size: "1.1 GB", date: "Yesterday, 22:00", status: "complete", locked: false },
  { name: "manual-snapshot", size: "980 MB", date: "May 28, 14:20", status: "complete", locked: false },
  { name: "creating-now", size: "—", date: "In progress", status: "creating", locked: false },
];

export const allocations = [
  { ip: "203.0.113.10", port: 25565, primary: true, alias: "play.arena.gg" },
  { ip: "203.0.113.10", port: 25575, primary: false, alias: "rcon" },
  { ip: "203.0.113.10", port: 8123, primary: false, alias: "dynmap" },
];

export const envVars = [
  { key: "SERVER_JARFILE", label: "Server Jar File", value: "server.jar" },
  { key: "MINECRAFT_VERSION", label: "Minecraft Version", value: "1.20.4" },
  { key: "BUILD_TYPE", label: "Build Type", value: "recommended" },
  { key: "MAX_PLAYERS", label: "Max Players", value: "60" },
];

export const adminUsers = [
  { name: "Alex Rivera", email: "alex@arena.gg", role: "Owner", servers: 12, twofa: true, avatar: "AR" },
  { name: "Sam Chen", email: "sam@arena.gg", role: "Admin", servers: 4, twofa: true, avatar: "SC" },
  { name: "Jordan Lee", email: "jordan@arena.gg", role: "User", servers: 2, twofa: false, avatar: "JL" },
  { name: "Taylor Kim", email: "taylor@arena.gg", role: "User", servers: 1, twofa: false, avatar: "TK" },
];

export const nodes = [
  { name: "Node EU-1", location: "Frankfurt", fqdn: "eu1.arena.gg", servers: 24, cpu: 62, ram: 71, disk: 44, status: "online" },
  { name: "Node US-2", location: "Dallas", fqdn: "us2.arena.gg", servers: 18, cpu: 48, ram: 55, disk: 60, status: "online" },
  { name: "Node US-1", location: "New York", fqdn: "us1.arena.gg", servers: 15, cpu: 33, ram: 40, disk: 28, status: "maintenance" },
  { name: "Node EU-2", location: "Amsterdam", fqdn: "eu2.arena.gg", servers: 21, cpu: 77, ram: 82, disk: 51, status: "online" },
];

export const locations = [
  { short: "EU", long: "Europe (Frankfurt & Amsterdam)", nodes: 2, servers: 45 },
  { short: "US", long: "United States (NY & Dallas)", nodes: 2, servers: 33 },
  { short: "ASIA", long: "Asia Pacific (Singapore)", nodes: 1, servers: 12 },
];

export const nests = [
  { name: "Minecraft", desc: "Java & Bedrock edition servers", eggs: 6, icon: "⛏️" },
  { name: "Source Engine", desc: "CS2, GMod, TF2 and more", eggs: 8, icon: "🎯" },
  { name: "Voice Servers", desc: "TeamSpeak, Mumble", eggs: 3, icon: "🎙️" },
  { name: "Software", desc: "Node.js, Python, Java apps", eggs: 5, icon: "💻" },
];

export const eggs = [
  { name: "Paper", nest: "Minecraft", author: "support@arena.gg", docker: "ghcr.io/pterodactyl/yolks:java_17" },
  { name: "Vanilla", nest: "Minecraft", author: "support@arena.gg", docker: "ghcr.io/pterodactyl/yolks:java_17" },
  { name: "Forge", nest: "Minecraft", author: "support@arena.gg", docker: "ghcr.io/pterodactyl/yolks:java_8" },
  { name: "Fabric", nest: "Minecraft", author: "support@arena.gg", docker: "ghcr.io/pterodactyl/yolks:java_17" },
];

export const apiKeys = [
  { desc: "Deploy CI Token", key: "ptla_9f...3xQ", created: "May 12, 2026", last: "2 days ago" },
  { desc: "Local dev", key: "ptla_a2...7Kp", created: "Apr 02, 2026", last: "3 weeks ago" },
];

export const sessions = [
  { device: "MacBook Pro · Chrome", ip: "203.0.113.42", location: "Frankfurt, DE", current: true, last: "Active now" },
  { device: "iPhone 15 · Safari", ip: "198.51.100.7", location: "Berlin, DE", current: false, last: "4 hours ago" },
];
