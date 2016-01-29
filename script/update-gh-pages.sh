if [ "$TRAVIS_PULL_REQUEST" == "false" ]; then
  echo -e "Starting to update master\n"

  cp -R page/public $HOME/public

  cd $HOME
  git config --global user.email "iocast@me.com"
  git config --global user.name "iocast"
  git clone --quiet --branch=master https://${GH_TOKEN}@github.com/iocast/iocast.github.io.git master > /dev/null

  cd master
  rm -rf ./*
  cp -Rf $HOME/public/* .

  git add -f -A .
  git commit -m "Travis build $TRAVIS_BUILD_NUMBER pushed to master"
  git push -fq origin master > /dev/null

  echo -e "Done magic with coverage\n"
fi
