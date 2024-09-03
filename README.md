# FairML

## Backend

### GCP Cloud Run

To host the backend on GCP Cloud Run, run the following commands:

```
gcloud init
gcloud repositories create 'repo-name' --repository-format=docker --location="location" --description= "description"
gcloud builds submit --region="region" --tag "some-tag"
gcloud run deploy fairml --port 8080 --source .
```
