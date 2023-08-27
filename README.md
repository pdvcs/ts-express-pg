# ts-express-pg

A demo project with Node + Typescript + ExpressJS + Postgres.


Build:

```shell
npm install
npm run build
```

Run:

Ensure Postgres is set up with the following table:

```sql
create table employee (
  id integer NOT NULL,
  display_name text NOT NULL,
  age integer NOT NULL,
  address character varying(72),
  salary real
);
```

Using psql/similar, insert a few rows to the table above. Then:

* Set `LOCAL_PGDB_USER` and `LOCAL_PGDB_PASS` to your Postgres credentials.
* Run `npm run start` to start the server (by default it starts on port 5000)
* Visit a URL like http://localhost:5000/employee/1 to view JSON.


Useful during development:

* `npm run dev`: run a dev server
* `npm run fmt`: format the code
* `npm run lint`: run eslint

To format on save in VS Code, install [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
and add this to settings:

```json
"[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true,
},
```
