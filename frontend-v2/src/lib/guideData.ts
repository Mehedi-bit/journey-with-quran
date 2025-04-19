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
        
        para2: "",
        
        para3: ""

        },

        
      guidelinesTitle: "Posting Guidelines",
      guidelinesSubtitle: "As we'll go through the Quran, we'll often come across verses that touch our hearts, open our minds, or simply leave us in awe. This is the place — Journey with Quran — where you can share your daily reflections, beautiful discoveries, or personal learnings from the Quran.",
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
      title: "Journey with Quran",
      subtitle: "চিন্তা, অনুপ্রেরণা এবং অনুপ্রাণিত হওয়ার একটি স্থান",
      missionTitle: "আমাদের উদ্দেশ্য",
      missionSubtitle: "এটি একটি বরকতময় কিতাব, যা আমরা আপনার উপর নাযিল করেছি, যাতে মানুষ এর আয়াতসমূহ নিয়ে গভীরভাবে চিন্তা করে এবং যাতে বোধশক্তিসম্পন্ন ব্যক্তিরা উপদেশ গ্ৰহণ করে।",
      missionContent: {
      
          para1: "আজই হাতে কুরআন তুলে নিন — রেগুলার পড়ুন, একটি আয়াতও হোক না কেন, আপনার শেষ নিঃশ্বাস পর্যন্ত। আয়াতটি নিয়ে গভীরভাবে চিন্তা করুন, আত্মস্থ করুন এবং এর শিক্ষা অথবা যদি দারুণ কিছু পান, ছড়িয়ে দিন। এটি আপনার নিজের কোরআন নোটবুকের মতো — তবে তা সবার জন্য উন্মুক্ত — যাতে আপনি এই পৃথিবী থেকে চলে যাওয়ার পরও অন্যরা এ থেকে শিক্ষা নিতে পারে, এবং আপনি সদাকায়ে জারিয়ার মতো সাওয়াব পেতে থাকেন।",
          
          para2: "",
          
          para3: ""
      
          },
      
          
        guidelinesTitle: "কীভাবে পোস্ট করবেন?",
        guidelinesSubtitle: "কুরআন পড়ার সময় আমরা প্রায়ই এমন আয়াত পাই যা আমাদের হৃদয় স্পর্শ করে, আমাদেরকে ভাবায়, আমাদের অবাক করে দেয়, চমকে দেয়। এটি সেই জায়গা— Journey with Quran — যেখানে আপনি আপনার প্রতিদিনের অনুধাবন, তাদাব্বুর, সুন্দর আবিষ্কার বা কুরআন থেকে প্রাপ্ত ব্যক্তিগত শিক্ষাগুলো শেয়ার করতে পারেন।",
        guidelines: {
          title1: "",
          content1:
            "",
          title2: "",
          content2: "",
          formatList: [
              "নরমালি যেভাবে লিখেন সেভাবেই লিখুন।",
              "বোল্ড করার জন্য দুপাশে একটি স্টার (*উক্তি*) ব্যবহার করুন।",
              "অতিরিক্ত বোল্ড করার জন্য দুপাশে দুইটা স্টার (**উক্তি**) ব্যবহার করুন।",
              "রেকমেন্ডেডঃ বিষয় উল্লেখ করতে হ্যাশ ট্যাগ ব্যবহার করুন (#Surah_Nisa #Nisa #সূরাহ_নিসা #নিসা #আসমা_উল_হুসনা)",
              "সংক্ষিপ্ত কুরআনের আয়াত বা উদ্ধৃতি পোস্টের সাথে ভিজুয়ালি দেখানোর জন্য 'Verse' ট্যাব ব্যবহার করুন।"
          ],
          title3: "গঠনমূলকভাবে অংশগ্রহণ করুন",
          content3:
            "অন্যদের পোস্টে কমেন্ট করার সময়, মুসলিম ভাইয়ের সম্মান বজায় রাখুন।",
          title4: "শেয়ার করার বিষয়সমূহ",
          topicsList: [
            "আয়াত — যা আপনাকে ভাবিয়েছে।",
            "আয়াত — যা আপনাকে নাড়া দিয়েছে।",
            "আয়াত — যা আপনাকে পথ দেখিয়েছে।",
            "আয়াত — যা আপনাকে বিস্মিত করেছে।",
            "কুরআনের আয়াতের উপর ব্যক্তিগত চিন্তাভাবনা।",
            "সম্মানিত আলিমদের ব্যাখ্যা (দলিলসমূহ উল্লেখসহ)।",
            "কুরআনের কোন আয়াত কিভাবে আমাদের জীবনে কাজে লাগাতে পারি।",
            "আল্লাহর সুন্দরতম নামসমূহের উপর চিন্তাভাবনা (আল-আসমা উল হুসনা)।"
          ],
        },
        welcomeTitle: "আমাদের কমিউনিটিতে স্বাগতম",
        welcomeQuote:
          "আমার পক্ষ থেকে একটি মাত্র আয়াত হলেও তা (মানুষের নিকট) পৌছে দাও। তোমাদের মধ্যে সেই উত্তম যে নিজে কুরআন শেখে এবং অন্যদের শেখায়।",
        welcomeQuoteAuthor: "— আল্লাহর রাসূল (সাল্লাল্লাহু আলাইহি ওয়া সাল্লাম) | (সুনান আত তিরমিজী ২৬৬৯, সহীহ বুখারী ৪৬৬১)",
        welcomeContent: {
          para1:
            "আপনাকে আমাদের কমিউনিটিতে পেয়ে আমরা আনন্দিত। আপনার উপস্থিতি আমাদের সম্মিলিত শিক্ষা ও বৃদ্ধির যাত্রাকে সমৃদ্ধ করবে। মনে রাখবেন যে প্রতিটি শিক্ষাই মূল্যবান, প্রতিটি অন্তর্দৃষ্টিই একটি উপহার, এবং প্রতিটি সদস্যই এই কমিউনিটির একটি অপরিহার্য অংশ।",
          para2:
            "এই প্ল্যাটফর্মটি যেন আপনার জন্য জ্ঞান, অনুপ্রেরণা এবং সংযোগের উৎস হয়। আল্লাহ কবুল করুন। আসুন আমরা একসাথে কুরআন নিয়ে একটি সুন্দর যাত্রা শুরু করি।",
      
          },
        footer: {
          copyright: "Journey with Quran ©2025",
          tagline: "A space for learning, reflection, and community",
        },
    }
  };
  