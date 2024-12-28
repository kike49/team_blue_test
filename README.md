# Exercise 1

A Python script that processes server log files and generates reports about IP address traffic.

### Features
+ Processes log files with semicolon-separated values
+ Generates reports in CSV or JSON format
+ Calculates request and byte statistics per IP address
+ Sorts results by number of requests
+ Excludes non-OK status entries

### Use
Go the the exercise folder and use the help flag to display information about the script module:
```
python process_logs.py --help
```
Run the following command to test it with the default logfile:
```
python process_logs.py
```
With custom parameters:
```
python process_logs.py --input /logfiles/requests.log --output /reports/ipaddr --format csv
```

### Parameters
- `--input`: Input log file path (default: /logfiles/requests.log)
- `--output`: Output report path (default: /reports/ipaddr)
- `--format`: Output format [csv|json] (default: csv)

### Testing
Run unit tests:
```
python test_process_logs.py
```

# Exercise 2
A JavaScrip module that multiply integer numbers using the addition operator instead of the multiplication operator.

### Features
+ Numbers are stored as arrays (first digit to first position, so 15 is [5, 1])
+ Multiply arrays without the * operator
+ Uses the multiplicator function tu calculate the factorial

### Use
Run the following commands on the exercise folder:
```
npm install
```
Test the file with the custom logs on the console:
```
node multiplicator.js
```
And perform the tests with Jest package with this command:
```
npm test
```
