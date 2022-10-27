import sys
import os

os.system('docker pull postgres:14.5-alpine')
os.system('docker run --name postgres-dvproject -p ' + sys.argv[1] +':5432 -v ' + sys.argv[2] + ':/mnt -e POSTGRES_PASSWORD=password -d postgres:14.5-alpine')
os.system('docker exec postgres-dvproject chmod +x /mnt/scripts/postgres_within')
os.system('docker exec postgres-dvproject /mnt/scripts/postgres_within ' + sys.argv[3])