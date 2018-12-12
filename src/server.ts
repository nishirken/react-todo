import * as Koa from 'koa';
import * as bodyparser from 'koa-bodyparser';
import * as json from 'koa-json';
import * as Router from 'koa-router';
import * as cors from 'koa2-cors';
import { Pool } from 'pg';

const successResponse = {
  success: true,
};

(async () => {
  const pool = new Pool({
    database: 'notes',
    host: 'psql',
    port: 5432,
    user: 'postgres',
  });
  const app = new Koa();
  const router = new Router();
  const port = 8080;

  try {
    await pool.query(
      'create table if not exists notes ' +
      '(id serial primary key, name varchar(500) not null, done boolean default false)'
    );
  } catch (error) {
    // tslint:disable-next-line
    console.error(error);
  }

  router.get('/notes', async ctx => {
    try {
      const { rows } = await pool.query('select * from notes');
      ctx.body = rows;
    } catch (e) {
      ctx.throw(500);
    }
  });

  router.post('/notes', async ctx => {
    try {
      const { name, done } = ctx.request.body;

      if (!name) {
        ctx.throw(400, 'name param is empty');
      }

      await pool.query(
        `insert into notes (name, done) values ('${name}', '${done}')`
      );
      ctx.body = successResponse;
    } catch (error) {
      ctx.throw(500);
    }
  });

  router.delete('/notes/:id', async ctx => {
    try {
      const { id } = ctx.params;
      await pool.query(`delete from notes where id = ${id}`);
      ctx.body = successResponse;
    } catch (error) {
      ctx.throw(500);
    }
  });

  router.put('/notes/:id', async ctx => {
    try {
      const { id } = ctx.params;
      const { name, done } = ctx.request.body;
      await pool.query(`update notes set name = '${name}', done = ${done} where id = ${id}`);
      ctx.body = successResponse;
    } catch (error) {
      ctx.throw(500);
    }
  });

  app
    .use(bodyparser())
    .use(json())
    .use(router.routes())
    .use(cors());

  app.listen(port);
})();
