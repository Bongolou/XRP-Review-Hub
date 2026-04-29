import { TwitterIcon, FacebookIcon, TikTokIcon } from "@/components/icons/SocialIcons";

const socials = [
  { name: "X", icon: TwitterIcon, url: "https://x.com/allthingsxrpl", color: "hover:text-white" },
  { name: "Facebook", icon: FacebookIcon, url: "https://www.facebook.com/allthingsxrpl", color: "hover:text-blue-500" },
  { name: "TikTok", icon: TikTokIcon, url: "https://www.tiktok.com/@all.things.xrpl", color: "hover:text-pink-400" }
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
