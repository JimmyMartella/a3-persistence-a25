Assignment Three - Persistence: Two-tier Web Application with Database, Express server, and CSS template
===

## Game Review Site

Jimmy Martella
Sample Account: Username: "Example" | Password: "example"
https://a3-jimmymartella.onrender.com/


This is a video game review website where you can both write about games and rate specific elements on a one-to-ten scale.

I ended up finding this assignment far more challenging than I expected, but much of that had to due with very basic oversights on my part. For example, I struggled a lot with getting the server and MongoDB database working, and at first it was just some difficulty in understanding how to set it up in the first place, but as time went on I began to run into more and more issues where it turned out the issue was something extremely simple like that I had made a typo or I hadn't setup the IP address properly. This also happened when trying to add editing and logging in, things I expected to be simple, that ultimately were.
However, the real issue was how I handled it. Whenever a problem would arise, instead of just working backwards to see where the problem was coming from, I frequently ended up convincing myself that it was the implementation itself that was the problem and that I had to rework it entirely. That's not to say that I had no implementation based issues (eventually figuring out that put made more sense as a request type for edit call for example), but much of it was as simple of as a typo or forgetting to await an asynchronis call.
Eventually I took a step back and realised that this process of constant reworking simply was not working and that I had to go back to what I had at the start and work from there, which did unfortunatley lose me a lot of progress and time but thankfully I remembered how to program like an adult and approach each problem at the source and logging backwards, a strategy that, surprise surprise, proved way more effective.
All that's to say that, despite being a bit of mess over the past few days, I've mostly pulled myself together now.

For authentication, I went with the simple login/registration with a username and password primarily because I thought I already understood how to do it (and contrary to the exaggerated trouble I had, it ended up being about as straightforward as I initially expected).

Given that it's a game review site, it actually did seem appropriate to go with the NES style as my CSS framework, which, with some slight modifications to the colour scheme, ended up fitting quite nicely over the base I already had from Assignment Two.

As far as middleware, I didn't end up doing anything too extravagent:
- express.static: For serving the HTML, CSS, and JavaScript files to the server.
- express-session: For serving the user-specific data stored by MongoDB within a corresponding session to the server.
- authorise(): Very basic check to verify if there is a user logged in, used for server requests tied to account data (submit, reviews, edit, delete).

## Technical Achievements:
- **Separate Login and Registration**: Instead of a new account being automatically created if the login isn't recognised, I separated the login and registration into two separate pages.

- **Perfect Lighthouse Score**: I achieved a score of 100 in every Lighthouse category. My original design was fairly conducive to this, only ultimately having to change a few small things like adding more clear meta tags and slightly adjusting the colour scheme.

![alt text](<Lighthouse Perfect Score (Example One).png>)
![alt text](<Lighthouse Perfect Score (Example Two).png>)
