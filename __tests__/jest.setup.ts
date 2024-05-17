
export default async function (): Promise<void> {
  // await AppTestDataSource.initialize()

  console.log(' setting up jest')
  /* await new Promise<void>((resolve, reject) => {
    exec('npm run seed:run', (error, stdout, stderr) => {
      if (error) {
        console.error('Error executing command:', error)
        console.error('stderr:', stderr)
        reject(error)
      } else {
        console.log('Seed data inserted successfully')
        console.log('stdout:', stdout)
        resolve()
      }
    })
  }) */
}
