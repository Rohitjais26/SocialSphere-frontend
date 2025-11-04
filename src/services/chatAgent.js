// /src/services/chatAgent.js
// Guided domain-based chatbot with main menu navigation

class ChatAgent {
  constructor() {
    this.state = {
      step: "menu", // menu | clarifying | answering
      currentDomain: null,
    };

    this.domains = {
      features: {
        intro: "✨ SocialSphere Features: AI content generation, 1-click scheduling, analytics, auditing & calendar. Do you want details on how to use them?",
        clarifying: "Which feature would you like to know more about? (AI Content | Scheduling | Analytics | Auditing | Calendar)",
        answers: {
          "ai content": "📝 AI Content: Generate captions, hooks, or posts instantly with one click.",
          scheduling: "📅 Scheduling: Draft posts, pick a time/date, choose platforms, and queue them.",
          analytics: "📊 Analytics: Track reach, engagement, followers, and top posts with insights.",
          auditing: "🔍 Auditing: Review your profiles for performance gaps and recommendations.",
          calendar: "📆 Calendar: Visual overview of all planned posts across platforms.",
        },
      },
      instagram: {
        intro: "📸 Instagram Integration: Lets you connect, schedule, reply, and analyze. Do you want to learn how to connect or what you can do after connecting?",
        clarifying: "Choose: (Connect | Post Scheduling | Analytics | Engagement)",
        answers: {
          connect: "🔗 To connect Instagram, click the Instagram icon on Dashboard, approve permissions, and we’ll sync media + insights.",
          "post scheduling": "📅 Instagram Post Scheduling: Queue posts, stories, or reels with captions & hashtags directly from dashboard.",
          analytics: "📊 Instagram Analytics: Follower growth, engagement, reach, impressions, top-performing posts.",
          engagement: "💬 Engagement: Reply to DMs & comments from the dashboard without opening Instagram.",
        },
      },
      scheduling: {
        intro: "⏰ Scheduling: Manage posting times & queues. Do you want best practices or step-by-step usage?",
        clarifying: "Choose: (How To Use | Best Practices)",
        answers: {
          "how to use": "🛠 How To Use Scheduling: Open scheduler → Write content → Pick time → Choose platforms → Save. We’ll auto-post for you.",
          "best practices": "💡 Best Practices: Post when your audience is most active (shown in analytics). Keep consistency across platforms.",
        },
      },
      analytics: {
        intro: "📊 Analytics helps measure performance. Do you want to learn about metrics or reporting?",
        clarifying: "Choose: (Metrics | Reports | Insights)",
        answers: {
          metrics: "📈 Metrics: Engagement, reach, impressions, follower growth, CTR, and conversions.",
          reports: "📑 Reports: Export analytics as branded reports for clients or teams.",
          insights: "🔮 Insights: AI suggests best posting time, trending topics, and content performance predictions.",
        },
      },
      creator: {
        intro: "🎥 For Creators & Influencers: Tools for growth. Want tips on content, audience growth, or brand deals?",
        clarifying: "Choose: (Content Ideas | Audience Growth | Brand Deals)",
        answers: {
          "content ideas": "✨ Content Ideas: Use AI prompts to generate posts, trending hashtags, and viral hooks.",
          "audience growth": "🚀 Audience Growth: Schedule consistently, track insights, engage via comments/DMs from dashboard.",
          "brand deals": "🤝 Brand Deals: Export analytics to pitch to brands with solid engagement proof.",
        },
      },
      help: {
        intro: "💡 Help Section: I can guide you on setup, account linking, and navigation. Do you need onboarding help or troubleshooting?",
        clarifying: "Choose: (Onboarding | Troubleshooting | Support)",
        answers: {
          onboarding: "🚀 Onboarding: Register → Connect account → Explore dashboard features.",
          troubleshooting: "🔧 Troubleshooting: If an account fails to connect, re-check permissions or reconnect via settings.",
          support: "📞 Support: Reach us via Help Center or Contact page for direct assistance.",
        },
      },
    };
  }

  // ---------- Public API ----------
  run(message) {
    const text = message.toLowerCase().trim();

    // If user wants to go back to menu
    if (text === "menu" || text === "main menu") {
      this.state = { step: "menu", currentDomain: null };
      return this.showMenu();
    }

    switch (this.state.step) {
      case "menu":
        return this.handleMenuSelection(text);

      case "clarifying":
        return this.handleClarifying(text);

      case "answering":
        return this.handleAnswer(text);

      default:
        return this.showMenu();
    }
  }

  // ---------- Step Handlers ----------
  showMenu() {
    this.state.step = "menu";
    return `📌 Main Menu:\n- Features\n- Instagram\n- Scheduling\n- Analytics\n- Creator\n- Help\n\nType one to continue 👆`;
  }

  handleMenuSelection(text) {
    const domainKey = Object.keys(this.domains).find((d) =>
      text.includes(d)
    );
    if (domainKey) {
      this.state = { step: "clarifying", currentDomain: domainKey };
      return `${this.domains[domainKey].intro}\n\n${this.domains[domainKey].clarifying}`;
    }
    return "❌ I didn’t catch that. Please choose from Main Menu:\nFeatures | Instagram | Scheduling | Analytics | Creator | Help";
  }

  handleClarifying(text) {
    const domain = this.domains[this.state.currentDomain];
    const key = Object.keys(domain.answers).find((k) => text.includes(k));
    if (key) {
      this.state.step = "answering";
      return `${domain.answers[key]}\n\n➡️ Type 'menu' to go back to Main Menu.`;
    }
    return `❌ Not clear. ${domain.clarifying}`;
  }

  handleAnswer(/*text*/) {
    return "✅ You’ve got your answer. Type 'menu' to return to Main Menu.";
  }
}

// Export instance
export const chatAgent = new ChatAgent();
