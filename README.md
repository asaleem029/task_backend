### TASK - BACKEND_SERVICE


### Prerequisites
- Node.js
- Yarn
- Installation
- Install Yarn for running the project


### Node Version
- Install nvm manager
- Install Node 20 using nvm


### Scripts


### Build Local
- yarn build:local

### Start Local Server
- yarn start:local

### Build Prod
- yarn build:prod

### Start Prod Server
- yarn start:prod

### Run Linter
- yarn lint

### TYPEORM Scripts

### Create Migrations command:
- yarn run typeorm -- migration:create ./src/app/models/migrations/-create-{{name}}

### Create Entity command:
- yarn run typeorm -- entity:create ./src/app/models/entities/{{name}}
