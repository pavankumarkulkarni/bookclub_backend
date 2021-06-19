const bookResolvers = {
  Query: {
    books: () => mockdata,
    book: (_, { id }) => {
      const bookReturn = mockdata.find((book) => book.id === id);
      return bookReturn;
    },
  },
  Mutation: {
    createBook: async (
      _,
      { input },
      { bookCollection, userCollection, me, authorCollection }
    ) => {
      try {
        if (!me) {
          throw new Error("Login to create book");
        }
        const { image, title, authorID, genre, description } = input;
        const authorInDB = await authorCollection.findById(authorID);
        if (!authorInDB) {
          throw new Error("Author not found. Add author before creating book!");
        }
        const bookSaved = new bookCollection({
          image,
          title,
          authorID,
          genre,
          description,
        });
        const bookInDB = await bookSaved.save();
        const userUpdated = await userCollection.findOneAndUpdate(
          { _id: me.id },
          { $push: { booksOwned: { bookID: bookInDB._id, available: true } } }
        );
        return bookInDB;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};

module.exports = bookResolvers;
