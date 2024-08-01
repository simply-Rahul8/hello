use diesel::prelude::*;
use crate::models::task::Task;
use crate::schema::tasks;

pub async fn create_task(
    conn: &mut PgConnection,
    description: &str,
    reward: i64,
) -> Result<Task, diesel::result::Error> {
    let description = String::from(description);
    let new_task = Task { id: 0, description, reward, completed: false };
    diesel::insert_into(tasks::table)
        .values(&new_task)
        .get_result(conn)
}