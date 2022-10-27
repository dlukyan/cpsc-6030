import sys
import csv

# read the source data from the file
with open(sys.argv[1], newline = '', encoding = 'utf-8-sig') as source:
    pvreader = csv.reader(source, delimiter = ',', quotechar = '"')
    data = list(pvreader)

# cleanse data
for i in range(len(data)):
    row = data[i]
    for j in range(len(row)):
        row[j] = row[j].replace('\n', ' ') # remove line breaks from the data
        row[j] = row[j].strip() # strip data
        if row[j].endswith('%') and row[j].replace('.', '', 1).rstrip("%").isnumeric():
            row[j] = float(row[j].rstrip('%')) / 100 # replace percents with fractions
    data[i] = row

# write cleaned data
with open(sys.argv[2], newline = '', mode = 'w') as target:
    pvwriter = csv.writer(target, delimiter = ',', quotechar = '"')
    for row in data:
        pvwriter.writerow(row)