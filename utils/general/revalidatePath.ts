import { revalidatePath } from "next/cache";

// CAUSES AN AUTOMATIC UPDATE OF DATA FROM THE BACKEND WITHOUT REFRESHING THE PAGE
export const clearCachesByServerAction = async (path?: string) => {
  try {
    if (path) {
      revalidatePath(path);
    }
  } catch (error: any) {
    console.error("clearCachesByServerAction=> ", error.message);
  }
};
