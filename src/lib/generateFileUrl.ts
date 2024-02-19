export const generateFileLink = (fileIds: number[]) => {
  const url = process.env.NEXT_PUBLIC_STRAPI_URL;

  const queryParams = fileIds.map((id, index) => `filters[id][$in][${index}]=${id}`).join("&");
  return `${url}/api/upload/files?${queryParams}`;
};
