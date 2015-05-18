import webapp2
import logging
import json
import cgi
from ..models import Vendor

class SubmitVendor(webapp2.RequestHandler):
    def post(self):
        data = json.loads(self.request.body)
        email = data['email'].lower()
        questions = data['questions']

        email_query = Vendor.query(Vendor.vendor_email == email)

        if email_query.get():
            email_query = email_query.get()
            email_query.vendor_dict = questions
            email_query.put()
            logging.info(email_query.vendor_dict)
        else:
            vendor = Vendor()
            vendor.vendor_dict = questions
            vendor.vendor_email = email
            vendor.put()
            logging.info(vendor.vendor_dict)


        #self.response.headers['Content-Type'] = 'application/json'
        #self.response.out.write(json.dumps(data))

app = webapp2.WSGIApplication([
    ('/submit_vendor', SubmitVendor),
], debug=True)