import tweepy
from tweepy import OAuthHandler
 
consumer_key = 'oHTx140ufRDeVxiGH1WzXnYnW'
consumer_secret = 'u9Yl4e7wxjRgN8TYoF0b0OmIwNtJfdpHcNmHfJujPKoKFCrK6h'
access_token = '832014721846964224-fuiu1irzrWB7q55Zt2vtiRfllR2KIdA'
access_secret = 'UvLhaw7gYCg4IW5YQqibV5rfmWyfZqFGqGdAYNJ4xpRwD'
 
auth = OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_secret)
 
api = tweepy.API(auth)

from tweepy import Stream
from tweepy.streaming import StreamListener
 
class MyListener(StreamListener):
 
    def on_data(self, data):
        try:
            with open('python.json', 'a') as f:
                f.write(data)
                return True
        except BaseException as e:
            print("Error")
        return True
 
    def on_error(self, status):
        print(status)
        return True
 
twitter_stream = Stream(auth, MyListener())
twitter_stream.filter(track=['#javascript', '#hadoop', '#c++', '#sql', '#ruby', '#spark', '#angular', '#react', '#python'
	'#node', '#php', '#css', '#html', '#docker', '#aws', '#heroku', '#digitalocean', '#git', '#apple', '#google',
	'#salesforce', '#facebook', '#oracle', '#sap', '#microsoft', '#amazon'])
