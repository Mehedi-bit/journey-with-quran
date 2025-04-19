// English and Bangla translations for the Guide Page

export type Translation = {
    title: string;
    subtitle: string;
    missionTitle: string;
    missionSubtitle: string;
    missionContent: Record<string, string>;
    guidelinesTitle: string;
    guidelinesSubtitle: string;
    guidelines: {
      [key: string]: string | string[];
    };
    welcomeTitle: string;
    welcomeQuote: string;
    welcomeQuoteAuthor: string;
    welcomeContent: Record<string, string>;
    footer: Record<string, string>;
};
  
  export const translations: Record<"en" | "bn", Translation> = {
    en: {
      title: "Journey with Quran",
      subtitle: "A space to think, inspire, and get inspired.",
      missionTitle: "Our mission",
      missionSubtitle: "This is a blessed Book which We sent down to you, for people to think about its ayahs, and that those of understanding may be reminded.",
      missionContent: {

        para1: "Pick up the Qur’an today — and commit to reading it every single day, even if it's just one ayah, until your last breath. Reflect on its meaning, absorb its wisdom, and share its light. Let it become your open journal — shared with the world — so that even after you leave this world, others continue to benefit from it, and you continue to earn reward, like Sadaqah Jariyah.",
        
        para2: "As we'll go through the Quran, we'll often come across verses that touch our hearts, open our minds, or simply leave us in awe. This is the place — Journey with Quran — where you can share your daily reflections, beautiful discoveries, or personal learnings from the Quran.",
        
        para3: ""

        },

        
      guidelinesTitle: "Posting Guidelines",
      guidelinesSubtitle: "",
      guidelines: {
        title1: "",
        content1:
          "",
        title2: "",
        content2: "",
        formatList: [
            "Write as you write usually.",
            "Single stars (*text*) for bold.",
            "Double stars (**text**) for extra bold.",
            "Recommended: Use hash tags (#surah_nisa  #nisa  #asma_ul_husna) to mention topics",
            "Verse tab for embedding short Quranic line or quote visually."
        ],
        title3: "Engage Constructively",
        content3:
          "When commenting on others' posts, focus on adding value through thoughtful questions or insights. Avoid criticism without constructive feedback.",
        title4: "Topics to Share",
        topicsList: [
          "Ayah — That shook you.",
          "Ayah — That guided you.",
          "Ayah — That amazed you.",
          "Personal reflections on ayahs of the Quran.",
          "Scholarly explanations (with proper attribution).",
          "How Quranic teachings apply to contemporary life.",
          "Reflection on the names of Allah (Al Asma ul Husna)"
        ],
      },
      welcomeTitle: "Welcome to Our Community",
      welcomeQuote:
        "Convey from me even an Ayah of the Qur'an. The best among you are those who learn the Quran and teach it to others.",
      welcomeQuoteAuthor: "— Prophet Muhammad (peace be upon him)",
      welcomeContent: {
        para1:
          "We're delighted to have you join our community. Your presence enriches our collective journey of learning and growth. Remember that every story is valuable, every insight is a gift, and every member is an essential part of this community.",
        para2:
          "May this platform be a source of knowledge, inspiration, and connection for you. May Allah accept it. Let's continue this beautiful journey with the Quran together.",

        },
      footer: {
        copyright: "Journey with Quran ©",
        tagline: "A space for learning, reflection, and community",
      },
    },
    bn: {
      title: "কোরআনের সাথে যাত্রা",
      subtitle: "অর্থপূর্ণ সম্পৃক্ততার জন্য আপনার গাইড",
      missionTitle: "আমাদের লক্ষ্য",
      missionSubtitle: "আমরা কেন এই প্ল্যাটফর্ম তৈরি করেছি",
      missionContent: {
        para1:
          "কোরআনের সাথে যাত্রা হল বিশ্বজুড়ে মুসলিমদের জন্য একটি নিবেদিত স্থান যেখানে তারা পবিত্র কোরআন এবং হাদিসের জ্ঞানের মাধ্যমে একসাথে সংযোগ, শিক্ষা এবং বৃদ্ধি পেতে পারে।",
        para2:
          "আমাদের প্ল্যাটফর্মের লক্ষ্য এমন একটি সম্প্রদায় গড়ে তোলা যেখানে জ্ঞান ভাগ করে নেওয়া হয়, প্রশ্নকে স্বাগত জানানো হয় এবং আধ্যাত্মিক বৃদ্ধিকে লালন করা হয়। আমরা বিশ্বাস করি যে কোরআন বোঝা একটি আজীবন যাত্রা যা একসাথে ভ্রমণ করা সবচেয়ে ভালো।",
        para3:
          "আপনি একজন পণ্ডিত হোন বা কোরআনের সাথে আপনার সম্পর্ক শুরু করুন, এই স্থানটি আপনার পথে অনুপ্রেরণা, নির্দেশনা এবং সম্প্রদায়ের সমর্থন খুঁজে পাওয়ার জন্য।",
      },
      guidelinesTitle: "পোস্টিং নির্দেশিকা",
      guidelinesSubtitle: "কীভাবে কার্যকরভাবে অবদান রাখবেন",
      guidelines: {
        title1: "১. সম্মানের সাথে জ্ঞান ভাগ করুন",
        content1:
          "ব্যাখ্যা বা ব্যাখ্যা ভাগ করার সময়, বিনয় এবং বিভিন্ন দৃষ্টিকোণের প্রতি সম্মান দেখিয়ে তা করুন। সম্ভব হলে নির্ভরযোগ্য উৎস উল্লেখ করুন।",
        title2: "২. আপনার পোস্ট ফরম্যাট করুন",
        content2: "স্পষ্টতা এবং পাঠযোগ্যতার জন্য:",
        formatList: [
          "কোরআনিক আয়াতের জন্য সঠিক ফরম্যাটিং ব্যবহার করুন (সূরার নাম এবং আয়াত নম্বর অন্তর্ভুক্ত করুন)",
          "হাদিসের জন্য, সংগ্রহ এবং বর্ণনাকারীর উল্লেখ করুন",
          "দীর্ঘ পোস্টগুলিকে অনুচ্ছেদে ভাগ করুন",
          "পোস্ট করার আগে প্রিভিউ ফিচার ব্যবহার করুন",
        ],
        title3: "৩. গঠনমূলকভাবে জড়িত হন",
        content3:
          "অন্যদের পোস্টে মন্তব্য করার সময়, চিন্তাশীল প্রশ্ন বা অন্তর্দৃষ্টির মাধ্যমে মূল্য যোগ করার উপর ফোকাস করুন। গঠনমূলক প্রতিক্রিয়া ছাড়া সমালোচনা এড়িয়ে চলুন।",
        title4: "৪. ভাগ করার বিষয়",
        topicsList: [
          "আয়াত বা হাদিস সম্পর্কে ব্যক্তিগত প্রতিফলন",
          "ব্যাখ্যা বা প্রয়োগ সম্পর্কে প্রশ্ন",
          "পণ্ডিতদের ব্যাখ্যা (সঠিক অ্যাট্রিবিউশন সহ)",
          "সমসাময়িক জীবনে কোরআনিক শিক্ষা কীভাবে প্রযোজ্য",
          "সুন্দর তেলাওয়াত বা ক্যালিগ্রাফি (সঠিক ক্রেডিট সহ)",
        ],
      },
      welcomeTitle: "আমাদের সম্প্রদায়ে স্বাগতম",
      welcomeQuote: "তোমাদের মধ্যে সেরা তারা যারা কোরআন শেখে এবং অন্যদের শেখায়।",
      welcomeQuoteAuthor: "— হযরত মুহাম্মদ (সাঃ)",
      welcomeContent: {
        para1:
          "আমরা আপনাকে আমাদের সম্প্রদায়ে যোগদান করতে পেরে আনন্দিত। আপনার উপস্থিতি আমাদের সম্মিলিত শিক্ষা ও বৃদ্ধির যাত্রাকে সমৃদ্ধ করে। মনে রাখবেন যে প্রতিটি প্রশ্ন মূল্যবান, প্রতিটি অন্তর্দৃষ্টি একটি উপহার, এবং প্রতিটি সদস্য এই সম্প্রদায়ের একটি অপরিহার্য অংশ।",
        para2:
          "এই প্ল্যাটফর্মটি আপনার জন্য জ্ঞান, অনুপ্রেরণা এবং সংযোগের উৎস হোক। আসুন আমরা একসাথে কোরআনের সাথে এই সুন্দর যাত্রা শুরু করি।",
      },
      footer: {
        copyright: "কোরআনের সাথে যাত্রা ©",
        tagline: "শিক্ষা, প্রতিফলন এবং সম্প্রদায়ের জন্য একটি স্থান",
      },
    },
  };
  