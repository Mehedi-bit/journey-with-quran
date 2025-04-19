import { Maximize } from "lucide-react";
import  { useState } from "react";

const FullscreenButton = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      // Go fullscreen
      const elem = document.documentElement;
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if ((elem as any).webkitRequestFullscreen) { /* Safari */
        (elem as any).webkitRequestFullscreen();
      } else if ((elem as any).msRequestFullscreen) { /* IE11 */
        (elem as any).msRequestFullscreen();
      }
    } else {
      // Exit fullscreen
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) { /* Safari */
        (document as any).webkitExitFullscreen();
      } else if ((document as any).msExitFullscreen) { /* IE11 */
        (document as any).msExitFullscreen();
      }
    }

    setIsFullscreen(!isFullscreen);
  };

  return (
    // <button onClick={toggleFullscreen} className="p-2 bg-blue-500 text-white rounded">
    //   {isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
    // </button>

    <Maximize onClick={toggleFullscreen} size={20} className="cursor-pointer mr-10" />

  );
};

export default FullscreenButton;
