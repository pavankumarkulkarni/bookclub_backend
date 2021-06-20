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
          { $push: { booksOwned: { bookID: bookInDB._id, available: true } } },
          { new: true }
        );
        return bookInDB;
      } catch (err) {
        throw new Error(err);
      }
    },

    reviewBook: async (
      _,
      { input },
      { bookCollection, userCollection, me }
    ) => {
      try {
        if (!me) {
          throw new Error("Login to review book!");
        }
        const { bookID, comment, rating } = input;
        const bookInDB = await bookCollection.findById(bookID);
        if (!bookInDB) {
          throw new Error("Book not found!");
        }
        const currRating = bookInDB.rating ? bookInDB.rating : 0;
        const currReviewsCount = bookInDB.reviews.length;
        const newRating =
          Math.round(
            ((currRating * currReviewsCount + rating) /
              (currReviewsCount + 1)) *
              10
          ) / 10;

        const bookUpdated = await bookCollection.findOneAndUpdate(
          { _id: bookID },
          {
            $set: { rating: newRating },
            $push: {
              reviews: { userID: me.id, comment: comment, rating: rating },
            },
          },
          { new: true }
        );
        return bookUpdated;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};

module.exports = bookResolvers;
