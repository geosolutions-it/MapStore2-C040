#!/bin/bash
set -e
if grep -q XXXXXXXXXX 'web/ldap.properties'; then
  echo "Please configure web/ldap.property first"
  exit 1
fi

export GITREV=`git log -1 --format="%H"`
export VERSION="SNAPSHOT-$GITREV"

#SiRAC integration needs a keystore for secure backend comunications
if [ ! -f web/src/main/webapp/keystore/encryptAuthResponse_Rijndael_256_PBEWithSHAAnd128BitRC4_100.key ]; then
    echo "keystore file not found! Please add it to the web/src/main/webapp/keystore/ folder and try again."
    echo "You can find the download link the README file"
    exit 1
fi

npm install
npm run compile
npm run lint
npm test

if [ $# -eq 0 ]
  then
    mvn clean install -Dmapstore2.version=$VERSION
  else
    mvn clean install -Dmapstore2.version=$1
fi
