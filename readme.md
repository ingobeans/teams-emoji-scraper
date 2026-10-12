## Microsoft Teams Emoji Scraper

Hiiii !! I really like the :oreoyum: and :emo: emojis from Microsoft Teams but I couldn't find anywhere to download them online so I made this!

Everything happens locally on your device, there's not even a backend attached since Microsoft for some reason allows cross-origin requests for their emoji assets which is cool.

Uses a fork I made of <a href="https://github.com/ingobeans/gif.js">gif.js</a> to compile the emoji spritesheets into .gif. My fork simply adds support for transparency thresholds to fix broken looking alpha.

## Development

To run for yourself, you only need to serve the repository root with some http server.

The reason why you can't just open the `index.html` file directly is that it uses Javascript workers, which browsers reject if loaded locally.

Steps:
* `git clone https://github.com/ingobeans/teams-emoji-scraper.git`
* `cd teams-emoji-scraper`
* Serve with some sort of http server, like for instance: `basic-http-server .` or `http-server .`
* View the served page!

---
<sup>No AI <3</sup>