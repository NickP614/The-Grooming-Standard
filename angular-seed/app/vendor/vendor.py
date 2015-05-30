import webapp2
import logging
import json
import cgi
from ..models import Vendor
from google.appengine.api import mail

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
            self.error(404)


        #self.response.headers['Content-Type'] = 'application/json'
        #self.response.out.write(json.dumps(data))

class VendorInfo(webapp2.RequestHandler):
    def post(self):
        vendor_data = json.loads(self.request.body)

        email_query = Vendor.query(Vendor.vendor_email == cgi.escape(vendor_data[4][1]).lower())

        if email_query.get():
            email_query = email_query.get()
            email_query.vendor_name = cgi.escape(vendor_data[0][1])
            email_query.vendor_address = cgi.escape(vendor_data[1][1])
            email_query.vendor_phone = vendor_data[2][1]
            email_query.vendor_contact = cgi.escape(vendor_data[3][1])
            email_query.vendor_website = cgi.escape(vendor_data[5][1])

            email_query.put()
        else:
            vendor = Vendor()
            vendor.vendor_email = cgi.escape(vendor_data[4][1]).lower()
            vendor.vendor_name = cgi.escape(vendor_data[0][1])
            vendor.vendor_address = cgi.escape(vendor_data[1][1])
            vendor.vendor_phone = vendor_data[2][1]
            vendor.vendor_contact = cgi.escape(vendor_data[3][1])
            vendor.vendor_website = cgi.escape(vendor_data[5][1])

            vendor.put()

        subject = "TGS vendor request from " + cgi.escape(vendor_data[1][1])

        body = "Vendor info \n \n" \
               "Email: " + cgi.escape(vendor_data[4][1]).lower() + "\n \
            Barber shop: " + cgi.escape(vendor_data[0][1]) + "\n \
            Address: " + cgi.escape(vendor_data[1][1]) + "\n \
            Phone: " + str(vendor_data[2][1]) + "\n \
            Contact: " + cgi.escape(vendor_data[3][1]) + "\n \
            Website: " + cgi.escape(vendor_data[5][1]) + "\n \n" \
            + "Click this link to complete the vendor survey for this shop \n \
            grooming-standard-dev.appspot.com/#/admin?email=" + cgi.escape(vendor_data[4][1]).lower()

        mail.send_mail('thegroomingstandard@gmail.com', 'thegroomingstandard@gmail.com', subject, body)


        #self.response.headers['Content-Type'] = 'application/json'
        #self.response.out.write(json.dumps(data))

app = webapp2.WSGIApplication([
    ('/submit_vendor', SubmitVendor),
    ('/vendor_info', VendorInfo)
], debug=True)