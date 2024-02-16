import { fileProp } from "@/lib/types/fileProp";

export const handleDownload = async (filesInfo: fileProp[] | null) => {
  // Check if there are files to download
  if (filesInfo !== null) {
    // Create an array to store Promises of file downloads
    const downloadPromises: Promise<void>[] = [];

    // Loop through the files and add download promises to the array
    filesInfo.forEach((file) => {
      const downloadPromise = fetch(file.url)
        .then((response) => response.blob())
        .then((blob) => {
          // Create a temporary anchor element to trigger the download
          const downloadLink = document.createElement("a");
          downloadLink.href = URL.createObjectURL(blob);
          downloadLink.download = file.name;
          downloadLink.click();
          URL.revokeObjectURL(downloadLink.href);
        });

      downloadPromises.push(downloadPromise);
    });

    // Execute all the download promises
    await Promise.all(downloadPromises);
  }
};
