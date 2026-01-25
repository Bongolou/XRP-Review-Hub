import { MessageCircle, Send } from "lucide-react";

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const socials = [
  { name: "X", icon: XIcon, url: "https://x.com/allthingsxrpl", color: "hover:text-white" },
  { name: "Discord", icon: MessageCircle, url: "https://discord.gg/allthingsxrpl", color: "hover:text-indigo-400" },
  { name: "Telegram", icon: Send, url: "https://t.me/allthingsxrpl", color: "hover:text-blue-300" }
];

export function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {socials.map((social) => (
        <a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`p-2 rounded-lg bg-white/5 border border-white/10 transition-colors ${social.color}`}
          title={social.name}
          data-testid={`social-${social.name.toLowerCase()}`}
        >
          <social.icon className="h-4 w-4" />
        </a>
      ))}
    </div>
  );
}
