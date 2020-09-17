#!/bin/sh
wget -q $TRANRULES -O ./plugins/tranrules.js
wget -q $TRUSTCENTER -O ./plugins/trustcenter.js
npm run dev