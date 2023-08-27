import { Result, Ok, Err } from './common/result'
import { Pool, QueryResult, DatabaseError } from 'pg'

const dbpool = new Pool({
  host: 'localhost',
  user: process.env.LOCAL_PGDB_USER,
  password: process.env.LOCAL_PGDB_PASS,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function sqlquery(sql: string, params: any[] = []): Promise<Result<any[], string>> {
  try {
    const r: QueryResult = await dbpool.query(sql, params)
    return Ok(r.rows)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    // strictly speaking -- not needed, but it shows we can treat DB errors separately
    if (err instanceof DatabaseError) {
      console.log('DB Error:', err?.message)
    } else {
      console.log('Error:', err?.message)
    }
    return Err(err?.message ?? 'unknown error')
  }
}

async function init() {
  const r = await sqlquery('select version()')
  if (r.ok) {
    console.log(`Connected to: ${r.value[0]?.version}`)
  } else {
    console.log('Could not connect to database:', r.error)
  }
}

init().then()

export const pool = () => dbpool
