use crate::models::task::{NewTask, Task};
use crate::schema::tasks;
use diesel::prelude::*;
use diesel::result::Error;

pub async fn create_task(
    conn: &mut PgConnection,
    description: &str,
    reward: &i64,
) -> Result<Task, Error> {
    let new_task = NewTask {
        description,
        reward,
        completed: false,
    };

    let some = diesel::insert_into(tasks::table)
        .values(&new_task)
        .returning(Task::as_returning())
        .get_result(conn);
    log::info!("{:?}", some);
    return some;
}

#[cfg(test)]
mod tests {
    use crate::database::test_db::{self, TestDb};

    use super::*;

    #[actix_rt::test]
    async fn test_create_task_success() {
        let db = TestDb::new();

        let description = "test task";
        let reward = 100;

        let result = create_task(&mut db.conn(), description, &reward).await;

        assert!(
            result.is_ok(),
            "Task creation failed when it should have succeeded"
        );

        let created_task = result.unwrap();
        assert_eq!(created_task.description, description);
        assert_eq!(created_task.reward, reward);
    }
}
