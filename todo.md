# INFO

indexedDB is only for persistence, the source of truth is in lyra
(except when there is no search query, because we can't `SELECT *` from lyra)

# FIXME

[ ] build-time articles insertion

- postbuild
- remove the skeletons
- what about the filters and the first load?

[ ] inject the featured articles in the documnet at publish/build time
==> SSG without pushing to the src repo :tada:

[ ] proof it so it doesn't crash

- give default values to any field of the documents (or cancel the insert)

# TODO

[ ] cleanup CSS (for instance "article rules" are all over the places and some rules like article > .article-content position relative are not useful anymore)
[ ] sticky un article de presentation en premier (what's what + whos's who + how it works around here)
avec un petit border "recommmended"
[ ] lang needs to be removed from the tags
[ ] skill level should be its own fields and not a tag

## SWR

[ ] fallback for missing thumbnails
https://stackoverflow.com/questions/22051573/how-to-hide-image-broken-icon-using-only-css-html
[ ] add emergency shortcut to clear idb-keyval
[ ] find a way to not re-fetch and re-parse the DB each time (maybe using the db.sha256 file, idb-keyvalue, SWR etc...)
==> don't forget about the case where we delete an article!
[ ] implement the replacing of already instatiated (in lyra and in document)
https://developer.mozilla.org/en-US/docs/Web/API/Element/replaceWith
[ ] move the kinda "serdes-heavy" SWR code to a web worker
https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers

## Misc.

[ ] refactor the sync of the UI filters and state of the mobile menu, there gotta be a way to make this better (although it has the merit of being kind of easy to understand)
=> reactive programming? A state object with a onchange function?
[ ] refactor with modules (everything would be singleton or static if it was class based anyway)
[ ] run checks on the DB to make sure to touch garbage at runtime
[ ] everything is fetched at runtime, ergo it sucks for the SEO
=> remove the skeletons and generate a new index.html on push via github action
=> let them be the hero-introduction and the favorites
[ ] add the author(s) name to the articles.
[ ] handle multi author (can't use space as a separator, there is one already in between the name and firstname)
https://sharp.pixelplumbing.com/api-output#gif

[ ] reviser les cards au formats mobile
[ ] faire un light mode (avec un boutton pour switch)
[ ] gerer le chevauchement titre/image pour le theme clair
https://css-tricks.com/reverse-text-color-mix-blend-mode/
https://stackoverflow.com/questions/16981763/invert-css-font-color-depending-on-background-color

[ ] ajouter une "cloche" pour envoyer des notifications
[ ] animate header - https://css-tricks.com/styling-based-on-scroll-position/ - https://css-tricks.com/books/greatest-css-tricks/scroll-animation/
[ ] the ressources are evergreen, let's not use or maybe even have "last_update" fields, I don't want them to search by "newest" and think any resource older than a year to look obsolete

[ ] the chunkening
[ ] loading toast in the bottom right when heavily sync-ing the DB and cache
[ ] upgrade lyra to 0.4.0
https://docs.lyrasearch.io/migration-guide/breaking-changes/

[ ] pti' frontend pour push des ajout avec isomorphic-git + github action?
=> browser: check if the new doc is not garbage => fetch fresh DB => check if the ID doesn't already exist => update fresh DB => iso-git push the DB submodule
=> github action: into cheerio + sharp to re-seize the images
https://thenewstack.io/how-to-trigger-github-actions-on-submodule-updates/
=> but ... lmao, I don't even need to rebuild the website on DB change.
because the website pulls the DB at runtime
maybe I should just do it at build time??? No, the main idea is

1. first page load
2. fetch DB
3. continually parse DB and insert as we scroll
   It's to keep the page reactive

I could statically bake the DB inside of the webpage but it would be one long-ass page to send.
