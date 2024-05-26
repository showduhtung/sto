import { Settings } from "lucide-react";
import { Button } from "./components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./components/ui/tabs";

function App() {
  return (
    <div className="px-6 py-4 flex flex-col h-screen gap-2">
      <Header />

      <div className="flex gap-4 items-stretch grow rounded-sm border border-primary px-4 py-2">
        <Tabs className="flex-[1.3] flex flex-col" defaultValue="hymnal_worship">
          <TabsList>
            <TabsTrigger value="hymnal_worship">Hymnal Worship</TabsTrigger>
            <TabsTrigger value="sermon_hymns">Sermon Hymns</TabsTrigger>
            <TabsTrigger value="bible">Bible</TabsTrigger>
            <TabsTrigger value="slides">Slides</TabsTrigger>
          </TabsList>
          <TabsContent value="hymnal_worship">Hymnal Worship</TabsContent>
          <TabsContent value="sermon_hymns">Sermon Hymns</TabsContent>
          <TabsContent value="bible">Bible</TabsContent>
          <TabsContent value="slides">Slides</TabsContent>
        </Tabs>
        <div className="flex-[0.7] bg-red-200">Sermon title box</div>
      </div>
      <div className="h-9">
        <Button variant="outline" size="sm" disabled>
          Turn off
        </Button>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="flex justify-between items-center">
      <img src="./logo.png" className="h-9" />
      <div className="flex gap-2 items-center">
        <Button variant="ghost" size="sm">
          Select a tutorial
        </Button>
        <Button variant="ghost" className="flex gap-2 text-primary" size="sm">
          <Settings width="18" height="18" />
          Settings
        </Button>
      </div>
    </div>
  );
}

export default App;
