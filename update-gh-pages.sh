if [ "$TRAVIS_PULL_REQUEST" == "false" ]; then
    echo -e "Starting to update gh-pages\n"
    #copy data we're interested in to other place
    cp -R coverage $HOME/coverage
    #go to home and setup git
    cd $HOME
    git config --global user.email "travis@travis-ci.org"
    git config --global user.name "Travis"
    #using token clone gh-pages branch
    git clone --quiet --branch=gh-pages https://${GH_TOKEN}@github.com/Uko/Rubidium-WHOIS.git  gh-pages > /dev/null
    #go into diractory and copy data we're interested in to that directory
    cd gh-pages
    cp -Rf $HOME/coverage/* .
    #add, commit and push files
    git add -f .
    git commit -m "Travis build $TRAVIS_BUILD_NUMBER pushed to gh-pages"
    git push -fq origin gh-pages > /dev/null
    echo -e "Done magic with coverage\n"
fi