# FairML

## Backend

Fill in the env variables in the `.env.example` and save it as `.env`

### GCP Cloud Run

To host the backend on GCP Cloud Run, run the following commands:

```
gcloud init
gcloud repositories create 'repo-name' --repository-format=docker --location="location" --description= "description"
gcloud builds submit --region="region" --tag "some-tag"
gcloud run deploy fairml --port 8080 --source .
```

## Frontend

Make sure you change the endpoints in the files in the `services` folder and the `src/components/chatbot/Chat.jsx` file.

```
cd frontend
npm run deploy
```
