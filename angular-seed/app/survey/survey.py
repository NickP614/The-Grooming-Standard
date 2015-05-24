import webapp2
import logging
import json
import cgi
from ..models import Survey
from ..models import Vendor

class SubmitSurvey(webapp2.RequestHandler):
    def post(self):
        data = json.loads(self.request.body)
        email = data['email'].lower()
        questions = data['questions']
        user_ip = str(self.request.remote_addr)

        if email:
            email_query = Survey.query(Survey.survey_email == email)
        ip_query = Survey.query(Survey.survey_ip == user_ip)
        if email and email_query.get():
            email_query = email_query.get()
            email_query.survey_dict = questions
            email_query.survey_ip = user_ip
            email_query.put()
            logging.info(email_query.survey_dict)
        elif ip_query.get():
            ip_query = ip_query.get()
            ip_query.survey_dict = questions
            if email:
                ip_query.survey_email = email
            ip_query.put()
            logging.info(ip_query.survey_dict)
        else:
            survey = Survey()
            survey.survey_dict = questions
            survey.survey_ip = user_ip
            if email:
                survey.survey_email = email
            survey.put()
            logging.info(survey.survey_dict)


        #self.response.headers['Content-Type'] = 'application/json'
        #self.response.out.write(json.dumps(data))

class FindMatches(webapp2.RequestHandler):
    def post(self):
        data = json.loads(self.request.body)
        questions = data['questions']

        return_shops = []

        match_query = Vendor.query()

        

        #for m in match_query:
            #for question in m.vendor_dict:


        #self.response.headers['Content-Type'] = 'application/json'
        #self.response.out.write(json.dumps(data))

app = webapp2.WSGIApplication([
    ('/submit_survey', SubmitSurvey),
    ('/find_matches', FindMatches)
], debug=True)