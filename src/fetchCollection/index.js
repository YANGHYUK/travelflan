export const fetchAlbumData = () => {
  return fetch("https://jsonplaceholder.typicode.com/albums")
    .then(response => response.json())
    .then(res => {
      return res;
    });
};
