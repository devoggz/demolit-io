import { HeaderSetting } from "@/types/header-setting";
import { unstable_cache } from "next/cache";
import { localDB } from "@/app/lib/local-db/client";

// Get all header settings
export const getHeaderSettings = unstable_cache(
    async (): Promise<HeaderSetting | null> => {
        const headerSetting = await localDB.headerSetting.findFirst();
        return headerSetting as HeaderSetting;
    },
    ["header-setting"],
    { tags: ["header-setting"] }
);