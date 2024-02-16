import { toast } from "@/components/ui/use-toast";
import { filesDataProp } from "@/lib/types/fileDataProp";

export async function getFilesData(customurl: string): Promise<filesDataProp | null> {
  try {
    const url = process.env.NEXT_PUBLIC_STRAPI_URL;
    const res = await fetch(`${url}/api/dhk-files?filters[url][$eq]=${customurl}`);

    if (!res.ok) {
      toast({
        title: "Cann't Find Your Files",
        variant: "destructive",
        description: "The content you are looking for is not available",
      });
      throw new Error("Failed to fetch data");
    }

    const jsonData = await res.json();
    return jsonData.data[0]; // Assuming you're expecting a single result
  } catch (error) {
    toast({
      title: "Cann't Find Your Files",
      variant: "destructive",
      description: "The content you are looking for is not available",
    });

    return null;
  }
}
