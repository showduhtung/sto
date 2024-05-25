import { useState } from "react";
import { Button } from "./components/ui/button";

function App() {
  const [_count, _setCount] = useState(0);

  return (
    <div className="px-4 flex flex-col gap-8 bg-red-200">
      <p className="font-light lowercase text-red-300 text-[60px]">Service Presentation</p>
      <Button variant="default" className="bg-primary">
        This is a button
      </Button>
    </div>
  );
}

export default App;
