
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import SurahList from "@/components/surah/SurahList";
import SurahView from "@/components/surah/SurahView";
import { useState } from "react";

const SurahPage = () => {
  // Set initial surah to 1 (Al-Fatiha)
  const [selectedSurah, setSelectedSurah] = useState<number>(1);
  const [translation, setTranslation] = useState<"en" | "bn">("en");
  const [sheetOpen, setSheetOpen] = useState(false);

  const handleSurahSelect = (number: number) => {
    setSelectedSurah(number);
    setSheetOpen(false);
  };

  return (
    <div className="flex flex-1 overflow-hidden bg-background">
      {/* Desktop Surah List Sidebar - Only visible on large screens */}
      <aside className="w-[300px] border-r bg-card hidden lg:block">
        <SurahList onSelect={handleSurahSelect} selectedSurah={selectedSurah} />
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="p-4 border-b bg-card flex items-center justify-between gap-4">
          {/* Mobile/Tablet Surah List Trigger */}
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="lg:hidden flex-none rounded-full"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] p-0">
              <SurahList
                onSelect={handleSurahSelect}
                selectedSurah={selectedSurah}
              />
            </SheetContent>
          </Sheet>

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
        </div>

        <ScrollArea className="flex-1">
          <SurahView surahNumber={selectedSurah} translation={translation} />
        </ScrollArea>
      </main>
    </div>
  );
};

export default SurahPage;
