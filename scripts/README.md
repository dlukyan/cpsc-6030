The next folder structure is implied:<br />
- [project catalog]
- [project catalog]/scripts/[scripts]
- [project catalog]/[data files]
<br />
python3 clean_data.py [source csv file] [target csv file]<br />
python3 to_json.py [source csv file] [target json file]<br/>
python3 create_db.py [db port] [project catalog] [cleaned csv filename]<br />
<br />
Example:<br />
python3 clean_data.py police_violence.csv police_violence_cleaned.csv<br />
python3 to_json.py police_violence_cleaned.csv police_violence_cleaned.json<br />
python3 create_db.py 5432 /Users/dmitry/Documents/Clemson/DV/project police_violence_cleaned.csv