
for f in $(find ./layout -name '*.ejs'); do
  echo $f;
  node_modules/.bin/ejslint $f;
done
