import webapp2
import logging
import json
import cgi
from google.appengine.api import mail
from google.appengine.api import users
from ..models import Vendor

class VendorEmail(webapp2.RequestHandler):
    def post(self):
        data = json.loads(self.request.body)
        try:
            email = data['email'].lower()
            logging.info(data)

            email_query = Vendor.query(Vendor.vendor_email == email)

            if not email_query.get():
                self.error(404)

            else:
                data = email_query.get().to_dict()
                del data['date']
                del data['vendor_dict']
                del data['vendor_hash']
                self.response.headers['Content-Type'] = 'application/json'
                self.response.out.write(json.dumps(data))


        except KeyError:
            self.error(404)

app = webapp2.WSGIApplication([
    ('/vendor_email', VendorEmail)
], debug=True)