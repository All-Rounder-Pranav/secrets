const DB =
  "mongodb+srv://pranavart2:pranavblog@cluster0.1jv3hvu.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("connection successful ");
  })
  .catch((err) => console.log("no connection"));


mongoose.connect('mongodb://127.0.0.1/test')