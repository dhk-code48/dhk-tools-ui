export const generateFileLink = (fileIds: number[]) => {
  const queryParams = fileIds
    .map((id, index) => `filters[id][$in][${index}]=${id}`)
    .join("&");
  return `http://192.168.18.87:1337/api/upload/files?${queryParams}`;
};
