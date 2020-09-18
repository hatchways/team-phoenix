# Team Phoenix - Calendly App

## Starting the server:
1. Open a terminal and go to the server folder. Make sure you have **pipenv** installed (`pip install pipenv`)
2. Install the dependencies with `pipenv install`. This also createa a virtual environment, if there isn't one already
3. Activate the virtual environment and start the app with `pipenv run flask run`

### API end points:

| End point | Description |
| -------------------- | ---------------------- |
| /meetings/<user_id> | Allows you to view all the meetings for the given user_id |
| /meeting/<user_id>/ <int: duration> | Books a meeting of duration with the person user_id |
