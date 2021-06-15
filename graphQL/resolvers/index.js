const mockdata = [
  {
    id: "1",
    image: "http:path2img1.png",
    title: "book1 title",
    author: "author1",
    genre: "health",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Et, molestiae. Optio voluptates nemo ipsam autem!",
  },
  {
    id: "2",
    image: "http:path2img2.png",
    title: "book2 title",
    author: "author2",
    genre: "comedy",
    rating: 3.2,
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Et, molestiae. Optio voluptates nemo ipsam autem!",
  },
];

const resolvers = {
  Query: {
    books: () => mockdata,
    book: (_, { id }) => {
      const bookReturn = mockdata.find((book) => book.id === id);
      return bookReturn;
    },
  },

  Mutation: {
    register: async (_, { input }, { userCollection }) => {
      try {
        const newUser = new userCollection({
          email: input.email,
          password: input.password,
        });
        await newUser.save();
        return true;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};

module.exports = resolvers;
