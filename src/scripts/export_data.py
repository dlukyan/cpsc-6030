import sys
import csv
import json

with open(sys.argv[1], newline = '') as source:
    reader = csv.DictReader(source)
    rows = list(reader)

with open(sys.argv[2], newline = '', mode = 'w') as target:
    json.dump(rows, target)

