import { useCallback } from "react";
import { STACK_ICONS } from "../data/stack-icons.data";
import type { StackIcon } from "../models/stack-icon";

export const useGetIcon = () => {
  const getIcon = useCallback((name: string): StackIcon | undefined => {
    if (!name) return undefined;
    const normalized = name.toLowerCase().replace(/[^a-z0-9]/g, "");
    return STACK_ICONS.find(
      (icon) =>
        icon.name.toLowerCase() === name.toLowerCase() ||
        icon.name.toLowerCase().replace(/[^a-z0-9]/g, "") === normalized
    );
  }, []);

  return { getIcon, icons: STACK_ICONS };
};

export default useGetIcon;
