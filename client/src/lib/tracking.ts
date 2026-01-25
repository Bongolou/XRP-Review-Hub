// Affiliate click tracking

interface ClickEvent {
  partner: string;
  placement: string;
  timestamp: number;
  page: string;
}

export function trackAffiliateClick(partner: string, placement: string) {
  const event: ClickEvent = {
    partner,
    placement,
    timestamp: Date.now(),
    page: window.location.pathname
  };

  // Store in localStorage for local analytics
  const clicks = JSON.parse(localStorage.getItem("affiliate_clicks") || "[]");
  clicks.push(event);
  localStorage.setItem("affiliate_clicks", JSON.stringify(clicks.slice(-100))); // Keep last 100

  // Send to backend for persistent tracking
  fetch("/api/track-click", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(event)
  }).catch(() => {}); // Silent fail

  // Send to Google Analytics if available
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", "affiliate_click", {
      event_category: "affiliate",
      event_label: partner,
      value: placement
    });
  }

  console.log(`[Tracking] Affiliate click: ${partner} (${placement})`);
}

export function getClickStats() {
  const clicks: ClickEvent[] = JSON.parse(localStorage.getItem("affiliate_clicks") || "[]");
  
  const stats = clicks.reduce((acc, click) => {
    acc[click.partner] = (acc[click.partner] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return {
    total: clicks.length,
    byPartner: stats,
    recent: clicks.slice(-10)
  };
}
