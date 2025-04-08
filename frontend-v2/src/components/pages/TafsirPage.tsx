import React, { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, ChevronLeft, ChevronRight } from "lucide-react";
import SurahList from "@/components/surah/SurahList";
import TafsirView from "@/components/tafsir/TafsirView";

const TafsirPage = () => {
  // Set initial surah to 1 (Al-Fatiha)
  const [selectedSurah, setSelectedSurah] = useState<number>(1);
  const [translation, setTranslation] = useState<"en" | "bn">("en");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [surahNames, setSurahNames] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    // Load surah names for navigation
    const loadSurahNames = async () => {
      try {
        const response = await fetch("https://api.quran.com/api/v4/chapters");
        if (response.ok) {
          const data = await response.json();
          const names: { [key: number]: string } = {};
          data.chapters.forEach((chapter: any) => {
            names[chapter.id] = chapter.name_simple;
          });
          setSurahNames(names);
        }
      } catch (error) {
        console.error("Failed to load surah names:", error);
      }
    };

    loadSurahNames();
  }, []);

  const handleSurahSelect = (number: number) => {
    setSelectedSurah(number);
    setSheetOpen(false);
  };

  const goToNextSurah = () => {
    if (selectedSurah < 114) {
      setSelectedSurah(selectedSurah + 1);
    }
  };

  const goToPreviousSurah = () => {
    if (selectedSurah > 1) {
      setSelectedSurah(selectedSurah - 1);
    }
  };

  return (
    <div className="flex flex-1 overflow-hidden bg-background">
      {/* Desktop Surah List Sidebar - Only visible on large screens */}
      <aside className="w-[300px] border-r bg-card hidden lg:block">
        <SurahList onSelect={handleSurahSelect} selectedSurah={selectedSurah} />
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="p-4 border-b bg-card flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {/* Mobile/Tablet Surah List Trigger */}
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="lg:hidden flex-none"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] p-0">
                <SurahList
                  onSelect={handleSurahSelect}
                  selectedSurah={selectedSurah}
                />
              </SheetContent>
            </Sheet>

            {/* Current Surah Name */}
            <div className="text-lg font-medium hidden sm:block">
              {surahNames[selectedSurah]
                ? `${selectedSurah}. ${surahNames[selectedSurah]}`
                : `Surah ${selectedSurah}`}
            </div>
          </div>

          {/* Translation Toggle */}
          <Tabs
            value={translation}
            onValueChange={(value) => setTranslation(value as "en" | "bn")}
            className="w-full max-w-[400px] mx-auto"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="en">English</TabsTrigger>
              <TabsTrigger value="bn" className="font-bangla">
                বাংলা
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Navigation Buttons */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end mt-2 sm:mt-0">
            <Button
              variant="outline"
              size="icon"
              onClick={goToPreviousSurah}
              disabled={selectedSurah <= 1}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={goToNextSurah}
              disabled={selectedSurah >= 114}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <ScrollArea className="flex-1">
          <TafsirView surahNumber={selectedSurah} translation={translation} />
        </ScrollArea>
      </main>
    </div>
  );
};

export default TafsirPage;
