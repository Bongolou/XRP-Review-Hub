import { Twitter, MessageCircle, Send } from "lucide-react";

const socials = [
  { name: "Twitter", icon: Twitter, url: "https://twitter.com/allthingsxrpl", color: "hover:text-blue-400" },
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
