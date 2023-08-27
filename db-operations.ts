import { Result, Ok, Err } from './common/result'
import { sqlquery } from './setup-db'

export interface Employee {
  id: number
  displayName: string
  age: number
  address: string
  salary: number
}

export async function employeeById(id: number): Promise<Result<Employee, string>> {
  const r = await sqlquery('select * from employee where id = $1', [id])
  if (!r.ok) return Err(r.error)

  return Ok({
    id: r.value[0].id,
    displayName: r.value[0]?.display_name ?? '',
    age: r.value[0]?.age ?? 0,
    address: r.value[0]?.address ?? '',
    salary: r.value[0]?.salary ?? 0
  })
}
