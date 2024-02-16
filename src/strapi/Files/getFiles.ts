import { toast } from "@/components/ui/use-toast";
import { fileProp } from "@/lib/types/fileProp";

export async function getFiles(url: string | null): Promise<fileProp[] | null> {
  if (url !== null) {
    try {
      const res = await fetch(url.toString());

      if (!res.ok) {
        toast({
          title: "Cann't Find Your Files",
          variant: "destructive",
          description: "The content you are looking for is not available",
        });
        throw new Error("Failed to fetch data");
      }

      const jsonData = await res.json();

      return jsonData; // Assuming you're expecting a single result
    } catch (error) {
      toast({
        title: "Cann't Find Your Files",
        variant: "destructive",
        description: "The content you are looking for is not available",
      });

      return null;
    }
  } else {
    console.log("NULL URL :+ ");
    return null;
  }
}
