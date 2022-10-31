import sys
import csv
import json

with open(sys.argv[1], newline = '') as source:
    reader = csv.DictReader(source)
    rows = list(reader)

for i in range(len(rows)):
    row = rows[i]
    for item in list(row.items()):
        if item[1] == '':
            del row[item[0]]
        if item[0] != 'zip' and item[1].replace('.', '', 1).lstrip("-").isnumeric():
            row[item[0]] = float(item[1])
            if row[item[0]].is_integer():
                row[item[0]] = int(row[item[0]])
    rows[i] = row

with open(sys.argv[2], newline = '', mode = 'w') as target:
    json.dump(rows, target)