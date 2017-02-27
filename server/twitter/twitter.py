
import tweepy
import json
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from tweepy import OAuthHandler
from tweepy import Stream
from tweepy.streaming import StreamListener
 
consumer_key = 'oHTx140ufRDeVxiGH1WzXnYnW'
consumer_secret = 'u9Yl4e7wxjRgN8TYoF0b0OmIwNtJfdpHcNmHfJujPKoKFCrK6h'
access_token = '832014721846964224-fuiu1irzrWB7q55Zt2vtiRfllR2KIdA'
access_secret = 'UvLhaw7gYCg4IW5YQqibV5rfmWyfZqFGqGdAYNJ4xpRwD'
 
# auth = OAuthHandler(consumer_key, consumer_secret)
# auth.set_access_token(access_token, access_secret)

'''
api = tweepy.API(auth)

for status in tweepy.Cursor(api.home_timeline).items(5):
    # Process a single status
    print(status.text) 
'''
 


tweets_data_path = './python.json'

tweets_data = []
tweets_file = open(tweets_data_path, "r")
for line in tweets_file:
    try:
        tweet = json.loads(line)
        tweets_data.append(tweet)
    except:
        continue

print len(tweets_data)
tweets = pd.DataFrame()
tweets['text'] = map(lambda tweet: tweet['text'], tweets_data)
tweets['lang'] = map(lambda tweet: tweet['lang'], tweets_data)
tweets['country'] = map(lambda tweet: tweet['place']['country'] if tweet['place'] != None else None, tweets_data)
tweets_by_lang = tweets['lang'].value_counts()

# fig, ax = plt.subplots()
# ax.tick_params(axis='x', labelsize=15)
# ax.tick_params(axis='y', labelsize=10)
# ax.set_xlabel('Languages', fontsize=15)
# ax.set_ylabel('Number of tweets' , fontsize=15)
# ax.set_title('Top 5 languages', fontsize=15, fontweight='bold')
# tweets_by_lang[:5].plot(ax=ax, kind='bar', color='red')
# #plt.show()

def word_in_text(word, text):
    word = word.lower()
    text = text.lower()
    #match = re.search(word, text)
    if word in text:
        return True
    return False

tweets['javascript'] = tweets['text'].apply(lambda tweet: word_in_text('javascript', tweet))
tweets['hadoop'] = tweets['text'].apply(lambda tweet: word_in_text('hadoop', tweet))
tweets['c++'] = tweets['text'].apply(lambda tweet: word_in_text('c++', tweet))
tweets['sql'] = tweets['text'].apply(lambda tweet: word_in_text('sql', tweet))
tweets['ruby'] = tweets['text'].apply(lambda tweet: word_in_text('ruby', tweet))
tweets['spark'] = tweets['text'].apply(lambda tweet: word_in_text('spark', tweet))
tweets['angular'] = tweets['text'].apply(lambda tweet: word_in_text('angular', tweet))
tweets['react'] = tweets['text'].apply(lambda tweet: word_in_text('react', tweet))
tweets['python'] = tweets['text'].apply(lambda tweet: word_in_text('python', tweet))
tweets['node'] = tweets['text'].apply(lambda tweet: word_in_text('node', tweet))
tweets['php'] = tweets['text'].apply(lambda tweet: word_in_text('php', tweet))
tweets['css'] = tweets['text'].apply(lambda tweet: word_in_text('css', tweet))
tweets['html'] = tweets['text'].apply(lambda tweet: word_in_text('html', tweet))
tweets['docker'] = tweets['text'].apply(lambda tweet: word_in_text('docker', tweet))
tweets['aws'] = tweets['text'].apply(lambda tweet: word_in_text('aws', tweet))
tweets['heroku'] = tweets['text'].apply(lambda tweet: word_in_text('heroku', tweet))
tweets['digitalocean'] = tweets['text'].apply(lambda tweet: word_in_text('digitalocean', tweet))
tweets['git'] = tweets['text'].apply(lambda tweet: word_in_text('git', tweet))
tweets['apple'] = tweets['text'].apply(lambda tweet: word_in_text('apple', tweet))
tweets['google'] = tweets['text'].apply(lambda tweet: word_in_text('google', tweet))
tweets['twitter'] = tweets['text'].apply(lambda tweet: word_in_text('twitter', tweet))
tweets['salesforce'] = tweets['text'].apply(lambda tweet: word_in_text('salesforce', tweet))
tweets['facebook'] = tweets['text'].apply(lambda tweet: word_in_text('facebook', tweet))
tweets['oracle'] = tweets['text'].apply(lambda tweet: word_in_text('oracle', tweet))
tweets['sap'] = tweets['text'].apply(lambda tweet: word_in_text('sap', tweet))
tweets['microsoft'] = tweets['text'].apply(lambda tweet: word_in_text('microsoft', tweet))
tweets['amazon'] = tweets['text'].apply(lambda tweet: word_in_text('amazon', tweet))
print 'hello'
print tweets['javascript'].value_counts()[True]
print tweets['hadoop'].value_counts()[True]
print tweets['c++'].value_counts()[True]

labels = 'javascript', 'html', 'css', 'sql', 'ruby'
labels2 = 'c++', 'python', 'hadoop', 'spark'
labels3 = 'node', 'php', 'react', 'angular'
labels4 = 'git', 'heroku', 'aws', 'docker', 'digitalocean'
labels5 = 'apple', 'google', 'twitter', 'salesforce', 'facebook', 'oracle', 'sap', 'microsoft', 'amazon' 
sizes = [tweets['javascript'].value_counts()[True], tweets['html'].value_counts()[True], tweets['css'].value_counts()[True],
    tweets['sql'].value_counts()[True], tweets['ruby'].value_counts()[True]]
fig1, ax1 = plt.subplots()
ax1.pie(sizes, labels=labels, autopct='%1.1f%%', startangle=90)
ax1.axis('equal')
ax1.set_title('Tweets Based on Technology', fontsize=10, fontweight='bold')
plt.savefig('plot.png')
# plt.show()

companies = ['apple', 'google', 'amazon', 'microsoft', 'salesforce', 'oracle', 'sap']
tweets_by_company = [tweets['apple'].value_counts()[True], tweets['google'].value_counts()[True],
    tweets['amazon'].value_counts()[True], tweets['microsoft'].value_counts()[True], tweets['salesforce'].value_counts()[True],
    tweets['oracle'].value_counts()[True], tweets['sap'].value_counts()[True]]

x_pos = list(range(len(companies)))
width = 0.8
fig, ax = plt.subplots()
plt.bar(x_pos, tweets_by_company, width, alpha=1, color='r')

ax.set_ylabel('Tweet Total', fontsize=15)
ax.set_title('Trending Companies', fontsize=15, fontweight='bold')
ax.set_xticks([p for p in x_pos])
ax.set_xticklabels(companies)	
plt.savefig('plot2.png');
# plt.show()

fig, ax = plt.subplots()

# Example data
techs = labels4
y_pos = np.arange(len(techs))
tweets_by_tech = [tweets['git'].value_counts()[True], tweets['heroku'].value_counts()[True], tweets['aws'].value_counts()[True],
    tweets['docker'].value_counts()[True], tweets['digitalocean'].value_counts()[True]]

ax.barh(y_pos, tweets_by_tech, align='center',
        color='orange')
ax.set_yticks(y_pos)
ax.set_yticklabels(techs)
ax.invert_yaxis()  # labels read top-to-bottom
ax.set_xlabel('Number of Tweets')
ax.set_title('Tweets based on Tech')
plt.savefig('plot3.png');

