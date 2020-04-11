WiredScrape
Purpose:

Using Cheerio create an application to scrape a news source. Display the articles and allow the user to add/view comments.
Description

The WiredScrape application will automatically scrape https://www.wired.com/most-popular/ website. The scraped articles will be displayed in cards. The user can save selected cards by clicking on the "+" icon. By navigating to the 'Saved Articles' page, the user can then view the the save articles.

On the Saved Articles page:

    The user can view the notes associated with the selected article by clicking on the note icon. Any notes associated with the article will be displayed in a modal. The user may delete a note or add a new note.
    The user can delete an article by clicking on the trash icon. Deleting an article will delete all associated article notes.
    If the article already exists in the database, the app will not store another entry into the database and display an alert that the article already exists in the database.

When adding/deleting an article or note, the app will display an alert. The alert will display for 2 seconds or can be manually dismissed by the user.

Link to app deployed on Heroku: boiling-fortress-69679
Tools

NPM Libraries

    express
    body-parser
    mongoose
    express-handlebars
    cheerio
    axios - used instead of request

Frameworks

    Bootstrap
