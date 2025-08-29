# Book Explorer

A React web app to search books via the Google Books API, view details, and manage favorite books.

## Features

- Multi-field book search: title, author, genre/keyword
- Responsive displays and accessible navigation
- Book details with lazy loading for performance
- Favorites management using React Context API
- Routing with React Router
- Form validation and error messages
- Memoization and code-splitting for speed

## Setup

1. `git clone https://github.com/naimish611/Coding-Challenge`
2. `cd Coding-Challenge`
3. `npm install`
4. `npm start`



## Structure

- **components/** UI logic
- **context/** global state
- **api/** API integration

## Performance

- Uses `React.memo` and `useMemo` to reduce renders
- Book details page is lazily loaded (`React.lazy`/`Suspense`)
- Details in code comments

## Approach

- Routing via React Router
- Controlled form logic for search and favorites
- Context API for state
- Tradeoff: avoided Redux for simplicity

---

Project by [Your Name]. For questions, see discussions or issues.
