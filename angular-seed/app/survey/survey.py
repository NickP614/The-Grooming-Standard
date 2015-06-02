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
        email = data['email'].lower()
        questions = data['questions']
        user_ip = str(self.request.remote_addr)

        if email:
            email_query = Survey.query(Survey.survey_email == email)
        ip_query = Survey.query(Survey.survey_ip == user_ip)

        questions_dict = {}

        for q in questions:
            questions_dict[q['number']] = q

        return_shops = []

        match_query = Vendor.query()

        shop_list = []
        score_list = []

        for m in match_query:
            logging.info(m.vendor_email)
            score = 0
            if m.vendor_dict:
                logging.info(m.vendor_dict)
                for q in m.vendor_dict:
                    answer = questions_dict.get(q['number'])

                    if answer['number'] != 6 and q['answer'] and answer['answer'] and q['answer'] == answer['answer']:

                        if answer['ranking'] == 1:
                            points = 12
                        elif answer['ranking'] == 2:
                            points = 11
                        elif answer['ranking'] == 3:
                            points = 10
                        elif answer['ranking'] == 4:
                            points = 9
                        elif answer['ranking'] == 5:
                            points = 8
                        elif answer['ranking'] == 6:
                            points = 7
                        elif answer['ranking'] == 7:
                            points = 6
                        elif answer['ranking'] == 8:
                            points = 5
                        elif answer['ranking'] == 9:
                            points = 4
                        elif answer['ranking'] == 10:
                            points = 3
                        elif answer['ranking'] == 11:
                            points = 2
                        elif answer['ranking'] == 12:
                            points = 1

                        score += points

                    elif answer['number'] == 6 and q['answer'] and answer['answer']:
                        portrait_list = []
                        for k,v in q['answer'].iteritems():
                            if v == True:
                                portrait_list.append(k)

                        if str(answer['answer']) in portrait_list:
                            if answer['ranking'] == 1:
                                points = 12
                            elif answer['ranking'] == 2:
                                points = 11
                            elif answer['ranking'] == 3:
                                points = 10
                            elif answer['ranking'] == 4:
                                points = 9
                            elif answer['ranking'] == 5:
                                points = 8
                            elif answer['ranking'] == 6:
                                points = 7
                            elif answer['ranking'] == 7:
                                points = 6
                            elif answer['ranking'] == 8:
                                points = 5
                            elif answer['ranking'] == 9:
                                points = 4
                            elif answer['ranking'] == 10:
                                points = 3
                            elif answer['ranking'] == 11:
                                points = 2
                            elif answer['ranking'] == 12:
                                points = 1
                            score += points

                if len(score_list) >= 3:

                    if score_list[2] > score_list[1]:
                        score_list[1], score_list[2] = score_list[2], score_list[1]
                        shop_list[1], shop_list[2] = shop_list[2], shop_list[1]
                    if score_list[1] > score_list[0]:
                        score_list[0], score_list[1] = score_list[1], score_list[0]
                        shop_list[0], shop_list[1] = shop_list[1], shop_list[0]
                    if score_list[2] > score_list[1]:
                        score_list[1], score_list[2] = score_list[2], score_list[1]
                        shop_list[1], shop_list[2] = shop_list[2], shop_list[1]

                    if score > score_list[2]:
                        del score_list[2]
                        del shop_list[2]

                        score_list.append(score)
                        shop_list.append(m.to_dict())
                        break
                else:
                    score_list.append(score)
                    shop_list.append(m.to_dict())

        for shop in shop_list:
            del shop['date']
            del shop['vendor_dict']
            del shop['vendor_hash']

        logging.info(score_list)

        if score_list[2] > score_list[1]:
            score_list[1], score_list[2] = score_list[2], score_list[1]
            shop_list[1], shop_list[2] = shop_list[2], shop_list[1]
        if score_list[1] > score_list[0]:
            score_list[0], score_list[1] = score_list[1], score_list[0]
            shop_list[0], shop_list[1] = shop_list[1], shop_list[0]
        if score_list[2] > score_list[1]:
            score_list[1], score_list[2] = score_list[2], score_list[1]
            shop_list[1], shop_list[2] = shop_list[2], shop_list[1]

        logging.info(shop_list)
        logging.info(score_list)

        score1= 100 * float(score_list[0])/float(78)
        score2= 100 * float(score_list[1])/float(78)
        score3= 100 * float(score_list[2])/float(78)

        shop_list[0]['score'] = int(score1)
        shop_list[1]['score'] = int(score2)
        shop_list[2]['score'] = int(score3)

        if email and email_query.get():
            email_query = email_query.get()
            email_query.shop_rankings = shop_list
            shop_rankings_email =[]
            for s in shop_list:
                shop_rankings_email.append(s['vendor_email'])
            email_query.shop_rankings_email = shop_rankings_email
            email_query.put()

        elif ip_query.get():
            ip_query = ip_query.get()
            ip_query.shop_rankings = shop_list
            shop_rankings_email =[]
            for s in shop_list:
                shop_rankings_email.append(s['vendor_email'])
            ip_query.shop_rankings_email = shop_rankings_email
            ip_query.put()



        self.response.headers['Content-Type'] = 'application/json'
        self.response.out.write(json.dumps(shop_list))

class SelectedShop(webapp2.RequestHandler):
    def post(self):
        data = json.loads(self.request.body)
        selected_shop = data['selected_shop']
        email = data['email'].lower()
        user_ip = str(self.request.remote_addr)
        logging.info(selected_shop)

        if email:
            email_query = Survey.query(Survey.survey_email == email)
        ip_query = Survey.query(Survey.survey_ip == user_ip)

        if email and email_query.get():
            email_query = email_query.get()
            email_query.selected_shop = selected_shop[1]
            email_query.selected_shop_email = selected_shop[1]['vendor_email']
            email_query.put()

        elif ip_query.get():
            ip_query = ip_query.get()
            ip_query.selected_shop = selected_shop[1]
            ip_query.selected_shop_email = selected_shop[1]['vendor_email']
            ip_query.put()



app = webapp2.WSGIApplication([
    ('/submit_survey', SubmitSurvey),
    ('/find_matches', FindMatches),
    ('/selected_shop', SelectedShop)
], debug=True)