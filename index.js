const { program } = require("commander");
const fs = require("fs/promises");
const chalk = require("chalk");
const QUOTE_FILE = "quotes.txt";

program
  .name("quotes")
  .description("CLI tool for inspiration")
  .version("0.1.0");

program
  .command("getQuote")
  .description("Retrieves a random quote")
  .action(async () => {
    try{
      // TODO: Pull a random quote from the quotes.txt file
      const data = await fs.readFile(QUOTE_FILE, 'utf-8')
      const quotes = data
        .split('\n')
        .filter(line=>line.trim().length> 0)

      const quoteIndex = Math.floor(Math.random()* quotes.length)
      const [justQuote, authorName = 'Anonymous'] = quotes[quoteIndex].split('|').map(str=>str.trim())

      // console log the quote and author
      console.log(`${chalk.blue.bold(justQuote)} ${chalk.italic.bold.red(authorName)}`)
    }
    catch(err){
      console.log(err.message)
    }
   
  });

program
  .command("addQuote <quote> [author]")
  .description("adds a quote to the quote file")
  .action(async (quote, author) => {
    // TODO: Add the quote and author to the quotes.txt file
    try{
      // If no author is provided,
      // save the author as "Anonymous".
      if(!author){
        author = 'Anonymous'
      }
      const newQuote = `${quote} | ${author}\n`

      // After the quote/author is saved,
      // alert the user that the quote was added.
      await fs.appendFile(QUOTE_FILE, newQuote, 'utf-8')
      console.log(`${chalk.green.bold('Quote added successfully!')}`)
    }
    catch(err){
      console.log(err.message)
    }
  });

program.parse();
