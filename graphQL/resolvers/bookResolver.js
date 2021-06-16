const bookResolvers = {
  Query: {
    books: () => mockdata,
    book: (_, { id }) => {
      const bookReturn = mockdata.find((book) => book.id === id);
      return bookReturn;
    },
  },
};

module.exports = bookResolvers;
