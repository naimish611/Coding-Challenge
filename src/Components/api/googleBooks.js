const BASE_URL = 'https://www.googleapis.com/books/v1/volumes';

export async function searchBooks({ title, author, genre }) {
  let q = [];
  if (title) q.push(`intitle:${title}`);
  if (author) q.push(`inauthor:${author}`);
  if (genre) q.push(genre);
  const url = `${BASE_URL}?q=${q.join('+')}&maxResults=20`;

  const res = await fetch(url);
  const data = await res.json();
  return data.items || [];
}

export async function fetchBookById(id) {
  const res = await fetch(`${BASE_URL}/${id}`);
  return await res.json();
}
