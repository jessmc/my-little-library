// Raw shape returned by the Google Books API (volumes.list / volumes.get).
// Mirrors the real response so mistakes reading it get caught by TypeScript,
// rather than the shape we've already reshaped for our own use.
export type GoogleBooksVolume = {
  id: string;
  volumeInfo: {
    title: string;
    subtitle?: string;
    authors?: string[];
    description?: string;
    publishedDate?: string;
    pageCount?: number;
    categories?: string[];
    averageRating?: number;
    ratingsCount?: number;
    industryIdentifiers?: {
      type: string;
      identifier: string;
    }[];
    imageLinks?: {
      smallThumbnail?: string;
      thumbnail?: string;
    };
  };
};

export type LibraryBookStatus = "want_to_read" | "reading" | "read";

// A book once a user has added it to their own library. Denormalized from
// GoogleBooksVolume at add-time (see project memory: book metadata is a
// one-time snapshot, not kept in sync automatically). userId scopes the row
// to its owner; googleBooksId is kept only as a reference back to the
// source (e.g. to avoid duplicate adds, or a future manual "refresh" action)
// and should never be used to re-derive fields that belong to the user.
export type LibraryBook = {
  id: string;
  userId: string;
  googleBooksId: string;

  title: string;
  authors: string[];
  description?: string;
  thumbnail?: string;
  isbn?: string;
  categories?: string[];

  googleAverageRating?: number;
  googleRatingsCount?: number;

  status: LibraryBookStatus;
  rating?: 1 | 2 | 3 | 4 | 5;
  notes?: string;
  dateAdded: string;
};
