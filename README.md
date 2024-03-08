# single-spa app with vuetify 1x app and vuetify 3x app

Here's a sample app with vuetify 1.x and 3.x conflicting.
App 2 (vuetify 3.x) styles are wrong if you access app 2 after accessing app 1 (Vuetify 1.x). 
If App 2 (vuetify 3.x) is accessed directly or after refresh it looks good.
Conclusion, is that vuetify 1.x is conflicting with vuetify 3.x.

Code
https://github.com/eolamisan/vuetify1x-vuetify3x

App 1 (vuetify 1.x)
http://localhost:11443/#/app1

App 2 (vuetify 3.x)
http://localhost:11443/#/app2

In the file packages\root\src\bootstrap.js  I played around with enabling / disabling stylesheets dynamically between apps. 
It seems to help but I wonder what the issue is and if there is something better that can be done.