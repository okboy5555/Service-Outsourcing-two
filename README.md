# Evaluate Online 


## Introduction
This is a topic for the Eighth China software outsourcing competition.Its serial number is A04.You can register online and then do some IT tests to evaluate own deficiency.Discuss a problem online with other people in the same time.I'm sorry to tell you that because of my weak ability, temporaily can't judge programming problem.Programming problems are keys to testing a programmer's ability.So I recommend you to execrise in some websites like LeetCode,Nowcoder...and so on.


## Development  Setup

``` bash
# connect mongodb(windows)
# you should cd to mongodb's bin path
# c:/mongodb/x.x(version)/bin  then
for example:
mongod.exe --dbpath e:/data/evaluate

# only first run in your pc should install dependencies.

# You should have installed phantomjs successfully and build in your system environment path,otherwise it will be reported wrong.
cd ./server
npm install

# server start with hot reload at localhost:3000,you can kill this process with 'pm2 kill'
pm2 start index.js --watch
pm2 log

# cd frontEnd project path then install frontEnd dependencies
npm install

# fontend server start with hot reload at localhost:8080
npm run dev

# following bashes have not been realized,I need some more time.
# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

## API Interface Docs
#### Signin
url:
> http://localhost:3000/api/signin  

method:
> post

params:  

param | type | necsssary
------- | ------- | ----
email | string | Y | 
password | string | Y


## License
### Without winning the prize, I will open this project in Github.

