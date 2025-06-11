import { useState } from "react";

export const useReactDraggable = () => {
  /* STATE */

  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0
  });

  /* HANDLER */

  const onStart = (event: MouseEvent, uiData: any) => {
    const { clientWidth, clientHeight } = window?.document?.documentElement;
    const targetRect = (event.target as HTMLElement).getBoundingClientRect();

    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y)
    });
  };
  return {
    bounds,
    setBounds,
    onStart
  };
};
