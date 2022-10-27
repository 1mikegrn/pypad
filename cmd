#!/bin/bash

build() {
    if [ -z $2 ]
    then
        docker-compose build "${@:3}"
    elif [ $2 = "testrunner" ]
    then
        docker build -f .docker/Dockerfile.testrunner -t testrunner .
    else
        docker-compose build $2 "${@:3}"
    fi
}

frontend() {
    if [ $2 = "dev" ]
    then
        pushd ./app
        npm run dev
        popd
    elif [ $2 = "build" ]
    then
        pushd ./app
        npm run build
        popd
    fi
}

deploy() {
    if [[ -z $2 || $2 = "fe" ]]
    then
        pushd ./app
        npm install
        npm run build
        popd
    fi
    if [[ -z $2 || $2 = "be" ]]
    then
        docker-compose build --no-cache
    fi
    docker-compose down -t 0
    docker-compose up -d
}

testrunner() {
    docker rm pypad_testrunner &> /dev/null
    docker run -tid \
        -v $(pwd):/home/pypad/code \
        --name pypad_testrunner \
        --env-file .env/testrunner.env \
        testrunner
    docker exec -it pypad_testrunner bash
    docker kill pypad_testrunner &> /dev/null
    docker rm pypad_testrunner &> /dev/null
}

case $1 in
    "deploy") deploy $@ ;;
    "build") build $@ ;;
    "run") frontend $@ ;;
    "testrunner") testrunner $@ ;;
esac
