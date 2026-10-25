import type { Metadata, Viewport } from "next";
import "./globals.css";
import { DataProvider } from "@/context/DataContext";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#064e3b",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://jugikhali-latif.vercel.app"),
  title: "মাওলানা আব্দুল লতিফ | চেয়ারম্যান পদপ্রার্থী | ১২ নং যুগিখালী ইউনিয়ন পরিষদ",
  description: "বাংলাদেশ জামায়াতে ইসলামী মনোনীত প্রার্থী মাওলানা আব্দুল লতিফ এর নির্বাচনী প্রচারণা ও 'আমার যুগিখালী' স্মার্ট ইউনিয়ন পোর্টাল। সৎ, দক্ষ ও জনবান্ধব নেতৃত্ব।",
  keywords: [
    "মাওলানা আব্দুল লতিফ",
    "Abdul Latif Chairman",
    "১২ নং যুগিখালী ইউনিয়ন পরিষদ",
    "Jugikhali Union",
    "বাংলাদেশ জামায়াতে ইসলামী",
    "আমার যুগিখালী",
    "নির্বাচনী ইশতেহার",
    "স্মার্ট প্রমিজ ট্র্যাকার"
  ],
  authors: [{ name: "মাওলানা আব্দুল লতিফ নির্বাচনী প্রচার সেল ও ডিজিটাল টিম" }],
  openGraph: {
    title: "মাওলানা আব্দুল লতিফ - চেয়ারম্যান পদপ্রার্থী - ১২ নং যুগিখালী ইউনিয়ন পরিষদ",
    description: "যুগিখালীকে একটি দুর্নীতিমুক্ত, আধুনিক ও জনবান্ধব মডেল ইউনিয়ন গড়ে তুলতে দোয়া, সমর্থন ও ভোট দিন।",
    url: "https://jugikhali-latif.vercel.app",
    siteName: "আমার যুগিখালী - মাওলানা আব্দুল লতিফ",
    images: [
      {
        url: "/candidate-latif.jpg",
        width: 1000,
        height: 1000,
        alt: "মাওলানা আব্দুল লতিফ - চেয়ারম্যান পদপ্রার্থী",
      },
    ],
    locale: "bn_BD",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "মাওলানা আব্দুল লতিফ | ১২ নং যুগিখালী ইউনিয়ন পরিষদ",
    description: "সৎ, দক্ষ ও জনবান্ধব নেতৃত্ব - বাংলাদেশ জামায়াতে ইসলামী মনোনীত চেয়ারম্যান প্রার্থী।",
    images: ["/candidate-latif.jpg"],
  },
  icons: {
    icon: [
      { url: "/candidate-icon.png?v=3", sizes: "256x256", type: "image/png" },
      { url: "/favicon.ico?v=3", sizes: "any" }
    ],
    apple: [
      { url: "/candidate-icon.png?v=3", sizes: "256x256", type: "image/png" }
    ],
    shortcut: "/candidate-icon.png?v=3",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/png" href="/candidate-icon.png?v=3" />
        <link rel="shortcut icon" href="/candidate-icon.png?v=3" />
        <link rel="apple-touch-icon" href="/candidate-icon.png?v=3" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('amr_theme_mode');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark');}else{document.documentElement.classList.remove('dark');}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased bg-slate-50 text-slate-800 dark:bg-[#0b0f19] dark:text-slate-100 transition-colors duration-300">
        <DataProvider>
          {children}
        </DataProvider>
      </body>
    </html>
  );
}
