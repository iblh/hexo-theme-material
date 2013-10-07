if [ "$TRAVIS_PULL_REQUEST" == "false" ]; then
  echo -e "Starting to update gh-pages\n"

  cp -R coverage $HOME/coverage

  cd $HOME
  git config --global user.email "iocast@me.com"
  git config --global user.name "iocast"
  git clone --quiet --branch=gh-pages https://${GH_TOKEN}@github.com:iocast/iocast.github.io.git gh-pages > /dev/null

  cd gh-pages
  cp -Rf $HOME/coverage/* .

  git add -f .
  git commit -m "Travis build $TRAVIS_BUILD_NUMBER pushed to gh-pages"
  git push -fq origin gh-pages > /dev/null

  echo -e "Done magic with coverage\n"
fi
