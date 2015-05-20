import webapp2
import logging
import json
import cgi
from google.appengine.api import mail
from google.appengine.api import users

class AdminSignIn(webapp2.RequestHandler):
    def get(self):
        user = users.get_current_user()
        if user:
            greeting = ('Welcome, %s! (<a href="%s">sign out</a>)' %
                        (user.nickname(), users.create_logout_url('/')))
        else:
            webapp2.redirect(users.create_login_url())


app = webapp2.WSGIApplication([
    ('/admin_sign_in', AdminSignIn)
], debug=True)