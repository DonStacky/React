export const readFile = (file: File): Promise<string> => {
  return new Promise<string>(function (resolve, reject) {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = function () {
      resolve(reader.result?.toString() || '');
    };

    reader.onerror = (error) => reject(error);
  });
};
