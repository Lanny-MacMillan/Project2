# Project2
# The Amiibo CRUD App

# Currently single user login
# https://desolate-lowlands-27999.herokuapp.com/
# login: admin@gmail.com    PW: admin123


# =============================DESCRIPTION=============================
# Basic CRUD app with single user login feature.
# App designed for Amiibo Collectors, it helps catagorize collections with fields from: name, series, description, condition, price, purchasedFrom, compatibleGames, and gameFunction. There isnt currently any apps that will show you what your ammibos games or game functions are, you must log on a site and search your amiibo. This app will be a direct link between the collection and what they are capable of.


# ==============================APPROACH================================
# Wanted to make an APP i might work on after GA and be excited about. Also wanted an APP that actually shows what Amiibos do as ive never been able to find one, which is odd in 202. I started with a simple minimum CRUD app, i slowly added more pages and content as needed.


# ==========================UNSOLVED PROBLEMS===========================
# 1) I was able to put a confirmation modal for edit delete and new. Delete works fine but the edit and new modal will take the form without required fields and i couldnt figure out how to get the modal to recognize the required fields. Results in empty fields in the DB.
# 2) Need multi user login not just single user
# 3) IMG upload is set in schema as a string and form asks for URL (jpg and jpeg work best with sizing so i tried to specify). Would love to add an img using MULTER or with phone camera
# 4) My news page with common questions and problems of amiibos as well as their live news page, wont size any smaller than i have it for mobile media queries, may be a Boostrap css issue i have to overwrite, im not sure yet


# =================================FUTURE===============================
# 1) Would love to connect an Amiibo API i found online to search for Amiibos collector doesnt currently have or maybe make a wishlist. Might be able to add Amiibo by name and have fields auto fill from the online API database
# 2) Would like to add an img using MULTER or with phone camera
# 3) Multi User Login needed 
# 4) Sort or filter feature
# 5) View page feature so you can change view from columns, rows or list style. whatever the user wants
# 6) Maybe edit form has prepolutaed DB data so you can change what you want and leave the rest


