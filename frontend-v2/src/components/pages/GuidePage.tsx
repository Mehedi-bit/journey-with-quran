import React, { useState } from "react";
import { Scroll, BookOpen, Edit3, Heart, Globe } from "lucide-react";
import { Separator } from "../ui/separator";
import { translations } from "@/lib/guideData";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";

type Language = "en" | "bn";

const GuidePage = () => {
  const [language, setLanguage] = useState<Language>("en");
  const t = translations[language];

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "bn" : "en");
  };

  const textClass = language === "bn" ? "bangla-text" : "english-text";



  // function to style and format the text

  function formatPostText(text: string): JSX.Element[] {
      const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|#[^\s]+|https?:\/\/[^\s]+)/g);
    
      return parts.map((part: string, index: number) => {
        // **double-star** → bold + text-lg
        // if (part.startsWith("**") && part.endsWith("**")) {
        //   return (
        //     <strong key={index} className="font-bold text-neutral-900 dark:text-white text-lg">
        //       {part.slice(2, -2)}
        //     </strong>
        //   );
        // }
    
        // *single-star* → bold
        // if (part.startsWith("*") && part.endsWith("*")) {
        //   return (
        //     <strong key={index} className="font-bold text-neutral-900 dark:text-white">
        //       {part.slice(1, -1)}
        //     </strong>
        //   );
        // }
    
        // #hashtag → blue
        if (part.startsWith("#")) {
          return (
            <span key={index} className="text-blue-700  dark:text-blue-400">
              {part}
            </span>
          );
        }
    
        // https://link → blue and clickable
        if (part.startsWith("http://") || part.startsWith("https://")) {
          return (
            <a
              key={index}
              href={part}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700  dark:text-blue-400 underline"
            >
              {part}
            </a>
          );
        }
    
        // Default/plain text
        return <span key={index}>{part}</span>;
      });
  }




  return (
    <ScrollArea>
      <div className="flex flex-col min-h-screen bg-background">
        {/* Header Section */}
        <header className="py-12 md:py-16 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-primary/5 to-background">
          <div className="max-w-4xl mx-auto w-full flex items-center justify-between">
            

            <div className="flex flex-col">

                <h1 className={`english-text text-3xl md:text-4xl font-bold text-primary mb-3 ${textClass}`} >
                    {t.title} 
                </h1>
                <p className={`text-muted-foreground text-lg max-w-2xl ${textClass}`} >
                    {t.subtitle}
                </p>

            </div>

            {/* Language Toggle */}
            <div className="flex justify-end mb-6">
              <Button
                variant="outline"
                onClick={toggleLanguage}
                size="sm"
                className="gap-2"
              >
                <Globe className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">
                  {language === "en" ? "BN" : "EN"}
                </span>
              </Button>
            </div>

          </div>
        </header>

        <main className="flex-1 py-8 md:py-12 px-4 md:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto w-full space-y-16">
            {/* Mission Section */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="h-5 w-5 text-primary" />
                <h2 className={`text-2xl font-semibold ${textClass}`}>
                  {t.missionTitle}
                </h2>
              </div>
              {/* <p className={`text-muted-foreground mb-6 ${textClass}`}>
                {t.missionSubtitle}
              </p> */}

              <blockquote className="border-l-4 border-primary pl-4 my-6">
                <p className={`italic text-lg ${textClass}`}>
                  "{t.missionSubtitle}"
                </p>
                <div
                  className={`text-sm mt-2 text-muted-foreground ${textClass}`}
                >
                  { language === "en" ?
                    "— Book of Allah | Surah Sad (38:29)" 
                                      : 
                    "— মহান আল্লাহ | সূরা সাদ (৩৮:২৯)"
                  }
                </div>
              </blockquote>


              <div className="space-y-4 text-foreground">
                <p className={`${textClass} dark:text-neutral-300`}>
                  {/* <span className="font-semibold text-primary">{t.title}.</span>{" "} */}
                  {t.missionContent.para1}
                </p>
                <p className={`${textClass} dark:text-neutral-300`}>{t.missionContent.para2}</p>
                <p className={`${textClass} dark:text-neutral-300`}>{t.missionContent.para3}</p>
              </div>
            </section>

            <Separator className="bg-primary/10" />

            {/* Guidelines Section */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Edit3 className="h-5 w-5 text-primary" />
                <h2 className={`text-2xl font-semibold ${textClass}`}>
                  {t.guidelinesTitle}
                </h2>
              </div>
              <p className={`text-muted-foreground mb-6 ${textClass}`}>
                {t.guidelinesSubtitle}
              </p>

              <div className="space-y-8">
                <div>
                  <h3
                    className={`font-semibold text-lg mb-3 text-primary  ${textClass}`}
                  >
                    {t.guidelines.title1}
                  </h3>
                  <p className={`${textClass}`}>{t.guidelines.content1}</p>
                </div>

                <div>
                  <h3
                    className={`font-semibold text-lg mb-3 text-primary ${textClass}`}
                  >
                    {t.guidelines.title2}
                  </h3>
                  <p className={`${textClass}`}>{t.guidelines.content2}</p>
                  <ul className="list-disc pl-6 mt-3 space-y-2">
                    {t.guidelines.formatList.map((item, index) => (
                      <li key={index} className={`${textClass} dark:text-neutral-300`}>
                        {formatPostText(item)}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3
                    className={`font-semibold text-lg mb-3 text-primary ${textClass}`}
                  >
                    {t.guidelines.title3}
                  </h3>
                  <p className={`${textClass} dark:text-neutral-300`}>{t.guidelines.content3}</p>
                </div>

                <div>
                  <h3
                    className={`font-semibold text-lg mb-3 text-primary ${textClass}`}
                  >
                    {t.guidelines.title4}
                  </h3>
                  <ul className="list-disc pl-6 mt-3 space-y-2">
                    {t.guidelines.topicsList.map((item, index) => (
                      <li key={index} className={`${textClass} dark:text-neutral-300`}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            <Separator className="bg-primary/10" />

            {/* Welcome Message */}
            <section className="bg-primary/5 p-8 rounded-lg">
              <div className="flex items-center gap-2 mb-4">
                <Heart className="h-5 w-5 text-primary" />
                <h2 className={`text-2xl font-semibold ${textClass}`}>
                  {t.welcomeTitle}
                </h2>
              </div>

              <blockquote className="border-l-4 border-primary pl-4 my-6">
                <p className={`italic text-lg ${textClass}`}>
                  {t.welcomeQuote}
                </p>
                <footer
                  className={`text-sm mt-2 text-muted-foreground ${textClass}`}
                >
                  {t.welcomeQuoteAuthor}
                </footer>
              </blockquote>

              <div className="space-y-4">
                <p className={`${textClass} dark:text-neutral-200`}>{t.welcomeContent.para1}</p>
                <p className={`font-medium ${textClass} dark:text-neutral-200`}>
                  {t.welcomeContent.para2}
                </p>


                

              </div>
            </section>
          </div>
        </main>

        {/* Footer */}
        <footer className="py-8 px-4 md:px-6 lg:px-8 border-t border-border">
          <div className="max-w-4xl mx-auto w-full text-center text-muted-foreground text-sm">
            <p className={textClass}>
              {t.footer.copyright} {new Date().getFullYear()}
            </p>
            <p className={`mt-1 ${textClass}`}>{t.footer.tagline}</p>
          </div>
        </footer>
      </div>
    </ScrollArea>
  );
};

export default GuidePage;
