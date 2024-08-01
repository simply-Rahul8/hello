use diesel::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Queryable, Insertable, Serialize, Deserialize)]
#[diesel(table_name = crate::schema::tasks)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct Task {
    pub id: i32,
    pub description: String,
    pub reward: i64,
    pub completed: bool,
}

impl Task {
    pub fn new(description: String, reward: i64, completed: bool) -> Self {
        Task {
            id: 0,
            description,
            reward,
            completed,
        }
    }
}

