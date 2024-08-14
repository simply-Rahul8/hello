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

    // let task = Task {id: 0 ,description: String::from(description), reward: reward.clone(), completed: false  };
    let some = diesel::insert_into(tasks::table)
        .values(&new_task)
        .returning(Task::as_returning())
        .get_result(conn);
    println!("{:?}", some);
    return some;
}
