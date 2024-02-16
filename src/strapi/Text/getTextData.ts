import { toast } from "@/components/ui/use-toast";
import { textProps } from "@/lib/types/textProp";

export async function getData(customurl: string): Promise<textProps | null> {
  const url = process.env.NEXT_PUBLIC_STRAPI_URL;
  try {
    const res = await fetch(`${url}/api/rich-texts?filters[url][$eq]=${customurl}`, {
      cache: "no-cache",
    });

    if (!res.ok) {
      toast({
        title: "Cann't Find Your Text",
        variant: "destructive",
        description: "The content you are looking for is not available",
      });
      throw new Error("Failed to fetch data");
    }

    const jsonData = await res.json();
    return jsonData.data[0]; // Assuming you're expecting a single result
  } catch (error) {
    toast({
      title: "Cann't Find Your Text",
      variant: "destructive",
      description: "The content you are looking for is not available",
    });

    return null;
  }
}
