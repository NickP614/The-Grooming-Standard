from google.appengine.ext import ndb


class Survey(ndb.Model):
    survey_dict = ndb.PickleProperty()
    survey_ip = ndb.StringProperty()
    survey_email = ndb.StringProperty()
    survey_hash = ndb.StringProperty()
    shop_rankings = ndb.PickleProperty()
    shop_rankings_email = ndb.StringProperty(repeated=True)
    selected_shop = ndb.PickleProperty()
    selected_shop_email = ndb.StringProperty()
    date = ndb.DateTimeProperty(auto_now_add=True)

class Vendor(ndb.Model):
    vendor_dict = ndb.PickleProperty()
    vendor_email = ndb.StringProperty()
    vendor_hash = ndb.StringProperty()
    vendor_name = ndb.StringProperty()
    vendor_address = ndb.StringProperty()
    vendor_phone = ndb.StringProperty()
    vendor_contact = ndb.StringProperty()
    vendor_website = ndb.StringProperty()
    date = ndb.DateTimeProperty(auto_now_add=True)
