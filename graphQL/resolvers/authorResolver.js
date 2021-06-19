const authorResolvers = {
  Mutation: {
    addAuthor: async (_, { input }, { me, authorCollection }) => {
      try {
        if (!me) {
          throw new Error("Login to add Author");
        }
        const author = new authorCollection({
          name: input.name,
          accolades: input.accolades,
        });
        const authorSaved = await author.save();
        return authorSaved;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};

module.exports = authorResolvers;
