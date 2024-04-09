/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
/* 
import router from '@adonisjs/core/services/router' */
import db from '@adonisjs/lucid/services/db'
import app from '@adonisjs/core/services/app'
import router from '@adonisjs/core/services/router'
import { MigrationRunner } from '@adonisjs/lucid/migration'
import { HttpContext } from '@adonisjs/core/http'

router.get('/', async () => {
  const migrator = new MigrationRunner(db, app, {
    direction: 'up',
    dryRun: false,
    // connectionName: 'pg',
  })

  await migrator.run()
  return db.from('users').select("*")
})



export default class PostsController {
  async index({ request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = 20

    const users = await db
      .query()
      .from('users')
      .select('*')
      .orderBy('id', 'desc')
      .paginate(page, limit)

    return users
  }
}

/* 
router.get('/', async () => {
  return {
    hello: 'world',
  }
}) */
